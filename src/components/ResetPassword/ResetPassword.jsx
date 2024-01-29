import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import myApi from "../../service/service";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    // Vérifier la validité du jeton de réinitialisation lorsque le composant est monté
    const verifyResetToken = async () => {
      try {
        await myApi.post("/auth/verify-reset-token", { resetToken: token });
      } catch (error) {
        // Si la vérification échoue, redirigez l'utilisateur ou effectuez toute autre gestion d'erreur nécessaire.
        console.error(
          "Erreur lors de la vérification du jeton de réinitialisation :",
          error
        );
        navigate("/login"); // Vous pouvez ajuster cette redirection en fonction de vos besoins.
      }
    };

    verifyResetToken();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setIsLoading(true);

      // Appel à votre API pour réinitialiser le mot de passe
      const response = await myApi.post("/auth/reset-password", {
        resetToken: token,
        newPassword,
      });

      // Afficher un message de succès ou rediriger l'utilisateur
      console.log(response.data.message);
      navigate("/login");
    } catch (error) {
      // Gérer les erreurs liées à la réinitialisation du mot de passe
      setError("Erreur lors de la réinitialisation du mot de passe.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Réinitialiser le Mot de Passe</h2>
      <form onSubmit={handleSubmit}>
        <label>Nouveau Mot de Passe</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Entrez votre nouveau mot de passe"
          required
        />
        <label>Confirmer le Mot de Passe</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmez votre nouveau mot de passe"
          required
        />
        <button type="submit" disabled={isLoading}>
          Réinitialiser le Mot de Passe
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default ResetPassword;

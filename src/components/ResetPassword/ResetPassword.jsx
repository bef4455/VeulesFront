import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.css";
import myApi from "../../service/service";
import DJI_00534 from "./../../assets/DJI_00534.mp4";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const verifyResetToken = async () => {
      try {
        await myApi.post("/auth/verify-reset-token", { resetToken: token });
      } catch (error) {
        console.error(
          "Erreur lors de la vérification du jeton de réinitialisation :",
          error
        );
        navigate("/login");
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

      const response = await myApi.post(`/auth/reinitialiser-mot-de-passe`, {
        resetToken: token,
        newPassword,
      });

      console.log(response.data.message);
      navigate("/login");
    } catch (error) {
      setError("Erreur lors de la réinitialisation du mot de passe.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <video
        className="video"
        src={DJI_00534}
        autoPlay
        loop
        muted
        playsInline
      />
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

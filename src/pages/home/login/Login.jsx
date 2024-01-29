import "./login.css";
import Spinner from "../../../components/spinner/Spinner";
import { Link } from "react-router-dom";
import DJI_00534 from "../../../assets/DJI_00534.mp4";
import { useContext, useRef, useState } from "react";
import { Context } from "../../../context/Context";
import myApi from "../../../service/service";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ResetPassword from "./../../../components/ResetPassword/ResetPassword";

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const Navigate = useNavigate();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [email, setEmail] = useState("");

  const openForgotPasswordModal = () => {
    setShowForgotPasswordModal(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  const handleForgotPassword = async () => {
    try {
      const response = await myApi.post("/auth/mot-de-passe-oublie", {
        email: email,
      });

      console.log(response.data.message);

      closeForgotPasswordModal();
    } catch (error) {
      console.error(
        "Erreur lors de la demande de réinitialisation du mot de passe :",
        error
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    setIsLoading(true);
    setShowSpinner(true);

    try {
      const res = await myApi.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      const user = res.data.user;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      Navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });

      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Une erreur s'est produite. Veuillez réessayer");
      }
    } finally {
      setIsLoading(false);
      setShowSpinner(false);
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">SE CONNECTER</span>
      {error && <span className="errorMessage">{error}</span>}
      <video
        className="video"
        src={DJI_00534}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={`loading-bar ${isLoading ? "" : "fade-out"}`}>
        <div
          className="progress"
          style={{ width: isLoading ? "100%" : "0" }}
        ></div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="loginForm"
      >
        <label>Pseudo</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Entre ton Pseudo..."
          ref={userRef}
        />
        <label>Mot de Passe</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Entre ton Mot de Passe..."
          ref={passwordRef}
        />

        <button
          className="loginButton"
          type="submit"
          disabled={isFetching || isLoading}
          onClick={handleSubmit}
          style={{ display: isLoading ? "none" : "block" }}
        >
          Se Connecter
        </button>
        {showSpinner && <Spinner />}

        {/* Ajoutez ce code pour la fenêtre modale ici */}
        {showForgotPasswordModal && (
          <div className="forgotPasswordModal">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
            />
            <button onClick={handleForgotPassword}>Envoyer</button>
            <button onClick={closeForgotPasswordModal}>Fermer</button>
          </div>
        )}
      </motion.div>

      {/* Afficher le lien de réinitialisation du mot de passe si le formulaire n'est pas affiché */}
      {!showResetPasswordForm && (
        <Link className="forgotPasswordLink" onClick={openForgotPasswordModal}>
          Mot de passe oublié ?
        </Link>
      )}

      {/* Afficher le formulaire de réinitialisation du mot de passe si demandé */}
      {showResetPasswordForm && (
        <ResetPassword onCancelReset={() => setShowResetPasswordForm(false)} />
      )}

      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Enregistrer
        </Link>
      </button>
    </div>
  );
}

export default Login;

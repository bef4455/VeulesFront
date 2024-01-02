import "./register.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DJI_00534 from "../../../assets/DJI_00534.mp4";
import { useState } from "react";
import myApi from "../../../service/service";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/spinner/Spinner";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [error, setError] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);
    setShowSpinner(true);

    try {
      await myApi.post("/auth/register", {
        username,
        email,
        password,
      });
      Navigate("/login");
    } catch (err) {
      setError(true);
    }

    setIsLoading(false);
    setShowSpinner(false);
  };

  return (
    <div className="register">
      <span className="registerTitle">CRÉER UN COMPTE</span>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="registerFormContainer" // Ajoutez une classe pour le conteneur du formulaire
      >
        <form className="registerForm" onSubmit={handleSubmit}>
          <label>Pseudo</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Entre ton Pseudo"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Entre ton email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Mot de Passe</label>
          <input
            type="password"
            className="registerInput"
            placeholder="Entre ton Mot de Passe..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="registerButton"
            type="submit"
            disabled={isLoading}
            style={{ display: showSpinner ? "none" : "block" }}
          >
            S'enregistrer
          </button>
          {showSpinner && <Spinner />}
        </form>
      </motion.div>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Se Connecter
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Un problème est survenu. Contactez Fab !!
        </span>
      )}
      <video className="video" src={DJI_00534} autoPlay loop playsInline />
    </div>
  );
}

export default Register;

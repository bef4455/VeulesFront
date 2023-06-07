import "./register.css";
import { Link } from "react-router-dom";
import DJI_00534 from "../../../assets/DJI_00534.mp4";
import { useState } from "react";
import myApi from "../../../service/service";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

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
  };

  return (
    <div className="register">
      <span className="registerTitle">Créer un compte</span>
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
        <button className="registerButton" type="sumbit" disabled={isLoading}>
          {isLoading ? "Chargement..." : "S'enregister"}
        </button>
      </form>
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
      <video className="video" src={DJI_00534} autoPlay loop />
    </div>
  );
}

export default Register;

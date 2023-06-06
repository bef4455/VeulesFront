import "./login.css";
import { Link } from "react-router-dom";
import DJI_00534 from "../../../assets/DJI_00534.mp4";
import { useContext, useRef, useState } from "react";
import { Context } from "../../../context/Context";
import myApi from "../../../service/service";
import { useNavigate } from "react-router-dom";

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const Navigate = useNavigate();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

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
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Se Connecter</span>
      {error && <span className="errorMessage">{error}</span>}
      <form className="loginForm" onSubmit={handleSubmit}>
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
        <button className="loginButton" type="submit" disabled={isFetching}>
          {isFetching ? "Chargement..." : "Se Connecter"}
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Enregistrer
        </Link>
      </button>
      <video className="video" src={DJI_00534} autoPlay loop />
    </div>
  );
}

export default Login;

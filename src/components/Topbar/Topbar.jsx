import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./Topbar.css";

function Topbar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    console.log("Logging out...");
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
  };

  return (
    <div className="top">
      <div className="topLeft"></div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              CHEZ SAMSUPHI
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/infos">
              RECETTES
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/Peche">
              PÊCHE
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              ECRIRE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "SE DECONNECTER"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            {/* Utilisez la balise <img> pour afficher le logo */}
            <img
              className="topImg"
              src=".\src\assets\profile.svg"
              alt="Profile Logo"
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                SE CONNECTER
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                S'ENREGISTER
              </Link>
            </li>
          </ul>
        )}
        {/* <i className="topSearchIcon fa-solid fa-magnifying-glass"></i> */}
      </div>
    </div>
  );
}

export default Topbar;

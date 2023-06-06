import { useContext } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

function Topbar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5005/images/";

  const handleLogout = () => {
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
              INFOS
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              CONTACT
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
            <img className="topImg" src={PF + user.profilePic} alt="" />
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
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}

export default Topbar;

import "./settings.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../../context/Context";
import myApi from "../../../service/service";
import { useNavigate } from "react-router";

function Settings({ fetchPosts }) {
  const Navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5005/images/";

  const isValidEmail = (email) => {
    // Expression régulière pour la validation de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer votre compte ainsi que vos articles ?"
      )
    ) {
      try {
        await myApi.deleteUser(user._id); // Supprimez le deuxième argument 'config'
        dispatch({ type: "LOGOUT" });
        fetchPosts();
        Navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      setError("Veuillez remplir tous les champs du profil.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Veuillez fournir une adresse e-mail valide.");
      return;
    }

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;

      try {
        await myApi.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const res = await myApi.updateUser(user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      if (res.status === 200) {
        // console.log("User updated successfully");
      }
      Navigate("/");
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitles">
          <span className="settingsUpdateTitle">Modifie ton compte</span>
          <span className="settingsDeleteTitle" onClick={handleDelete}>
            Supprime ton compte
          </span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Photo de Profil</label>
          <div className="settingsPP">
            {user.profilePic && (
              <img
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt=""
              />
            )}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Pseudo</label>
          <input
            type="text"
            placeholder={user.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Modifier
          </button>
          {error && <span className="settingsError">{error}</span>}
          {success && (
            <span className="settingsSuccess">
              Le profil a bien été mis à jour.
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}

export default Settings;

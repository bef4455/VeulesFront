import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import "./settings.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import { Context } from "../../../context/Context";
import myApi from "../../../service/service";
import { useNavigate } from "react-router";
import axios from "axios";

function Settings({ fetchPosts }) {
  const Navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { user, dispatch } = useContext(Context);
  const [newProfilePic, setNewProfilePic] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

    if (!file) {
      setError("Veuillez sélectionner une photo de profil.");
      return;
    }

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

    try {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      data.append("upload_preset", "jycc7iqt");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmhbnekk4/image/upload",
        data
      );

      updatedUser.profilePic = response.data.secure_url;

      const res = await myApi.updateUser(user._id, updatedUser);

      setNewProfilePic(response.data.secure_url);
      dispatch({
        type: "UPDATE_PROFILE_PIC",
        payload: response.data.secure_url,
      });

      const updatedUserInfo = {
        ...user,
        username: res.data.username,
        email: res.data.email,
        profilePic: response.data.secure_url,
      };
      dispatch({ type: "UPDATE_SUCCESS", payload: updatedUserInfo });

      Navigate("/");
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="settings"
    >
      <div className="settingsWrapper">
        <div className="settingsTitles">
          <span className="settingsUpdateTitle">Modifie ton compte</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Photo de Profil</label>
          <div className="settingsPP">
            {user.profilePic && (
              <img
                src={file ? URL.createObjectURL(file) : user.profilePic}
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
          {error && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="settingsError"
            >
              {error}
            </motion.span>
          )}
          {success && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="settingsSuccess"
            >
              Le profil a bien été mis à jour.
            </motion.span>
          )}
        </form>
      </div>
      <Sidebar />
    </motion.div>
  );
}

export default Settings;

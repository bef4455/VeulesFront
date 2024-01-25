import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import "./settings.css";
import { Context } from "../../../context/Context";
import myApi from "../../../service/service";
import { useNavigate } from "react-router";
import Avatar from "react-avatar";

function Settings({ fetchPosts }) {
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, dispatch } = useContext(Context);
  const [error, setError] = useState("");

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

    // ... (Validation checks)

    try {
      const mongoDBResponse = await myApi.updateUser(user._id, updatedUser);

      const updatedUserInfo = {
        ...user,
        username: mongoDBResponse.data.username,
        email: mongoDBResponse.data.email,
      };

      dispatch({ type: "UPDATE_SUCCESS", payload: updatedUserInfo });

      Navigate("/");
    } catch (updateError) {
      console.error("Error updating user in MongoDB:", updateError);
      setError("Erreur lors de la mise à jour du profil.");
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
          {/* Affichez l'avatar actuel de l'utilisateur */}
          <div className="settingsPP">
            <Avatar name={user.username} size="70" round={true} />
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
        </form>
      </div>
    </motion.div>
  );
}

export default Settings;

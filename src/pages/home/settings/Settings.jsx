import { useState, useContext } from "react";
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
      profilePic: "",
    };

    console.log("1 Updated user data:", updatedUser);

    if (!file) {
      setError("Veuillez sélectionner une photo de profil.");
      dispatch({ type: "UPDATE_FAILURE" });
      return;
    }

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      setError("Veuillez remplir tous les champs du profil.");
      dispatch({ type: "UPDATE_FAILURE" });
      return;
    }

    if (!isValidEmail(email)) {
      setError("Veuillez fournir une adresse e-mail valide.");
      dispatch({ type: "UPDATE_FAILURE" });
      return;
    }

    try {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("file", file, filename);
      data.append("upload_preset", "jycc7iqt");

      console.log("FormData:", data);

      let cloudinaryResponse;

      try {
        cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dmhbnekk4/image/upload",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Cloudinary response:", cloudinaryResponse);

        if (!cloudinaryResponse.data || !cloudinaryResponse.data.secure_url) {
          throw new Error(
            "La réponse de Cloudinary ne contenait pas l'URL sécurisée de l'image."
          );
        }
      } catch (cloudinaryError) {
        console.error("Error uploading file to Cloudinary:", cloudinaryError);
        setError("Erreur lors du téléchargement de l'image sur Cloudinary.");
        dispatch({ type: "UPDATE_FAILURE" });
        return;
      }

      const publicId = cloudinaryResponse.data.public_id;
      updatedUser.profilePic = cloudinaryResponse.data.secure_url;

      try {
        const mongoDBResponse = await myApi.updateUser(user._id, updatedUser);

        dispatch({
          type: "UPDATE_PROFILE_PIC",
          payload: cloudinaryResponse.data.secure_url,
        });

        const updatedUserInfo = {
          ...user,
          username: mongoDBResponse.data.username,
          email: mongoDBResponse.data.email,
          profilePic: cloudinaryResponse.data.secure_url,
        };

        dispatch({ type: "UPDATE_SUCCESS", payload: updatedUserInfo });

        Navigate("/");
      } catch (updateError) {
        console.error("Error updating user in MongoDB:", updateError);
        setError("Erreur lors de la mise à jour du profil.");
        dispatch({ type: "UPDATE_FAILURE" });
      }
    } catch (error) {
      console.log("General error:", error);
      setError("Une erreur générale s'est produite.");
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
        <form
          className="settingsForm"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* <label>Photo de Profil</label>
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
              name="profilePic"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
                console.log("Selected File:", e.target.files[0]);
              }}
            />
          </div> */}
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
      <Sidebar />
    </motion.div>
  );
}

export default Settings;

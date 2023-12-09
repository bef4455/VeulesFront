import { useContext, useState } from "react";
import { motion } from "framer-motion";
import myApi from "../../../service/service";
import { Context } from "../../../context/Context";
import { useNavigate } from "react-router";
import axios from "axios";
import ReactQuill from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "react-quill/dist/quill.snow.css"; // Importez les styles

import "./write.css";

function Write({ fetchPosts }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const Navigate = useNavigate();

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "script",
    "sub",
    "super",
    "align",
    "direction",
    "code-block",
  ];

  const handleChange = (value) => {
    setDesc(value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.username) {
      return;
    }

    const newPost = {
      username: user.username,
      title,
      desc,
    };

    console.log("Request file:", file);

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      data.append("upload_preset", "jycc7iqt");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dmhbnekk4/image/upload",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        newPost.photo = response.data.public_id + "." + response.data.format;
        console.log("Image URL from Cloudinary:", newPost.photo);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    console.log("Request body:", newPost);

    try {
      const res = await myApi.createPost(newPost);
      fetchPosts();
      console.log("Created post response:", res.data);
      Navigate("/post/" + res.data._id);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="write"
    >
      {file && (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeToolbar">
          <div className="writeFormGroup">
            {/* Ajoutez l'icône d'appareil photo */}
          </div>
          <input
            type="text"
            placeholder="Ton Titre"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            placeholder="Raconte moi ton histoire..."
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="writeSubmit"
          type="submit"
        >
          Publier
        </motion.button>
        <label htmlFor="fileInput" className="writeIconLabel">
          <FontAwesomeIcon
            icon={faCamera}
            className="writeIcon"
            title="Ajouter une photo"
          />
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </label>
      </form>
    </motion.div>
  );
}

export default Write;

import { useContext, useState } from "react";
import "./write.css";
import myApi from "../../../service/service";
import { Context } from "../../../context/Context";
import { useNavigate } from "react-router";
import axios from "axios";

function Write({ fetchPosts }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  let { user } = useContext(Context);
  const Navigate = useNavigate();

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

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      data.append("upload_preset", "jycc7iqt");
      // newPost.photo = filename;

      try {
        // Utilisez axios pour effectuer l'appel API
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dmhbnekk4/image/upload",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Mettez à jour newPost.photo avec l'URL de Cloudinary
        newPost.photo = response.data.public_id + "." + response.data.format;
      } catch (error) {
        ///
      }
    }

    try {
      const res = await myApi.createPost(newPost);
      fetchPosts();
      Navigate("/post/" + res.data._id);
    } catch (error) {
      ///
    }
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Titre"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Raconte moi ton histoire..."
            type="text"
            className="writeInput whriteText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publier
        </button>
      </form>
    </div>
  );
}
export default Write;

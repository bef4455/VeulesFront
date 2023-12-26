// Importations existantes...
import React from "react";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { Link } from "react-router-dom";
import "./post.css";

function Post({ post }) {
  const cloudinaryBaseUrl =
    "https://res.cloudinary.com/dmhbnekk4/image/upload/";

  // Vérification pour voir si la propriété post.photo est définie
  const isCloudinaryUrl =
    post.photo && post.photo.startsWith(cloudinaryBaseUrl);

  const currentDate = new Date();
  const formattedDate = format(currentDate, "PPP", { locale: frLocale });

  return (
    <div className="post" key={post.id}>
      {post.photo && (
        <Link to={`/post/${post._id}`} className="link">
          {/* Ajout du lien autour de l'image */}
          <img
            className="postImg"
            src={isCloudinaryUrl ? post.photo : cloudinaryBaseUrl + post.photo}
            alt=""
          />
        </Link>
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat" key={c.id}>
              {c.name}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
      </div>
      <p className="postDesc" dangerouslySetInnerHTML={{ __html: post.desc }} />
      <span className="postDate">
        {format(new Date(post.createdAt), "PPP", { locale: frLocale })}
      </span>
    </div>
  );
}

export default Post;

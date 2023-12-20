import React, { useState } from "react";
import Post from "../post/Post";
import "./posts.css";

function Posts({ posts }) {
  const [showAllPosts, setShowAllPosts] = useState(false);

  const siteSuperTitle = "BIENVENUE SUR NOTRE BLOG FAMILIALE !";
  const siteTitle = "Une famille, un blog, des souvenirs pour la vie";
  const siteDescription =
    "Sam-Suphi est une maison familiale en Haute-Normandie, à Veules-les-Roses. La paisible Sam accueille une joyeuse ribambelle de passagers pour célébrer le bonheur. Écrivez, partagez des photos, découvrez les prévisions de marées et des recettes familiales.";
  const TitrePost = "LES DERNIERS POSTS";

  const toggleShowAllPosts = () => {
    setShowAllPosts(!showAllPosts);
  };

  return (
    <div className={`text ${showAllPosts ? "hide-header" : ""}`}>
      <div className="header-container">
        <h1 className="siteSuperTitle">{siteSuperTitle}</h1>
        <h2 className="siteTitle">{siteTitle}</h2>
      </div>
      <p className="siteDescription">{siteDescription}</p>
      <div className="posts-header">
        <h1 className="TitrePost">{TitrePost}</h1>
      </div>
      <div className="ico-btn-container">
        {posts.length > 3 && (
          <div
            className={`ico-btn ${showAllPosts ? "is-active" : ""}`}
            onClick={toggleShowAllPosts}
          >
            <span className="ico-btn__plus"></span>
          </div>
        )}
      </div>

      <div className="posts-container">
        <div className="posts">
          {posts.slice(0, showAllPosts ? posts.length : 3).map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;

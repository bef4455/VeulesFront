import { useState, useEffect, useRef } from "react";
import Post from "../post/Post";
import "./posts.css";
import scrollUpIcon from "/icons8-scroll-up-32.png?url";

function Posts({ posts }) {
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const addFadeInClass = () => {
      const elements = document.querySelectorAll(
        ".fade-in-delay1, .fade-in-delay2, .fade-in-delay3"
      );
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("fade-in");
        }, index * 1500);
      });
    };

    addFadeInClass();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollButton = document.querySelector(".scrollUpIcon");
      if (scrollButton) {
        const isScrolledToBottom =
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 20;
        setShowScrollButton(isScrolledToBottom && showAllPosts);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showAllPosts]);

  const siteSuperTitle = (
    <div className="siteSuperTitle fade-in-delay1">
      <span>BIENVENUE</span> SUR NOTRE BLOG FAMILIALE
    </div>
  );

  const siteTitle = (
    <h2 className="siteTitle fade-in-delay2">
      Une famille, un blog, des souvenirs pour la vie
    </h2>
  );

  const siteDescription = (
    <p className="siteDescription fade-in-delay3">
      Sam-Suphi est une maison familiale en Haute-Normandie, à Veules-les-Roses.
      La paisible Sam accueille une joyeuse ribambelle de passagers pour
      célébrer le bonheur. Écrivez, partagez des photos, découvrez les
      prévisions de marées et des recettes familiales.
    </p>
  );
  const TitrePost = "LES DERNIERS POSTS";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleShowAllPosts = () => {
    setShowAllPosts((prevShowAllPosts) => !prevShowAllPosts);

    setTimeout(() => {
      if (!showAllPosts) {
        scrollToBottom();
      }
    }, 0);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
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
        <div ref={bottomRef}></div>
        <img
          src={scrollUpIcon}
          alt="Scroll Up"
          className={`scrollUpIcon ${showScrollButton ? "" : "hidden"}`}
          onClick={toggleShowAllPosts}
        />
      </div>
    </div>
  );
}

export default Posts;

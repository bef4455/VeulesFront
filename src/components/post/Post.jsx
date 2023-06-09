import "./post.css";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { Link } from "react-router-dom";

function Post({ post }) {
  const PF = "https://veulesback.onrender.com/images/";
  const currentDate = new Date();
  const formattedDate = format(currentDate, "PPP", { locale: frLocale });

  return (
    <div className="post" key={post.id}>
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {format(new Date(post.createdAt), "PPP", { locale: frLocale })}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}

export default Post;

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./singlePost.css";
import myApi from "../../service/service";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Context from "../../context/Context";

function SinglePost({ fetchPosts }) {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const params = useParams();
  const PF = "https://veulesback.onrender.com/images/";
  let { user } = useContext(Context);
  const Navigate = useNavigate();

  const fetchPost = () => {
    myApi
      .getPost(params.postId)
      .then((res) => {
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      })
      .catch((e) => console.error(e));
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const handleDelete = async () => {
    if (post.username === user.username) {
      try {
        await myApi.deletePost(params.postId, user.username);
        fetchPosts();
        Navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedPost = await myApi.updatePost(
        params.postId,
        user.username,
        title,
        desc
      );
      if (updatedPost.status === 200) {
        fetchPosts();

        Navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(postId);

  // if (!post) {
  //   return <div className="loading">Loading...</div>;
  // }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Auteur:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {post.createdAt &&
              format(new Date(post.createdAt), "dd MMMM yyyy", {
                locale: fr,
              })}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Modifier
          </button>
        )}
      </div>
    </div>
  );
}

export default SinglePost;

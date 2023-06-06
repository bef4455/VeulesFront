import Post from "../post/Post";
import "./posts.css";

function Posts({ posts }) {
  // if (!posts) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;

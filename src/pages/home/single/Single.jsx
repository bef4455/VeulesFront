import "./single.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Singlepost from "../../../components/singlePost/SinglePost";

function Single({ fetchPosts }) {
  return (
    <div className="single">
      <Singlepost fetchPosts={fetchPosts} />
      <Sidebar />
    </div>
  );
}
export default Single;

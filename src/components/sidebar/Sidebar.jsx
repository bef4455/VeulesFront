import { useEffect, useState } from "react";
import "./sidebar.css";
import myApi from "../../service/service";
import { Link } from "react-router-dom";

function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await myApi.getCats();
        setCats(res.data);
      } catch (error) {
        console.error("erreur lors de la recup des posts :", error);
      }
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">A PROPOS DE NOUS</span>
        <img src="../../public/IMG_3880.jpeg" alt="" />
        <p>
          De Rouen et de Paris, Julien et Gisèle choisirent de se poser ici. La
          paisible Sam accueille, maintenant toute une joyeuse ribambelle de
          passagers, en famille ou avec des amis, afin d’ y célébrer le bonheur…
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link" key={c.id}>
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

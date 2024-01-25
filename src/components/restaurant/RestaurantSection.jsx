import "./RestaurantSection.css";
import RestaurantList from "./RestaurantList";
const RestaurantSection = () => {
  return (
    <div>
      <h2 className="centered-text">OU MANGER DANS LES ALENTOURS ?</h2>{" "}
      <RestaurantList />
    </div>
  );
};

export default RestaurantSection;

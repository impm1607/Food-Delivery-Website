import styles from "./exploreMenu.module.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <>
      <div className={styles.explore_menu} id="explore-menu">
        <h1>Explore Our Menu</h1>

        <p className={styles.explore_menu_text}>
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>

        <div className={styles.explore_menu_list}>
          {menu_list?.map((elm, index) => (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === elm.menu_name ? "All" : elm.menu_name
                )
              }
              key={index}
              className={styles.explore_menu_list_item}>
              <img
                className={category === elm.menu_name ? styles.active : ""}
                src={elm?.menu_image}
                alt={elm?.menu_name}
              />
              <p>{elm?.menu_name}</p>
            </div>
          ))}
        </div>

        <hr />
      </div>
    </>
  );
};

export default ExploreMenu;

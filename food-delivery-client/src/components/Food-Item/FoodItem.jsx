import { useContext } from "react";
import { assets } from "../../assets/assets";
import styles from "./foodItem.module.css";
import { StoreContext } from "../../context/storeContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { addToCart, removeFromCart, cartItem } = useContext(StoreContext);

  return (
    <>
      <div className={styles.food_item}>
        <div className={styles.food_item_img_container}>
          <img
            className={styles.food_item_img}
            src={import.meta.env.VITE_PORT + "/images/" + image}
            alt={name}
          />

          {!cartItem?.[id] ? (
            <img
              className={styles.add}
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt="add-icon"
            />
          ) : (
            <div className={styles.food_item_counter}>
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt="icon-red"
              />
              <p>{cartItem[id]}</p>
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt="icon-green"
              />
            </div>
          )}
        </div>

        <div className={styles.food_item_info}>
          <div className={styles.food_item_name_rating}>
            <p>{name}</p>

            <img src={assets.rating_starts} alt="ratings" />
          </div>

          <p className={styles.food_item_desc}>{description}</p>

          <p className={styles.food_item_price}>₹{price}</p>
        </div>
      </div>
    </>
  );
};

export default FoodItem;

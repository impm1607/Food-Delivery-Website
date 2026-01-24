import { Fragment, useContext } from "react";
import { StoreContext } from "../../context/storeContext";

import styles from "./foodDisplay.module.css";
import FoodItem from "../Food-Item/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <>
      <div className={styles.food_display} id="food-display">
        <h2>Top dishes near you</h2>

        <div className={styles.food_display_list}>
          {food_list?.map((elm, index) => {
            if (category === "All" || elm?.category === category)
              return (
                <Fragment key={index}>
                  <FoodItem
                    id={elm?._id}
                    name={elm?.name}
                    price={elm?.price}
                    description={elm?.description}
                    image={elm?.image}
                  />
                </Fragment>
              );
          })}
        </div>
      </div>
    </>
  );
};

export default FoodDisplay;

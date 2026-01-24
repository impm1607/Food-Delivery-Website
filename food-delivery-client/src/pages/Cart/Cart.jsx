import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/storeContext";
import { FiDelete } from "react-icons/fi";

import styles from "./cart.module.css";

const Cart = () => {
  const { cartItem, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.cart}>
        <div className={styles.cart_items}>
          <div className={styles.cart_items_title}>
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>

          <br />

          <hr />

          {food_list?.map((elm, index) => {
            if (cartItem[elm?._id] > 0) {
              return (
                <>
                  <div
                    className={`${styles.cart_items_title} ${styles.cart_items_item}`}>
                    <img
                      src={import.meta.env.VITE_PORT + "/images/" + elm?.image}
                      alt={elm?.name}
                    />
                    <p>{elm?.name}</p>
                    <p>₹{elm?.price}</p>
                    <p>{cartItem[elm?._id]}</p>
                    <p>₹{elm?.price * cartItem[elm?._id]}</p>
                    <FiDelete
                      onClick={() => removeFromCart(elm?._id)}
                      className={styles.cross}
                    />
                  </div>

                  <hr />
                </>
              );
            }
          })}
        </div>

        <div className={styles.cart_bottom}>
          <div className={styles.cart_total}>
            <h2>Cart Total</h2>

            <div>
              <div className={styles.cart_total_details}>
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>

              <hr />

              <div className={styles.cart_total_details}>
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
              </div>

              <hr />

              <div className={styles.cart_total_details}>
                <b>Total</b>
                <b>
                  ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}
                </b>
              </div>
            </div>

            <button onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT
            </button>
          </div>

          <div className={styles.cart_promo_code}>
            <div>
              <p>If you have a promo code, Enter it here</p>

              <div className={styles.cart_promo_code_input}>
                <input type="text" placeholder="promo code" />

                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

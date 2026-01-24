import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import styles from "./placeOrder.module.css";

const PlaceOrder = () => {
  const { getTotalCartAmount, food_list, cartItem, isUserLoggedIn } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];

    food_list?.map((elm) => {
      if (cartItem[elm?._id] > 0) {
        let itemInfo = elm;

        itemInfo["quantity"] = cartItem[elm?._id];

        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20,
    };

    try {
      setLoading(true);

      const res = await axios.post(
        import.meta.env.VITE_PORT + "/api/order/place",
        orderData
      );

      if (res.data.success) {
        const { session_url } = res.data;

        window.location.replace(session_url);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [isUserLoggedIn]);

  return (
    <>
      <form className={styles.place_order} onSubmit={placeOrder}>
        <div className={styles.place_order_left}>
          <p className={styles.title}>Delivery Information</p>

          <div className={styles.multi_fields}>
            <input
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              required
              type="text"
              placeholder="First Name"
            />
            <input
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              required
              type="text"
              placeholder="Last Name"
            />
          </div>

          <input
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            type="email"
            placeholder="Email Address"
          />
          <input
            name="street"
            value={data.street}
            onChange={handleChange}
            required
            type="text"
            placeholder="Street"
          />

          <div className={styles.multi_fields}>
            <input
              name="city"
              value={data.city}
              onChange={handleChange}
              required
              type="text"
              placeholder="City"
            />
            <input
              name="state"
              value={data.state}
              onChange={handleChange}
              required
              type="text"
              placeholder="State"
            />
          </div>

          <div className={styles.multi_fields}>
            <input
              name="zipCode"
              value={data.zipCode}
              onChange={handleChange}
              required
              type="text"
              placeholder="Zip Code"
            />

            <input
              name="country"
              value={data.country}
              onChange={handleChange}
              required
              type="text"
              placeholder="Country"
            />
          </div>

          <input
            name="phone"
            value={data.phone}
            onChange={handleChange}
            required
            type="text"
            placeholder="Phone"
          />
        </div>

        <div className={styles.place_order_right}>
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

            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "PROCEED TO PAYMENT"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;

import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { IoIosWarning } from "react-icons/io";
import { StoreContext } from "../../context/storeContext";
import { assets } from "../../assets/assets";

import styles from "./myOrders.module.css";

const MyOrders = () => {
  const { isUserLoggedIn } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_PORT + "/api/order/user-orders"
      );

      if (res.data.success) {
        setData(res.data.result);
      }
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      fetchOrders();
    }
  }, [isUserLoggedIn]);

  return (
    <>
      {loading && (
        <div className={styles.spin_container}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <div className={styles.my_orders}>
        <h2>My Orders</h2>

        {data?.length === 0 ? (
          <h2 className={styles.no_order}>
            <IoIosWarning />
            Please Place an order first, and come back to check its details!
            <NavLink to={"/"} className={styles.gobackBtn}>
              Back To Home
            </NavLink>
          </h2>
        ) : (
          <div className={styles.container}>
            {data?.map((elm, index) => (
              <div className={styles.my_orders_order} key={index}>
                <img src={assets.parcel_icon} alt="parcel-icon" />

                <p>
                  {elm?.items?.map((item, idx) => {
                    if (idx === elm?.items?.length - 1) {
                      return item?.name + " x " + item?.quantity;
                    } else {
                      return item?.name + " x " + item?.quantity + ", ";
                    }
                  })}
                </p>

                <p>₹{elm?.amount}.00</p>

                <p>Items: {elm?.items?.length}</p>

                <p>
                  <span>&#x25cf; </span>
                  <b>{elm?.status}</b>
                </p>

                <button
                  onClick={() => {
                    setLoading(true);
                    fetchOrders();
                  }}>
                  Track Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrders;

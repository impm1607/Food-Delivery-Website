import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

import styles from "./orders.module.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fectchAllOrders = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_PORT + "/api/order/list-orders"
      );

      if (res.data.success) {
        setOrders(res.data.result);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    fectchAllOrders();
  }, []);

  const updateStatus = async (e, orderId) => {
    try {
      setLoading(true);

      const res = await axios.patch(
        import.meta.env.VITE_PORT + "/api/order/update-status",
        { orderId, status: e.target.value }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        await fectchAllOrders();
      }
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`${styles.order} ${styles.add}`}>
        <h3>Order Page</h3>

        <div className={styles.order_list}>
          {orders?.map((elm, index) => (
            <div className={styles.order_item} key={index}>
              <img src={assets.parcel_icon} alt="parcel-icon" />

              <div>
                <p className={styles.order_item_food}>
                  {elm?.items?.map((item, idx) => {
                    if (idx === elm?.items?.length - 1) {
                      return item?.name + " x " + item?.quantity;
                    } else {
                      return item?.name + " x " + item?.quantity + ", ";
                    }
                  })}
                </p>

                <p className={styles.order_item_name}>
                  {elm?.address?.firstName + " " + elm?.address?.lastName}
                </p>

                <div className={styles.order_item_address}>
                  <p>{elm?.address?.street + ", "}</p>

                  <p>
                    {elm?.address?.city +
                      ", " +
                      elm?.address?.state +
                      ", " +
                      elm?.address?.country +
                      ", " +
                      elm?.address?.zipCode}
                  </p>
                </div>

                <p className={styles.order_item_phone}>{elm?.address?.phone}</p>
              </div>

              <p>Items: {elm?.items?.length}</p>

              <p>₹{elm?.amount}</p>

              <select
                onChange={(e) => updateStatus(e, elm?._id)}
                value={loading ? "Updating..." : elm.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
                {loading && <option hidden>Updating...</option>}
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Order;

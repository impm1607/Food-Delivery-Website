import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

import styles from "./list.module.css";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_PORT + "/api/food/list");

      if (res.data.success) {
        setList(res.data.result);
      } else {
        toast.warning(res.data.message);
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  const removeFood = async (id) => {
    try {
      const res = await axios.delete(
        import.meta.env.VITE_PORT + `/api/food/remove/${id}`
      );

      if (res.data.success) {
        await fetchList();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className={`${styles.list} ${styles.add} flex_col`}>
        <p>All Foods List</p>

        <div className={styles.list_table}>
          <div className={`${styles.list_table_format} ${styles.title}`}>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {list?.map((elm, index) => (
            <div key={index} className={styles.list_table_format}>
              <img
                src={import.meta.env.VITE_PORT + "/images/" + elm?.image}
                alt="food-images"
              />

              <p>{elm?.name}</p>

              <p>{elm?.category}</p>

              <p>₹{elm?.price}</p>

              <p>
                <RxCross2
                  className={styles.cursor}
                  onClick={() => removeFood(elm?._id)}
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;

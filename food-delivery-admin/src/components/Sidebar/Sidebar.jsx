import { IoIosAddCircleOutline, IoIosList } from "react-icons/io";
import { MdDeliveryDining } from "react-icons/md";
import { NavLink } from "react-router-dom";

import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.sidebar_options}>
          <NavLink
            to={"/add"}
            className={styles.sidebar_option}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#fff0ed" : "",
                borderColor: isActive ? "tomato" : "",
              };
            }}>
            <IoIosAddCircleOutline />

            <p>Add Items</p>
          </NavLink>

          <NavLink
            to={"/list"}
            className={styles.sidebar_option}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#fff0ed" : "",
                borderColor: isActive ? "tomato" : "",
              };
            }}>
            <IoIosList />

            <p>List Items</p>
          </NavLink>

          <NavLink
            to={"/orders"}
            className={styles.sidebar_option}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#fff0ed" : "",
                borderColor: isActive ? "tomato" : "",
              };
            }}>
            <MdDeliveryDining />

            <p>Orders</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

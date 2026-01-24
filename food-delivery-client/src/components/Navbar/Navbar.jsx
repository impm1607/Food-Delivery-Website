import { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { CiSearch } from "react-icons/ci";
import { FaBasketShopping } from "react-icons/fa6";
import { BsHandbag } from "react-icons/bs";
import { GiExitDoor } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/storeContext";
import { toast } from "react-toastify";
import axios from "axios";

import styles from "./navbar.module.css";

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();

  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount, isUserLoggedIn, checkLoginStatus } =
    useContext(StoreContext);

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_PORT + "/api/user/logout"
      );

      if (res.data.success) {
        checkLoginStatus();
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
    <div className={styles.navbar}>
      <NavLink to={"/"}>
        <img src={assets.logo} alt="logo-png" className={styles.logo} />
      </NavLink>

      <ul className={styles.navbar_menu}>
        <NavLink
          to={"/"}
          onClick={() => setMenu("home")}
          className={menu === "home" ? styles.active : ""}>
          home
        </NavLink>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? styles.active : ""}>
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? styles.active : ""}>
          mobile app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? styles.active : ""}>
          contact us
        </a>
      </ul>

      <div className={styles.navbar_right}>
        <CiSearch className={styles.search_icon} />

        <div className={styles.navbar_search_icon}>
          <NavLink to={"/cart"}>
            <FaBasketShopping className={styles.basket_icon} />
          </NavLink>
          <div className={getTotalCartAmount() === 0 ? "" : styles.dot}></div>
        </div>

        {!isUserLoggedIn ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className={styles.navbar_profile}>
            <img src={assets.profile_icon} alt="profile-icon" />
            <ul className={styles.nav_profile_dropdown}>
              <li onClick={() => navigate("/my-orders")}>
                <BsHandbag />
                <p>Orders</p>
              </li>

              <hr />

              <li onClick={handleLogout}>
                <GiExitDoor />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

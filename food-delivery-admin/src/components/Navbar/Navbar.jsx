import { assets } from "../../assets/assets";

import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <img src={assets.logo} alt="logo" className={styles.logo} />

        <img
          src={assets.profile_image}
          alt="profile"
          className={styles.profile}
        />
      </div>
    </>
  );
};

export default Navbar;

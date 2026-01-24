import { assets } from "../../assets/assets";
import { CiTwitter, CiFacebook, CiLinkedin } from "react-icons/ci";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <>
      <div className={styles.footer} id="footer">
        <div className={styles.footer_content}>
          <div className={styles.footer_content_left}>
            <img src={assets.logo} alt="footer-logo" />

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              tempora quam expedita cum dolorem eligendi quas! Repudiandae
              aliquid incidunt facere minus dolores sunt. Error, amet sequi. In
              corporis quis tenetur!
            </p>

            <div className={styles.footer_social_icons}>
              <CiFacebook />
              <CiTwitter />
              <CiLinkedin />
            </div>
          </div>

          <div className={styles.footer_content_center}>
            <h2>COMPANY</h2>

            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className={styles.footer_content_right}>
            <h2>GET IN TOUCH</h2>

            <ul>
              <li>+91 9988776655</li>
              <li>customer@tomato.in</li>
            </ul>
          </div>
        </div>

        <hr />

        <p className={styles.footer_copyright}>
          Copyright {new Date().getFullYear()} &copy; Tomato.in - All Rights
          Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;

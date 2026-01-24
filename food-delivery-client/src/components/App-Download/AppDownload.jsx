import { assets } from "../../assets/assets";
import styles from "./appDownload.module.css";

const AppDownload = () => {
  return (
    <>
      <div className={styles.app_download} id="app-download">
        <p>
          For Better Experience Download <br />
          Tomato App
        </p>

        <div className={styles.app_download_platforms}>
          <img src={assets.play_store} alt="playstore-download" />
          <img src={assets.app_store} alt="appstore-download" />
        </div>
      </div>
    </>
  );
};

export default AppDownload;

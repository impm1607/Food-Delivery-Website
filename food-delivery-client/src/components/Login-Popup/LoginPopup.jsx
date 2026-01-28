import { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "./loginpopup.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/storeContext";

const LoginPopup = ({ setShowLogin }) => {
  const { checkLoginStatus } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign Up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let newUrl = import.meta.env.VITE_PORT;

    if (currState === "Sign Up") {
      newUrl += "/api/user/register";
    } else {
      newUrl += "/api/user/login";
    }

    try {
      const res = await axios.post(newUrl, data);

      if (res.data.success) {
        toast.success(res.data.message);

        checkLoginStatus();

        setShowLogin(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className={styles.login_popup}>
        <form onSubmit={handleLogin} className={styles.login_popup_container}>
          <div className={styles.login_popuptitle}>
            <h2>{currState}</h2>

            <RxCross1 onClick={() => setShowLogin(false)} />
          </div>

          <div className={styles.login_popup_input}>
            {currState === "Sign Up" ? (
              <input
                name="name"
                value={data.name}
                onChange={handleChange}
                type="text"
                placeholder="Your name"
                required
              />
            ) : (
              <></>
            )}

            <input
              name="email"
              value={data.email}
              onChange={handleChange}
              type="email"
              placeholder="Your email"
              required
            />

            <input
              name="password"
              value={data.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <button type="submit">
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>

          <div className={styles.login_popup_condition}>
            <input type="checkbox" required />

            <p>By Continuing, I agree to the terms of use & privacy policy</p>
          </div>

          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopup;

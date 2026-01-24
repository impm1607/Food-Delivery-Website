import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import styles from "./verify.module.css";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifypayment = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_PORT + `/api/order/verify/${orderId}/${success}`
      );
      if (res.data.success) {
        navigate("/my-orders");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    verifypayment();
  }, []);

  return (
    <>
      <div className={styles.verify}>
        <div className={styles.spinner}></div>
      </div>
    </>
  );
};

export default Verify;

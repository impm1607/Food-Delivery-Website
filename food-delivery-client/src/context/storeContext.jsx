import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [food_list, setFood_list] = useState([]);

  const loadCartData = async () => {
    const res = await axios.get(import.meta.env.VITE_PORT + "/api/cart/get");

    if (res.data.success) {
      setCartItem(res.data.result);
    }
  };

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
    } else {
      setCartItem((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }

    // db update if token available
    if (isUserLoggedIn) {
      await axios.post(import.meta.env.VITE_PORT + "/api/cart/add", {
        itemId,
      });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if (isUserLoggedIn) {
      await axios.post(import.meta.env.VITE_PORT + "/api/cart/remove", {
        itemId,
      });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmt = 0;

    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product?._id === item);

        totalAmt += itemInfo?.price * cartItem[item];
      }
    }

    return totalAmt;
  };

  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_PORT + "/api/user/verify"
      );

      if (res.data.success === true) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    } catch (error) {
      toast.error("Server Error");
      setIsUserLoggedIn(false);
    }
  };

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_PORT + "/api/food/list");

      if (res.data.success) {
        setFood_list(res.data.result);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const contextValue = {
    food_list,
    addToCart,
    removeFromCart,
    cartItem,
    setCartItem,
    getTotalCartAmount,
    checkLoginStatus,
    isUserLoggedIn,
    fetchFoodList,
    loadCartData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

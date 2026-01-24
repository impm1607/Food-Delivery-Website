import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { StoreContext } from "./context/storeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/Place-Order/PlaceOrder";
import LoginPopup from "./components/Login-Popup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/My-Orders/MyOrders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const { checkLoginStatus, fetchFoodList, loadCartData, isUserLoggedIn } =
    useContext(StoreContext);

  useEffect(() => {
    const loadData = async () => {
      await checkLoginStatus();
      await fetchFoodList();
    };

    loadData();
  }, []);

  useEffect(() => {
    loadCartData();
  }, [isUserLoggedIn]);

  return (
    <>
      <ToastContainer />

      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;

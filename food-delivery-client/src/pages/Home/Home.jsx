import { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/Explore-Menu/ExploreMenu";
import FoodDisplay from "../../components/Food-Display/FoodDisplay";
import AppDownload from "../../components/App-Download/AppDownload";

import styles from "./home.module.css";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <Header />

      <ExploreMenu category={category} setCategory={setCategory} />

      <FoodDisplay category={category} />

      <AppDownload />
    </>
  );
};

export default Home;

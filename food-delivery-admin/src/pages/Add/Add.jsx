import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

import styles from "./add.module.css";

const Add = () => {
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);

    if (image !== false) {
      formData.append("image", image);
    } else {
      return toast.info("Add an image first");
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_PORT + "/api/food/add",
        formData
      );

      if (res.data.success === true) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });

        setImage(false);

        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("server error");
    }
  };

  return (
    <>
      <div className={styles.add}>
        <form className="flex_col" onSubmit={handleSubmit}>
          <div className={`${styles.add_img_upload} flex_col`}>
            <p>Upload Image</p>

            <label htmlFor="image">
              <img
                src={
                  image !== false
                    ? URL?.createObjectURL(image)
                    : assets.upload_area
                }
                alt="upload-area"
              />
            </label>

            <input
              type="file"
              id="image"
              onChange={(e) => {
                setImage(e.target.files[0]);
                e.target.value = "";
              }}
              hidden
            />
          </div>

          <div className={`${styles.add_product_name} flex_col`}>
            <p>Product Name</p>

            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Type Here"
            />
          </div>

          <div className={`${styles.add_product_description} flex_col`}>
            <p>Product description</p>

            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              rows={6}
              required
              placeholder="Write Content Here"
            />
          </div>

          <div className={styles.add_category_price}>
            <div className={`${styles.add_category} flex_col`}>
              <p>Product Category</p>

              <select
                name="category"
                value={data.category}
                onChange={handleChange}>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Desert">Desert</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>

            <div className={`${styles.add_price} flex_col`}>
              <p>Product Price</p>

              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                placeholder="₹20"
              />
            </div>
          </div>

          <button type="submit" className={styles.add_btn}>
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default Add;

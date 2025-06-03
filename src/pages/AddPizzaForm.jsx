import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../redux/slices/pizzaSlice";
import styles from "./AddPizzaForm.module.scss";

const AddPizzaForm = () => {
  const dispatch = useDispatch();
  const pizzas = useSelector((state) => state.pizza.items);

  const [pizzaData, setPizzaData] = useState({
    imageUrl: "",
    title: "",
    ingredients: "",
    types: "",
    sizes: "",
    price: "",
    category: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPizzaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newId =
      pizzas.length > 0 ? Math.max(...pizzas.map((pizza) => pizza.id)) + 1 : 1;

    const newPizza = {
      id: newId,
      ...pizzaData,
      types: pizzaData.types
        .split(",")
        .map((type) => parseInt(type.trim(), 10)),
      sizes: pizzaData.sizes
        .split(",")
        .map((size) => parseInt(size.trim(), 10)),
      price: parseFloat(pizzaData.price),
      category: parseInt(pizzaData.category, 10),
      rating: parseInt(pizzaData.rating, 10),
    };

    dispatch(addPizza(newPizza));
    console.log("Pizza added:", newPizza);

    setPizzaData({
      imageUrl: "",
      title: "",
      ingredients: "",
      types: "",
      sizes: "",
      price: "",
      category: "",
      rating: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addPizzaForm}>
      <h2>Add a New Pizza</h2>

      <div className={styles.formGroup}>
        <label htmlFor="imageUrl">Image of pizza:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          placeholder="Enter image URL"
          value={pizzaData.imageUrl}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="title">Pizza name:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={pizzaData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="ingredients">Ingredients:</label>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          value={pizzaData.ingredients}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="types">Types:</label>
        <input
          type="text"
          id="types"
          name="types"
          placeholder="0 - thin, 1 - traditional"
          value={pizzaData.types}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="sizes">Sizes:</label>
        <input
          type="text"
          id="sizes"
          name="sizes"
          placeholder="25 / 30 / 40 cm"
          value={pizzaData.sizes}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={pizzaData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category">Category:</label>
        <input
          type="number"
          id="category"
          name="category"
          placeholder="1 - new, 2 - meat, 3 - vegetarian, 4 - grill, 5 - sweet"
          value={pizzaData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="rating">Rating (1-10):</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={pizzaData.rating}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="button button--add">
        Add Pizza
      </button>
    </form>
  );
};

export default AddPizzaForm;

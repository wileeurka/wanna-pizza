import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    ingredients: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6740d3b7d0b59228b7f17c47.mockapi.io/pizzas/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Error - can't fetch pizza");
        navigate("/home");
      }
    }
    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <>Loaging...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <p>{pizza.ingredients}</p>
      <h4>{pizza.price} $</h4>
    </div>
  );
};

export default FullPizza;

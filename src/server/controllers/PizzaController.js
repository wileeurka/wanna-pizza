const Pizza = require("../models/Pizza");

class PizzaController {
  async addPizza(req, res) {
    try {
      const { name, ingredients, imageUrl, price } = req.body;
      const newPizza = await Pizza.create({
        name,
        ingredients,
        imageUrl,
        price,
      });
      return res.status(201).json(newPizza);
    } catch (error) {
      console.error("Error adding pizza:", error);
      res.status(500).json({ message: "Failed to add pizza" });
    }
  }

  async getPizzas(req, res) {
    try {
      const pizzas = await Pizza.find();
      return res.status(200).json(pizzas);
    } catch (error) {
      console.error("Error fetching pizzas:", error);
      res.status(500).json({ message: "Failed to fetch pizzas" });
    }
  }
}

module.exports = new PizzaController();

const express = require("express");
const PizzaController = require("../controllers/PizzaController");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  body("name").notEmpty().withMessage("Name is required"),
  body("ingredients").notEmpty().withMessage("Ingredients are required"),
  body("imageUrl").isURL().withMessage("Image URL must be valid"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  PizzaController.addPizza
);

router.get("/", PizzaController.getPizzas);

module.exports = router;

import React from "react";
import emptyCart from "./../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Cart is empty</h2>
        <p>
          Most likely, you haven't ordered pizza yet.
          <br />
          To order pizza, go to the main page.
        </p>
        <img src={emptyCart} alt="Empty cart" />
        <Link to="/home" className="button button--black">
          <span>Go back</span>
        </Link>
      </div>
    </>
  );
};
export default CartEmpty;

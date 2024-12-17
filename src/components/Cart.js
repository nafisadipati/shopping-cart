import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity } from "../redux/cartSlice";

const Cart = () => {

  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  return (
    <div className="container cart">
      <div className="cart-items">
        <h1>Shopping Cart</h1>
        {cartItems.map((item) => (
        <div key={item.id}  className="cart-item">
          <img src="https://via.placeholder.com/64" alt="Product" />
          <p>{item.name}</p>
          <p>€ {item.price.toFixed(2)}</p>
          <button onClick={() => handleDecrease(item)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleIncrease(item)}>+</button>
        </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Summary</h2>
        <p>Items: {cartItems.length}</p>
        <h3>Total: € {(totalPrice + 5).toFixed(2)}</h3>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;

import { useContext, useState } from "react";
import { ShopContext } from "../context/shop-context";

function ShoppingCart() {
  const { items, carItems, minus, plus, removeFromCar, handleInput, total } =
    useContext(ShopContext);

  const carTotal = total();

  return (
    <div className="cart">
      {items.length === 0 ? (
        <p className="empty">Your shopping cart is empty</p>
      ) : (
        <div className="items">
          {items.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <p>Price: {`$${item.price}`}</p>
              <button onClick={() => removeFromCar(item)}>Remove</button>
              <div className="add-to-car">
                <img
                  className="minus-plus"
                  src="./src/assets/minus.svg"
                  alt="minus"
                  onClick={() => minus(item.id)}
                />
                <input
                  type="text"
                  id="amount"
                  value={carItems[item.id]}
                  onChange={(e) => handleInput(Number(e.target.value), item.id)}
                />
                <img
                  className="minus-plus"
                  src="./src/assets/plus.svg"
                  alt="plus"
                  onClick={() => plus(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="total">Total: {carTotal}</div>
    </div>
  );
}
export default ShoppingCart;

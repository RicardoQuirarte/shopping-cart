import { useContext } from "react";
import { ShopContext } from "../context/shop-context";

function Cart() {
  const {
    items,
    amountCart,
    removeFromCar,
    totalPrice,
    plusCart,
    minusCart,
    handleInputCart,
  } = useContext(ShopContext);

  const total = totalPrice();

  return (
    <div className="cart">
      {items.length === 0 ? (
        <p className="empty">Your shopping cart is empty</p>
      ) : (
        <div className="items">
          {items.map((item) => (
            <div className="card-cart" key={item.id}>
              <img src={item.image} alt={item.title} />
              <p>Price: {`$${item.price}`}</p>
              <button onClick={() => removeFromCar(item)}>Remove</button>
              <div className="add-to-car">
                <p className="minus-plus" onClick={() => minusCart(item.id)}>
                  -
                </p>
                <input
                  type="text"
                  value={amountCart[item.id]}
                  onChange={(e) =>
                    handleInputCart(Number(e.target.value), item.id)
                  }
                />
                <p className="minus-plus" onClick={() => plusCart(item.id)}>
                  +
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="total">Total: {total}</div>
    </div>
  );
}
export default Cart;

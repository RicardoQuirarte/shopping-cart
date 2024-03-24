import { useContext } from "react";
import { ShopContext } from "../context/shop-context";

function ShoppingCart() {
  const { items, carItems, minus, plus, addToCar, handleInput } =
    useContext(ShopContext);

  return (
    <>
      <div className="items">
        {items.map((item) => (
          <div className="card" key={item.id}>
            <p className="title">{item.title}</p>
            <img src={item.image} alt={item.title} />
            <p>Price: {`$${item.price}`}</p>
            <p className="description">{item.description}</p>
            <button onClick={() => addToCar(item)}>Add to car</button>
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
                onChange={() => handleInput(item.id, e)}
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
    </>
  );
}
export default ShoppingCart;

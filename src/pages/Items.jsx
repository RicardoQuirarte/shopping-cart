import { useContext } from "react";
import { ShopContext } from "../context/shop-context";

function Items() {
  const { data, loading, minus, plus, handleInput, addToCar, carItems } =
    useContext(ShopContext);

  return (
    <div className="shop">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="items">
          {data.map((item) => (
            <div className="card" key={item.id}>
              <p>{item.title}</p>
              <img src={item.image} alt={item.title} />
              <p>Price: {`$${item.price}`}</p>
              <button onClick={() => addToCar(item)}>Add to car</button>
              <div className="add-to-car">
                <p className="minus-plus" onClick={() => minus(item.id)}>
                  -
                </p>
                <input
                  type="text"
                  value={carItems[item.id]}
                  onChange={(e) => handleInput(Number(e.target.value), item.id)}
                />
                <p className="minus-plus" onClick={() => plus(item.id)}>
                  +
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Items;

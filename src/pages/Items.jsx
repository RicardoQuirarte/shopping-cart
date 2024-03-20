import { useState, useEffect } from "react";
import "/src/App.css";
import NavBar from "../components/NavBar";

function Items() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [car, setCar] = useState(0);
  const [carItems, setCarItems] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=10`
      );
      const products = await response.json();
      setData(products);

      const defaultCart = () => {
        let cart = {};
        for (let i = 1; i < products.length + 1; i++) {
          cart[i] = 0;
        }
        return cart;
      };
      setCarItems(defaultCart());

      setLoading(false);
    };
    getProducts();
  }, []);

  function minus(id) {
    if (carItems[id] <= 0) return;
    setCarItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  }

  function plus(id) {
    setCarItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    console.log(carItems);
  }

  function handleInput(id, e) {
    // const newValue = [...quantity];
    // newValue[index] = Number(e.target.value);
    // setQuantity(newValue);

    // setQuantity(Number(e.target.value));

    setCarItems((prev) => ({ ...prev, [id]: (prev[id] = e.target.value) }));
  }

  function addToCar() {
    setCar(Object.values(carItems).reduce((a, b) => a + b, 0));
  }

  return (
    <>
      <NavBar addToCar={car} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="items">
          {data.map((item) => (
            <div className="card" key={item.id}>
              <p className="title">{item.title}</p>
              <img src={item.image} alt={item.title} />
              <p>Price: {`$${item.price}`}</p>
              <p className="description">{item.description}</p>
              <button onClick={addToCar}>Add to car</button>
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
      )}
    </>
  );
}

export default Items;

// useEffect(() => {
//   fetch("https://fakestoreapi.com/products", { mode: "cors" })
//     .then((response) => {
//       if (response.status >= 400) {
//         throw new Error("server error");
//       }
//       return response.json();
//     })
//     .then((response) => setLoading(response))
//     .catch((error) => setError(error))
//     .finally(() => setLoading(false));
//   console.log(data);
// }, []);

// if (error) return <p>A network error was encountered</p>;

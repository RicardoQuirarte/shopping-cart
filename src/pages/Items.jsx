import { useState, useEffect } from "react";
import "/src/App.css";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { createContext } from "react";

export const cartContext = createContext();

function Items() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState([]);
  const [car, setCar] = useState(0);
  const [carItems, setCarItems] = useState();

  console.log(carItems);

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

      setQuantity(
        products.map((elem) => ({
          id: elem.id,
          quantity: 0,
        }))
      );
      setLoading(false);
    };
    getProducts();
  }, []);

  function minus(id) {
    if (Object.values(quantity).indexOf(id) < 0) return;

    const newQuantity = Object.values(quantity).indexOf(id) - 1;

    // const newObject = { ...quantity, {id: id, quantity - 1}}

    const updatedQuantity = { id: quantity };
    setQuantity(newQuantity);
  }

  function plus(id) {
    // const newQuantity = quantity + 1;
    // setQuantity(newQuantity);

    setCarItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    console.log(carItems);
  }

  function handleInput(e, index) {
    const newValue = [...quantity];
    newValue[index] = Number(e.target.value);
    setQuantity(newValue);

    // setQuantity(Number(e.target.value));
  }

  function addToCar(item) {
    // const newCar = car + quantity;
    // setCar(newCar);

    const shopItems = [];
    shopItems.push(item);
    setCarItems(shopItems);
  }

  return (
    <>
      <NavBar addToCar={car} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="items">
          {data.map((item, index) => (
            <div className="card" key={item.id}>
              <p className="title">{item.title}</p>
              <img src={item.image} alt={item.title} />
              <p>Price: {`$${item.price}`}</p>
              <p className="description">{item.description}</p>
              <Link to={{ pathname: "/shopppingCart", state: item }}>
                Add to car2
              </Link>
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
                  value={5}
                  onChange={() => handleInput(index)}
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

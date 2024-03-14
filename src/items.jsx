import { useState, useEffect } from "react";
import "/src/items.css";
import NavBar from "./NavBar";

function Items() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState([]);
  const [car, setCar] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=10`
      );
      const products = await response.json();
      setData(products);
      setLoading(false);
    };
    getProducts();
  }, []);

  function minus(id) {
    // if (quantity < 1) return;
    const newQuantity = quantity - 1;

    const updatedQuantity = { id: quantity };
    setQuantity(newQuantity);
  }

  function plus() {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  }

  function handleInput(e, index) {
    const newValue = [...quantity];
    newValue[index] = Number(e.target.value);
    setQuantity(newValue);

    // setQuantity(Number(e.target.value));
  }

  function addToCar() {
    const newCar = car + quantity;
    setCar(newCar);
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
                  value={1}
                  onChange={() => handleInput(index)}
                />
                <img
                  className="minus-plus"
                  src="./src/assets/plus.svg"
                  alt="plus"
                  onClick={plus}
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

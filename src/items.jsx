import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "/src/items.css";
import NavBar from "./NavBar";

function Items() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    console.log(data);
  }, []);

  return (
    <>
      <NavBar />
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
              <p>Category: {item.category}</p>
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

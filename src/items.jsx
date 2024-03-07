import { useState, useEffect } from "react";
import "/src/items.css";

function Items() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const products = await response.json();
      setData(products);
      setLoading(false);
    };
    getProducts();
    console.log(data);
  }, []);

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

  if (loading) return <p>Loading...</p>;

  return (
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
  );
}

export default Items;

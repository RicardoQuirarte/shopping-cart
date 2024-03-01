import { useState, useEffect } from "react";
import "/src/items.css";

function Items() {
  const [data, setData] = useState("hellooooooo");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  console.log(data);

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

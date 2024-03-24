import { useState, useEffect, createContext } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carItems, setCarItems] = useState();
  const [car, setCar] = useState(0);
  const [items, setItems] = useState([]);

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

  function addToCar(item) {
    setCar(Object.values(carItems).reduce((a, b) => a + b, 0));
    setItems((items) => [...items, item]);
    console.log(items);
  }

  const contextValue = {
    data,
    loading,
    carItems,
    car,
    items,
    minus,
    plus,
    handleInput,
    addToCar,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

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

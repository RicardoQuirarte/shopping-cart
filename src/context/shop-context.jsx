import { useState, useEffect, createContext } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carItems, setCarItems] = useState();
  const [car, setCar] = useState(0);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState();

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
      setAmount(defaultCart());
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
  }

  function handleInput(newValue, id) {
    setCarItems((prev) => ({ ...prev, [id]: newValue }));
  }

  function minusCart(id) {
    if (amount[id] <= 0) return;
    setAmount((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  }

  function plusCart(id) {
    setAmount((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  }

  function handleInputCart(newValue, id) {
    setAmount((prev) => ({ ...prev, [id]: newValue }));
  }

  function addToCar(item) {
    setCar(car + carItems[item.id]);
    setAmount((prev) => ({
      ...prev,
      [item.id]: prev[item.id] + carItems[item.id],
    }));
    if (carItems[item.id] > 0 && !items.includes(item)) {
      setItems((items) => [...items, item]);
    }
  }

  function removeFromCar(item) {
    setCar(car - amount[item.id]);
    setItems(items.filter((i) => i.id !== item.id));
    setAmount((prev) => ({ ...prev, [item.id]: 0 }));
  }

  function total() {
    let total = 0;
    for (const item in amount) {
      if (amount[item] > 0) {
        let itemInfo = data.find((product) => product.id === Number(item));
        total += amount[item] * itemInfo.price;
      }
    }
    return total.toFixed(2);
  }

  const contextValue = {
    data,
    loading,
    carItems,
    car,
    items,
    amount,
    minus,
    plus,
    handleInput,
    addToCar,
    removeFromCar,
    total,
    minusCart,
    plusCart,
    handleInputCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

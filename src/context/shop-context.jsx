import { useState, useEffect, createContext } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amountShop, setAmountShop] = useState();
  const [amountCart, setAmountCart] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`https://fakestoreapi.com/products?`);
      const products = await response.json();
      setData(products);
      const defaultCart = () => {
        let cart = {};
        for (let i = 1; i < products.length + 1; i++) {
          cart[i] = 0;
        }
        return cart;
      };
      setAmountShop(defaultCart());
      setAmountCart(defaultCart());
      setLoading(false);
    };
    getProducts();
  }, []);

  function minus(id) {
    if (amountShop[id] <= 0) return;
    setAmountShop((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  }

  function plus(id) {
    setAmountShop((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  }

  function handleInput(newValue, id) {
    setAmountShop((prev) => ({ ...prev, [id]: newValue }));
  }

  function minusCart(id) {
    if (amountCart[id] <= 0) return;
    setAmountCart((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  }

  function plusCart(id) {
    setAmountCart((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  }

  function handleInputCart(newValue, id) {
    setAmountCart((prev) => ({ ...prev, [id]: newValue }));
  }

  function addToCar(item) {
    setAmountCart((prev) => ({
      ...prev,
      [item.id]: prev[item.id] + amountShop[item.id],
    }));
    if (amountShop[item.id] > 0 && !items.includes(item)) {
      setItems((items) => [...items, item]);
    }
  }

  function removeFromCar(item) {
    setItems(items.filter((i) => i.id !== item.id));
    setAmountCart((prev) => ({ ...prev, [item.id]: 0 }));
  }

  function totalPrice() {
    let total = 0;
    for (const item in amountCart) {
      if (amountCart[item] > 0) {
        let itemInfo = items.find((product) => product.id === Number(item));
        total += amountCart[item] * itemInfo.price;
      }
    }
    return total.toFixed(2);
  }

  function totalCar() {
    let total = 0;
    for (const item in amountCart) {
      if (amountCart[item] > 0) {
        total += amountCart[item];
      }
    }
    return total;
  }

  const contextValue = {
    data,
    loading,
    amountShop,
    items,
    amountCart,
    minus,
    plus,
    handleInput,
    addToCar,
    removeFromCar,
    totalPrice,
    minusCart,
    plusCart,
    handleInputCart,
    totalCar,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

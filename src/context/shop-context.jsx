import { createContext } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [carItems, setCarItems] = useState();

  return <ShopContext.Provider>{props.children}</ShopContext.Provider>;
};

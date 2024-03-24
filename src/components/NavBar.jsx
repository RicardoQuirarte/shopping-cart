import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/shop-context";

function NavBar() {
  const { car } = useContext(ShopContext);

  return (
    <>
      <nav>
        <p>Future Store</p>
        <Link to="/">Home</Link>
        <Link to="/items">Shop</Link>
        <Link to="/shopppingCart">Cart: {car}</Link>
      </nav>
    </>
  );
}
export default NavBar;

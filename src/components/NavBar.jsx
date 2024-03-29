import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/shop-context";

function NavBar() {
  const { totalCar } = useContext(ShopContext);

  const total = totalCar();

  return (
    <>
      <nav>
        <p>Future Store</p>
        <Link to="/">Home</Link>
        <Link to="/items">Shop</Link>
        <Link to="/shopppingCart">Cart: {total}</Link>
      </nav>
    </>
  );
}
export default NavBar;

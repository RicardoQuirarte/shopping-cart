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
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart: {total}</Link>
      </nav>
    </>
  );
}
export default NavBar;

import "/src/navBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav>
        <p>Future Store</p>
        <Link to="/">Home</Link>
        <Link to="items">Shop</Link>
        <Link to="shopppingCart">Cart: 0</Link>
      </nav>
    </>
  );
}
export default NavBar;

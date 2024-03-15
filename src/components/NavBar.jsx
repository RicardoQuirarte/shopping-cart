import "/src/App.css";
import { Link } from "react-router-dom";

function NavBar({ addToCar }) {
  return (
    <>
      <nav>
        <p>Future Store</p>
        <Link to="/">Home</Link>
        <Link to="/items">Shop</Link>
        <Link to="/shopppingCart">Cart: {addToCar}</Link>
      </nav>
    </>
  );
}
export default NavBar;

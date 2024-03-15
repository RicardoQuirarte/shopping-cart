import NavBar from "../components/NavBar";
import { useContext } from "react";

function ShoppingCart(props) {
  // const { state } = props.location;
  // const { img, description } = state;
  return (
    <>
      <NavBar />
      <p>{props.title}</p>
      <div>What</div>
      <img src={props.img} alt={props.description} />
    </>
  );
}
export default ShoppingCart;

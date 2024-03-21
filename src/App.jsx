import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Items from "./pages/Items";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/shopppingCart" element={<ShoppingCart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

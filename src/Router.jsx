import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Items from "./Items.jsx";
import Home from "./Home.jsx";
import ErrorPage from "./ErrorPage.jsx";
import ShoppingCart from "./ShoppingCart.jsx";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "items",
      element: <Items />,
    },
    {
      path: "shopppingCart",
      element: <ShoppingCart />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

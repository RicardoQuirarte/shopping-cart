import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Items from "../pages/Items.jsx";
import Home from "../pages/Home.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import ShoppingCart from "../pages/ShoppingCart.jsx";

const Routerr = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/items",
      element: <Items />,
    },
    {
      path: "/shopppingCart",
      element: <ShoppingCart />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routerr;

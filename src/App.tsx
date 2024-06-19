import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ShoppingListProvider } from "./context/ShoppingCart";
import Home from "./app/views/Home";
import ShoppingCart from "./app/views/ShoppingCart";
import Layout from "./app/components/Layout";
import Login from "./app/views/Login";
import Register from "./app/views/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/shopping-cart", element: <ShoppingCart /> },
    ],
  },
]);

const App = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 text-slate-950">
      <ShoppingListProvider>
        <RouterProvider router={router}></RouterProvider>
      </ShoppingListProvider>
    </div>
  );
};

export default App;

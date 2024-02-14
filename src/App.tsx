import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./app/components/Header";
import Home from "./app/views/Home";
import { ShoppingListProvider } from "./context/ShoppingCart";
import ShoppingCart from "./app/views/ShoppingCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: "/shopping-cart",
    element: (
      <>
        <Header />
        <ShoppingCart />
      </>
    ),
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

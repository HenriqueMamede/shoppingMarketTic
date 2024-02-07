import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./app/components/Header";
import Home from "./app/views/Home";

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
]);

const App = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 text-slate-950">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;

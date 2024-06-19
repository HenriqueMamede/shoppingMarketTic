import { Outlet } from "react-router-dom";
import Header from "./Header";
import Loader from "./Loader";
import { Suspense } from "react";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="h-5/6 w-full">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}

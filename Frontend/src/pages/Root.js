import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function RootLayout() {
  return (
    <>
      {/* <Navbar /> */}
      {/* Marked where child routes should be rendered in */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

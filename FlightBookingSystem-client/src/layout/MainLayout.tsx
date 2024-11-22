import { Outlet, ScrollRestoration } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;

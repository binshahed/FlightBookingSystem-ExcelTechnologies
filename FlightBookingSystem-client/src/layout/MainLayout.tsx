import { Outlet, ScrollRestoration } from "react-router-dom";
import NavBar from "../components/common/NavBar";

const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;

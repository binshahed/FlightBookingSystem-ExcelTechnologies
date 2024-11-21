import { Outlet, useNavigate } from "react-router-dom";
import { SidebarMenu } from "./Sidebar";
import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { TiThMenu } from "react-icons/ti";
import { useAppSelector } from "../../store/hooks";
import { useCurrentUser } from "../../store/features/auth/authSlice";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);

  // Redirect if the user is not an admin
  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <SidebarMenu isOpen={isOpen} setIsOpen={setIsOpen} />

      <div>
        {/* Top bar */}
        <div className="bg-gray-50 py-3">
          <div className="container">
            <Button className="md:ml-10" onClick={() => setIsOpen(!isOpen)}>
              <TiThMenu />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="container">
          <div className="md:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

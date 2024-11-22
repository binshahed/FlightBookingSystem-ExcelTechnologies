import { Link, Outlet, useNavigate } from "react-router-dom";
import { SidebarMenu } from "./Sidebar";
import { useState, useEffect } from "react";
import { Avatar, Button, Dropdown } from "flowbite-react";
import { TiThMenu } from "react-icons/ti";
import { useAppSelector } from "../../store/hooks";
import { logout, useCurrentUser } from "../../store/features/auth/authSlice";
import { useDispatch } from "react-redux";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

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
          <div className="container flex justify-between">
            <Button className="md:ml-10" onClick={() => setIsOpen(!isOpen)}>
              <TiThMenu />
            </Button>

            {user?.email && (
              <div className="flex">
                <Link to="/" className="mt-2 mr-4 text-primary">
                  Back To Home
                </Link>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar
                      alt="User settings"
                      img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      rounded
                      className="cursor-pointer"
                    />
                  }
                >
                  <Dropdown.Header>
                    <Link to="/profile">
                      <span className="block text-sm font-medium">
                        {user?.name || "User Name"}
                      </span>
                      <span className="block truncate text-sm text-gray-500">
                        {user?.email}
                      </span>
                    </Link>
                  </Dropdown.Header>
                  {user.email && user?.role === "admin" && (
                    <Dropdown.Item>
                      <Link to="/dashboard">Dashboard</Link>
                    </Dropdown.Item>
                  )}

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                </Dropdown>{" "}
              </div>
            )}
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

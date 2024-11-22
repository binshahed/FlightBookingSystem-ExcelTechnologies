import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import logo from "../../assets/travel-logo.png";
import { useAppSelector } from "../../store/hooks";
import { logout, useCurrentUser } from "../../store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar fluid rounded className="container mx-auto">
      {/* Brand Section */}
      <Navbar.Brand>
        <Link to="/">
          <img src={logo} className="mr-3 h-9 md:h-14" alt="Travel Logo" />
        </Link>
      </Navbar.Brand>

      {/* Mobile Menu Toggle */}
      <Navbar.Toggle />

      {/* Collapsible Section */}
      <Navbar.Collapse className="md:justify-center">
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row md:space-x-8 md:items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold border-b-2 border-primary"
                : "hover:text-primary transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold border-b-2 border-primary"
                : "hover:text-primary transition"
            }
          >
            Search
          </NavLink>
        </div>

        {/* User Account Section */}
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:ml-auto">
          {user?.email ? (
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
            </Dropdown>
          ) : (
            <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-5 md:flex-row md:items-center">
              <Link to="/login">
                <Button className="bg-primary w-full md:w-auto">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary w-full md:w-auto">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

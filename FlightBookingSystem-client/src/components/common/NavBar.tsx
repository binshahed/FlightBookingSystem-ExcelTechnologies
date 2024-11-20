import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import logo from "../../assets/travel-logo.png";
import { useAppSelector } from "../../store/hooks";
import { logout, useCurrentUser } from "../../store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function NavBar() {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar fluid rounded className="container">
      <Navbar.Brand>
        <Link to="/">
          <img
            src={logo}
            className="mr-3 h-9 md:h-14 "
            alt="Flowbite React Logo"
          />
        </Link>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user?.email ? (
          <div>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        ) : (
          <>
          <Link to="/login">
            <Button className="bg-primary">Login</Button>
          </Link>
          <Link to="/register" className="md:ml-5">
            <Button className="bg-primary">Register</Button>
          </Link>
          </>
        )}
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

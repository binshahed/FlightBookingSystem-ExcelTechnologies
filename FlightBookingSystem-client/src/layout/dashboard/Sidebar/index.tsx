/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer, Sidebar } from "flowbite-react";
import { HiChartPie } from "react-icons/hi";
import logo from "../../../assets/travel-logo.png";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";

export function SidebarMenu({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  const handleClose = () => setIsOpen(false);

  const location = useLocation(); // Hook to get the current URL path
  const currentPath = location.pathname;

  return (
    <>
      <Drawer
        backdrop={false}
        open={isOpen}
        onClose={handleClose}
        className="bg-gray-50 max-w-sm"
      >
        <Drawer.Header titleIcon={() => <></>} />
        <Link to="/dashboard" className="">
          <img src={logo} alt="" className="h-16 mt-[-35px]" />
        </Link>
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    {/* Dashboard */}
                    <Link to="/dashboard">
                      <Sidebar.Item
                        icon={HiChartPie}
                        className={`${
                          currentPath === "/dashboard"
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        Dashboard
                      </Sidebar.Item>
                    </Link>

                    {/* Flights */}
                    <Link to="/dashboard/flights">
                      <Sidebar.Item
                        icon={MdOutlineFlightTakeoff}
                        className={`${
                          currentPath === "/dashboard/flights"
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        Flights
                      </Sidebar.Item>
                    </Link>

                    {/* Bookings */}
                    <Link to="/dashboard/bookings">
                      <Sidebar.Item
                        icon={FaBookmark}
                        className={`${
                          currentPath === "/dashboard/bookings"
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        Bookings
                      </Sidebar.Item>
                    </Link>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
}

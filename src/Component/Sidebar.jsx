import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaDownload,
  FaBell,
  FaCalendarAlt,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Track sidebar visibility on mobile
  const sidebarRef = useRef();

  const navItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, route: "/dashboard" },
    { name: "View All", icon: <FaUsers />, route: "/view-all" },
    { name: "Add User", icon: <FaUserPlus />, route: "/add-user" },
    { name: "Download", icon: <FaDownload />, route: "/download" },
    { name: "Alerts", icon: <FaBell />, route: "/alerts" },
    { name: "Leaves", icon: <FaCalendarAlt />, route: "/leaves" },
  ];

  // Close sidebar when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div
        className="md:hidden absolute top-4 left-4 cursor-pointer z-50"
        onClick={() => setIsOpen(!isOpen)} // Toggle open/close
      >
        <FaBars className="text-2xl text-blue-600" />
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`min-h-screen p-4 fixed top-0 left-0 z-30 transition-all duration-300 ease-in-out
          ${isOpen ? "w-64 opacity-100 pointer-events-auto" : "w-0 opacity-0 pointer-events-none"}
          overflow-hidden md:w-64 md:opacity-100 md:pointer-events-auto md:relative md:block`}
      >
        {/* Logo */}
        <div className="bg-white rounded-md p-3 mb-6 flex items-center justify-center h-16">
          <img src="img/logo.png" alt="Logo" className="max-h-full" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {navItems.map(({ name, icon, route }) => (
            <Link
              to={route}
              key={name}
              className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                name === "Dashboard"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              } transition`}
            >
              <span className="text-lg">{icon}</span>
              {isOpen && <span className="text-sm font-medium">{name}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-6">
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 w-full transition"
            onClick={() => console.log("Logged out")} // Handle logout action
          >
            <FaSignOutAlt className="text-lg" />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Overlay to close sidebar when clicked */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"
          onClick={() => setIsOpen(false)} // Close sidebar on overlay click
        />
      )}
    </>
  );
};

export default Sidebar;

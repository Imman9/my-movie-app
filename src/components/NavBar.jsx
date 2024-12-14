import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">
          <Link to="/">MOVIE DATABASE</Link>
        </h1>

        <button
          onClick={toggleMenu}
          className="text-white text-2xl md:hidden focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul
          className={`md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent md:translate-x-0 transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <li className="border-t border-blue-700 md:border-none">
            <Link
              to="/"
              className="block py-2 px-4 text-center md:py-0 md:px-0 hover:text-blue-200 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="border-t border-blue-700 md:border-none">
            <Link
              to="/favorites"
              className="block py-2 px-4 text-center md:py-0 md:px-0 hover:text-blue-200 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Favorites
            </Link>
          </li>
          <li className="border-t border-blue-700 md:border-none">
            <Link
              to="/search"
              className="block py-2 px-4 text-center md:py-0 md:px-0 hover:text-blue-200 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              <FaSearch />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

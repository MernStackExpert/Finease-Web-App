import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuthContext } from "../Context/useAuthContext";
import { toast } from "react-toastify";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut, setUser } = useAuthContext();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("LogOut Successful ✅");
      setUser(null);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to log out");
    }
  };
  
  const handleImageError = (e) => {
    e.target.src = 'https://i.ibb.co/V3Tj6Vf/user.png';
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/add-transaction"}>Add Transaction</NavLink>
          </li>
          <li>
            <NavLink to={"/my-transaction"}>My Transactions</NavLink>
          </li>
          <li>
            <NavLink to={"/reports"}>Reports</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm backdrop-blur-md sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-semibold space-y-2"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">FinEase</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold space-x-4">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        <label className="swap swap-rotate btn btn-ghost btn-circle mr-2">
          <input
            type="checkbox"
            onChange={handleThemeToggle}
            checked={theme === "dark"}
          />
          <FaSun className="swap-on fill-current w-5 h-5" />
          <FaMoon className="swap-off fill-current w-5 h-5" />
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User profile photo"
                  src={user?.photoURL || 'https://i.ibb.co/V3Tj6Vf/user.png'}
                  onError={handleImageError}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-semibold"
            >
              <li className="px-4 py-2">
                <span className="font-bold text-base-content p-0">
                  {user?.displayName || 'User'}
                </span>
                <span className="text-xs text-gray-500 p-0 mt-2">
                  {user?.email}
                </span>
              </li>
              <li><div className="divider my-0"></div></li>
              <li>
                <Link to={"/my-profile"}>My Profile</Link>
              </li>
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to={"/auth/login"}
            className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
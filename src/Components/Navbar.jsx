import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuthContext } from "../Context/useAuthContext";
import { toast } from "react-toastify";
import { FaSun, FaMoon, FaWallet } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut, setUser, loading } = useAuthContext();
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

  // মেনু অটো ক্লোজ করার ফাংশন
  const closeMenu = () => {
    const elem = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };

  const handleLogOut = async () => {
    closeMenu();
    try {
      await logOut();
      toast.success("LogOut Successful ✅");
      setUser(null);
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.message || "Failed to log out");
    }
  };

  const handleImageError = (e) => {
    e.target.src = "https://i.ibb.co/V3Tj6Vf/user.png";
  };

  const links = (
    <>
      <li>
        <NavLink
          onClick={closeMenu}
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold border-b-2 border-primary rounded-none"
              : "text-base-content/70 hover:text-primary transition-all"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={closeMenu}
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold border-b-2 border-primary rounded-none"
              : "text-base-content/70 hover:text-primary transition-all"
          }
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={closeMenu}
          to="/services"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold border-b-2 border-primary rounded-none"
              : "text-base-content/70 hover:text-primary transition-all"
          }
        >
          Services
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              onClick={closeMenu}
              to="/add-transaction"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold border-b-2 border-primary rounded-none"
                  : "text-base-content/70 hover:text-primary transition-all"
              }
            >
              Add Transaction
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              to="/my-transaction"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold border-b-2 border-primary rounded-none"
                  : "text-base-content/70 hover:text-primary transition-all"
              }
            >
              My Transactions
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              to="/reports"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold border-b-2 border-primary rounded-none"
                  : "text-base-content/70 hover:text-primary transition-all"
              }
            >
              Reports
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="w-full bg-base-100/80 backdrop-blur-md shadow-md fixed top-0 z-50">
      <div className="max-w-[1440px] mx-auto navbar px-4 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-4 shadow-2xl font-semibold space-y-3"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-black tracking-tighter text-primary"
          >
            <FaWallet className="text-3xl" />
            <span className="hidden sm:block">FinEase</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold space-x-2">
            {links}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input
              type="checkbox"
              onChange={handleThemeToggle}
              checked={theme === "dark"}
            />
            <FaSun className="swap-on fill-current w-5 h-5 text-yellow-500" />
            <FaMoon className="swap-off fill-current w-5 h-5" />
          </label>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Profile"
                    src={user?.photoURL || "https://i.ibb.co/V3Tj6Vf/user.png"}
                    onError={handleImageError}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-[1] mt-4 w-64 p-4 shadow-2xl border border-base-300"
              >
                <li className="px-2 py-3 mb-2">
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-black text-lg">
                      {user?.displayName || "User"}
                    </span>
                    <span className="text-xs opacity-60 italic leading-none">
                      {user?.email}
                    </span>
                  </div>
                </li>
                <div className="divider my-0 opacity-20"></div>
                <li>
                  <Link onClick={closeMenu} to="/dashboard" className="py-3">Dashbord</Link>
                </li>
                <li>
                  <Link onClick={closeMenu} to="/my-profile" className="py-3">My Profile</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="py-3 text-error font-bold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="btn btn-primary rounded-full px-8 text-white font-bold shadow-lg shadow-primary/20"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
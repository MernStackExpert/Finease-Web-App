import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuthContext } from "../Context/useAuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut, setUser } = useAuthContext();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast("LogOut Successfull ✅");
        setUser(null);
        navigate("/auth/login");
      })
      .then((error) => {
        console.log(error);
      });
  };
  const links = (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/add-transaction"}>Add Transaction</NavLink>
          </li>
          <li>
            <NavLink to={"/my-transaction"}>My Transaction</NavLink>
          </li>
          <li>
            <NavLink to={"/reports"}>Reports</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm backdrop-blur-md fixed top-0 z-50">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-semibold space-y-2"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">FinEase</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold space-x-4">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-semibold"
            >
              <li>
                <h1 className="cursor-default">{user?.displayName}</h1>
              </li>

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

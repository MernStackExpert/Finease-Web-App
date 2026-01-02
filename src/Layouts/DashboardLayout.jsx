import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link } from 'react-router';
import { FaHome, FaHistory, FaPlusCircle, FaChartPie, FaUserCircle, FaSignOutAlt, FaWallet, FaBars, FaArrowAltCircleLeft, FaSun, FaMoon } from 'react-icons/fa';
import { useAuthContext } from '../Context/useAuthContext';

const DashboardLayout = () => {
  const { logOut, user } = useAuthContext();

  // থিম লজিক (Navbar থেকে নেওয়া)
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

  const menuItems = [
    { name: "Dashboard Home", path: "/dashboard", icon: <FaHome /> },
    { name: "Add Transaction", path: "/dashboard/add-transaction", icon: <FaPlusCircle /> },
    { name: "My History", path: "/dashboard/my-transaction", icon: <FaHistory /> },
    { name: "Reports", path: "/dashboard/reports", icon: <FaChartPie /> },
    { name: "Profile", path: "/dashboard/profile", icon: <FaUserCircle /> },
    { name: "Back To Home", path: "/", icon: <FaArrowAltCircleLeft /> },
  ];

  const SideNav = () => (
    <>
      <div className="p-6 mb-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-black text-primary uppercase tracking-tighter">
          <FaWallet size={28} /> FinEase
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-300 ${
                isActive 
                ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105" 
                : "text-base-content/60 hover:bg-primary/10 hover:text-primary"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-base-300">
        <button 
          onClick={logOut} 
          className="btn btn-error btn-outline w-full rounded-2xl gap-2 font-black uppercase text-xs tracking-widest"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col bg-base-200 min-h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-base-100/80 backdrop-blur-md border-b border-base-300 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-circle lg:hidden">
              <FaBars size={20} />
            </label>
            <h2 className="text-xl font-black opacity-80 uppercase tracking-tight hidden md:block">
              Welcome, <span className="text-primary">{user?.displayName?.split(' ')[0]}</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {/* Theme Toggle Button */}
            <label className="swap swap-rotate btn btn-ghost btn-circle">
              <input
                type="checkbox"
                onChange={handleThemeToggle}
                checked={theme === "dark"}
              />
              <FaSun className="swap-on fill-current w-5 h-5 text-yellow-500" />
              <FaMoon className="swap-off fill-current w-5 h-5" />
            </label>

            <div className="text-right hidden sm:block">
               <p className="text-xs font-black opacity-40 uppercase tracking-widest leading-none mb-1">Status</p>
               <p className="text-sm font-bold text-success leading-none">Verified Member</p>
            </div>

            <div className="avatar">
              <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-lg">
                <img src={user?.photoURL || "https://i.ibb.co/V3Tj6Vf/user.png"} alt="User" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 text-base-content">
          <div className="max-w-[1440px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar Drawer */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="bg-base-100 w-72 min-h-full flex flex-col border-r border-base-300 shadow-2xl">
          <SideNav />
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
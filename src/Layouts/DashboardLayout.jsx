import React from 'react';
import { NavLink, Outlet, Link } from 'react-router';
import { FaHome, FaHistory, FaPlusCircle, FaChartPie, FaUserCircle, FaSignOutAlt, FaWallet } from 'react-icons/fa';
import { useAuthContext } from '../Context/useAuthContext';

const DashboardLayout = () => {
  const { logOut, user } = useAuthContext();

  const menuItems = [
    { name: "Dashboard Home", path: "/dashboard", icon: <FaHome /> },
    { name: "Add Transaction", path: "/dashboard/add-transaction", icon: <FaPlusCircle /> },
    { name: "My History", path: "/dashboard/my-transaction", icon: <FaHistory /> },
    { name: "Reports", path: "/dashboard/reports", icon: <FaChartPie /> },
    { name: "Profile", path: "/dashboard/profile", icon: <FaUserCircle /> },
  ];

  return (
    <div className="flex h-screen bg-base-200 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 shadow-xl hidden lg:flex flex-col border-r border-base-300">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-2xl font-black text-primary uppercase">
            <FaWallet /> FinEase
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  isActive ? "bg-primary text-white shadow-lg shadow-primary/30" : "hover:bg-primary/10 opacity-70"
                }`
              }
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-base-300">
          <button onClick={logOut} className="btn btn-error btn-outline w-full rounded-xl gap-2 font-bold uppercase text-xs">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar for Dashboard */}
        <header className="h-20 bg-base-100 border-b border-base-300 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold opacity-70 uppercase tracking-widest hidden lg:block">Welcome, {user?.displayName}</h2>
          <div className="lg:hidden">
            <Link to="/" className="text-2xl font-black text-primary"><FaWallet /></Link>
          </div>
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL || "https://i.ibb.co/V3Tj6Vf/user.png"} alt="User" />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
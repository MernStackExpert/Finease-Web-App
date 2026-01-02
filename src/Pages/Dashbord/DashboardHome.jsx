import React, { useEffect, useState } from "react";
import { useAxios } from "../../Hooks/useAxios";
import { useAuthContext } from "../../Context/useAuthContext";
import { FaWallet, FaArrowTrendUp, FaArrowTrendDown, FaChartLine } from "react-icons/fa6";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const DashboardHome = () => {
  const axios = useAxios();
  const { user } = useAuthContext();
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`/transactions?email=${user?.email}&size=1000`);
        const data = res.data.transactions || [];

        let inc = 0, exp = 0;
        data.forEach((t) => {
          const val = parseFloat(t.amount || 0);
          if (t.type.toLowerCase() === "income") inc += val;
          else exp += val;
        });

        setStats({ income: inc, expense: exp, balance: inc - exp });
        setChartData([
          { name: "Income", amount: inc, color: "#22c55e" },
          { name: "Expense", amount: exp, color: "#ef4444" },
        ]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStats();
  }, [user?.email, axios]);

  return (
    <div className="space-y-10 pb-10">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <h2 className="text-3xl font-black uppercase tracking-tight">
          System <span className="text-primary">Overview</span>
        </h2>
        <p className="text-base-content/50 font-medium">Welcome, {user?.displayName}!</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-primary to-secondary p-8 rounded-[2.5rem] shadow-2xl shadow-primary/20 text-white relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform text-white">
            <FaWallet size={120} />
          </div>
          <FaWallet size={28} className="mb-4 opacity-80" />
          <p className="text-sm font-bold uppercase tracking-widest opacity-70">Current Balance</p>
          <h3 className="text-4xl font-black mt-1">${stats.balance.toLocaleString()}</h3>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-base-100 border border-base-300 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
          <div className="absolute right-6 top-8 text-success/10 group-hover:scale-110 transition-transform">
            <FaArrowTrendUp size={60} />
          </div>
          <div className="bg-success/10 p-3 rounded-2xl w-fit mb-4">
            <FaArrowTrendUp size={24} className="text-success" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest opacity-40">Total Income</p>
          <h3 className="text-4xl font-black text-success mt-1">${stats.income.toLocaleString()}</h3>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-base-100 border border-base-300 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
          <div className="absolute right-6 top-8 text-error/10 group-hover:scale-110 transition-transform">
            <FaArrowTrendDown size={60} />
          </div>
          <div className="bg-error/10 p-3 rounded-2xl w-fit mb-4">
            <FaArrowTrendDown size={24} className="text-error" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest opacity-40">Total Expense</p>
          <h3 className="text-4xl font-black text-error mt-1">${stats.expense.toLocaleString()}</h3>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-base-100 p-8 md:p-10 rounded-[3rem] border border-base-300 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                <FaChartLine className="text-primary" /> Cash Flow Analytics
              </h3>
              <p className="text-xs font-bold opacity-40 uppercase tracking-widest mt-1">Comparison of Income and Expenses</p>
            </div>
          </div>
          
          <div className="h-[350px] w-full text-base-content">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'currentColor', fontWeight: 'bold', fontSize: 12 }}
                    dy={15}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'currentColor', opacity: 0.05 }}
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    padding: '15px',
                    backgroundColor: 'white',
                    color: '#000'
                  }}
                />
                <Bar dataKey="amount" radius={[15, 15, 0, 0]} barSize={80}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
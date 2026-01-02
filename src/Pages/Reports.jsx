import React, { useState, useEffect, useContext, useCallback } from "react";
import { FaFilter, FaChartPie, FaChartBar, FaCalendarAlt, FaLayerGroup } from "react-icons/fa";
import { useAxios } from "../Hooks/useAxios";
import { AuthContext } from "../Provider/AuthContext";
import PieChart from "../Components/PieChart";
import BarChart from "../Components/BarChart";
import { motion } from "framer-motion";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const Reports = () => {
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateReports = useCallback((baseData, month, category) => {
    let filtered = [...baseData];

    if (month) {
      filtered = filtered.filter((item) => {
        const date = new Date(item.date);
        return months[date.getMonth()] === month;
      });
    }
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    const categoryTotals = {};
    filtered.forEach((t) => {
      if (t.type?.toLowerCase() === "expense") {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + parseFloat(t.amount || 0);
      }
    });
    
    setPieChartData(Object.entries(categoryTotals).map(([name, value]) => ({ name, value })));

    const monthTotals = {};
    filtered.forEach((t) => {
      const date = new Date(t.date);
      const monthName = months[date.getMonth()];
      if (!monthTotals[monthName]) {
        monthTotals[monthName] = { month: monthName, income: 0, expense: 0 };
      }
      if (t.type?.toLowerCase() === "income") {
        monthTotals[monthName].income += parseFloat(t.amount || 0);
      } else if (t.type?.toLowerCase() === "expense") {
        monthTotals[monthName].expense += parseFloat(t.amount || 0);
      }
    });

    setBarChartData(Object.values(monthTotals));
  }, []);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/transactions?email=${user?.email}`, {
        params: { size: 1000 },
        headers: { authorization: `Bearer ${user?.accessToken}` },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.transactions || [];
      setTransactions(data);
      setAllCategories([...new Set(data.map((t) => t.category))]);
      generateReports(data, selectedMonth, selectedCategory);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [axios, user?.email, user?.accessToken, generateReports, selectedMonth, selectedCategory]);

  useEffect(() => {
    if (user?.email) fetchTransactions();
  }, [user?.email, fetchTransactions]);

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-8 bg-base-200 pt-24">
      <div className="max-w-[1440px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-base-content uppercase tracking-tight">
            Financial <span className="text-primary">Reports</span>
          </h2>
          <p className="text-base-content/60 mt-2">Analyze your income and expenses with visual insights</p>
        </motion.div>

        <div className="bg-base-100 rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-base-300 mb-10">
          <div className="flex items-center gap-2 mb-8 border-b border-base-200 pb-4 text-xl font-black uppercase tracking-widest text-base-content/70">
            <FaFilter className="text-primary" /> Filter Statistics
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="label font-bold text-xs uppercase opacity-60 flex gap-2">
                <FaCalendarAlt /> Select Month
              </label>
              <select
                className="select select-bordered rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-primary h-14"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">All Months</option>
                {months.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-control">
              <label className="label font-bold text-xs uppercase opacity-60 flex gap-2">
                <FaLayerGroup /> Select Category
              </label>
              <select
                className="select select-bordered rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-primary h-14"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {allCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-base-100 rounded-[2.5rem] p-8 shadow-xl border border-base-300 min-h-[450px]"
          >
            <h3 className="text-xl font-black mb-8 text-center flex items-center justify-center gap-3 text-base-content/80">
              <FaChartPie className="text-primary" /> EXPENSE DISTRIBUTION
            </h3>
            <div className="w-full h-[300px]">
              <PieChart pieChartData={pieChartData} />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-base-100 rounded-[2.5rem] p-8 shadow-xl border border-base-300 min-h-[450px]"
          >
            <h3 className="text-xl font-black mb-8 text-center flex items-center justify-center gap-3 text-base-content/80">
              <FaChartBar className="text-secondary" /> INCOME VS EXPENSE
            </h3>
            <div className="w-full h-[300px]">
              <BarChart barChartData={barChartData} />
            </div>
          </motion.div>
        </div>

        {!transactions.length && (
          <div className="mt-10 p-12 bg-base-100 rounded-[2.5rem] text-center border-2 border-dashed border-base-300">
            <p className="text-xl font-bold opacity-30 uppercase tracking-widest">No Data Available for selected filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { FaFilter, FaChartPie, FaChartBar } from "react-icons/fa";
import { useAxios } from "../Hooks/useAxios";
import { AuthContext } from "../Provider/AuthContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
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
      if (t.type.toLowerCase() === "expense") {
        categoryTotals[t.category] =
          (categoryTotals[t.category] || 0) + parseFloat(t.amount);
      }
    });
    const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
    setPieChartData(pieData);

    const monthTotals = {};
    filtered.forEach((t) => {
      const date = new Date(t.date);
      const monthName = months[date.getMonth()];
      if (!monthTotals[monthName]) {
        monthTotals[monthName] = { month: monthName, income: 0, expense: 0 };
      }
      if (t.type.toLowerCase() === "income") {
        monthTotals[monthName].income += parseFloat(t.amount);
      } else if (t.type.toLowerCase() === "expense") {
        monthTotals[monthName].expense += parseFloat(t.amount);
      }
    });
    
    let barData = Object.values(monthTotals);
    if (month) {
      barData = barData.filter(m => m.month === month);
    }
    
    setBarChartData(barData);
  }, []);

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await axios.get(`/transactions?email=${user?.email}`);
      const data = res.data || [];
      setTransactions(data);
      
      const uniqueCategories = [...new Set(data.map((t) => t.category))];
      setAllCategories(uniqueCategories);
      
      generateReports(data, "", ""); 
    } catch (error) {
      console.log(error);
    }
  }, [axios, user?.email, generateReports]);

  useEffect(() => {
    if (user?.email) {
      fetchTransactions();
    }
  }, [user?.email, fetchTransactions]);

  useEffect(() => {
    if (transactions.length > 0) {
      generateReports(transactions, selectedMonth, selectedCategory);
    }
  }, [transactions, selectedMonth, selectedCategory, generateReports]);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          Financial Reports
        </h2>
        <div className="card bg-base-100 shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaFilter /> Filters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text mb-2">Filter by Month</span>
              </label>
              <select
                className="select select-bordered"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">All Months</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text mb-2">Filter by Category</span>
              </label>
              <select
                className="select select-bordered"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
              <FaChartPie /> Expense by Category
            </h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                {pieChartData.length > 0 ? (
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 w-70 mt-15">
                    No expense data to display for this filter.
                  </div>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
              <FaChartBar /> Monthly Income vs Expense
            </h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                {barChartData.length > 0 ? (
                  <BarChart
                    data={barChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#22C55E" />
                    <Bar dataKey="expense" fill="#EF4444" />
                  </BarChart>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500  w-70 mt-15">
                    No data to display for this filter.
                  </div>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
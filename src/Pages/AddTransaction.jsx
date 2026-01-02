import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaWallet,
  FaDollarSign,
  FaCalendarAlt,
  FaEnvelope,
  FaUser,
  FaPlus,
  FaArrowUp,
  FaArrowDown,
  FaStickyNote,
  FaTag,
} from "react-icons/fa";
import { useAuthContext } from "../Context/useAuthContext";
import { useAxios } from "../Hooks/useAxios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const AddTransaction = () => {
  const axios = useAxios();
  const [transactionType, setTransactionType] = useState("Expense");
  const { user } = useAuthContext();

  const incomeCategories = [
    { value: "Salary", label: "Salary" },
    { value: "Bonus", label: "Bonus" },
    { value: "Freelance", label: "Freelance" },
    { value: "Investment", label: "Investment" },
    { value: "Other", label: "Other (Income)" },
  ];

  const expenseCategories = [
    { value: "Groceries", label: "Groceries" },
    { value: "Rent", label: "Rent" },
    { value: "Bills", label: "Bills" },
    { value: "Transport", label: "Transport" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Health", label: "Health" },
    { value: "Savings", label: "Savings" },
    { value: "Other", label: "Other (Expense)" },
  ];

  const categoriesToShow = transactionType === "Income" ? incomeCategories : expenseCategories;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const amount = form.amount.value;
    const description = form.description.value;
    const date = form.date.value;

    if (!title || !category || !amount || !description || !date) {
      toast.error("Please fill all fields.");
      return;
    }

    const transactionData = {
      title,
      type: transactionType,
      category,
      amount: parseFloat(amount),
      description,
      date,
      userEmail: user?.email,
      userName: user?.displayName,
      createdAt: new Date().toISOString(),
    };

    try {
      const token = localStorage.getItem("access-token");
      await axios.post("/transactions", transactionData, {
        headers: { authorization: `Bearer ${token}` },
      });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Transaction added to your records.",
        confirmButtonColor: "hsl(var(--p))",
      });
      form.reset();
      setTransactionType("Expense");
    } catch (error) {
      toast.error("Failed to add transaction");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <title>FinEase | Add Transaction</title>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-base-100 rounded-[2.5rem] shadow-xl border border-base-300 overflow-hidden">
          
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-center mb-10">
              New <span className="text-primary">Transaction</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Type Selection */}
              <div className="form-control">
                <label className="label font-bold text-xs uppercase opacity-50 tracking-widest mb-3">
                  Select Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setTransactionType("Income")}
                    className={`py-4 rounded-2xl font-black uppercase text-sm flex items-center justify-center gap-2 border-2 transition-all ${
                      transactionType === "Income" 
                      ? "bg-success border-success text-white shadow-lg" 
                      : "border-base-300 hover:border-success/50 text-base-content/40"
                    }`}
                  >
                    <FaArrowUp /> Income
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransactionType("Expense")}
                    className={`py-4 rounded-2xl font-black uppercase text-sm flex items-center justify-center gap-2 border-2 transition-all ${
                      transactionType === "Expense" 
                      ? "bg-error border-error text-white shadow-lg" 
                      : "border-base-300 hover:border-error/50 text-base-content/40"
                    }`}
                  >
                    <FaArrowDown /> Expense
                  </button>
                </div>
              </div>

              {/* Main Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Title Field - New */}
                <div className="form-control md:col-span-2">
                  <label className="label font-bold text-xs uppercase opacity-50">Transaction Title</label>
                  <div className="relative">
                    <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" />
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g. Office Rent, Grocery Shopping"
                      className="input input-bordered w-full pl-12 bg-base-200 border-none rounded-2xl font-bold h-14 focus:outline-primary"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-bold text-xs uppercase opacity-50">Category</label>
                  <div className="relative">
                    <FaWallet className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" />
                    <select
                      name="category"
                      className="select select-bordered w-full pl-12 bg-base-200 border-none rounded-2xl font-bold h-14 focus:outline-primary"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>Select Category</option>
                      {categoriesToShow.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-bold text-xs uppercase opacity-50">Amount</label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" />
                    <input
                      type="number"
                      name="amount"
                      placeholder="0.00"
                      step="0.01"
                      className="input input-bordered w-full pl-12 bg-base-200 border-none rounded-2xl font-bold h-14 focus:outline-primary"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-bold text-xs uppercase opacity-50">Date</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" />
                    <input
                      type="date"
                      name="date"
                      className="input input-bordered w-full pl-12 bg-base-200 border-none rounded-2xl font-bold h-14 focus:outline-primary"
                      required
                    />
                  </div>
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label font-bold text-xs uppercase opacity-50">Description</label>
                  <div className="relative">
                    <FaStickyNote className="absolute left-4 top-4 text-primary/50" />
                    <textarea
                      name="description"
                      placeholder="Write your note here..."
                      className="textarea textarea-bordered w-full pl-12 pt-4 bg-base-200 border-none rounded-2xl font-medium h-32 focus:outline-primary"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="badge badge-lg py-5 px-6 bg-base-200 border-none rounded-xl gap-2 text-base-content/70">
                  <FaUser className="text-primary" /> <span className="font-bold">{user?.displayName}</span>
                </div>
                <div className="badge badge-lg py-5 px-6 bg-base-200 border-none rounded-xl gap-2 text-base-content/70">
                  <FaEnvelope className="text-primary" /> <span className="font-bold">{user?.email}</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full rounded-2xl h-16 shadow-xl gap-3 text-white font-black uppercase tracking-widest"
                >
                  <FaPlus /> Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddTransaction;
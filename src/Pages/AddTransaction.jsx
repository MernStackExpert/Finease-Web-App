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
  FaPencilAlt,
} from "react-icons/fa";
import { useAuthContext } from "../Context/useAuthContext";
import { useAxios } from "../Hooks/useAxios";
import Swal from "sweetalert2";

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

  const categoriesToShow =
    transactionType === "Income" ? incomeCategories : expenseCategories;

  const handleTypeChange = (type) => {
    setTransactionType(type);
    document.getElementsByName("category")[0].value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const category = form.category.value;
    const amount = form.amount.value;
    const description = form.description.value;
    const date = form.date.value;

    if (!category || !amount || !description || !date) {
      toast.error("Please fill all fields.");
      return;
    }

    const transactionData = {
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
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfull to add Transaction",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
      setTransactionType("Expense");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add transaction");
    }
  };
  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <title>FinEase - Add Transaction</title>
      <div className="card max-w-4xl mx-auto shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit} className="card-body p-6 md:p-10">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            Add New Transaction
          </h2>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-lg font-semibold">
                Transaction Type
              </span>
            </label>
            <div className="join w-full">
              <button
                type="button"
                onClick={() => handleTypeChange("Income")}
                className={`join-item btn btn-lg flex-1 ${
                  transactionType === "Income"
                    ? "btn-success text-white"
                    : "btn-outline btn-success"
                }`}
              >
                <FaArrowUp /> Income
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("Expense")}
                className={`join-item btn btn-lg flex-1 ${
                  transactionType === "Expense"
                    ? "btn-error text-white"
                    : "btn-outline btn-error"
                }`}
              >
                <FaArrowDown /> Expense
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <label className="input input-bordered flex items-center gap-3">
                <FaWallet className="text-gray-400" />
                <select
                  name="category"
                  className="grow  appearance-none h-full border-none outline-none bg-base-200"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categoriesToShow.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <label className="input input-bordered flex items-center gap-3">
                <FaDollarSign className="text-gray-400" />
                <input
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  step="0.01"
                  className="grow bg-transparent"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <label className="input input-bordered flex items-center gap-3">
                <FaCalendarAlt className="text-gray-400" />
                <input
                  type="date"
                  name="date"
                  className="grow bg-transparent"
                />
              </label>
            </div>

            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                placeholder="Add a short note..."
                className="textarea textarea-bordered h-24 w-full"
              />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <label className="input input-bordered flex items-center gap-3 bg-base-200 text-base-content/70">
                <FaUser />
                <input
                  type="text"
                  value={user?.displayName || "Loading..."}
                  disabled
                  className="grow bg-transparent"
                />
              </label>
            </div>

            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text">User Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-3 bg-base-200 text-base-content/70">
                <FaEnvelope />
                <input
                  type="email"
                  value={user?.email || "Loading..."}
                  disabled
                  className="grow bg-transparent"
                />
              </label>
            </div>
          </div>

          <div className="form-control mt-10">
            <button
              type="submit"
              className="btn btn-primary btn-lg bg-gradient-to-r from-primary to-secondary text-white w-full"
            >
              <FaPlus />
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;

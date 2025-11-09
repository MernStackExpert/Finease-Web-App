import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../Context/useAuthContext";
import { useAxios } from "../Hooks/useAxios";
import { Link } from "react-router";
import Swal from "sweetalert2";
// import { FaPencilAlt, FaTrash, FaEye, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import TransactionCard from "../Components/TransactionCard";

const MyTransaction = () => {
  const axios = useAxios();
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/transactions`, {
        params: {
          email: user?.email,
          sort: sortField,
          order: sortOrder,
        },
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      });
      setTransactions(res.data || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
              position: "top-center",
              icon: "error",
              title: "Failed to fetch transactions",
              showConfirmButton: false,
              timer: 1500,
            });
      setLoading(false);
    }
  }, [axios, user?.email, sortField, sortOrder, user?.accessToken]);

  useEffect(() => {
    if (user?.email) {
      fetchTransactions();
    }
  }, [user?.email, fetchTransactions]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/transactions/${id}`);
          toast.success("Transaction deleted successfully!");
          setTransactions(transactions.filter((t) => t._id !== id));
        } catch (error) {
          console.log(error);
          toast.error("Failed to delete transaction");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-base-200">
                  <title>FinEase - MyTransaction</title>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          My Transactions
        </h2>

        <div className="flex justify-center md:justify-end gap-4 mb-6 p-4 bg-base-100 rounded-lg shadow">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Sort by</span>
            </label>
            <select
              className="select select-bordered"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Order</span>
            </label>
            <select
              className="select select-bordered"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No transactions found.</p>
            <p className="mt-4">
              Go to{" "}
              <Link to="/add-transaction" className="link link-primary">
                Add Transaction
              </Link>{" "}
              to add your first one.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {transactions.map((t) => (
              <TransactionCard key={t._id} t={t} cardVariants={cardVariants} handleDelete={handleDelete}></TransactionCard>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyTransaction;

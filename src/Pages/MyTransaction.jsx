import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../Context/useAuthContext";
import { useAxios } from "../Hooks/useAxios";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import TransactionCard from "../Components/TransactionCard";

const MyTransaction = () => {
  const axios = useAxios();
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(6);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(totalPages).keys()];

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
          page: currentPage,
          size: itemsPerPage,
        },
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      });
      setTransactions(res.data.transactions || []);
      setTotalCount(res.data.totalCount || 0);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Failed to fetch transactions",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
    }
  }, [axios, user?.email, sortField, sortOrder, user?.accessToken, currentPage, itemsPerPage]);

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
          const token = localStorage.getItem("access-token");
          await axios.delete(`/transactions/${id}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          toast.success("Transaction deleted successfully!");
          fetchTransactions();
        } catch (error) {
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
        <h2 className="text-4xl font-black text-center text-primary mb-10 uppercase tracking-tight">
          My <span className="text-base-content">Transactions</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-center md:justify-end gap-6 mb-10 p-6 bg-base-100 rounded-3xl shadow-sm border border-base-300">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold opacity-60 uppercase text-xs">Sort by</span>
            </label>
            <select
              className="select select-bordered rounded-xl"
              value={sortField}
              onChange={(e) => {
                setSortField(e.target.value);
                setCurrentPage(0);
              }}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold opacity-60 uppercase text-xs">Order</span>
            </label>
            <select
              className="select select-bordered rounded-xl"
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setCurrentPage(0);
              }}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-24 bg-base-100 rounded-[3rem] border-2 border-dashed border-base-300">
            <p className="text-2xl font-bold opacity-30">No transactions found.</p>
            <Link to="/add-transaction" className="btn btn-primary mt-6 rounded-full px-8 shadow-lg shadow-primary/20">
              Add First Transaction
            </Link>
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {transactions.map((t) => (
                <TransactionCard
                  key={t._id}
                  t={t}
                  cardVariants={cardVariants}
                  handleDelete={handleDelete}
                />
              ))}
            </motion.div>

            <div className="flex flex-col items-center justify-center mt-20 mb-12 gap-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className={`btn btn-circle btn-outline border-primary hover:bg-primary transition-all duration-300 ${
                    currentPage === 0 ? "opacity-20 cursor-not-allowed" : "shadow-md"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="hidden sm:flex items-center bg-base-100 p-2 rounded-full shadow-inner border border-base-300 gap-1">
                  {pages.map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-12 h-12 rounded-full font-bold transition-all duration-300 ${
                        currentPage === page
                          ? "bg-primary text-white shadow-lg scale-105"
                          : "text-base-content/60 hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {page + 1}
                    </button>
                  ))}
                </div>

                <div className="sm:hidden font-black text-primary px-4">
                   {currentPage + 1} / {totalPages}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                  className={`btn btn-circle btn-outline border-primary hover:bg-primary transition-all duration-300 ${
                    currentPage === totalPages - 1 ? "opacity-20 cursor-not-allowed" : "shadow-md"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                Displaying {transactions.length} of {totalCount} Records
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyTransaction;
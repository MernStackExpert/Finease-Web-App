import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../Context/useAuthContext";
import { useAxios } from "../Hooks/useAxios";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";
import TransactionCard from "../Components/TransactionCard";

const MyTransaction = () => {
  const axios = useAxios();
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchText, setSearchText] = useState(""); 
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(8);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(totalPages).keys()];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
          search: searchText, 
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
      console.error(error);
      setLoading(false);
    }
  }, [axios, user?.email, sortField, sortOrder, searchText, user?.accessToken, currentPage, itemsPerPage]);

  useEffect(() => {
    if (user?.email) {
      const delayDebounceFn = setTimeout(() => {
        fetchTransactions();
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [user?.email, fetchTransactions, searchText]); 

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
            headers: { authorization: `Bearer ${token}` },
          });
          toast.success("Transaction deleted successfully!");
          fetchTransactions();
        } catch (error) {
          toast.error("Failed to delete transaction");
        }
      }
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-base-200 pt-20">
      <title>FinEase | My Transactions</title>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h2 className="text-4xl font-black text-center text-primary uppercase tracking-tight">
            My <span className="text-base-content">Transactions</span>
          </h2>
        </motion.div>

        {/* Filter & Search Bar */}
        <div className="bg-base-100 rounded-[2.5rem] p-6 mb-10 shadow-xl border border-base-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
            
            {/* Search Input */}
            <div className="form-control w-full">
              <label className="label font-bold text-xs uppercase opacity-40 flex gap-2">
                <FaSearch /> Search by Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Office Rent..."
                  className="input input-bordered w-full rounded-2xl bg-base-200 border-none pl-12 h-14 focus:ring-2 focus:ring-primary"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setCurrentPage(0);
                  }}
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
              </div>
            </div>

            {/* Sort Field */}
            <div className="form-control w-full">
              <label className="label font-bold text-xs uppercase opacity-40 flex gap-2">
                <FaFilter /> Sort By
              </label>
              <select
                className="select select-bordered w-full rounded-2xl bg-base-200 border-none h-14 font-bold"
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

            {/* Sort Order */}
            <div className="form-control w-full">
              <label className="label font-bold text-xs uppercase opacity-40 flex gap-2">
                <FaSortAmountDown /> Order
              </label>
              <select
                className="select select-bordered w-full rounded-2xl bg-base-200 border-none h-14 font-bold"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(0);
                }}
              >
                <option value="desc">Newest / Highest</option>
                <option value="asc">Oldest / Lowest</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-24 bg-base-100 rounded-[3rem] border-2 border-dashed border-base-300">
            <p className="text-2xl font-bold opacity-30 uppercase tracking-widest">No matching records found</p>
            <Link to="/dashboard/add-transaction" className="btn btn-primary mt-6 rounded-2xl px-10">
              Add New Transaction
            </Link>
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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

            {/* Pagination Controls */}
            <div className="flex flex-col items-center justify-center mt-16 mb-12 gap-5">
              <div className="join bg-base-100 shadow-lg rounded-2xl border border-base-300">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="join-item btn btn-ghost px-6 disabled:opacity-30"
                >
                  Prev
                </button>
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`join-item btn px-6 border-none ${
                      currentPage === page ? "btn-primary text-white" : "btn-ghost"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="join-item btn btn-ghost px-6 disabled:opacity-30"
                >
                  Next
                </button>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-40 italic">
                Showing {transactions.length} of {totalCount} transactions
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyTransaction;
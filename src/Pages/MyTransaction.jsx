import React, { useEffect, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../Context/useAuthContext";
import { useAxios } from "../Hooks/useAxios";
import { Link } from "react-router";
import Swal from "sweetalert2";
import {
  FaPencilAlt,
  FaTrash,
  FaEye,
  FaCalendarAlt,
} from "react-icons/fa";

const MyTransaction = () => {
  const axios = useAxios();
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/transactions`, {
        params: {
          email: user?.email,
          sort: sortField,
          order: sortOrder,
        },
      });
      setTransactions(res.data || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch transactions");
      setLoading(false);
    }
  }, [axios, user?.email, sortField, sortOrder]);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions.map((t) => (
              <div
                key={t._id}
                className="card bg-base-100 shadow-xl transition-transform transform hover:-translate-y-2 h-[22rem]"
              >
                <div className="card-body flex flex-col">
                  <div className="flex justify-between items-start">
                    <span
                      className={`badge badge-lg font-semibold ${
                        t.type === "Income"
                          ? "badge-success text-white"
                          : "badge-error text-white"
                      }`}
                    >
                      {t.type}
                    </span>
                    <span className="font-semibold text-lg">
                      ${t.amount.toFixed(2)}
                    </span>
                  </div>
                  <h2 className="card-title mt-4">{t.category}</h2>
                  <p className="text-gray-500 text-sm flex items-center gap-2">
                    <FaCalendarAlt />
                    {new Date(t.date).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-gray-600 flex-grow overflow-hidden">
                    {t.description.length > 100
                      ? t.description.substring(0, 100) + "..."
                      : t.description}
                  </p>
                  <div className="card-actions justify-end mt-4 space-x-2">
                    <Link
                      to={`/transaction-detailes/${t._id}`}
                      className="btn btn-ghost btn-circle"
                      title="View Details"
                    >
                      <FaEye className="text-info text-xl" />
                    </Link>
                    <Link
                      to={`/update-transaction/${t._id}`}
                      className="btn btn-ghost btn-circle"
                      title="Update"
                    >
                      <FaPencilAlt className="text-warning text-xl" />
                    </Link>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="btn btn-ghost btn-circle"
                      title="Delete"
                    >
                      <FaTrash className="text-error text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default MyTransaction;
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../Context/useAuthContext";
import { useAxios } from "../Hooks/useAxios";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaPencilAlt, FaTrash, FaEye, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

const MyTransaction = () => {
  const axios = useAxios();
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/transactions?email=${user?.email}`);
      setTransactions(res.data || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch transactions");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchTransactions();
    }
  }, [user?.email]);

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
                className="card bg-base-100 shadow-xl transition-transform transform hover:-translate-y-2"
              >
                <div className="card-body">
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
                  <p className="mt-2 text-gray-600 min-h-[48px]">
                    {t.description}
                  </p>
                  <div className="card-actions justify-end mt-4 space-x-2">
                    <Link
                      to={`/transaction-detailes/${t._id}`}
                      className="btn btn-sm btn-ghost btn-circle"
                      title="View Details"
                    >
                      <FaEye className="text-info" />
                    </Link>
                    <Link
                      to={`/update-transaction/${t._id}`}
                      className="btn btn-sm btn-ghost btn-circle"
                      title="Update"
                    >
                      <FaPencilAlt className="text-warning" />
                    </Link>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="btn btn-sm btn-ghost btn-circle"
                      title="Delete"
                    >
                      <FaTrash className="text-error" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTransaction;
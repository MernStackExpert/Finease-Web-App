import React from "react";
import { motion } from "framer-motion";
import { FaPencilAlt, FaTrash, FaEye, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router";


const TransactionCard = ({ t, cardVariants, handleDelete }) => {
  return (
    <motion.div
      key={t._id}
      className="card bg-base-100 shadow-xl transition-transform transform hover:-translate-y-2 h-88"
      variants={cardVariants}
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
          <span className="font-semibold text-lg">${t.amount.toFixed(2)}</span>
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
    </motion.div>
  );
};

export default TransactionCard;

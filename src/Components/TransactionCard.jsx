import React from "react";
import { motion } from "framer-motion";
import { FaPencilAlt, FaTrash, FaEye, FaCalendarAlt, FaTag } from "react-icons/fa";
import { Link } from "react-router";

const TransactionCard = ({ t, cardVariants, handleDelete }) => {
  return (
    <motion.div
      key={t._id}
      className="card bg-base-100 shadow-xl border border-base-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full"
      variants={cardVariants}
    >
      <div className="card-body p-6 flex flex-col">
        {/* Type and Amount Header */}
        <div className="flex justify-between items-center mb-4">
          <span
            className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
              t.type === "Income"
                ? "bg-success/10 text-success border border-success/20"
                : "bg-error/10 text-error border border-error/20"
            }`}
          >
            {t.type}
          </span>
          <span className={`font-black text-xl ${
              t.type === "Income" ? "text-success" : "text-error"
          }`}>
            {t.type === "Income" ? "+" : "-"}${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>

        {/* Title and Category */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-base-content truncate" title={t.title}>
            {t.title || "Untitled Transaction"}
          </h2>
          <div className="flex items-center gap-2 mt-1 opacity-60">
            <FaTag className="text-xs" />
            <span className="text-sm font-medium">{t.category}</span>
          </div>
        </div>

        {/* Date */}
        <p className="text-base-content/50 text-xs font-bold flex items-center gap-2 mb-4 uppercase tracking-tighter">
          <FaCalendarAlt className="text-primary" />
          {new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>

        {/* Description */}
        <p className="text-sm text-base-content/70 flex-grow italic mb-6 line-clamp-2">
          {t.description || "No description provided."}
        </p>

        <div className="divider opacity-10 my-0"></div>

        {/* Actions - Icon Size Increased */}
        <div className="card-actions justify-end mt-4">
          <div className="flex bg-base-200 p-2 rounded-2xl gap-2">
            <Link
              to={`/transaction-detailes/${t._id}`}
              className="btn btn-ghost btn-md btn-circle hover:bg-info/20 hover:text-info text-xl"
              title="View Details"
            >
              <FaEye />
            </Link>
            <Link
              to={`/update-transaction/${t._id}`}
              className="btn btn-ghost btn-md btn-circle hover:bg-warning/20 hover:text-warning text-xl"
              title="Update"
            >
              <FaPencilAlt />
            </Link>
            <button
              onClick={() => handleDelete(t._id)}
              className="btn btn-ghost btn-md btn-circle hover:bg-error/20 hover:text-error text-xl"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionCard;
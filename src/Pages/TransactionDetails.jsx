import React from 'react';
import {
  FaArrowUp,
  FaArrowDown,
  FaWallet,
  FaCalendarAlt,
  FaPencilAlt,
  FaDollarSign,
  FaChartLine,
  FaArrowLeft,
} from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';

const TransactionDetails = () => {
  const loaderData = useLoaderData();

  const { transaction, categoryTotal } = loaderData || {};

  if (!transaction) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-2xl text-gray-500">Transaction not found.</p>
      </div>
    );
  }

  const isIncome = transaction.type.toLowerCase() === 'income';
  const total = categoryTotal ?? 0;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-base-200">
            <title>FinEase - detailes-{transaction._id}</title>
      <div className="card max-w-4xl mx-auto shadow-2xl bg-base-100">
        <div className="card-body p-6 md:p-10">
          <Link
            to={"/my-transaction"}
            className="btn btn-ghost btn-sm max-w-fit mb-4"
          >
            <FaArrowLeft /> Back to List
          </Link>

          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            Transaction Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="stat bg-base-200 rounded-lg shadow">
              <div
                className={`stat-figure ${
                  isIncome ? 'text-success' : 'text-error'
                }`}
              >
                <FaDollarSign className="text-4xl" />
              </div>
              <div className="stat-title">This Transaction's Amount</div>
              <div
                className={`stat-value ${
                  isIncome ? 'text-success' : 'text-error'
                }`}
              >
                ${transaction.amount.toFixed(2)}
              </div>
             
            </div>

            <div className="stat bg-base-200 rounded-lg shadow">
              <div
                className={`stat-figure ${
                  isIncome ? 'text-success' : 'text-error'
                }`}
              >
                <FaChartLine className="text-4xl" />
              </div>
              <div className="stat-title">
                Total {isIncome ? 'Earned' : 'Spent'} in this Category
              </div>
              <div className="stat-value">${total.toFixed(2)}</div>
              <div className="stat-desc">Category: {transaction.category}</div>
            </div>
          </div>

          <div className="divider">Full Information</div>

          <div className="space-y-4">
            <div className="flex items-center p-4 bg-base-200 rounded-lg">
              {isIncome ? (
                <FaArrowUp className="text-2xl text-success mr-4" />
              ) : (
                <FaArrowDown className="text-2xl text-error mr-4" />
              )}
              <div>
                <span className="text-xs text-gray-500">Type</span>
                <p className="font-semibold text-lg">{transaction.type}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-base-200 rounded-lg">
              <FaWallet className="text-2xl text-primary mr-4" />
              <div>
                <span className="text-xs text-gray-500">Category</span>
                <p className="font-semibold text-lg">{transaction.category}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-base-200 rounded-lg">
              <FaCalendarAlt className="text-2xl text-primary mr-4" />
              <div>
                <span className="text-xs text-gray-500">Date</span>
                <p className="font-semibold text-lg">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-base-200 rounded-lg">
              <FaPencilAlt className="text-2xl text-primary mr-4" />
              <div>
                <span className="text-xs text-gray-500">Description</span>
                <p className="font-semibold text-lg">
                  {transaction.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
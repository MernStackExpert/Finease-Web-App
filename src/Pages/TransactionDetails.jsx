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
  FaTag,
} from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';

const TransactionDetails = () => {
  const loaderData = useLoaderData();

  const { transaction, categoryTotal } = loaderData || {};

  if (!transaction) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-2xl text-gray-500 font-bold uppercase tracking-widest opacity-20">Transaction not found.</p>
      </div>
    );
  }

  const isIncome = transaction.type?.toLowerCase() === 'income';
  const total = categoryTotal ?? 0;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-base-200">
      <title>FinEase | Details - {transaction.title || 'Record'}</title>
      
      <div className="card max-w-4xl mx-auto shadow-2xl bg-base-100 rounded-[2.5rem] border border-base-300">
        <div className="card-body p-6 md:p-12">
          
          <Link
            to={"/dashboard/my-transaction"}
            className="btn btn-ghost btn-sm max-w-fit mb-6 rounded-xl hover:bg-primary/10 transition-all gap-2"
          >
            <FaArrowLeft /> Back to List
          </Link>

          {/* New Highlighted Title Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-base-content uppercase tracking-tight mb-2">
               {transaction.title || "Untitled Transaction"}
            </h1>
            <div className={`badge badge-lg py-4 px-6 font-bold border-none rounded-full ${isIncome ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
               {isIncome ? <FaArrowUp className="mr-2"/> : <FaArrowDown className="mr-2"/>} {transaction.type} Record
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="stat bg-base-200 rounded-[2rem] p-8">
              <div className={`stat-figure ${isIncome ? 'text-success' : 'text-error'}`}>
                <FaDollarSign className="text-4xl opacity-50" />
              </div>
              <div className="stat-title font-bold uppercase text-[10px] opacity-50 tracking-widest">Transaction Amount</div>
              <div className={`stat-value text-3xl font-black ${isIncome ? 'text-success' : 'text-error'}`}>
                ${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="stat bg-base-200 rounded-[2rem] p-8 border border-base-300">
              <div className="stat-figure text-primary">
                <FaChartLine className="text-4xl opacity-50" />
              </div>
              <div className="stat-title font-bold uppercase text-[10px] opacity-50 tracking-widest">
                Total {isIncome ? 'Earned' : 'Spent'} in Category
              </div>
              <div className="stat-value text-3xl font-black text-primary">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
              <div className="stat-desc font-bold opacity-60">Category: {transaction.category}</div>
            </div>
          </div>

          <div className="divider opacity-30 font-black uppercase tracking-widest text-[10px]">Technical Information</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title again as an info field */}
            <div className="flex items-center p-5 bg-base-200 rounded-2xl">
              <FaTag className="text-2xl text-primary mr-5" />
              <div>
                <span className="text-[10px] uppercase font-black opacity-40 leading-none">Record Title</span>
                <p className="font-bold text-lg leading-tight mt-1">{transaction.title || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center p-5 bg-base-200 rounded-2xl">
              <FaWallet className="text-2xl text-primary mr-5" />
              <div>
                <span className="text-[10px] uppercase font-black opacity-40 leading-none">Category</span>
                <p className="font-bold text-lg leading-tight mt-1">{transaction.category}</p>
              </div>
            </div>

            <div className="flex items-center p-5 bg-base-200 rounded-2xl">
              <FaCalendarAlt className="text-2xl text-primary mr-5" />
              <div>
                <span className="text-[10px] uppercase font-black opacity-40 leading-none">Transaction Date</span>
                <p className="font-bold text-lg leading-tight mt-1">
                  {new Date(transaction.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center p-5 bg-base-200 rounded-2xl md:col-span-2">
              <FaPencilAlt className="text-2xl text-primary mr-5" />
              <div>
                <span className="text-[10px] uppercase font-black opacity-40 leading-none">Detailed Description</span>
                <p className="font-medium text-base-content/80 mt-1 leading-relaxed">
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
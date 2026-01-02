import { FaWallet, FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

const Stats = ({ user, loading, data }) => {
  if (!user) {
    return (
      <section className="text-center py-10 bg-base-200 rounded-3xl">
        <h2 className="text-2xl font-bold mb-2">Your Financial Overview</h2>
        <p className="text-base-content/60">Please login to view your balance and transaction summary.</p>
      </section>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-10">Your Financial Overview</h2>
      <div className="stats stats-vertical lg:stats-horizontal shadow-2xl w-full bg-base-100 border border-base-300 rounded-3xl overflow-hidden">
        <div className="stat place-items-center py-8">
          <div className="stat-figure text-primary">
            <FaWallet className="text-4xl" />
          </div>
          <div className="stat-title font-medium">Current Balance</div>
          <div className="stat-value text-primary">${data.balance.toLocaleString()}</div>
          <div className="stat-desc">Overall available funds</div>
        </div>

        <div className="stat place-items-center py-8">
          <div className="stat-figure text-success">
            <FaArrowCircleUp className="text-4xl" />
          </div>
          <div className="stat-title font-medium">Total Income</div>
          <div className="stat-value text-success">${data.income.toLocaleString()}</div>
          <div className="stat-desc text-success">↗︎ Total earnings recorded</div>
        </div>

        <div className="stat place-items-center py-8">
          <div className="stat-figure text-error">
            <FaArrowCircleDown className="text-4xl" />
          </div>
          <div className="stat-title font-medium">Total Expenses</div>
          <div className="stat-value text-error">${data.expense.toLocaleString()}</div>
          <div className="stat-desc text-error">↘︎ Total spending recorded</div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
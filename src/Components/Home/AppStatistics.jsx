import { motion } from "framer-motion";
import { FaUsers, FaChartLine, FaShieldAlt, FaStar } from "react-icons/fa";

const AppStatistics = () => {
  const stats = [
    {
      id: 1,
      label: "Active Users",
      value: "50K+",
      icon: <FaUsers />,
      bg: "bg-blue-500/10",
      text: "text-blue-600",
    },
    {
      id: 2,
      label: "Monthly Growth",
      value: "120%",
      icon: <FaChartLine />,
      bg: "bg-emerald-500/10",
      text: "text-emerald-600",
    },
    {
      id: 3,
      label: "User Rating",
      value: "4.9/5",
      icon: <FaStar />,
      bg: "bg-amber-500/10",
      text: "text-amber-600",
    },
    {
      id: 4,
      label: "Data Security",
      value: "100%",
      icon: <FaShieldAlt />,
      bg: "bg-purple-500/10",
      text: "text-purple-600",
    },
  ];

  return (
    <section className="py-12 bg-base-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">FinEase by the Numbers</h2>
        <p className="text-base-content/60 max-w-xl mx-auto">
          We take pride in our numbers. Join thousands of users who trust us with their financial journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            whileHover={{ y: -10 }}
            className="relative overflow-hidden group p-8 rounded-[2rem] bg-base-100 border border-base-300 shadow-sm hover:shadow-2xl transition-all duration-300"
          >
            {/* Background Decorative Circle */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${stat.bg} blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.text} text-3xl mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl font-extrabold mb-1 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-base-content/60 font-medium uppercase tracking-wider text-xs">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AppStatistics;
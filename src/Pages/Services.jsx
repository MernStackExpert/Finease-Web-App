import { motion } from "framer-motion";
import { FaChartPie, FaWallet, FaBell, FaFileInvoiceDollar, FaShieldAlt, FaMobileAlt } from "react-icons/fa";

const services = [
  {
    title: "Expense Tracking",
    desc: "Automatically categorize and track your daily spending with ease.",
    icon: <FaWallet className="text-primary" />,
    color: "bg-primary/10"
  },
  {
    title: "Financial Analytics",
    desc: "Get deep insights into your finances with professional charts and reports.",
    icon: <FaChartPie className="text-secondary" />,
    color: "bg-secondary/10"
  },
  {
    title: "Smart Notifications",
    desc: "Never miss a bill payment with our smart alert and notification system.",
    icon: <FaBell className="text-accent" />,
    color: "bg-accent/10"
  },
  {
    title: "Budget Management",
    desc: "Set monthly limits for different categories and stay within your budget.",
    icon: <FaFileInvoiceDollar className="text-info" />,
    color: "bg-info/10"
  },
  {
    title: "Secure Data",
    desc: "Your data is encrypted with enterprise-grade security and JWT authentication.",
    icon: <FaShieldAlt className="text-success" />,
    color: "bg-success/10"
  },
  {
    title: "Cloud Sync",
    desc: "Access your financial data from any device, anywhere in the world.",
    icon: <FaMobileAlt className="text-warning" />,
    color: "bg-warning/10"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen pt-20 pb-10 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-4"
          >
            Our Professional <span className="text-primary">Services</span>
          </motion.h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="card bg-base-200 shadow-xl border border-base-300 hover:border-primary transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                <div className={`p-4 rounded-2xl text-4xl mb-4 ${service.color}`}>
                  {service.icon}
                </div>
                <h2 className="card-title text-2xl mb-2">{service.title}</h2>
                <p className="text-base-content/70">{service.desc}</p>
               
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
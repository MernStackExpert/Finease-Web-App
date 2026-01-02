import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-base-200 py-20 lg:py-32 rounded-b-[50px] shadow-inner">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
            Smart Way to <span className="text-primary">Manage</span> Your Money
          </h1>
          <p className="text-lg text-base-content/70 mb-8 max-w-lg mx-auto lg:mx-0">
            Track expenses, set budgets, and visualize your financial growth with FinEase. The all-in-one personal finance manager.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link to="/add-transaction" className="btn btn-primary btn-lg shadow-xl">Start Tracking</Link>
            <Link to="/services" className="btn btn-outline btn-lg">Our Services</Link>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1"
        >
          <img src="https://i.ibb.co.com/8L0Yy0p/finance-hero.png" alt="Finance Illustration" className="w-full max-w-lg mx-auto drop-shadow-2xl" />
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
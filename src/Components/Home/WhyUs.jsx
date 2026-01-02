import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaChartLine,
  FaShieldAlt,
  FaMobileAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { Link } from "react-router";

const WhyUs = () => {
  const points = [
    {
      title: "Simple & Intuitive UI",
      desc: "User-friendly design for effortless navigation.",
      icon: <FaChartLine />,
    },
    {
      title: "No Hidden Fees",
      desc: "Transparent pricing with no unexpected charges.",
      icon: <FaShieldAlt />,
    },
    {
      title: "Multi-device Sync",
      desc: "Access your data from any device, anytime.",
      icon: <FaMobileAlt />,
    },
    {
      title: "Exportable Reports",
      desc: "Download professional financial statements.",
      icon: <FaCloudUploadAlt />,
    },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Left Side: Image Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 order-2 lg:order-1 relative"
        >
          <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-3xl -z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop"
            className="rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-base-200 w-full h-[500px] object-cover"
            alt="Business Professional Tracking Finance"
          />
          {/* Floating Card Detail */}
          <div className="absolute bottom-10 -right-5 bg-base-100 p-6 rounded-2xl shadow-2xl hidden md:block border border-base-300">
            <div className="flex items-center gap-4">
              <div className="bg-success/20 p-3 rounded-full text-success">
                <FaCheckCircle className="text-2xl" />
              </div>
              <div>
                <p className="font-bold text-lg text-base-content">
                  Secure & Verified
                </p>
                <p className="text-sm opacity-60">100% Data Protection</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 order-1 lg:order-2"
        >
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
            Our Advantages
          </span>
          <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
            Why Thousands Trust <span className="text-primary">FinEase</span>
          </h2>
          <p className="text-base-content/70 text-lg mb-10">
            Managing finances doesn't have to be complicated. We provide the
            tools you need to take full control of your money with confidence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {points.map((item, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="text-primary text-2xl mt-1 group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-sm text-base-content/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link to="/services">
              <button className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/30">
                Explore More Features
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;

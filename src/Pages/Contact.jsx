import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you! Your message has been sent.");
    e.target.reset();
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-base-200">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-base-content/70">Have questions? We are here to help you manage your finances better.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card bg-base-100 shadow-xl p-6 flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-full text-primary text-2xl">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="font-bold">Phone</h3>
                <p>+880 1335-106731</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl p-6 flex flex-row items-center gap-4">
              <div className="bg-secondary/10 p-4 rounded-full text-secondary text-2xl">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="font-bold">Email</h3>
                <p>support@finease.com</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl p-6 flex flex-row items-center gap-4">
              <div className="bg-accent/10 p-4 rounded-full text-accent text-2xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="font-bold">Office</h3>
                <p>Level-4, Awal Centre, Banani, Dhaka</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="card bg-base-100 shadow-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">Name</label>
                <input type="text" placeholder="Your Name" className="input input-bordered focus:input-primary" required />
              </div>
              <div className="form-control">
                <label className="label">Email</label>
                <input type="email" placeholder="Your Email" className="input input-bordered focus:input-primary" required />
              </div>
              <div className="form-control">
                <label className="label">Message</label>
                <textarea className="textarea textarea-bordered h-32 focus:textarea-primary" placeholder="How can we help?" required></textarea>
              </div>
              <button className="btn btn-primary w-full mt-4">Send Message</button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
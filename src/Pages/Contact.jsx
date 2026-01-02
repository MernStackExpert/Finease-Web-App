import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you! Your message has been sent.");
    e.target.reset();
  };

  return (
    <div className="min-h-screen pt-24 bg-base-200 flex flex-col max-w-[1400px] mx-auto">
      <title>FinEase | Contact Us</title>
      
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 w-full flex-grow pb-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black text-base-content uppercase tracking-tight mb-4">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="max-w-xl mx-auto opacity-60 font-medium italic">
            Questions about your wallet or transactions? Our team is ready to assist you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Contact Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="bg-base-100 p-8 rounded-[2rem] shadow-sm border border-base-300 flex items-center gap-6 group">
              <div className="bg-primary/10 p-5 rounded-2xl text-primary text-2xl group-hover:scale-110 transition-transform">
                <FaPhoneAlt />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black opacity-40 tracking-widest mb-1">Call Support</p>
                <h3 className="text-lg font-bold text-base-content">+880 1908-716502</h3>
              </div>
            </div>

            <div className="bg-base-100 p-8 rounded-[2rem] shadow-sm border border-base-300 flex items-center gap-6 group">
              <div className="bg-secondary/10 p-5 rounded-2xl text-secondary text-2xl group-hover:scale-110 transition-transform">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black opacity-40 tracking-widest mb-1">Email Inquiry</p>
                <h3 className="text-lg font-bold text-base-content leading-tight">mdnirob30k@gmail.com</h3>
              </div>
            </div>

            <div className="bg-base-100 p-8 rounded-[2rem] shadow-sm border border-base-300 flex items-center gap-6 group">
              <div className="bg-accent/10 p-5 rounded-2xl text-accent text-2xl group-hover:scale-110 transition-transform">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black opacity-40 tracking-widest mb-1">Our Office</p>
                <h3 className="text-lg font-bold text-base-content leading-tight">Rajshahi, Bangladesh</h3>
              </div>
            </div>
          </motion.div>

          {/* Improved Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-base-100 rounded-[3rem] shadow-xl p-8 md:p-12 border border-base-300"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label font-bold text-xs uppercase opacity-40 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="input input-bordered bg-base-200 border-none rounded-2xl focus:outline-primary font-bold h-14" 
                    required 
                  />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-xs uppercase opacity-40 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="input input-bordered bg-base-200 border-none rounded-2xl focus:outline-primary font-bold h-14" 
                    required 
                  />
                </div>
              </div>

              {/* Subject - Full Width */}
              <div className="form-control w-full">
                <label className="label font-bold text-xs uppercase opacity-40 mb-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help you?" 
                  className="input input-bordered bg-base-200 border-none rounded-2xl focus:outline-primary font-bold h-14 w-full" 
                  required 
                />
              </div>

              {/* Message - Full Width */}
              <div className="form-control w-full">
                <label className="label font-bold text-xs uppercase opacity-40 mb-1">Detailed Message</label>
                <textarea 
                  className="textarea textarea-bordered bg-base-200 border-none rounded-2xl focus:outline-primary font-medium h-40 pt-4 w-full" 
                  placeholder="Tell us more about your inquiry..." 
                  required
                ></textarea>
              </div>

              <button className="btn btn-primary btn-lg w-full rounded-2xl h-16 shadow-xl shadow-primary/20 gap-3 text-white font-black uppercase tracking-widest transition-all hover:scale-[1.02]">
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Full Width Original Color Map */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className=" w-full h-[450px] mt-auto relative border-t-8 border-base-100 shadow-2xl"
      >
        <iframe 
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58122.93608796851!2d88.55836261546252!3d24.37315183494793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefd0a5588865%3A0x35bc8583489e746e!2sRajshahi!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd" 
          className="w-full h-full"
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
        ></iframe>
      </motion.div>
    </div>
  );
};

export default Contact;
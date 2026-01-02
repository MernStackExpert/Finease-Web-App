import { motion } from "framer-motion";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useContext } from "react";
import { FaArrowRight, FaRocket } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthContext";

const Hero = () => {
  const { user } = useContext(AuthContext);

  const slides = [
    {
      title: "Smart Way to Manage Your Money",
      desc: "Track expenses, set budgets, and visualize your financial growth with our intuitive dashboard.",
      img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop",
      loginBtnText: "Go to Dashboard",
      loginLink: "/my-transaction",
      guestBtnText: "Start Tracking",
      guestLink: "/auth/login"
    },
    {
      title: "Achieve Your Financial Goals",
      desc: "Planning for the future? Set smart budgets and save more for the things that matter most.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
      loginBtnText: "View Reports",
      loginLink: "/reports",
      guestBtnText: "Join Now",
      guestLink: "/auth/register"
    },
    {
      title: "Secure & Reliable Insights",
      desc: "Get real-time analytics and enterprise-grade security for all your financial data.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      loginBtnText: "Add Transaction",
      loginLink: "/add-transaction",
      guestBtnText: "Get Started",
      guestLink: "/auth/login"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-base-100 rounded-[50px] border border-base-300 shadow-sm mt-5">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="container mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                   <FaRocket /> {user ? "Welcome Back!" : "Limited Time Offer"}
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
                  {slide.title.split(" ").map((word, i) => 
                    ["Manage", "Financial", "Insights", "Goals"].includes(word) ? 
                    <span key={i} className="text-primary"> {word} </span> : word + " "
                  )}
                </h1>
                
                <p className="text-lg text-base-content/60 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  {slide.desc}
                </p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {user ? (
                    <Link 
                      to={slide.loginLink} 
                      className="btn btn-primary btn-lg shadow-lg shadow-primary/20 px-10 rounded-2xl group"
                    >
                      {slide.loginBtnText}
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <Link 
                      to={slide.guestLink} 
                      className="btn btn-primary btn-lg shadow-lg shadow-primary/20 px-10 rounded-2xl group"
                    >
                      {slide.guestBtnText}
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  
                  <Link to="/services" className="btn btn-outline btn-lg rounded-2xl px-10 border-base-300 hover:bg-base-200 hover:text-base-content hover:border-base-300">
                    Our Services
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex-1 w-full"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src={slide.img}
                    alt="Financial Growth"
                    className="relative w-full max-w-lg mx-auto rounded-[2.5rem] shadow-2xl border-8 border-base-100 object-cover h-[400px]"
                  />
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-button-next, .swiper-button-prev { color: hsl(var(--p)); }
        .swiper-button-next:after, .swiper-button-prev:after { font-size: 20px; font-weight: 900; }
        .swiper-pagination-bullet { background: hsl(var(--bc)); opacity: 0.2; width: 12px; height: 12px; }
        .swiper-pagination-bullet-active { background: hsl(var(--p)); opacity: 1; width: 30px; border-radius: 10px; transition: all 0.3s; }
      `}} />
    </section>
  );
};

export default Hero;
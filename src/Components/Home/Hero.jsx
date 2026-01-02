import { motion } from "framer-motion";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Hero = () => {
  const slides = [
    {
      title: "Smart Way to Manage Your Money",
      desc: "Track expenses, set budgets, and visualize your financial growth with our intuitive dashboard.",
      img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop",
      btnText: "Start Tracking",
      link: "/add-transaction"
    },
    {
      title: "Achieve Your Financial Goals",
      desc: "Planning for the future? Set smart budgets and save more for the things that matter most.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
      btnText: "Learn More",
      link: "/services"
    },
    {
      title: "Secure & Reliable Insights",
      desc: "Get real-time analytics and enterprise-grade security for all your financial data.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      btnText: "Get Started",
      link: "/register"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-base-200 rounded-b-[50px] shadow-inner">
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
            <div className="container mx-auto px-4 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 text-center lg:text-left"
              >
                <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
                  {slide.title.split(" ").map((word, i) => 
                    word === "Manage" || word === "Financial" || word === "Insights" ? 
                    <span key={i} className="text-primary"> {word} </span> : word + " "
                  )}
                </h1>
                <p className="text-lg text-base-content/70 mb-8 max-w-lg mx-auto lg:mx-0">
                  {slide.desc}
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Link to={slide.link} className="btn btn-primary btn-lg shadow-xl px-10 rounded-full">
                    {slide.btnText}
                  </Link>
                  <Link to="/services" className="btn btn-outline btn-lg rounded-full px-10">
                    Our Services
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex-1"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
                  <img
                    src={slide.img}
                    alt="Financial Growth"
                    className="relative w-full max-w-lg mx-auto rounded-3xl shadow-2xl border-4 border-base-100 object-cover h-[350px]"
                  />
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-button-next, .swiper-button-prev { color: hsl(var(--p)); }
        .swiper-button-next:after, .swiper-button-prev:after { font-size: 24px; font-weight: bold; }
        .swiper-pagination-bullet { background: hsl(var(--bc)); opacity: 0.3; }
        .swiper-pagination-bullet-active { background: hsl(var(--p)); opacity: 1; }
      `}} />
    </section>
  );
};

export default Hero;
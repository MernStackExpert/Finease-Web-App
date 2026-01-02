import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Software Engineer",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      text: "FinEase changed the way I track my expenses. The charts are super intuitive and helped me save $400 last month!",
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Marketing Manager",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      text: "I've tried many apps, but FinEase is by far the cleanest. The budget alerts keep me from overspending on non-essentials.",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Freelance Designer",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      text: "Managing variable income as a freelancer was a nightmare until I found this app. Highly recommended for professionals!",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Student",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
      text: "Simple, easy, and fast! I can add my lunch expenses in seconds. Perfect for staying on top of my small budget.",
    },
    {
      id: 5,
      name: "Michael Ross",
      role: "Entrepreneur",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      text: "The data security and cloud sync features are top-notch. I can check my business overheads on the go with full confidence.",
    },
    {
      id: 6,
      name: "Jessica White",
      role: "Real Estate Agent",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      text: "FinEase helped me realize I was spending too much on subscriptions. I cut down my costs by 20% in just two weeks!",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-black mb-4 uppercase tracking-tight">
          What Our <span className="text-primary">Users Say</span>
        </h2>
        <p className="text-base-content/60 max-w-lg mx-auto">
          Join thousands of people who are already taking control of their financial future.
        </p>
      </motion.div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Autoplay, Pagination]}
        className="pb-16"
      >
        {reviews.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-base-200 p-8 rounded-3xl h-full border border-base-300 flex flex-col justify-between hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl group">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <FaQuoteLeft className="text-4xl text-primary/20 group-hover:text-primary transition-colors duration-300" />
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
                <p className="text-base-content/80 italic mb-8 leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={item.img} alt={item.name} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg">{item.name}</h4>
                  <p className="text-xs font-semibold opacity-60 uppercase tracking-widest">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination-bullet-active { background: hsl(var(--p)); }
      `}} />
    </section>
  );
};

export default Testimonials;
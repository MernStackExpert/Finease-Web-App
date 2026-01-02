const Newsletter = () => (
  <section className="bg-primary rounded-[40px] p-12 text-primary-content text-center relative overflow-hidden">
    <div className="relative z-10">
      <h2 className="text-4xl font-black mb-4">Get Financial Freedom</h2>
      <p className="mb-8 opacity-80 text-lg">Join 5,000+ subscribers getting weekly money-saving tips.</p>
      <div className="flex flex-col sm:row max-w-md mx-auto gap-3">
        <input type="email" placeholder="Enter your email" className="input input-bordered w-full text-base-content" />
        <button className="btn btn-neutral px-8">Subscribe Now</button>
      </div>
    </div>
    <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
  </section>
);
export default Newsletter;
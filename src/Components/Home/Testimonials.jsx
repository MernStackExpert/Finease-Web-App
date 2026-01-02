const Testimonials = () => (
  <section>
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-2">Loved by Users</h2>
      <p className="text-base-content/60">See how FinEase is helping people save more.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-base-200 p-8 rounded-2xl relative">
          <span className="text-6xl text-primary/20 absolute top-4 left-4 font-serif">“</span>
          <p className="relative z-10 mb-6 italic">"FinEase made it so simple to see where my money was going. I saved $500 in my first month!"</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">JD</div>
            <div>
              <h4 className="font-bold">John Doe</h4>
              <p className="text-xs opacity-50">Freelancer</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
export default Testimonials;
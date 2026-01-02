const RecentBlogs = () => (
  <section>
    <div className="flex justify-between items-end mb-10">
      <h2 className="text-3xl font-bold">Financial Insights</h2>
      <button className="btn btn-link btn-primary">View All Blogs</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="group cursor-pointer">
          <div className="overflow-hidden rounded-2xl mb-4">
            <img src={`https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=400&auto=format&fit=crop`} className="w-full h-48 object-cover group-hover:scale-110 transition-duration-500" alt="Blog" />
          </div>
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">10 Tips to Save Money in 2026</h3>
          <p className="text-sm opacity-60 mt-2">Jan 02, 2026 • 5 min read</p>
        </div>
      ))}
    </div>
  </section>
);
export default RecentBlogs;
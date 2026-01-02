const CategoriesOverview = () => (
  <section>
    <h2 className="text-3xl font-bold text-center mb-10">Popular Categories</h2>
    <div className="flex flex-wrap justify-center gap-4">
      {["Food", "Rent", "Salary", "Shopping", "Medical", "Travel"].map(cat => (
        <div key={cat} className="badge badge-outline badge-lg p-6 hover:bg-primary hover:text-white transition-all cursor-default">
          {cat}
        </div>
      ))}
    </div>
  </section>
);
export default CategoriesOverview;
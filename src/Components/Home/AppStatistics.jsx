const AppStatistics = () => (
  <section className="bg-neutral text-neutral-content rounded-3xl p-12 text-center">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="space-y-2">
        <h2 className="text-5xl font-black text-primary">250K+</h2>
        <p className="uppercase tracking-widest text-sm opacity-70">Transactions Tracked</p>
      </div>
      <div className="space-y-2 border-y md:border-y-0 md:border-x border-neutral-focus py-8 md:py-0">
        <h2 className="text-5xl font-black text-secondary">40K+</h2>
        <p className="uppercase tracking-widest text-sm opacity-70">Active Monthly Users</p>
      </div>
      <div className="space-y-2">
        <h2 className="text-5xl font-black text-accent">99.9%</h2>
        <p className="uppercase tracking-widest text-sm opacity-70">Uptime Reliability</p>
      </div>
    </div>
  </section>
);
export default AppStatistics;
const Newsletter = () => (
  <section className="bg-secondary/10 rounded-2xl p-10 text-center border border-secondary/20">
    <h2 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h2>
    <p className="mb-6 opacity-70">Get weekly financial tips and app updates.</p>
    <div className="flex max-w-md mx-auto gap-2">
      <input type="email" placeholder="email@example.com" className="input input-bordered w-full" />
      <button className="btn btn-secondary">Join</button>
    </div>
  </section>
);
export default Newsletter;
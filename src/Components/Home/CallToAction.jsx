import { Link } from "react-router";

const CallToAction = () => (
  <section className="py-20 text-center border-t border-base-300">
    <h2 className="text-4xl font-bold mb-6">Ready to Take Control?</h2>
    <p className="text-xl opacity-60 mb-10">Join FinEase today and start your journey towards financial independence.</p>
    <Link to="/register" className="btn btn-primary btn-wide rounded-full text-lg shadow-2xl">Create Free Account</Link>
  </section>
);
export default CallToAction;
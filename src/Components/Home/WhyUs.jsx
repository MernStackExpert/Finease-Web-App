import { FaCheckCircle } from "react-icons/fa";

const WhyUs = () => (
  <section className="flex flex-col lg:flex-row items-center gap-16">
    <div className="flex-1 order-2 lg:order-1">
      <h2 className="text-4xl font-bold mb-6">Why Thousands Trust <span className="text-primary">FinEase</span></h2>
      <ul className="space-y-4">
        {["Simple & Intuitive UI", "No Hidden Subscription Fees", "Multi-device Synchronization", "Exportable Financial Reports"].map((item, idx) => (
          <li key={idx} className="flex items-center gap-3 text-lg">
            <FaCheckCircle className="text-success text-xl" /> {item}
          </li>
        ))}
      </ul>
    </div>
    <div className="flex-1 order-1 lg:order-2">
      <img src="https://i.ibb.co.com/mX93fS3/why-us.png" className="rounded-2xl shadow-2xl" alt="Trust" />
    </div>
  </section>
);
export default WhyUs;
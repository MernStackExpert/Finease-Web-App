import { FaShieldAlt, FaChartPie, FaBolt } from "react-icons/fa";

const Features = () => {
  const features = [
    { title: "Ultra Secure", desc: "Enterprise-level encryption for your data.", icon: <FaShieldAlt />, color: "text-blue-500" },
    { title: "Real-time Analytics", desc: "Instant visual reports of your spending.", icon: <FaChartPie />, color: "text-green-500" },
    { title: "Fast Tracking", desc: "Add transactions in less than 5 seconds.", icon: <FaBolt />, color: "text-yellow-500" },
  ];

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="card bg-base-100 shadow-xl border border-base-200 hover:border-primary transition-all p-8 text-center group">
            <div className={`text-4xl mb-4 flex justify-center ${f.color} group-hover:scale-110 transition-transform`}>{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-base-content/60">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Features;
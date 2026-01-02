import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { useAxios } from "../Hooks/useAxios";
import Features from "../Components/Home/Features";
import AppStatistics from "../Components/Home/AppStatistics";
import WhyUs from "../Components/Home/WhyUs";
import Testimonials from "../Components/Home/Testimonials";
import RecentBlogs from "../Components/Home/RecentBlogs";
import FAQ from "../Components/Home/FAQ";
import Newsletter from "../Components/Home/Newsletter";
import CallToAction from "../Components/Home/CallToAction";
import Hero from "../Components/Home/Hero";
import Stats from "../Components/Home/Stats";

// Components

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  const [financialData, setFinancialData] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.email) return;
      setLoading(true);
      try {
        const res = await axios.get(`/transactions?email=${user.email}`);
        const transactions = res.data || [];
        let income = 0;
        let expense = 0;
        transactions.forEach((t) => {
          if (t.type.toLowerCase() === "income") income += parseFloat(t.amount);
          else if (t.type.toLowerCase() === "expense")
            expense += parseFloat(t.amount);
        });
        setFinancialData({ income, expense, balance: income - expense });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [user?.email]);

  return (
    <div className="bg-base-100 overflow-hidden">
      <title>FinEase | Master Your Money</title>

      <Hero />
      <div className="container mx-auto px-4 space-y-24 py-10">
        <Stats user={user} loading={loading} data={financialData} />
        <Features />
        <AppStatistics />
        <WhyUs />
        <Testimonials />
        <RecentBlogs />
        <FAQ />
        <Newsletter />
        <CallToAction />
      </div>
    </div>
  );
};

export default Home;

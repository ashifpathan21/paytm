import { getProfile } from "@/api/services/userService";
import type { AppDispatch, Store } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  Shield,
  Zap,
  ArrowRight,
  TrendingUp,
  Globe,
} from "lucide-react";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: Store) => state.user.token);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(getProfile(token, navigate));
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Payments",
      description:
        "Process transactions in seconds with our lightning-fast payment infrastructure",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description:
        "Your tokens are protected with enterprise-grade encryption and security protocols",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Access",
      description: "Send and receive payments anywhere in the world, anytime",
    },
  ];

  const stats = [
    { value: "500K+", label: "Active Users" },
    { value: "$2.5B", label: "Processed" },
    { value: "150+", label: "Countries" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 left-20 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div
            className={`text-center transition-all duration-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative p-4 bg-gradient-to-br from-blue-600 to-slate-800 rounded-2xl shadow-lg">
                <Wallet className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-slate-800 text-transparent bg-clip-text">
                SmartPay
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto">
              The future of digital payments. Fast, secure, and built for the
              modern world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/login")}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-slate-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Started
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold text-lg border-2 border-slate-200 hover:border-blue-300 hover:bg-slate-50 transition-all duration-300 hover:scale-105 shadow-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-32">
        <div className="bg-white rounded-3xl border-2 border-slate-100 p-8 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-slate-800 text-transparent bg-clip-text mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Why Choose SmartPay?
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need for seamless digital payments
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border-2 border-slate-100 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="inline-flex p-3 bg-gradient-to-br from-blue-600 to-slate-800 text-white rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="relative bg-gradient-to-r from-blue-600 to-slate-800 rounded-3xl p-12 sm:p-16 text-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTEyVjE4aDEydjEyem0wIDEyaC0xMlYzMGgxMnYxMnptMTIgMGgtMTJWMzBoMTJ2MTJ6bTAgMTJoLTEyVjQyaDEydjEyem0wLTM2aC0xMlYxOGgxMnYxMnptMTIgMjRoLTEyVjMwaDEydjEyem0wIDEyaC0xMlY0MmgxMnYxMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
          </div>
          <div className="relative z-10">
            <div className="inline-flex p-4 bg-white/20 rounded-2xl mb-6">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Payments?
            </h2>
            <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust SmartPay for their digital
              transactions
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Create Your Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-slate-100 py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-slate-800 rounded-lg mr-3">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900">
                SmartPay
              </span>
            </div>
            <div className="text-slate-600 text-sm">
              © 2025 SmartPay. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;

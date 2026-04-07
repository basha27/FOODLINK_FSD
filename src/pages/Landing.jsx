import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Zap, TrendingUp, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  const navigate = useNavigate();

  const scrollToRoles = () => {
    const el = document.getElementById('roles');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const roleCards = [
    { title: 'Admin', icon: <Shield className="w-8 h-8 text-brand-darkGreen" />, path: '/login/admin', desc: 'Manage the entire platform.' },
    { title: 'Donor', icon: <Heart className="w-8 h-8 text-rose-500" />, path: '/login/donor', desc: 'Donate extra food seamlessly.' },
    { title: 'Acceptor', icon: <Smile className="w-8 h-8 text-brand-orange" />, path: '/login/acceptor', desc: 'Securely claim suitable food.' },
    { title: 'Data Analyst', icon: <TrendingUp className="w-8 h-8 text-blue-500" />, path: '/login/analyst', desc: 'Optimize matching visually.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <Zap className="h-8 w-8 text-brand-orange" />
              <span className="font-bold text-2xl tracking-tight text-brand-darkGreen">Food Link</span>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={scrollToRoles}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-darkGreen transition-colors"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <span className="bg-brand-lightGreen text-brand-darkGreen px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-6 inline-block shadow-sm">
            Zero Food Waste Mission
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
            Rescue Surplus. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">Feed Futures.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto mb-10">
            A smart logistics infrastructure for seamlessly matching surplus food from events with communities in need, guided by real-time intelligence.
          </p>
          
          <div className="flex justify-center flex-col sm:flex-row gap-4">
            <button 
               onClick={scrollToRoles}
               className="px-8 py-4 bg-brand-green text-white rounded-full font-bold text-lg hover:bg-brand-darkGreen hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5"/>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Role Selection */}
      <section id="roles" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Portal</h2>
            <p className="text-gray-600 max-w-xl mx-auto text-lg">Secure enterprise authentication for every facet of the ecosystem.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roleCards.map((role) => (
              <motion.div
                key={role.title}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gray-50 border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center group"
                onClick={() => navigate(role.path)}
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {role.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
                <p className="text-gray-500">{role.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-center text-gray-400">
        <div className="max-w-7xl mx-auto px-4">
          <Zap className="h-8 w-8 text-brand-orange mx-auto mb-4" />
          <p>© 2024 Food Link Enterprise. Ensuring safe food logistics since today.</p>
        </div>
      </footer>
    </div>
  );
}

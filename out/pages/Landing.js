import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Heart, Shield, Zap, TrendingUp, HandHeart } from "lucide-react";
import { motion } from "framer-motion";
export default function Landing() {
  const navigate = useNavigate();
  const roleCards = [
    { title: "Admin", icon: /* @__PURE__ */ React.createElement(Shield, { className: "w-8 h-8 text-brand-darkGreen" }), path: "/login/admin", desc: "Manage the entire platform." },
    { title: "Donor", icon: /* @__PURE__ */ React.createElement(Heart, { className: "w-8 h-8 text-rose-500" }), path: "/login/donor", desc: "Donate extra food seamlessly." },
    { title: "Acceptor", icon: /* @__PURE__ */ React.createElement(HandHeart, { className: "w-8 h-8 text-brand-orange" }), path: "/login/acceptor", desc: "Securely claim suitable food." },
    { title: "Data Analyst", icon: /* @__PURE__ */ React.createElement(TrendingUp, { className: "w-8 h-8 text-blue-500" }), path: "/login/analyst", desc: "Optimize matching visually." }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gray-50 font-sans" }, /* @__PURE__ */ React.createElement("nav", { className: "fixed w-full z-50 glass" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between h-16 items-center" }, /* @__PURE__ */ React.createElement("div", { className: "flex-shrink-0 flex items-center space-x-2" }, /* @__PURE__ */ React.createElement(Zap, { className: "h-8 w-8 text-brand-orange" }), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-2xl tracking-tight text-brand-darkGreen" }, "Food Link")), /* @__PURE__ */ React.createElement("div", { className: "flex space-x-4" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => document.getElementById("roles").scrollIntoView({ behavior: "smooth" }),
      className: "px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-darkGreen transition-colors"
    },
    "Log In"
  ))))), /* @__PURE__ */ React.createElement("section", { className: "pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center" }, /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 }
    },
    /* @__PURE__ */ React.createElement("span", { className: "bg-brand-lightGreen text-brand-darkGreen px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-6 inline-block shadow-sm" }, "Zero Food Waste Mission"),
    /* @__PURE__ */ React.createElement("h1", { className: "text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8" }, "Rescue Surplus. ", /* @__PURE__ */ React.createElement("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange" }, "Feed Futures.")),
    /* @__PURE__ */ React.createElement("p", { className: "mt-4 max-w-2xl text-xl text-gray-600 mx-auto mb-10" }, "A smart logistics infrastructure for seamlessly matching surplus food from events with communities in need, guided by real-time intelligence."),
    /* @__PURE__ */ React.createElement("div", { className: "flex justify-center flex-col sm:flex-row gap-4" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => document.getElementById("roles").scrollIntoView({ behavior: "smooth" }),
        className: "px-8 py-4 bg-brand-green text-white rounded-full font-bold text-lg hover:bg-brand-darkGreen hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
      },
      "Get Started ",
      /* @__PURE__ */ React.createElement(ArrowRight, { className: "ml-2 w-5 h-5" })
    ))
  )), /* @__PURE__ */ React.createElement("section", { id: "roles", className: "py-20 bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-16" }, /* @__PURE__ */ React.createElement("h2", { className: "text-3xl font-bold text-gray-900 mb-4" }, "Select Your Portal"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-600 max-w-xl mx-auto text-lg" }, "Secure enterprise authentication for every facet of the ecosystem.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" }, roleCards.map((role) => /* @__PURE__ */ React.createElement(
    motion.div,
    {
      key: role.title,
      whileHover: { y: -10, scale: 1.02 },
      className: "bg-gray-50 border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center group",
      onClick: () => navigate(role.path)
    },
    /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" }, role.icon),
    /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold text-gray-900 mb-2" }, role.title),
    /* @__PURE__ */ React.createElement("p", { className: "text-gray-500" }, role.desc)
  ))))), /* @__PURE__ */ React.createElement("footer", { className: "bg-gray-900 py-12 text-center text-gray-400" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-4" }, /* @__PURE__ */ React.createElement(Zap, { className: "h-8 w-8 text-brand-orange mx-auto mb-4" }), /* @__PURE__ */ React.createElement("p", null, "\xA9 2024 Food Link Enterprise. Ensuring safe food logistics since today."))));
}

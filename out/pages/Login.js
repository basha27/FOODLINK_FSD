import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import CaptchaBlock from "../components/CaptchaBlock";
import { useAuth } from "../context/AuthContext";
export default function Login() {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [step, setStep] = useState("credentials");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const roleDisplay = role ? role.charAt(0).toUpperCase() + role.slice(1) : "User";
  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!captchaVerified) return alert("Please complete the CAPTCHA first.");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1500);
  };
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return alert("Please enter full OTP.");
    setLoading(true);
    setTimeout(() => {
      login({ email, role, name: "Demo User", token: "mock-jwt-token-123" });
      navigate(`/dashboard/${role}`);
    }, 1500);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/"),
      className: "absolute top-8 left-8 flex items-center text-gray-500 hover:text-brand-darkGreen transition-colors"
    },
    /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-5 h-5 mr-2" }),
    " Back Home"
  ), /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      className: "glass max-w-md w-full p-8 rounded-3xl"
    },
    /* @__PURE__ */ React.createElement("div", { className: "text-center mb-8" }, /* @__PURE__ */ React.createElement(ShieldCheck, { className: `w-12 h-12 mx-auto mb-4 ${role === "admin" ? "text-brand-darkGreen" : role === "donor" ? "text-rose-500" : role === "acceptor" ? "text-brand-orange" : "text-blue-500"}` }), /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold text-gray-900" }, "Enterprise ", roleDisplay, " Portal"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-sm mt-2" }, "Secure access restricted to authorized personnel.")),
    step === "credentials" ? /* @__PURE__ */ React.createElement("form", { onSubmit: handleSendOTP, className: "space-y-5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "Email Address"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "email",
        required: true,
        value: email,
        onChange: (e) => setEmail(e.target.value),
        className: "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all bg-white/50",
        placeholder: "name@organization.org"
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "Password"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "password",
        required: true,
        value: password,
        onChange: (e) => setPassword(e.target.value),
        className: "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all bg-white/50",
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
      }
    ))), /* @__PURE__ */ React.createElement(CaptchaBlock, { onVerify: setCaptchaVerified }), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "submit",
        disabled: loading || !captchaVerified || !email || !password,
        className: "w-full py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-brand-darkGreen focus:ring-4 focus:ring-brand-lightGreen transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      },
      loading ? /* @__PURE__ */ React.createElement(Loader2, { className: "w-5 h-5 animate-spin" }) : "Send OTP Verification"
    )) : /* @__PURE__ */ React.createElement(
      motion.form,
      {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        onSubmit: handleVerifyOTP,
        className: "space-y-6"
      },
      /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600 mb-4" }, "We've sent a secure 6-digit code to ", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { className: "text-gray-900" }, email)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-center gap-2" }, [0, 1, 2, 3, 4, 5].map((index) => /* @__PURE__ */ React.createElement(
        "input",
        {
          key: index,
          type: "text",
          maxLength: 1,
          className: "w-12 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none bg-white font-mono",
          value: otp[index],
          onChange: (e) => {
            const newOtp = [...otp];
            newOtp[index] = e.target.value;
            setOtp(newOtp);
            if (e.target.value && e.target.nextSibling) {
              e.target.nextSibling.focus();
            }
          }
        }
      )))),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-brand-darkGreen transition-all flex items-center justify-center"
        },
        loading ? /* @__PURE__ */ React.createElement(Loader2, { className: "w-5 h-5 animate-spin mr-2" }) : "Verify & Authenticate"
      ),
      /* @__PURE__ */ React.createElement("p", { className: "text-center text-sm text-brand-green font-medium cursor-pointer hover:text-brand-darkGreen transition-colors", onClick: () => setStep("credentials") }, "Change email address")
    )
  ));
}

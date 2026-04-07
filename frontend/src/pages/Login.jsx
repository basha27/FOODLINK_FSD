import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowLeft, Loader2, ShieldCheck, MailCheck } from 'lucide-react';
import CaptchaBlock from '../components/CaptchaBlock';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [authMode, setAuthMode] = useState('login');
  const [step, setStep] = useState('credentials');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  let roleDisplay = 'User';
  if (role === 'analyst') roleDisplay = 'Data Analyst';
  else if (role === 'acceptor') roleDisplay = 'Acceptor';
  else if (role === 'donor') roleDisplay = 'Donor';
  else if (role === 'admin') roleDisplay = 'Admin';

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!captchaVerified) return alert('Please complete the CAPTCHA first.');
    if (authMode === 'signup' && !name) return alert('Please enter a display name.');

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role, action: authMode })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to trigger OTP');

      setStep('otp');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return alert('Please enter full OTP.');

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpValue })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid OTP');

      login({
        email,
        role,
        name: data.user?.name || 'User',
        token: data.token
      });

      navigate(`/dashboard/${role}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center text-gray-500 hover:text-brand-darkGreen transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back Home
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass max-w-md w-full p-8 rounded-3xl"
      >
        <div className="text-center mb-6">
          <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-brand-green" />
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">{roleDisplay}</h2>
          <p className="text-gray-500 text-sm mt-2">Secure access restricted to authorized personnel.</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'credentials' ? (
            <motion.form
              key="credentials"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSendOTP}
              className="space-y-4"
            >
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl"
                      placeholder="Organization Name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl"
                    placeholder="name@organization.org"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <CaptchaBlock onVerify={setCaptchaVerified} />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-green text-white font-bold rounded-xl"
              >
                {loading ? 'Loading...' : 'Send OTP'}
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleVerifyOTP}
              className="space-y-6"
            >
              <div className="text-center">
                <MailCheck className="w-12 h-12 text-brand-green mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-4">
                  Enter the 6-digit OTP sent to <strong>{email}</strong>
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-12 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-green text-white font-bold rounded-xl"
              >
                {loading ? 'Verifying...' : 'Verify & Enter Portal'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
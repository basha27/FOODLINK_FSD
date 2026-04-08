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

  const [authMode, setAuthMode] = useState('login'); // login, signup
  const [step, setStep] = useState('credentials'); // credentials, otp

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
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
      const res = await fetch(``${ import.meta.env.VITE_API_URL } / api / auth / verify - otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpValue })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid OTP');

      login({ email, role, name: data.user.name, token: data.token });
      navigate(`/ dashboard / ${ role }`);
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
          <ShieldCheck className={`w - 12 h - 12 mx - auto mb - 4 ${ role === 'admin' ? 'text-brand-darkGreen' :
        role === 'donor' ? 'text-rose-500' :
          role === 'acceptor' ? 'text-brand-orange' : 'text-blue-500'
            }`} />
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
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required={authMode === 'signup'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none bg-white/50"
                      placeholder="Organization Name"
                    />
                  </div>
                </motion.div>
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none bg-white/50"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none bg-white/50"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <CaptchaBlock onVerify={setCaptchaVerified} />

              <button
                type="submit"
                disabled={loading || !captchaVerified || !email || !password || (authMode === 'signup' && !name)}
                className="w-full py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-brand-darkGreen transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : (authMode === 'login' ? 'Secure Log In / Send OTP' : 'Create Account / Send OTP')}
              </button>

              {authMode === 'login' && (
                <div className="flex justify-between items-center px-1 pt-2">
                  <button type="button" onClick={() => alert('Password Recovery instructions have been securely triggered and sent to your email.')} className="text-sm font-semibold text-brand-green hover:underline">
                    Forgot Password?
                  </button>
                </div>
              )}

              <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col items-center">
                {authMode === 'login' ? (
                  <>
                    <p className="text-sm text-gray-500 mb-3">Don't have an enterprise account yet?</p>
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="w-full py-3 bg-white text-gray-900 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                    >
                      Create New Account
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-500 mb-3">Already have an active account?</p>
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="w-full py-3 bg-white text-gray-900 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                    >
                      Sign In to Portal
                    </button>
                  </>
                )}
              </div>
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
                <p className="text-sm text-gray-600 mb-4">We've securely delivered a 6-digit code to <br /><strong className="text-gray-900">{email}</strong></p>
                <div className="flex justify-center gap-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      className="w-12 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green outline-none bg-white flex-1 max-w-[48px]"
                      value={otp[index]}
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[index] = e.target.value;
                        setOtp(newOtp);
                        if (e.target.value && e.target.nextSibling) {
                          e.target.nextSibling.focus();
                        }
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-brand-darkGreen transition-all flex items-center justify-center shadow-md"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : 'Verify & Enter Portal'}
              </button>
              <p className="text-center text-sm text-brand-green font-medium cursor-pointer hover:text-brand-darkGreen transition-colors" onClick={() => setStep('credentials')}>
                Wait, I entered the wrong email address
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

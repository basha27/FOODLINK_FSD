import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';

export default function CaptchaBlock({ onVerify }) {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const simulateCaptcha = () => {
    if (verified) return;
    setLoading(true);
    setTimeout(() => {
      setVerified(true);
      setLoading(false);
      onVerify(true);
    }, 1200);
  };

  return (
    <div 
      className={`border rounded-lg p-3 flexItems-center justify-between cursor-pointer transition-all ${verified ? 'border-brand-green bg-brand-lightGreen/20' : 'border-gray-200 hover:bg-gray-50'}`}
      onClick={simulateCaptcha}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-6 h-6 border-2 rounded ${verified ? 'border-brand-green bg-brand-green flex items-center justify-center' : 'border-gray-300'}`}>
          {loading && <RefreshCw className="w-4 h-4 text-brand-green animate-spin" />}
          {verified && <CheckCircle2 className="w-5 h-5 text-white" />}
        </div>
        <span className={`font-medium ${verified ? 'text-brand-darkGreen' : 'text-gray-700'}`}>
          {verified ? 'Verification success' : 'I am human'}
        </span>
      </div>
      <ShieldAlert className="w-6 h-6 text-gray-400" />
    </div>
  );
}

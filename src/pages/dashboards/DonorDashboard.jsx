import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Camera, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DonorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAddForm = location.pathname.includes('/add');
  const [foodPhoto, setFoodPhoto] = useState(null);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex space-x-4 mb-8">
        <button 
          onClick={() => navigate('/dashboard/donor')}
          className={`px-6 py-2.5 rounded-full font-bold transition-all ${!isAddForm ? 'bg-brand-green text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          My Impact
        </button>
        <button 
          onClick={() => navigate('/dashboard/donor/add')}
          className={`px-6 py-2.5 rounded-full font-bold transition-all ${isAddForm ? 'bg-brand-green text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          Donate Extras
        </button>
      </div>

      {!isAddForm ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass p-6 rounded-2xl text-center border-l-4 border-brand-green">
              <h4 className="text-gray-500 text-sm font-semibold uppercase">Total Food Donated</h4>
              <p className="text-4xl font-black text-gray-900 mt-2">1,240 <span className="text-sm text-gray-500 font-medium tracking-normal">kg</span></p>
            </div>
            <div className="glass p-6 rounded-2xl text-center border-l-4 border-brand-orange">
              <h4 className="text-gray-500 text-sm font-semibold uppercase">People Fed</h4>
              <p className="text-4xl font-black text-gray-900 mt-2">~3,100</p>
            </div>
            <div className="glass p-6 rounded-2xl text-center border-l-4 border-blue-500">
              <h4 className="text-gray-500 text-sm font-semibold uppercase">CO2 Emissions Saved</h4>
              <p className="text-4xl font-black text-gray-900 mt-2">2.5 <span className="text-sm text-gray-500 font-medium tracking-normal">tons</span></p>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Recent Donations</h3>
            <div className="space-y-4">
              {[
                { date: 'Today, 2:30 PM', item: 'Wedding Buffet Leftovers', qty: '45 kg', status: 'Picked Up', to: 'Grace Orphanage' },
                { date: 'Oct 12, 11:00 AM', item: 'Conference Lunch Boxes', qty: '120 boxes', status: 'Completed', to: 'Downtown Shelter' },
                { date: 'Sep 28, 9:00 PM', item: 'Bakery Surplus', qty: '15 kg', status: 'Completed', to: 'Senior Care Center' },
              ].map((d, i) => (
                <div key={i} className="flex justify-between items-center p-5 border border-gray-100 rounded-2xl hover:shadow-md transition-all bg-white/40">
                  <div>
                    <h5 className="font-bold text-gray-900 text-lg">{d.item}</h5>
                    <div className="flex space-x-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-brand-orange"/> {d.date}</span>
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-blue-500"/> {d.to}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{d.qty}</p>
                    <span className="inline-block mt-1 px-3 py-1 bg-brand-lightGreen text-brand-darkGreen rounded-full text-xs font-bold flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1"/> {d.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">List a new Donation</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Food Description</label>
                <input type="text" className="w-full p-3 border border-gray-200 rounded-xl" placeholder="e.g. Mixed Buffet, Veg & Non-Veg..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg or servings)</label>
                <input type="text" className="w-full p-3 border border-gray-200 rounded-xl" placeholder="e.g. 50 servings" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                  <input type="text" className="w-full pl-10 p-3 border border-gray-200 rounded-xl" placeholder="Event hall block C..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Pickup Window</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                  <input type="text" className="w-full pl-10 p-3 border border-gray-200 rounded-xl" placeholder="e.g. 2:00 PM - 5:00 PM today" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo of Food (Optional)</label>
              <div className="relative border-2 border-dashed border-brand-green/30 rounded-2xl p-8 text-center hover:bg-brand-lightGreen/20 transition-colors cursor-pointer overflow-hidden">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFoodPhoto(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                {foodPhoto ? (
                  <div className="flex flex-col items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-brand-green mx-auto mb-2" />
                    <p className="text-brand-darkGreen font-bold truncate px-4">{foodPhoto.name}</p>
                    <p className="text-xs text-brand-green mt-1">Click to change photo</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Camera className="w-10 h-10 text-brand-orange mx-auto mb-2" />
                    <p className="text-gray-600 font-medium whitespace-nowrap overflow-hidden text-clip relative px-4 w-[min(100%,300px)]">
                      <span className="inline-block relative">
                        Click to upload or drag and drop
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 bg-white">Additional Notes (Freshness, Allergens, etc.)</label>
              <textarea className="w-full p-3 border border-gray-200 rounded-xl h-24" placeholder="Prepared 1 hour ago. Safe for consumption for next 6 hours..."></textarea>
            </div>

            <button type="button" onClick={() => { alert('Donation safely submitted to the Global Waitlist for Analyst review!'); setFoodPhoto(null); navigate('/dashboard/donor'); }} className="w-full py-4 bg-brand-green text-white font-bold text-lg rounded-xl hover:bg-brand-darkGreen transition-colors flex justify-center items-center">
              Submit Donation Request
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}

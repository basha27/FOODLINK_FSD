import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Navigation, PackageCheck, AlertCircle } from 'lucide-react';

export default function AcceptorDashboard() {
  const location = useLocation();
  const isSchedule = location.pathname.includes('/schedule');
  const [acceptedItems, setAcceptedItems] = useState({});

  const handleAccept = (id) => {
    setAcceptedItems({...acceptedItems, [id]: true});
    alert('Secure OTP successfully generated! Navigating driver protocol...');
  };

  const requests = [
    { id: '10291', food: 'Vegetarian Buffet Set', qty: '40 kg', distance: '1.2 km away', urgency: 'High', expires: '2 hours', donor: 'Green Valley Weddings' },
    { id: '10292', food: 'Bakery Bread Assortment', qty: '15 kg', distance: '3.4 km away', urgency: 'Medium', expires: '8 hours', donor: 'Morning Crust Ltd.' },
    { id: '10293', food: 'Fruit Baskets', qty: '10 kg', distance: '5.1 km away', urgency: 'Low', expires: '24 hours', donor: 'Corporate Meetup' },
  ];

  if (isSchedule) {
     return (
       <div className="glass p-8 rounded-3xl w-full max-w-4xl mx-auto">
         <h3 className="text-xl font-bold text-gray-900 mb-6">Today's Active Route Schedule</h3>
         <div className="flex flex-col space-y-4">
           {Object.keys(acceptedItems).length > 0 ? (
             Object.keys(acceptedItems).map(id => {
               const req = requests.find(r => r.id === id);
               return (
                 <div key={id} className="p-6 border border-brand-green/20 bg-white/60 hover:bg-white transition-colors rounded-2xl flex justify-between items-center shadow-sm">
                   <div>
                     <h4 className="font-black text-gray-900 text-lg">{req.food} <span className="text-sm font-semibold text-gray-500 ml-2">({req.qty})</span></h4>
                     <p className="text-sm text-gray-500 mt-1 flex items-center"><MapPin className="w-4 h-4 mr-1 text-brand-orange"/> {req.donor} • {req.distance}</p>
                   </div>
                   <span className="bg-brand-lightGreen text-brand-darkGreen border border-brand-green/30 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest">En Route Tracking</span>
                 </div>
               );
             })
           ) : (
             <div className="p-10 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
               <PackageCheck className="w-14 h-14 text-gray-300 mx-auto mb-4" />
               <p className="text-gray-500 font-medium text-lg">No active pickups accepted yet.</p>
               <p className="text-sm text-gray-400 mt-1">Navigate to the Requests Feed to accept a donation and build your route.</p>
             </div>
           )}
         </div>
       </div>
     );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
       <div className="flex justify-between items-center mb-8">
         <h2 className="text-2xl font-bold text-gray-900">Nearby Available Donations</h2>
         <button onClick={() => alert('Demand Request broadcasted directly to global Donor Network!')} className="px-5 py-2.5 bg-brand-orange text-white font-bold rounded-lg hover:bg-brand-darkOrange transition shadow-sm border border-brand-orange">
           Submit Demand Request
         </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {requests.map((req) => (
           <div key={req.id} className="glass p-6 rounded-3xl flex flex-col justify-between card-hover relative overflow-hidden">
             {req.urgency === 'High' && (
               <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">Urgent</div>
             )}
             <div>
               <div className="mb-4">
                 <h4 className="font-black text-xl text-gray-900 leading-tight">{req.food}</h4>
                 <p className="text-sm text-gray-500 mt-1 flex items-center">
                   <PackageCheck className="w-4 h-4 mr-1 text-brand-green" /> {req.qty}
                 </p>
               </div>
               
               <div className="space-y-2 mb-6">
                 <p className="text-sm text-gray-700 flex items-center bg-gray-50 p-2 rounded-lg">
                   <MapPin className="w-4 h-4 mr-2 text-brand-orange" /> {req.distance}
                 </p>
                 <p className="text-sm text-gray-700 flex items-center bg-gray-50 p-2 rounded-lg">
                   <AlertCircle className="w-4 h-4 mr-2 text-blue-500" /> Expires in {req.expires}
                 </p>
                 <p className="text-xs text-gray-500 pt-2 border-t border-gray-100">Donated by: {req.donor}</p>
               </div>
             </div>

             <button 
               onClick={() => handleAccept(req.id)}
               disabled={acceptedItems[req.id]}
               className={`w-full py-3 font-bold rounded-xl flex items-center justify-center transition-colors ${acceptedItems[req.id] ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-inner' : 'bg-brand-green text-white hover:bg-brand-darkGreen shadow-sm'}`}>
               {acceptedItems[req.id] ? 'Accepted ✅' : <><Navigation className="w-4 h-4 mr-2" /> Accept & Generate OTP</>}
             </button>
           </div>
         ))}
       </div>
    </div>
  );
}

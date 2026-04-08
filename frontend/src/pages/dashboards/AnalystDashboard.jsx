import React from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BrainCircuit, Activity, Database, AlertCircle, MapPin, User, Package } from 'lucide-react';
import { useData } from '../../context/DataContext';

const matchData = [
  { region: 'North', demand: 120, supply: 90 },
  { region: 'South', demand: 80, supply: 130 },
  { region: 'East', demand: 150, supply: 100 },
  { region: 'West', demand: 90, supply: 85 },
];

export default function AnalystDashboard() {
  const { users, donations } = useData();
  const location = useLocation();
  if (location.pathname.includes('/maps')) return <HeatmapPanel users={users} donations={donations} />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center bg-gray-900 text-white p-6 rounded-3xl shadow-xl shadow-gray-900/10">
         <div>
           <h2 className="text-2xl font-black mb-1 flex items-center"><BrainCircuit className="w-7 h-7 mr-3 text-brand-green animate-pulse"/> AI Matching Engine Active</h2>
           <p className="text-gray-400 text-sm">System is continually analyzing surplus flows and shelter demands.</p>
         </div>
         <div className="text-right">
           <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-lightGreen">84%</p>
           <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Auto-match Efficiency</p>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="glass p-6 rounded-3xl text-gray-900 h-96 flex flex-col">
          <h3 className="text-lg font-bold mb-4">Supply vs Demand Diagnostics</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={matchData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <XAxis type="number" />
                <YAxis dataKey="region" type="category" axisLine={false} tickLine={false} fontWeight="bold"/>
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="supply" fill="#10b981" radius={[0, 4, 4, 0]} name="Supply (kg)" />
                <Bar dataKey="demand" fill="#f97316" radius={[0, 4, 4, 0]} name="Demand (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-6 rounded-3xl h-96 overflow-y-auto">
          <h3 className="text-lg font-bold mb-4 flex justify-between items-center">
            Manual Override Queue
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">5 Pending</span>
          </h3>
          <div className="space-y-3">
            {[
              { id: 'Q-01', from: 'Hotel XYZ', issue: 'High volume, far distance', urgency: 'CRITICAL' },
              { id: 'Q-02', from: 'Fresh Foods Factory', issue: 'No acceptors available within expiry', urgency: 'WARNING' },
              { id: 'Q-03', from: 'Wedding Hall 9', issue: 'Quantity mismatch with nearest NGOs', urgency: 'WARNING' },
            ].map(q => (
               <div key={q.id} className="p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all">
                 <div className="flex justify-between items-center mb-2">
                   <p className="font-bold text-gray-900">{q.from}</p>
                   <span className={`text-[10px] font-black tracking-wider px-2 py-1 rounded ${q.urgency === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-brand-lightOrange text-brand-darkOrange'}`}>
                     {q.urgency}
                   </span>
                 </div>
                 <p className="text-sm text-gray-600 flex items-center mb-4"><AlertCircle className="w-4 h-4 mr-1 text-gray-400"/> {q.issue}</p>
                 <div className="flex space-x-2">
                   <button onClick={() => alert('Administrative override successfully matched queue item!')} className="flex-1 bg-brand-green text-white py-2 rounded-lg text-xs font-bold hover:bg-brand-darkGreen transition-colors">Force Match</button>
                   <button onClick={() => alert('Logistics algorithm recalculating optimum delivery route...')} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors">Re-route</button>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="glass p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center"><Activity className="w-5 h-5 mr-2 text-brand-green"/> Route Optimizations Done</div>
          <span className="font-black text-xl">124</span>
        </div>
        <div className="glass p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center"><Database className="w-5 h-5 mr-2 text-blue-500"/> Emails Successfully Pushed</div>
          <span className="font-black text-xl">9,411</span>
        </div>
        <div className="glass p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center"><Database className="w-5 h-5 mr-2 text-brand-orange"/> OTP Authentications Today</div>
          <span className="font-black text-xl">842</span>
        </div>
      </div>
    </div>
  );
}

const HeatmapPanel = ({ users, donations }) => (
  <div className="glass p-8 rounded-3xl min-h-[500px]">
    <div className="mb-6">
      <h3 className="text-2xl font-black text-gray-900 flex items-center"><MapPin className="w-8 h-8 text-brand-orange mr-3" /> Live Operations Map</h3>
      <p className="text-gray-500">Real-time geospatial plotting of active NGOs and impending food surplus queues.</p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Fake Map Graphic */}
      <div className="bg-blue-50/50 rounded-2xl border-2 border-blue-100/50 overflow-hidden relative min-h-[400px] flex items-center justify-center">
        {/* Abstract Map Grid Lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#60a5fa 1px, transparent 1px), linear-gradient(90deg, #60a5fa 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {users.slice(0, 3).map((u, i) => (
           <div key={`u-${i}`} className={`absolute p-2 bg-white rounded-full shadow-lg border-2 ${u.role === 'Donor' ? 'border-brand-green' : 'border-blue-500'} animate-bounce`} style={{ top: `${20 + i*20}%`, left: `${30 + i*15}%` }}>
              <User className={`w-4 h-4 ${u.role === 'Donor' ? 'text-brand-green' : 'text-blue-500'}`} />
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity z-10">{u.name}</div>
           </div>
        ))}

        {donations.filter(d => d.status.includes('Pending')).slice(0, 3).map((d, i) => (
           <div key={`d-${i}`} className="absolute p-2 bg-brand-orange text-white rounded-full shadow-xl border-2 border-white animate-pulse" style={{ top: `${60 - i*15}%`, left: `${50 + i*15}%` }}>
              <Package className="w-4 h-4" />
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap opacity-100 z-10">{d.qty} of {d.item}</div>
           </div>
        ))}
      </div>

      <div className="space-y-6">
         <div className="bg-white/60 p-5 rounded-2xl border border-gray-100 h-1/2 overflow-y-auto">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center"><User className="w-4 h-4 text-brand-green mr-2"/> Newly Registered Intel</h4>
            <div className="space-y-2">
              {users.map((u, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 text-sm">
                  <span className="font-semibold text-gray-800">{u.name}</span>
                  <span className="text-gray-500 text-xs px-2 py-1 bg-gray-50 rounded-md">{u.role}</span>
                </div>
              ))}
            </div>
         </div>
         
         <div className="bg-white/60 p-5 rounded-2xl border border-gray-100 h-1/2 overflow-y-auto">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center"><Package className="w-4 h-4 text-brand-orange mr-2"/> Active Surplus Drops</h4>
            <div className="space-y-2">
              {donations.filter(d => !d.status.includes('Completed')).map((d, i) => (
                <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 text-sm">
                  <div className="flex justify-between font-semibold text-gray-800 mb-1">
                    <span>{d.item}</span>
                    <span className="text-brand-orange">{d.qty}</span>
                  </div>
                  <p className="text-gray-500 text-xs"><MapPin className="inline w-3 h-3"/> Location: {d.location}</p>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  </div>
);

import React from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BrainCircuit, Activity, Database, AlertCircle, MapPin } from 'lucide-react';

const matchData = [
  { region: 'North', demand: 120, supply: 90 },
  { region: 'South', demand: 80, supply: 130 },
  { region: 'East', demand: 150, supply: 100 },
  { region: 'West', demand: 90, supply: 85 },
];

export default function AnalystDashboard() {
  const location = useLocation();
  if (location.pathname.includes('/maps')) return <HeatmapPanel />;

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

const HeatmapPanel = () => (
  <div className="glass p-8 rounded-3xl min-h-[500px] flex flex-col items-center justify-center text-center">
    <MapPin className="w-16 h-16 text-brand-orange mb-4 opacity-50" />
    <h3 className="text-2xl font-black text-gray-900 mb-2">Global Intel Heatmaps</h3>
    <p className="text-gray-500 max-w-md mx-auto">This geographical module integrates with Mapbox APIs to geographically pinpoint real-time surplus pipelines versus hunger hot-spots dynamically.</p>
  </div>
);

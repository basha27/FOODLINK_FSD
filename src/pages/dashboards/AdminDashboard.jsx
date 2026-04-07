import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Package, AlertCircle, Settings, User } from 'lucide-react';
const data = [
  { name: 'Mon', donations: 400, matches: 240 },
  { name: 'Tue', donations: 300, matches: 139 },
  { name: 'Wed', donations: 200, matches: 980 },
  { name: 'Thu', donations: 278, matches: 390 },
  { name: 'Fri', donations: 189, matches: 480 },
  { name: 'Sat', donations: 239, matches: 380 },
  { name: 'Sun', donations: 349, matches: 430 },
];

export default function AdminDashboard() {
  const location = useLocation();

  if (location.pathname.includes('/users')) return <UsersPanel />;
  if (location.pathname.includes('/settings')) return <SettingsPanel />;

  const stats = [
    { title: 'Total Donations handled', value: '14,241', icon: Package, color: 'text-brand-green', bg: 'bg-brand-lightGreen' },
    { title: 'Active Donors', value: '432', icon: Users, color: 'text-blue-500', bg: 'bg-blue-100' },
    { title: 'Platform Efficiency', value: '98.2%', icon: TrendingUp, color: 'text-brand-orange', bg: 'bg-brand-lightOrange' },
    { title: 'Issues Escalated', value: '12', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="glass p-6 rounded-2xl flex items-center space-x-4">
            <div className={`p-4 rounded-xl ${s.bg}`}>
              <s.icon className={`w-8 h-8 ${s.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{s.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-6 rounded-2xl w-full h-96">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Platform Activity Overview</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Area type="monotone" dataKey="donations" stroke="#10b981" fillOpacity={1} fill="url(#colorDonations)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="glass p-6 rounded-2xl">
           <h3 className="text-lg font-bold text-gray-900 mb-4">Live Delivery Tracking</h3>
           <div className="space-y-4">
             {[1,2,3].map(i => (
               <div key={i} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                 <div>
                   <p className="font-semibold text-gray-900">Delivery #42{i}9</p>
                   <p className="text-sm text-gray-500">From: Star Banquet → Hope Shelter</p>
                 </div>
                 <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">In Transit</span>
               </div>
             ))}
           </div>
         </div>
         <div className="glass p-6 rounded-2xl">
           <h3 className="text-lg font-bold text-gray-900 mb-4">Security Logs</h3>
           <div className="space-y-4">
             {[1,2,3].map(i => (
               <div key={i} className="flex items-start space-x-3 text-sm">
                 <div className="w-2 h-2 mt-1.5 rounded-full bg-brand-orange"></div>
                 <div>
                   <p className="text-gray-800"><span className="font-bold">Analyst User_4{i}</span> triggered force-match for high-priority food stack.</p>
                   <p className="text-gray-400 text-xs">2 mins ago</p>
                 </div>
               </div>
             ))}
           </div>
         </div>
      </div>
    </div>
  );
}

const UsersPanel = () => (
  <div className="glass p-8 rounded-3xl min-h-[500px]">
    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
      <div>
         <h2 className="text-2xl font-black text-gray-900 flex items-center"><User className="w-6 h-6 mr-3 text-brand-green" /> Users & NGOs Directory</h2>
         <p className="text-gray-500 text-sm mt-1">Manage global access control across all operational roles.</p>
      </div>
      <button className="bg-brand-green text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow hover:bg-brand-darkGreen transition-colors">
        + Invite Partner
      </button>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs text-gray-400 font-bold uppercase tracking-wider bg-gray-50/50">
            <th className="py-4 px-6 rounded-tl-xl">Organization / Name</th>
            <th className="py-4 px-6">Role Scope</th>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-6 text-right rounded-tr-xl">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {[
            { name: 'Hope Shelter', role: 'Acceptor', status: 'Active' },
            { name: 'Star Banquet Hall', role: 'Donor', status: 'Active' },
            { name: 'Data Analyst User_41', role: 'Analyst', status: 'Offline' },
            { name: 'Downtown Orphanage', role: 'Acceptor', status: 'Pending Review' }
          ].map((u, i) => (
            <tr key={i} className="hover:bg-white/60 transition-colors">
              <td className="py-4 px-6 font-bold text-gray-900">{u.name}</td>
              <td className="py-4 px-6">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs font-bold border border-gray-200">{u.role}</span>
              </td>
              <td className="py-4 px-6">
                <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-black inline-block ${
                  u.status === 'Active' ? 'bg-brand-lightGreen text-brand-darkGreen border border-brand-green/20' : 
                  u.status === 'Offline' ? 'bg-gray-200 text-gray-600 border border-gray-300' : 'bg-brand-lightOrange text-brand-darkOrange border border-brand-orange/20'
                }`}>{u.status}</span>
              </td>
              <td className="py-4 px-6 text-right space-x-4">
                <button onClick={() => alert('Editing interface locked for demo.')} className="text-blue-500 hover:text-blue-700 font-bold text-sm">Edit</button>
                <button onClick={() => alert(`User account ${u.name} has been suspended!`)} className="text-red-500 hover:text-red-700 font-bold text-sm">Suspend</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SettingsPanel = () => {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [smtpEnabled, setSmtpEnabled] = useState(true);

  return (
    <div className="glass p-8 rounded-3xl min-h-[500px]">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-black text-gray-900 flex items-center"><Settings className="w-6 h-6 mr-3 text-brand-green" /> Platform Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Configure automated behaviors and administrative preferences.</p>
      </div>
      
      <div className="space-y-6 max-w-2xl">
        <div className="p-6 border border-gray-100 bg-white/50 rounded-2xl flex items-center justify-between hover:shadow-sm transition-all hover:bg-white">
          <div>
            <h4 className={`font-bold text-lg transition-colors ${aiEnabled ? 'text-gray-900' : 'text-gray-400'}`}>Global AI Matching</h4>
            <p className="text-sm text-gray-500 mt-1">Automatically direct surplus donations matching NGO demands.</p>
          </div>
          <div onClick={() => setAiEnabled(!aiEnabled)} className={`w-12 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors ${aiEnabled ? 'bg-brand-green' : 'bg-gray-300'}`}>
             <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${aiEnabled ? 'right-1' : 'left-1'}`}></div>
          </div>
        </div>

        <div className="p-6 border border-gray-100 bg-white/50 rounded-2xl flex items-center justify-between hover:shadow-sm transition-all hover:bg-white">
          <div>
            <h4 className={`font-bold text-lg transition-colors ${smtpEnabled ? 'text-gray-900' : 'text-gray-400'}`}>Nodemailer Engine Active</h4>
            <p className="text-sm text-gray-500 mt-1">SMTP layer is actively dispatching emails globally to endpoints.</p>
          </div>
          <div onClick={() => setSmtpEnabled(!smtpEnabled)} className={`w-12 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors ${smtpEnabled ? 'bg-brand-green' : 'bg-gray-300'}`}>
             <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${smtpEnabled ? 'right-1' : 'left-1'}`}></div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100">
           <h4 className="font-bold text-red-600 mb-2">Danger Zone</h4>
           <p className="text-sm text-gray-500 mb-4">Wipe the ephemeral in-memory database instance entirely.</p>
           <button onClick={() => { if(confirm('Are you strictly sure you want to purge the DB?')) alert('Database Purged completely!'); }} className="px-6 py-3 bg-red-100 text-red-600 font-bold rounded-xl hover:bg-red-200 transition-colors flex items-center">
              Purge Temporary Database
           </button>
        </div>
      </div>
    </div>
  );
};

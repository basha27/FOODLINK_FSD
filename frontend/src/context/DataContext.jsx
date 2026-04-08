import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('foodlink_users');
    if (saved) return JSON.parse(saved);
    return [
      { name: 'Hope Shelter', role: 'Acceptor', status: 'Active' },
      { name: 'Star Banquet Hall', role: 'Donor', status: 'Active' },
      { name: 'Data Analyst User_41', role: 'Analyst', status: 'Offline' },
      { name: 'Downtown Orphanage', role: 'Acceptor', status: 'Pending Review' }
    ];
  });

  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem('foodlink_donations');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', date: 'Today, 2:30 PM', item: 'Wedding Buffet Leftovers', qty: '45 kg', status: 'Picked Up', to: 'Grace Orphanage', location: 'Hotel XYZ' },
      { id: '2', date: 'Oct 12, 11:00 AM', item: 'Conference Lunch Boxes', qty: '120 boxes', status: 'Completed', to: 'Downtown Shelter', location: 'Downtown Conf Center' },
      { id: '3', date: 'Sep 28, 9:00 PM', item: 'Bakery Surplus', qty: '15 kg', status: 'Completed', to: 'Senior Care Center', location: 'Bakery Ave.' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('foodlink_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('foodlink_donations', JSON.stringify(donations));
  }, [donations]);

  const addUser = (user) => setUsers(prev => [...prev, user]);
  const editUser = (oldName, newName) => setUsers(prev => prev.map(u => u.name === oldName ? { ...u, name: newName } : u));
  const suspendUser = (name) => setUsers(prev => prev.map(u => u.name === name ? { ...u, status: 'Suspended' } : u));
  
  const addDonation = (donation) => setDonations(prev => [{...donation, id: Math.random().toString(), date: new Date().toLocaleString()}, ...prev]);

  return (
    <DataContext.Provider value={{ users, addUser, editUser, suspendUser, donations, addDonation }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);

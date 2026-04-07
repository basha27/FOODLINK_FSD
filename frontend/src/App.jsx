import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';

import AdminDash from './pages/dashboards/AdminDashboard';
import DonorDash from './pages/dashboards/DonorDashboard';
import AcceptorDash from './pages/dashboards/AcceptorDashboard';
import AnalystDash from './pages/dashboards/AnalystDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login/:role" element={<Login />} />
          
           {/* Dashboard Protected Layouts */}
          <Route path="/dashboard" element={<DashboardLayout />}>
             {/* Admin routes */}
             <Route path="admin" element={<AdminDash />} />
             <Route path="admin/users" element={<AdminDash />} />
             <Route path="admin/settings" element={<AdminDash />} />
             
             {/* Donor Routes */}
             <Route path="donor" element={<DonorDash />} />
             <Route path="donor/add" element={<DonorDash />} />
             
             {/* Acceptor Routes */}
             <Route path="acceptor" element={<AcceptorDash />} />
             <Route path="acceptor/schedule" element={<AcceptorDash />} />
             
             {/* Analyst Routes */}
             <Route path="analyst" element={<AnalystDash />} />
             <Route path="analyst/maps" element={<AnalystDash />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

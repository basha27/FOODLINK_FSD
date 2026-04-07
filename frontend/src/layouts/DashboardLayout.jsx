import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LogOut, Zap, Bell, LayoutDashboard, Settings, User, Home } from 'lucide-react';

export default function DashboardLayout({ allowedRoles }) {
  const { user, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20">Loading security profiles...</div>;
  if (!user) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />; // rudimentary RBAC

  // Dashboard specifics based on role
  const getNavItems = (role) => {
    switch (role) {
      case 'admin': return [
        { name: 'Overview', icon: LayoutDashboard, path: `/dashboard/admin` },
        { name: 'Users / NGOs', icon: User, path: `/dashboard/admin/users` },
        { name: 'Settings', icon: Settings, path: `/dashboard/admin/settings` },
      ];
      case 'donor': return [
        { name: 'My Impact', icon: LayoutDashboard, path: `/dashboard/donor` },
        { name: 'Donate Food', icon: Zap, path: `/dashboard/donor/add` },
      ];
      case 'acceptor': return [
        { name: 'Requests Feed', icon: LayoutDashboard, path: `/dashboard/acceptor` },
        { name: 'My Schedule', icon: Bell, path: `/dashboard/acceptor/schedule` },
      ];
      case 'analyst': return [
        { name: 'Intel Board', icon: LayoutDashboard, path: `/dashboard/analyst` },
        { name: 'Heatmaps', icon: Settings, path: `/dashboard/analyst/maps` },
      ];
      default: return [];
    }
  };

  const navItems = getNavItems(user.role);

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <Link to={`/dashboard/${user.role}`} className="h-16 flex items-center px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
          <Zap className="h-6 w-6 text-brand-orange mr-2" />
          <span className="font-bold tracking-tight text-xl text-brand-darkGreen">Food Link</span>
        </Link>
        <div className="px-4 py-6 flex-1 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu</p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-brand-lightGreen text-brand-darkGreen' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${active ? 'text-brand-green' : 'text-gray-400'}`} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="p-4 border-t border-gray-100 flex flex-col space-y-1">
          <Link 
            to="/"
            className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5 mr-3 text-gray-400" />
            Go to Home
          </Link>
          <button 
            onClick={logout}
            className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3 text-gray-400" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
           <h1 className="text-xl font-semibold text-gray-800 capitalize">{user.role} Dashboard</h1>
           <div className="flex items-center space-x-4">
              <button onClick={() => alert('You currently have 0 unread alerts! Check back later.')} className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1.5 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              <button 
                onClick={() => alert(`Active Account Profile \n\nName: ${user.name}\nEmail: ${user.email}\nRole: ${user.role.toUpperCase()}`)}
                className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-green to-brand-lightGreen border-2 border-white shadow-sm flex items-center justify-center text-brand-darkGreen font-bold text-xs uppercase hover:ring-2 hover:ring-brand-green transition-all"
                title="View Account Details"
              >
                {user.name ? user.name.charAt(0) : user.role.charAt(0)}
              </button>
           </div>
        </header>
        <main className="flex-1 overflow-auto p-8">
           {/* Outlet renders the child routes properly nested in the layout */}
           <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
}

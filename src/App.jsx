// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  LayoutDashboard,
  Settings,
  Menu,
  X,
  Bot,
  ChevronRight
} from 'lucide-react';
import DentalDashboard from './pages/DentalDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import TalkyImprovement from './pages/TalkyImprovement';

// Componente para los enlaces del menú
const SidebarLink = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
        "hover:bg-slate-100 hover:text-slate-900",
        isActive ? 
          "bg-blue-50 text-blue-600" : 
          "text-slate-600"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{children}</span>
      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
    </Link>
  );
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-0 h-full bg-white z-30 border-r transition-all duration-300",
            isSidebarOpen ? "w-64" : "w-20",
          )}
        >
          {/* Logo y botón de toggle */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className={cn(
              "flex items-center space-x-2",
              !isSidebarOpen && "justify-center"
            )}>
              <Bot className="w-8 h-8 text-blue-600" />
              {isSidebarOpen && (
                <span className="text-xl font-bold text-slate-900">
                  Q-Dental
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 rounded-lg hover:bg-slate-100"
            >
              {isSidebarOpen ? 
                <X className="w-5 h-5 text-slate-600" /> : 
                <Menu className="w-5 h-5 text-slate-600" />
              }
            </button>
          </div>

          {/* Enlaces de navegación */}
          <nav className="p-4 space-y-2">
            {isSidebarOpen ? (
              <>
                <SidebarLink to="/dental" icon={MessageSquare}>
                  Panel de Gestión
                </SidebarLink>
                <SidebarLink to="/manager" icon={LayoutDashboard}>
                  Dashboard KPIs
                </SidebarLink>
                <SidebarLink to="/talky" icon={Settings}>
                  Personalización Talky
                </SidebarLink>
              </>
            ) : (
              <>
                <Link to="/dental" className="flex justify-center p-2 hover:bg-slate-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-slate-600" />
                </Link>
                <Link to="/manager" className="flex justify-center p-2 hover:bg-slate-100 rounded-lg">
                  <LayoutDashboard className="w-6 h-6 text-slate-600" />
                </Link>
                <Link to="/talky" className="flex justify-center p-2 hover:bg-slate-100 rounded-lg">
                  <Settings className="w-6 h-6 text-slate-600" />
                </Link>
              </>
            )}
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}>
          {/* Header superior */}
          <header className="bg-white border-b h-16 flex items-center px-6">
            <h1 className="text-xl font-semibold text-slate-900">
              Q-Dental Dashboard
            </h1>
          </header>

          {/* Contenido de la ruta */}
          <div className="p-6">
            <Routes>
              <Route path="/" element={<DentalDashboard />} />
              <Route path="/dental" element={<DentalDashboard />} />
              <Route path="/manager" element={<ManagerDashboard />} />
              <Route path="/talky" element={<TalkyImprovement />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
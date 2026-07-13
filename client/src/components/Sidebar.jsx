import { Link, useLocation } from 'react-router-dom';
import { HiOutlineLogout, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { useState } from 'react';
import { SIDEBAR_LINKS } from '../constants';
import useAuth from '../hooks/useAuth';
import { generateAvatar, getStreakEmoji } from '../utils/helpers';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      id="main-sidebar"
      className={`hidden lg:flex flex-col h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } bg-dark-900/50 border-r border-dark-700/30`}
    >
      {/* Collapse Toggle */}
      <button
        id="sidebar-collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-dark-700 border border-dark-600 flex items-center justify-center text-dark-400 hover:text-dark-100 hover:bg-dark-600 transition-all z-10"
      >
        {collapsed ? <HiOutlineChevronRight className="w-3 h-3" /> : <HiOutlineChevronLeft className="w-3 h-3" />}
      </button>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {SIDEBAR_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
              title={collapsed ? link.name : ''}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-t border-dark-700/30">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user?.avatar || generateAvatar(user?.name)}
              alt={user?.name}
              className="w-10 h-10 rounded-xl object-cover border border-dark-600/50"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-dark-100 truncate">{user?.name}</p>
              <p className="text-xs text-dark-400 truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-dark-400">
            <span>{getStreakEmoji(user?.streak)} {user?.streak || 0} day streak</span>
            <button
              onClick={logout}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
            >
              <HiOutlineLogout className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

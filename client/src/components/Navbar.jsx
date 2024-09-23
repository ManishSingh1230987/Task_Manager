import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isTaskListPage = location.pathname === '/tasks';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    // TODO: Implement logout logic (clear token, etc.)
    setIsAuthenticated(false);
  };

  const highlightedButtonClass = "bg-white text-blue-500 font-bold py-2 px-4 rounded transition duration-300 hover:bg-blue-100";

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Task Manager</Link>
        <div>
          {isAuthenticated ? (
            <>
              <Link 
                to="/tasks" 
                className={`${highlightedButtonClass} mr-2`}
              >
                Tasks
              </Link>
              <button 
                onClick={handleLogout} 
                className={highlightedButtonClass}
              >
                Logout
              </button>
            </>
          ) : isHomePage ? (
            <>
              <Link 
                to="/register" 
                className={`${highlightedButtonClass} mr-2`}
              >
                Register
              </Link>
              <Link 
                to="/login" 
                className={highlightedButtonClass}
              >
                Login
              </Link>
            </>
          ) : isAuthPage ? (
            <>
              <Link 
                to="/register" 
                className={`${highlightedButtonClass} mr-2 ${location.pathname === '/register' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Register
              </Link>
              <Link 
                to="/login" 
                className={`${highlightedButtonClass} ${location.pathname === '/login' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
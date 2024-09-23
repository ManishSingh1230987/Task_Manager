import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import TaskList from './components/TaskList'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/tasks" 
              element={
                <PrivateRoute>
                  <TaskList />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

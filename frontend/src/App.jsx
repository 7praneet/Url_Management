import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0f]">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

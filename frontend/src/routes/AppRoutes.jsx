import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

function Dashboard() {
  return (
    <div className="text-white text-4xl">
      Dashboard
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="bg-slate-900 min-h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
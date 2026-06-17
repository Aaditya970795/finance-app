import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoute from "./PrivateRoute";

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
          <Route path="/register" element={<Register />} />
          <Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
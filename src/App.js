import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EventForm from "./components/EventForm";

const App = () => {
  const { token } = useAuth();

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/create"
          element={token ? <EventForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/edit/:id"
          element={token ? <EventForm /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </div>
  );
};

export default App;

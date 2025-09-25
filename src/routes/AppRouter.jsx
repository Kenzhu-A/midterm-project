import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import SpaceDetail from "../pages/SpaceDetail";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/auth/Login";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/common/ProtectedRoute";

export default function AppRouter() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/space/:spaceId" element={<SpaceDetail />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard/my-bookings"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}

import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  // redirect if already authenticated (useEffect avoids navigate during render)
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login({ name: name || "Student" });
    // navigate back to the original page (or dashboard/home)
    navigate(from, { replace: true });
  };

  {/*Login Menu */}
  return (
    <div className="max-w-md mx-auto card p-6">
      <h2 className="text-2xl font-semibold mb-4">Welcome back</h2>
      <p className="text-sm text-gray-500 mb-4">
        Simulated login for the demo. Enter a display name to continue.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your display name"
          className="w-full p-2 border rounded"
        />
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer">Login</button>
        </div>
      </form>
    </div>
  );
}

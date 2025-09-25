import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow">
            S
          </div>
          <div>
            <div className="font-semibold text-lg">StudySpot PH</div>
            <div className="text-xs text-gray-500">Find your focus space</div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-indigo-600 font-medium" : "text-gray-600"
            }
          >
            Browse
          </NavLink>

          {/* Show Dashboard/Bookings only if logged in */}
          {user && (
            <NavLink
              to="/dashboard/my-bookings"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 font-medium" : "text-gray-600"
              }
            >
              Bookings
            </NavLink>
          )}

          {/* Auth buttons */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-700">{user.name}</div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm cursor-pointer hover:opacity-90"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:opacity-90"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

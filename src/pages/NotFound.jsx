import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card p-8 text-center">
      <h1 className="text-4xl font-bold mb-3">404</h1>
      <p className="text-gray-600 mb-6">Page not found</p>
      <Link to="/" className="px-4 py-2 rounded bg-indigo-600 text-white">Return home</Link>
    </div>
  );
}

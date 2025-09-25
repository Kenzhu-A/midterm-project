export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-6">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or location (e.g., Makati, Study Nook)..."
        className="w-full p-3 rounded-xl border border-gray-200 shadow-sm bg-white backdrop-blur-md text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  );
}

export default function AmenityList({ amenities = [] }) {
  return (
    <ul className="grid grid-cols-2 gap-2 text-sm">
      {amenities.map((a, i) => (
        <li key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-400 rounded-full" />
          <span>{a}</span>
        </li>
      ))}
    </ul>
  );
}

import SpaceCard from "./SpaceCard";

export default function SpaceGrid({ spaces }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {spaces.map((s) => (
        <SpaceCard key={s.id} space={s} />
      ))}
    </div>
  );
}

export default function ImageGallery({ images = [], main }) {
  const all = [main, ...images].filter(Boolean);

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="h-64 card overflow-hidden">
        <img
          src={all[0]}
          alt="main"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Sub Images */}
      <div className="grid grid-cols-2 gap-3">
        {all.slice(1, 3).map((src, i) => (
          <div
            key={i}
            className="h-24 overflow-hidden rounded-md"
          >
            <img
              src={src}
              alt={`thumb-${i}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

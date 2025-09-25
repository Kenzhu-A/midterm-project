import { Link } from "react-router-dom";

export default function SpaceCard({ space }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
      {/* Image */}
      <div className="h-44 md:h-48 w-full bg-gray-100 overflow-hidden rounded-t-lg">
        <img
          src={space.main_image}
          alt={space.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-gray-900">{space.name}</h4>
              <div className="text-sm text-gray-500">{space.location}</div>
            </div>
            <div className="text-right">
              <div className="text-indigo-600 font-semibold">
                ₱{space.price}
              </div>
              <div className="text-xs text-gray-400">per slot</div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {space.description}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-4">
          <Link
            to={`/space/${space.id}`}
            className="block w-full text-center px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

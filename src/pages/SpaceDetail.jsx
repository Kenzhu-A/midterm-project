import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImageGallery from "../components/spaces/ImageGallery";
import AmenityList from "../components/spaces/AmenityList";
import BookingForm from "../components/spaces/BookingForm";

export default function SpaceDetail() {
  const { spaceId } = useParams();
  const [space, setSpace] = useState(null);

  useEffect(() => {
    fetch("/data/spaces.json")
      .then((r) => r.json())
      .then((list) => {
        const found = list.find((s) => String(s.id) === String(spaceId));
        setSpace(found || null);
      })
      .catch((e) => console.error(e));
  }, [spaceId]);

  if (!space) {
    return (
      <div className="p-6 card">
        <div>
          Space not found.{" "}
          <Link to="/" className="block w-full text-center px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3 flex justify-start mb-4">
        <Link
          to="/"
          className="px-4 py-2 bg-indigo-600 rounded-md text-white text-sm hover:opacity-90"
        >
          ← Go Back
        </Link>
      </div>

      <div className="lg:col-span-2">
        <ImageGallery main={space.main_image} images={space.images} />
        <div className="card p-4 mt-4">
          <h2 className="text-xl font-semibold">{space.name}</h2>
          <div className="text-sm text-gray-500">
            {space.location} · {space.hours}
          </div>
          <p className="mt-3 text-gray-700">{space.description}</p>
          <div className="mt-4">
            <h4 className="font-medium">Amenities</h4>
            <AmenityList amenities={space.amenities} />
          </div>
        </div>
      </div>

      <div>
        <div className="card p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500">Price</div>
              <div className="text-2xl font-bold">₱{space.price}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Hours</div>
              <div className="text-sm">{space.hours}</div>
            </div>
          </div>
        </div>

        <BookingForm space={space} />
      </div>
    </div>
  );
}

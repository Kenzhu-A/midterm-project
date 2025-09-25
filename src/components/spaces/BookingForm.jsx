import { useState } from "react";
import { useBookings } from "../../contexts/BookingContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function BookingForm({ space }) {
  const { addBooking } = useBookings();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [slot, setSlot] = useState(space.time_slots?.[0] || "");
  const [date, setDate] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return navigate("/login");
    }
    if (!date || !slot) return alert("Please choose date and slot.");
    addBooking({ spaceId: space.id, slot, date, user });
    alert("Booking confirmed! Check your dashboard.");
    navigate("/dashboard/my-bookings");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 mt-6">
      <h4 className="font-semibold mb-3">Book this space</h4>
      <div className="grid grid-cols-1 gap-3">
        {/* Date Picker */}
        <label className="text-sm text-gray-600">Date</label>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          min={today} // prevents past dates
          className="p-2 border rounded"
        />

        {/* Time Slot */}
        <label className="text-sm text-gray-600">Time Slot</label>
        <select
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          className="p-2 border rounded"
        >
          {space.time_slots?.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Price + Submit */}
        <div className="flex justify-between items-center mt-3">
          <div>
            <div className="text-sm text-gray-500">Price</div>
            <div className="font-semibold">₱{space.price}</div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700 transition"
          >
            {isAuthenticated ? "Confirm Booking" : "Login to Book"}
          </button>
        </div>
      </div>
    </form>
  );
}

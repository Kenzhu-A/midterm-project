import { useEffect, useState } from "react";
import { useBookings } from "../contexts/BookingContext";
import { useAuth } from "../contexts/AuthContext";
import Modal from "../components/common/Modal";

export default function Dashboard() {
  const { getBookingsForUser, cancelBooking } = useBookings();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      // Try both id and name, so it always finds the user's bookings
      const list = getBookingsForUser(user.id) || getBookingsForUser(user.name);
      setBookings(list);
    } else {
      setBookings([]);
    }
  }, [getBookingsForUser, user]);

  const handleCancel = (booking) => {
    setSelected(booking);
    setModalOpen(true);
  };

  const confirmCancel = () => {
    cancelBooking(selected.bookingId);
    setBookings((prev) => prev.filter((b) => b.bookingId !== selected.bookingId));
    setModalOpen(false);
    setSelected(null);
  };

  return (
    <div>
      {/* Dashboard header */}
      <div className="mb-6 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-center">Welcome to your Dashboard, {user?.name}</h2>
      </div>

      {/* My Bookings section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">My Bookings</h3>

        {bookings.length === 0 ? (
          <div className="p-6 card">You have no bookings yet.</div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.bookingId}
                className="card p-4 flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">
                    Booking ID: {b.bookingId}
                  </div>
                  <div className="text-sm text-gray-600">
                    Space ID: {b.spaceId} · {b.slot} · {b.date}
                  </div>
                  <div className="text-xs text-gray-400">
                    Booked on {new Date(b.createdAt).toLocaleString()}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleCancel(b)}
                    className="px-3 py-2 bg-red-600 text-white rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancel confirmation modal */}
        {modalOpen && selected && (
          <Modal
            title="Cancel booking?"
            onCancel={() => setModalOpen(false)}
            onConfirm={confirmCancel}
          >
            <div>
              Are you sure you want to cancel booking{" "}
              <strong>{selected.bookingId}</strong>?
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

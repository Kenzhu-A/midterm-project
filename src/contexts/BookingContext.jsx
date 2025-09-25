import React, { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // persisted bookings array
  const [bookings, setBookings] = useLocalStorage("ssph_bookings", []);
  const { user } = useAuth();

  // addBooking requires a logged-in user (keeps booking linked to user)
  const addBooking = ({ spaceId, slot, date, spaceName, user: bookingUser }) => {
    const activeUser = bookingUser || user;
    if (!activeUser) return null;
    const newBooking = {
      id: Date.now(),
      bookingId: `BKG-${Date.now()}`,
      userId: activeUser.id,
      userName: activeUser.name,
      spaceId,
      spaceName: spaceName || null,
      slot,
      date,
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
  };

  // allow lookup by userId OR by userName (fallback)
  const getBookingsForUser = (userIdOrName) => {
    if (!userIdOrName) return [];
    return bookings.filter(
      (b) =>
        String(b.userId) === String(userIdOrName) ||
        String(b.userName) === String(userIdOrName)
    );
  };

  const value = useMemo(
    () => ({ bookings, addBooking, cancelBooking, getBookingsForUser }),
    [bookings]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBookings = () => useContext(BookingContext);

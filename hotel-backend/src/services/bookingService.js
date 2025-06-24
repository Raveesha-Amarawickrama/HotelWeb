import Booking from "../models/Booking.js";

export const isRoomAvailable = async (roomId, checkIn, checkOut) => {
  const bookings = await Booking.find({
    room: roomId,
    checkOut: { $gt: checkIn },
    checkIn: { $lt: checkOut },
    status: { $ne: "cancelled" },
  });

  return bookings.length === 0;
};

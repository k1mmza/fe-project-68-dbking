import { useState } from 'react';
import { apiClient } from '../api/apiClient';
import { Booking } from '../types';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 5 & 10: View Bookings
  const getBookings = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiClient('/bookings');
      setBookings(data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Create Booking
  const createBooking = async (campId: string, date: string) => {
    setError(null);

    try {
      return await apiClient(`/campgrounds/${campId}/bookings`, {
        method: "POST",
        body: JSON.stringify({ bookingDate: date }),
      });
    } catch (err) {
      console.error(err);
      setError("Failed to create booking");
      throw err;
    }
  };

  return { bookings, getBookings, createBooking, loading, error };
};
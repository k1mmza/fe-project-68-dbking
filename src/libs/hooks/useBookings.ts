import { useState } from 'react';
import { apiClient } from '../api/apiClient';
import { Booking } from '../types';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  // Step 5 & 10: View Bookings
  const getBookings = async () => {
    setLoading(true);
    try {
      const data = await apiClient('/bookings');
      setBookings(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Create Booking
  const createBooking = async (campId: string, date: string) => {
    return await apiClient(`/campgrounds/${campId}/bookings`, {
      method: "POST",
      body: JSON.stringify({ bookingDate: date }),
    });
  };

  return { bookings, getBookings, createBooking, loading };
};
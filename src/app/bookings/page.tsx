"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/layout/Navbar"
import PageContainer from "@/components/layout/PageContainer"
import BookingList from "@/components/bookings/BookingList"
import ErrorState from "@/components/common/ErrorState"
import LoadingState from "@/components/common/LoadingState"
import EmptyState from "@/components/common/EmptyState"
import { useBookings } from "@/libs/hooks/useBookings"
import { useAuth } from "@/libs/hooks/useAuth"
import { Booking } from "@/libs/types"

export default function BookingsPage() {
  const { user, logout, isAdmin } = useAuth()
  const { bookings, getBookings, loading, error } = useBookings()
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    getBookings()
  }, [])

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking)
    console.log("Edit booking:", booking)
  }

  const handleDelete = (bookingId: string) => {
    console.log("Delete booking:", bookingId)
  }

  return (
    <>
      <Navbar user={user} isAdmin={isAdmin} onLogout={logout} />

      <PageContainer>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="mt-2 text-sm text-gray-500">
            View and manage your campground bookings.
          </p>
        </div>

        {loading ? (
          <LoadingState message="Loading bookings..." />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={getBookings}
          />
        ) : bookings.length === 0 ? (
          <EmptyState
            title="No Bookings Yet"
            message="You have not made any bookings yet."
          />
        ) : (
          <BookingList
            bookings={bookings}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {selectedBooking && (
          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Selected Booking
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Campground: {selectedBooking.campground.name}
            </p>
            <p className="text-sm text-gray-600">
              Booking Date:{" "}
              {new Date(selectedBooking.bookingDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </PageContainer>
    </>
  )
}
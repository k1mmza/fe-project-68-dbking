"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import PageContainer from "@/components/layout/PageContainer"
import BookingList from "@/components/bookings/BookingList"
import Modal from "@/components/ui/Modal"
import BookingForm from "@/components/bookings/BookingForm"
import ErrorState from "@/components/common/ErrorState"
import { useBookings } from "@/libs/hooks/useBookings"
import { useAuth } from "@/libs/hooks/useAuth"
import { Booking } from "@/libs/types"

export default function BookingsPage() {
  const router = useRouter()
  const { user, logout, isAdmin, loading: authLoading } = useAuth()
  const { bookings, getBookings, createBooking, loading, error } = useBookings()

  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)
  const [editSuccess, setEditSuccess] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) getBookings()
  }, [user])

  const handleEdit = (booking: Booking) => {
    setEditSuccess(false)
    setEditingBooking(booking)
  }

  const handleDelete = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return
    try {
      const { apiClient } = await import("@/libs/api/apiClient")
      await apiClient(`/bookings/${bookingId}`, { method: "DELETE" })
      await getBookings() // refresh list
    } catch {
      alert("Failed to delete booking. Please try again.")
    }
  }

  const handleEditSubmit = async (campId: string, date: string) => {
    if (!editingBooking) return
    try {
      const { apiClient } = await import("@/libs/api/apiClient")
      await apiClient(`/bookings/${editingBooking._id}`, {
        method: "PUT",
        body: JSON.stringify({ bookingDate: date }),
      })
      setEditSuccess(true)
      await getBookings()
    } catch {
      // error displayed via BookingForm's error prop
      throw new Error("Failed to update booking")
    }
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

        {error ? (
          <ErrorState message={error} onRetry={getBookings} />
        ) : (
          <BookingList
            bookings={bookings}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </PageContainer>

      {/* Edit Booking Modal */}
      <Modal
        open={!!editingBooking}
        title={`Edit Booking — ${editingBooking?.campground?.name ?? ""}`}
        onClose={() => setEditingBooking(null)}
      >
        {editSuccess ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <div className="text-4xl">✅</div>
            <h3 className="text-lg font-semibold text-gray-900">Booking Updated!</h3>
            <p className="text-sm text-gray-500">Your booking date has been updated.</p>
            <button
              onClick={() => setEditingBooking(null)}
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        ) : (
          <BookingForm
            campId={editingBooking?.campground?._id ?? ""}
            onSubmit={handleEditSubmit}
            loading={loading}
          />
        )}
      </Modal>
    </>
  )
}
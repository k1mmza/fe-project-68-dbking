"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import PageContainer from "@/components/layout/PageContainer"
import BookingList from "@/components/bookings/BookingList"
import Modal from "@/components/ui/Modal"
import BookingForm from "@/components/bookings/BookingForm"
import ErrorState from "@/components/common/ErrorState"
import LoadingState from "@/components/common/LoadingState"
import { useBookings } from "@/libs/hooks/useBookings"
import { useAuth } from "@/libs/hooks/useAuth"
import { Booking } from "@/libs/types"

// ── Role label & description ──────────────────────────────────────────────
const ROLE_CONFIG = {
  user: {
    title: "My Bookings",
    description: "View and manage your personal campground bookings.",
    badge: "User",
    color: "bg-blue-100 text-blue-700",
  },
  admin: {
    title: "All Bookings",
    description: "Administrator view — manage all bookings across all campgrounds.",
    badge: "Admin",
    color: "bg-red-100 text-red-700",
  },
  campOwner: {
    title: "Campground Bookings",
    description: "View bookings for campgrounds you own.",
    badge: "Camp Owner",
    color: "bg-green-100 text-green-700",
  },
}

export default function BookingsPage() {
  const router = useRouter()
  const { user, logout, isAdmin, loading: authLoading } = useAuth()
  const { bookings, getBookings, updateBooking, deleteBooking, loading, error } = useBookings()

  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)
  const [editSuccess, setEditSuccess] = useState(false)
  const [editError, setEditError] = useState("")

  // Role-based config
  const role = user?.role ?? "user"
  const config = ROLE_CONFIG[role as keyof typeof ROLE_CONFIG] ?? ROLE_CONFIG.user

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
    setEditError("")
    setEditingBooking(booking)
  }

  const handleDelete = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return
    try {
      await deleteBooking(bookingId)
      await getBookings()
    } catch (err: any) {
      alert(err.message || "Failed to delete booking.")
    }
  }

  const handleEditSubmit = async (campId: string, checkInDate: string, checkOutDate: string) => {
    if (!editingBooking) return
    setEditError("")
    try {
      await updateBooking(editingBooking._id, checkInDate, checkOutDate)
      setEditSuccess(true)
      await getBookings()
    } catch (err: any) {
      setEditError(err.message || "Failed to update booking.")
      throw err
    }
  }

  if (authLoading) {
    return (
      <>
        <Navbar user={user} isAdmin={isAdmin} onLogout={logout} />
        <PageContainer><LoadingState message="Loading..." /></PageContainer>
      </>
    )
  }

  return (
    <>
      <Navbar user={user} isAdmin={isAdmin} onLogout={logout} />

      <PageContainer>
        {/* Header with role badge */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900">{config.title}</h1>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.color}`}>
              {config.badge}
            </span>
          </div>
          <p className="text-sm text-gray-500">{config.description}</p>
        </div>

        {/* Role-specific info banners */}
        {role === "admin" && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            ⚠️ You are viewing <strong>all bookings</strong> across the platform as an administrator.
          </div>
        )}
        {role === "campOwner" && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            🏕️ Showing bookings for <strong>your campgrounds</strong>. You can view but not edit user bookings.
          </div>
        )}

        {/* Stats bar */}
        {!loading && bookings.length > 0 && (
          <div className="mb-6 flex gap-4">
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-gray-500">Upcoming</p>
              <p className="text-2xl font-bold text-blue-600">
                {bookings.filter(b => new Date(b.checkInDate) >= new Date()).length}
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-gray-500">Past</p>
              <p className="text-2xl font-bold text-gray-400">
                {bookings.filter(b => new Date(b.checkInDate) < new Date()).length}
              </p>
            </div>
          </div>
        )}

        {/* Booking list */}
        {error ? (
          <ErrorState message={error} onRetry={getBookings} />
        ) : (
          <BookingList
            bookings={bookings}
            loading={loading}
            onEdit={role !== "campOwner" ? handleEdit : undefined}
            onDelete={role !== "campOwner" ? handleDelete : undefined}
          />
        )}
      </PageContainer>

      {/* Edit Modal */}
      <Modal
        open={!!editingBooking}
        title={`Edit Booking — ${editingBooking?.campground?.name ?? ""}`}
        onClose={() => { setEditingBooking(null); setEditError("") }}
      >
        {editSuccess ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <div className="text-4xl">✅</div>
            <h3 className="text-lg font-semibold text-gray-900">Booking Updated!</h3>
            <p className="text-sm text-gray-500">Your booking dates have been updated.</p>
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
            error={editError || undefined}
          />
        )}
      </Modal>
    </>
  )
}
"use client"

import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import { Booking } from "@/libs/types"

interface BookingCardProps {
  booking: Booking
  onEdit?: (booking: Booking) => void
  onDelete?: (bookingId: string) => void
}

export default function BookingCard({ booking, onEdit, onDelete }: BookingCardProps) {
  const { _id, checkInDate, checkOutDate, nightsCount, campground, createdAt } = booking

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })

  const isUpcoming = new Date(checkInDate) >= new Date()

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{campground.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{campground.district}, {campground.province}</p>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isUpcoming ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
            {isUpcoming ? "Upcoming" : "Past"}
          </span>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Check-in</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">{formatDate(checkInDate)}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Check-out</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">{formatDate(checkOutDate)}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-1 text-sm text-gray-600">
          {nightsCount && (
            <p><span className="font-medium text-gray-800">🌙 Nights:</span> {nightsCount}</p>
          )}
          <p><span className="font-medium text-gray-800">📍 Address:</span> {campground.address}</p>
          <p><span className="font-medium text-gray-800">📞 Tel:</span> {campground.tel}</p>
          <p><span className="font-medium text-gray-800">🗓️ Booked on:</span> {formatDate(createdAt)}</p>
        </div>

        {/* Actions — only shown if handlers provided */}
        {(onEdit || onDelete) && isUpcoming && (
          <div className="mt-2 flex gap-3">
            {onEdit && (
              <Button variant="outline" fullWidth onClick={() => onEdit(booking)}>
                Edit
              </Button>
            )}
            {onDelete && (
              <Button variant="danger" fullWidth onClick={() => onDelete(_id)}>
                Cancel
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
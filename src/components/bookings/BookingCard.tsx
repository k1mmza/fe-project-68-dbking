"use client"

import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import { Booking } from "@/libs/types"

interface BookingCardProps {
  booking: Booking
  onEdit?: (booking: Booking) => void
  onDelete?: (bookingId: string) => void
}

export default function BookingCard({
  booking,
  onEdit,
  onDelete,
}: BookingCardProps) {
  const { _id, bookingDate, campground, createdAt } = booking

  const formattedBookingDate = new Date(bookingDate).toLocaleDateString()
  const formattedCreatedAt = new Date(createdAt).toLocaleDateString()

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {campground.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">{campground.region}</p>
        </div>

        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-800">Booking Date:</span>{" "}
            {formattedBookingDate}
          </p>
          <p>
            <span className="font-medium text-gray-800">Created At:</span>{" "}
            {formattedCreatedAt}
          </p>
          <p>
            <span className="font-medium text-gray-800">Address:</span>{" "}
            {campground.address}, {campground.district}, {campground.province}{" "}
            {campground.postalcode}
          </p>
          <p>
            <span className="font-medium text-gray-800">Telephone:</span>{" "}
            {campground.tel}
          </p>
        </div>

        <div className="mt-2 flex gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => onEdit?.(booking)}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            fullWidth
            onClick={() => onDelete?.(_id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}
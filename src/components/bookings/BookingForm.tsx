"use client"

import { useState } from "react"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

interface BookingFormProps {
  campId: string
  onSubmit: (campId: string, date: string) => Promise<void> | void
  loading?: boolean
  error?: string
}

export default function BookingForm({
  campId,
  onSubmit,
  loading = false,
  error,
}: BookingFormProps) {
  const [bookingDate, setBookingDate] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!bookingDate) return

    await onSubmit(campId, bookingDate)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Booking Date"
        type="date"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
        required
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <Button type="submit" loading={loading} fullWidth>
        Confirm Booking
      </Button>
    </form>
  )
}
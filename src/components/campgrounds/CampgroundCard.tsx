"use client"

import Image from "next/image"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import { Campground } from "@/libs/types"

interface CampgroundCardProps {
  campground: Campground
  onView?: (id: string) => void
  onBook?: (id: string) => void
}

export default function CampgroundCard({
  campground,
  onView,
  onBook,
}: CampgroundCardProps) {
  const {
    _id,
    name,
    address,
    district,
    province,
    postalcode,
    tel,
    region,
    picture,
  } = campground

  return (
    <Card hoverable className="overflow-hidden">
      <div className="relative h-52 w-full bg-gray-100">
        <Image
          src={picture || "/img/campground-placeholder.jpg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <p className="mt-1 text-sm text-gray-500">{region}</p>
        </div>

        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-800">Address:</span>{" "}
            {address}
          </p>
          <p>
            <span className="font-medium text-gray-800">District:</span>{" "}
            {district}
          </p>
          <p>
            <span className="font-medium text-gray-800">Province:</span>{" "}
            {province}
          </p>
          <p>
            <span className="font-medium text-gray-800">Postal Code:</span>{" "}
            {postalcode}
          </p>
          <p>
            <span className="font-medium text-gray-800">Tel:</span> {tel}
          </p>
        </div>

        <div className="mt-2 flex gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => onView?.(_id)}
          >
            View Details
          </Button>

          <Button
            fullWidth
            onClick={() => onBook?.(_id)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  )
}
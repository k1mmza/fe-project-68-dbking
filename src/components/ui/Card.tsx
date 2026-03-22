"use client"

import React from "react"
import clsx from "clsx"

interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
}

export default function Card({
  children,
  className,
  hoverable = false,
  onClick,  
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "bg-white rounded-2xl shadow-md border border-gray-100",
        "transition duration-200",
        hoverable && "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  )
}
"use client"

import React from "react"
import clsx from "clsx"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  )
}
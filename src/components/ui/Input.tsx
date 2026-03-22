"use client"

import React from "react"
import clsx from "clsx"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

export default function Input({
  label,
  error,
  fullWidth = true,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name

  return (
    <div className={clsx("flex flex-col gap-1", fullWidth && "w-full")}>
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Input */}
      <input
        id={inputId}
        className={clsx(
          "px-3 py-2 rounded-lg border transition duration-200 outline-none",
          "focus:ring-2 focus:ring-blue-500",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500",
          className
        )}
        {...props}
      />

      {/* Error */}
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  )
}
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import PageContainer from "@/components/layout/PageContainer"
import CampgroundList from "@/components/campgrounds/CampgroundList"
import ErrorState from "@/components/common/ErrorState"
import { useCampgrounds } from "@/libs/hooks/useCampgrounds"
import { useAuth } from "@/libs/hooks/useAuth"

export default function HomePage() {
  const router = useRouter()
  const { user, logout, isAdmin } = useAuth()
  const { campgrounds, getCampgrounds, loading, error } = useCampgrounds()

  useEffect(() => {
    getCampgrounds()
  }, [])

  const handleView = (id: string) => router.push(`/campgrounds/${id}`)
  const handleBook = (id: string) => router.push(`/campgrounds/${id}`)

  return (
    <>
      <Navbar user={user} isAdmin={isAdmin} onLogout={logout} />

      <PageContainer>
        {/* Hero */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white">
          <h1 className="text-3xl font-bold">Find Your Perfect Campground</h1>
          <p className="mt-2 text-sm text-blue-100">
            Explore beautiful locations and book your next outdoor adventure.
          </p>
          {!user && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => router.push("/login")}
                className="rounded-lg border border-white px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-blue-600"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/register")}
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* Campgrounds */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Campgrounds</h2>
          <p className="mt-1 text-sm text-gray-500">
            Browse our top campground listings.
          </p>
        </div>

        {error ? (
          <ErrorState message={error} onRetry={getCampgrounds} />
        ) : (
          <CampgroundList
            campgrounds={campgrounds}
            loading={loading}
            onView={handleView}
            onBook={handleBook}
          />
        )}
      </PageContainer>
    </>
  )
}
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import PageContainer from "@/components/layout/PageContainer"
import CampgroundList from "@/components/campgrounds/CampgroundList"
import ErrorState from "@/components/common/ErrorState"
import { useCampgrounds } from "@/libs/hooks/useCampgrounds"
import { useAuth } from "@/libs/hooks/useAuth"

export default function CampgroundsPage() {
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Campgrounds</h1>
          <p className="mt-2 text-sm text-gray-500">
            Explore available campgrounds and book your next stay.
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
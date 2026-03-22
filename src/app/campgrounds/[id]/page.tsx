"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import PageContainer from "@/components/layout/PageContainer"
import CampgroundDetailCard from "@/components/campgrounds/CampgroundDetailCard"
import ErrorState from "@/components/common/ErrorState"
import { useCampgrounds } from "@/libs/hooks/useCampgrounds"
import { useAuth } from "@/libs/hooks/useAuth"

export default function CampgroundDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, logout, isAdmin } = useAuth()
  const { singleCampground, getCampgroundById, loading, error } = useCampgrounds()

  const campgroundId = params?.id as string

  useEffect(() => {
    if (campgroundId) {
      getCampgroundById(campgroundId)
    }
  }, [campgroundId])

  const handleBack = () => {
    router.back()
  }

  const handleBook = (id: string) => {
    router.push(`/bookings/new?campId=${id}`)
  }

  return (
    <>
      <Navbar user={user} isAdmin={isAdmin} onLogout={logout} />

      <PageContainer>
        {error ? (
          <ErrorState
            message={error}
            onRetry={() => getCampgroundById(campgroundId)}
          />
        ) : (
          <CampgroundDetailCard
            campground={singleCampground}
            loading={loading}
            onBack={handleBack}
            onBook={handleBook}
          />
        )}
      </PageContainer>
    </>
  )
}
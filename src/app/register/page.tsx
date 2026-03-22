"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import PageContainer from "@/components/layout/PageContainer"
import RegisterForm from "@/components/auth/RegisterForm"
import { useAuth } from "@/libs/hooks/useAuth"
import { RegisterData } from "@/libs/types"

export default function RegisterPage() {
  const router = useRouter()
  const { register, loading } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async (data: RegisterData) => {
    setError(null)

    try {
      await register(data)
      router.push("/")
    } catch (err) {
      console.error(err)
      setError("Registration failed. Please try again.")
    }
  }

  return (
    <>
      <Navbar />

      <PageContainer>
        <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Register
          </h1>

          <RegisterForm
            onSubmit={handleRegister}
            loading={loading}
            error={error ?? undefined}
          />
        </div>
      </PageContainer>
    </>
  )
}
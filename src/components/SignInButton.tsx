'use client'

import { signIn, getCsrfToken } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function SignInButton() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null)

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken()
      setCsrfToken(token)
    }

    fetchCsrfToken()
  }, [])

  const handleSignIn = (provider: string) => {
    if (csrfToken) {
      signIn(provider, {
        callbackUrl: '/',
        csrfToken,
      })
    }
  }

  return (
    <div className="container">
      <h1 className="text-center text-4xl text-pink-500 mb-10">SIGN IN</h1>

      <div className="separator mb-8"></div>

      <button
        className="google__btn flex items-center justify-center gap-4 w-full max-w-[680px] mx-auto mb-4 rounded-lg p-3"
        onClick={() => handleSignIn('google')}
        disabled={!csrfToken}
      >
        <Image src="/google-logo.png" height={30} width={30} alt="Google" />
        <span className="flex items-center justify-center relative -top-[38px]">
          Sign in with Google
        </span>
      </button>

      <button
        className="github__btn flex items-center justify-center gap-4 w-full max-w-[680px] mx-auto mb-4 rounded-lg p-3"
        onClick={() => handleSignIn('github')}
        disabled={!csrfToken}
      >
        <Image src="/github-logo.png" height={30} width={30} alt="GitHub" />
        <span className="flex items-center justify-center relative -top-[38px]">
          Sign in with GitHub
        </span>
      </button>
    </div>
  )
}

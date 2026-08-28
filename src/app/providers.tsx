'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, useRef } from 'react'
import PostHogPageView from './PostHogPageView'
import { useConsent } from '@/lib/hooks/useConsent'

// Cookie consent gate: PostHog must not run (and must not set any cookies/
// localStorage) until the visitor has actively opted into "Analytics" via
// the cookie banner. See src/lib/consent.ts.
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const analyticsConsent = useConsent('analytics')
  const initialized = useRef(false)

  useEffect(() => {
    if (analyticsConsent && !initialized.current) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: 'identified_only',
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually via PostHogPageView
        capture_pageleave: true,
      })
      initialized.current = true
    } else if (initialized.current) {
      // Consent was withdrawn/granted again after the first init - toggle
      // capturing rather than re-initializing.
      if (analyticsConsent) {
        posthog.opt_in_capturing()
      } else {
        posthog.opt_out_capturing()
      }
    }
  }, [analyticsConsent])

  return (
    <PHProvider client={posthog}>
      {analyticsConsent && <PostHogPageView />}
      {children}
    </PHProvider>
  )
}

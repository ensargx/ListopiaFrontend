import { useEffect, useState } from 'react'

const RECAPTCHA_SITE_KEY = '6Ld7qCorAAAAAPivgChGfO9TKIKm0B7YLlLJD795'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export const useReCaptcha = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const existingScript = document.querySelector(`script[src^="https://www.google.com/recaptcha/api.js"]`)
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
      script.async = true
      script.onload = () => setLoaded(true)
      document.body.appendChild(script)
    } else {
      setLoaded(true)
    }
  }, [])

  const execute = async (action: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!loaded || !window.grecaptcha) {
        return reject(new Error('ReCAPTCHA not loaded'))
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha!
          .execute(RECAPTCHA_SITE_KEY, { action })
          .then(resolve)
          .catch(reject)
      })
    })
  }

  return { loaded, execute }
}

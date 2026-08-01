// Loads Google reCAPTCHA v3 (invisible) and returns a token on demand.
// Silently no-ops if VITE_RECAPTCHA_SITE_KEY isn't set yet, so the app
// doesn't break before you've generated real keys.
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY

let scriptLoaded = false

function loadScript() {
  if (!SITE_KEY || scriptLoaded) return
  const script = document.createElement('script')
  script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
  document.head.appendChild(script)
  scriptLoaded = true
}

export async function getRecaptchaToken(action = 'submit') {
  if (!SITE_KEY) return null // not configured yet — caller should proceed without it
  loadScript()
  return new Promise((resolve) => {
    const check = setInterval(() => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        clearInterval(check)
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(SITE_KEY, { action }).then(resolve)
        })
      }
    }, 100)
    setTimeout(() => { clearInterval(check); resolve(null) }, 5000)
  })
}
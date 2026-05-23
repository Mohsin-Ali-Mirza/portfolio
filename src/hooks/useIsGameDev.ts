import { useState, useEffect } from "react"

export function useIsGameDev() {
  const [isGameDev, setIsGameDev] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme")
      if (stored === "gamedev") return true
      if (stored === "ai") return false
      return window.document.documentElement.classList.contains("gamedev")
    }
    return false
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleThemeChange = () => {
      setIsGameDev(window.document.documentElement.classList.contains("gamedev"))
    }

    // Sync from both custom dispatch event and direct HTML class modifications
    window.addEventListener("themechange", handleThemeChange)

    const observer = new MutationObserver(handleThemeChange)
    observer.observe(window.document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => {
      window.removeEventListener("themechange", handleThemeChange)
      observer.disconnect()
    }
  }, [])

  return isGameDev
}

import { useEffect, useState } from "react"

export function useCountdown(targetTimestamp: number | null) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!targetTimestamp) return
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [targetTimestamp])

  if (!targetTimestamp) return 0
  return Math.max(0, Math.ceil((targetTimestamp - now) / 1000))
}

export function formatCountdown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

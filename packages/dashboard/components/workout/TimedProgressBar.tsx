import {Progress} from "@/components/ui/progress"
import {useEffect, useState} from "react"

interface TimedProgressBarProps {
  isActive: boolean
  duration: number // in milliseconds
  onComplete?: () => void
  className?: string
}

export default function TimedProgressBar({
  isActive,
  duration,
  onComplete,
  className = "",
}: TimedProgressBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setProgress(0)
      return
    }

    // Reset progress when we start
    setProgress(0)

    // Calculate the interval time for smooth animation (updating every 50ms)
    const interval = 50
    // Calculate the increment per interval
    const increment = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        // Cap at 99% until we know for sure it's complete
        const newProgress = Math.min(prevProgress + increment, 99)
        return newProgress
      })
    }, interval)

    // Create another timer for completion
    const completionTimer = setTimeout(() => {
      setProgress(100)
      if (onComplete) onComplete()
    }, duration)

    return () => {
      clearInterval(timer)
      clearTimeout(completionTimer)
    }
  }, [isActive, duration, onComplete])

  return <Progress value={progress} className={className} />
}

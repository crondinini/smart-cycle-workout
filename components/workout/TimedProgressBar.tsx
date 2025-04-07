import {Progress} from "@/components/ui/progress"
import {useEffect, useState} from "react"

interface TimedProgressBarProps {
  isActive: boolean
  duration: number // in milliseconds
  className?: string
}

export default function TimedProgressBar({
  isActive,
  duration,
  className = "",
}: TimedProgressBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)

    const interval = 50
    const increment = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        // Cap at 99% until we know for sure it's complete
        const newProgress = Math.min(prevProgress + increment, 99)
        return newProgress
      })
    }, interval)

    const completionTimer = setTimeout(() => {
      setProgress(100)
    }, duration)

    return () => {
      clearInterval(timer)
      clearTimeout(completionTimer)
    }
  }, [isActive, duration])

  return <Progress value={progress} className={className} />
}

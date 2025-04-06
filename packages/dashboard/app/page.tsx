"use client"
import Image from "next/image"
import {Calendar} from "@/components/ui/calendar"
import {useState} from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Progress} from "@/components/ui/progress"
import {Lightbulb, Github, AudioWaveform} from "lucide-react"
import {Button} from "@/components/ui/button"

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [progress, setProgress] = useState(20)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20  sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
        <h1 className="text-3xl font-bold">
          <AudioWaveform className="inline-block pl-10px ml-2" />
          {""}
          Smart Cycle Workout
        </h1>
        <p className="text-lg text-center">A period-aware workout plan created by AI.</p>
        <Progress value={progress} />

        <h2 className="text-lg font-bold text-center">When was your last period?</h2>
        <div className="flex flex-row gap-[32px] row-start-2 items-center sm:items-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          <Button className="mt-4" onClick={() => setProgress(75)}>
            Next
          </Button>
        </div>
        <Alert>
          <Lightbulb />
          <AlertTitle>Did you know?</AlertTitle>
          <AlertDescription>
            The menstrual cycle directly impacts workout performance and energy. Rising estrogen in
            the follicular phase (days 1-14) boosts energy and strength, while increased
            progesterone in the luteal phase (days 15-28) often causes fatigue. Aligning workouts
            with these hormonal patterns can optimize fitness results and recovery.
          </AlertDescription>
        </Alert>
        {/* <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol> */}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          Source Code
        </a>
      </footer>
    </div>
  )
}

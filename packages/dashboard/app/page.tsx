"use client"
import Image from "next/image"
import {Calendar} from "@/components/ui/calendar"
import {useState, useEffect} from "react"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Progress} from "@/components/ui/progress"
import {Lightbulb, Github, AudioWaveform, Dumbbell, Scale, Activity, Link} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [progress, setProgress] = useState(33)
  const [currentPage, setCurrentPage] = useState(1)
  const [goal, setGoal] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [workout, setWorkout] = useState<any>(null)

  useEffect(() => {
    if (isGenerating) {
      // Simulate workout generation
      const timer = setTimeout(() => {
        setWorkout({
          exercises: [
            {
              title: "Warm-up Cycling",
              description: "10 minutes at moderate pace",
              image: "/cycling-warmup.jpg",
            },
            {
              title: "High-Intensity Intervals",
              description: "5 x 2 minutes sprints with 1 minute rest",
              image: "/hiit-cycling.jpg",
            },
            {
              title: "Cool-down Stretch",
              description: "5 minutes light cycling followed by stretching",
              image: "/stretch.jpg",
            },
          ],
        })
        setIsGenerating(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isGenerating])

  const handleNext = () => {
    if (currentPage === 1 && date) {
      setCurrentPage(2)
      setProgress(66)
    } else if (currentPage === 2 && goal) {
      setCurrentPage(3)
      setProgress(100)
      setIsGenerating(true)
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
            <h2 className="text-lg font-bold text-center">When was your last period?</h2>
            <div className="flex flex-col gap-[32px] items-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <Button className="w-32" onClick={handleNext} disabled={!date}>
                Next
              </Button>
            </div>
            <Alert>
              <Lightbulb />
              <AlertTitle>Did you know?</AlertTitle>
              <AlertDescription>
                The menstrual cycle directly impacts workout performance and energy. Rising estrogen
                in the follicular phase (days 1-14) boosts energy and strength, while increased
                progesterone in the luteal phase (days 15-28) often causes fatigue. Aligning
                workouts with these hormonal patterns can optimize fitness results and recovery.
              </AlertDescription>
            </Alert>
          </>
        )
      case 2:
        return (
          <div className="flex flex-col gap-8 items-center w-full max-w-2xl">
            <h2 className="text-lg font-bold text-center">What do you want to achieve?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <Button
                variant={goal === "muscle" ? "default" : "outline"}
                className="h-32 flex flex-col gap-2"
                onClick={() => setGoal("muscle")}
              >
                <Dumbbell size={24} />I want to gain muscle
              </Button>
              <Button
                variant={goal === "weight" ? "default" : "outline"}
                className="h-32 flex flex-col gap-2"
                onClick={() => setGoal("weight")}
              >
                <Scale size={24} />I want to lose weight
              </Button>
              <Button
                variant={goal === "active" ? "default" : "outline"}
                className="h-32 flex flex-col gap-2"
                onClick={() => setGoal("active")}
              >
                <Activity size={24} />I want to be active
              </Button>
            </div>
            <Button className="w-32" onClick={handleNext} disabled={!goal}>
              Generate Workout
            </Button>
          </div>
        )
      case 3:
        return (
          <div className="flex flex-col gap-8 items-center w-full max-w-4xl">
            <h2 className="text-lg font-bold text-center">
              {isGenerating ? "Generating your workout..." : "Your Personalized Workout"}
            </h2>
            {isGenerating ? (
              <Progress value={progress} className="w-64" />
            ) : workout ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {workout.exercises.map((exercise: any, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{exercise.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative w-full h-48 mb-4">
                        <Image
                          src={exercise.image}
                          alt={exercise.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : null}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      {/* <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="https://github.com/crondinini/smart-cycle-workout" target="_blank">
              <NavigationMenuLink>Source Code</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center w-full">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <AudioWaveform />
          Smart Cycle Workout
        </h1>
        <p className="text-lg text-center">A period-aware workout plan created by AI.</p>
        <Progress value={progress} className="w-64" />
        {renderPage()}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/camilarondinini/cycle-smart-workout"
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

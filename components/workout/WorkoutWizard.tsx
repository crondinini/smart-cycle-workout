import {useState, useEffect} from "react"
import DateSelection from "./DateSelection"
import GoalSelection from "./GoalSelection"
import WorkoutDisplay from "./WorkoutDisplay"
import {WorkoutGoalEnum, GenerateWorkoutInput, WorkoutPlan} from "@/lib/workout-prompt-schema"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"

export async function generateWorkout(input: GenerateWorkoutInput): Promise<WorkoutPlan> {
  const response = await fetch("/api/generate-workout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error("Failed to generate workout")
  }

  return await response.json()
}

export enum WorkoutWizardPage {
  DATE_SELECTION = "DATE_SELECTION",
  GOAL_SELECTION = "GOAL_SELECTION",
  WORKOUT_DISPLAY = "WORKOUT_DISPLAY",
}

export default function WorkoutWizard() {
  const [currentPage, setCurrentPage] = useState(WorkoutWizardPage.DATE_SELECTION)
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(new Date())
  const [goal, setGoal] = useState<WorkoutGoalEnum | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWorkout = async () => {
      if (isGenerating && lastPeriodDate && goal) {
        try {
          const data = await generateWorkout({
            lastPeriodDate: lastPeriodDate,
            goal,
          })
          setWorkout(data)
          setError(null)
        } catch (error) {
          console.error("Error generating workout:", error)
          setError("Failed to generate workout.")
        } finally {
          setIsGenerating(false)
        }
      }
    }

    if (isGenerating) {
      fetchWorkout()
    }
  }, [isGenerating, lastPeriodDate, goal])

  const handleNext = () => {
    if (currentPage === WorkoutWizardPage.DATE_SELECTION && lastPeriodDate) {
      setCurrentPage(WorkoutWizardPage.GOAL_SELECTION)
    } else if (currentPage === WorkoutWizardPage.GOAL_SELECTION && goal) {
      setCurrentPage(WorkoutWizardPage.WORKOUT_DISPLAY)
      setIsGenerating(true)
    }
  }

  return (
    <>
      {currentPage === WorkoutWizardPage.DATE_SELECTION && (
        <DateSelection date={lastPeriodDate} onDateChange={setLastPeriodDate} onNext={handleNext} />
      )}

      {currentPage === WorkoutWizardPage.GOAL_SELECTION && (
        <GoalSelection goal={goal} onGoalChange={setGoal} onNext={handleNext} />
      )}

      {currentPage === WorkoutWizardPage.WORKOUT_DISPLAY && (
        <>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <WorkoutDisplay
            isGenerating={isGenerating}
            workout={workout}
            onGenerationComplete={() => {}}
          />
        </>
      )}
    </>
  )
}

import {useState, useEffect} from "react"
import {Progress} from "@/components/ui/progress"
import DateSelection from "./DateSelection"
import GoalSelection from "./GoalSelection"
import WorkoutDisplay from "./WorkoutDisplay"
import {WorkoutGoalEnum, GenerateWorkoutInput, WorkoutPlan} from "@/lib/workout-prompt-schema"

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
  const [progress, setProgress] = useState(33)
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(new Date())
  const [goal, setGoal] = useState<WorkoutGoalEnum | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null)

  useEffect(() => {
    const fetchWorkout = async () => {
      if (isGenerating && lastPeriodDate && goal) {
        try {
          const data = await generateWorkout({
            lastPeriodDate: lastPeriodDate,
            goal,
          })
          setWorkout(data)
        } catch (error) {
          console.error("Error generating workout:", error)
          // You might want to show an error message to the user here
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
      setProgress(66)
    } else if (currentPage === WorkoutWizardPage.GOAL_SELECTION && goal) {
      setCurrentPage(WorkoutWizardPage.WORKOUT_DISPLAY)
      setProgress(100)
      setIsGenerating(true)
    }
  }

  return (
    <>
      {isGenerating && <Progress value={progress} className="w-64" />}

      {currentPage === WorkoutWizardPage.DATE_SELECTION && (
        <DateSelection date={lastPeriodDate} onDateChange={setLastPeriodDate} onNext={handleNext} />
      )}

      {currentPage === WorkoutWizardPage.GOAL_SELECTION && (
        <GoalSelection goal={goal} onGoalChange={setGoal} onNext={handleNext} />
      )}

      {currentPage === WorkoutWizardPage.WORKOUT_DISPLAY && (
        <WorkoutDisplay
          isGenerating={isGenerating}
          workout={workout}
          onGenerationComplete={() => {}}
        />
      )}
    </>
  )
}

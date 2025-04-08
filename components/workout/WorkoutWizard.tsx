"use client"
import {useState, useEffect} from "react"
import DateSelection from "./DateSelection"
import GoalSelection from "./GoalSelection"
import WorkoutDisplay from "./WorkoutDisplay"
import {WorkoutGoalEnum, GenerateWorkoutInput, WorkoutPlan} from "@/lib/workout-prompt-schema"
import { Button } from "../ui/button"

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

function saveToLocalStorage(key: string, data: WorkoutPlan) {
  if (typeof window !== 'undefined') {
    try {
      const jsonString = JSON.stringify(data);
      localStorage.setItem(key, jsonString);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }
  return false;
}

function getFromLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    try {
      const jsonString = localStorage.getItem(key);
      if (!jsonString) return null;
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error retrieving from localStorage:', error);
      return null;
    }
  }
  return null;
}

function removeFromLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing item from localStorage:', error);
      return false;
    }
  }
  return false;
}


export default function WorkoutWizard() {
  const [currentPage, setCurrentPage] = useState(WorkoutWizardPage.DATE_SELECTION)
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(undefined)
  const [goal, setGoal] = useState<WorkoutGoalEnum | null>(null)
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [generationState, setGenerationState] = useState<"not_started" | "in_progress" | "success" | "error">("not_started")

  useEffect(() => {
    const storedWorkout = getFromLocalStorage("workout")
    if (storedWorkout) {
      setWorkout(storedWorkout)
      setCurrentPage(WorkoutWizardPage.WORKOUT_DISPLAY)
      setGenerationState("success")
    }
  }, [])

  useEffect(() => {
    const fetchWorkout = async () => {
      if (generationState === "in_progress" && lastPeriodDate && goal) {
        try {
          const data = await generateWorkout({
            lastPeriodDate: lastPeriodDate,
            goal,
          })
          setWorkout(data)
          saveToLocalStorage("workout", data)
          setError(null)
          setGenerationState("success")
        } catch (error) {
          console.error("Error generating workout:", error)
          setError("Failed to generate workout.")
          setGenerationState("error")
        }
      }
    }

    if (generationState === "in_progress") {
      fetchWorkout()
    }
  }, [generationState, lastPeriodDate, goal])

  const handleNext = () => {
    if (currentPage === WorkoutWizardPage.DATE_SELECTION && lastPeriodDate) {
      setCurrentPage(WorkoutWizardPage.GOAL_SELECTION)
    } else if (currentPage === WorkoutWizardPage.GOAL_SELECTION && goal) {
      setCurrentPage(WorkoutWizardPage.WORKOUT_DISPLAY)
      setGenerationState("in_progress")
    }
  }

  const handleReset = () => {
    setCurrentPage(WorkoutWizardPage.DATE_SELECTION)
    setLastPeriodDate(undefined)
    setGoal(null)
    setWorkout(null)
    setError(null)
    setGenerationState("not_started")
    removeFromLocalStorage("workout")
  }

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto">
      {currentPage !== WorkoutWizardPage.DATE_SELECTION && (
        <Button onClick={handleReset} className="mb-8" disabled={generationState === "in_progress"}>
          Start again
        </Button>
      )}
      {currentPage === WorkoutWizardPage.DATE_SELECTION && (
        <DateSelection date={lastPeriodDate} onDateChange={setLastPeriodDate} onNext={handleNext} />
      )}

      {currentPage === WorkoutWizardPage.GOAL_SELECTION && (
        <GoalSelection goal={goal} onGoalChange={setGoal} onNext={handleNext} />
      )}

      {currentPage === WorkoutWizardPage.WORKOUT_DISPLAY && (
        <>
          <WorkoutDisplay
            generationState={generationState}
            workout={workout}
            error={error}
          />
        </>
      )}
    </div>
  )
}

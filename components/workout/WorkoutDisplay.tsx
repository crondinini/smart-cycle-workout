import ExerciseCard from "./ExerciseCard"
import WorkoutSummaryCard from "./WorkoutSummaryCard"
import {WorkoutPlan} from "../../lib/workout-prompt-schema"
import TimedProgressBar from "./TimedProgressBar"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

interface WorkoutDisplayProps {
  generationState: "not_started" | "in_progress" | "success" | "error"
  workout: WorkoutPlan | null
  error: string | null
}

export default function WorkoutDisplay({
  generationState,
  workout,
  error
}: WorkoutDisplayProps) {
  if (generationState === 'not_started') {
    return null
  }

  if (generationState === 'in_progress') {
    return (
      <div className="flex flex-col gap-8 items-center w-full max-w-4xl">
        <h2 className="text-lg font-bold text-center">Generating your workout...</h2>
        <TimedProgressBar
          isActive={generationState === 'in_progress'}
          duration={30000} // 30 seconds
          className="w-64"
        />
      </div>
    )
  }

  if (generationState === 'error') {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex flex-col gap-8 items-center w-full max-w-4xl">
      <h2 className="text-lg font-bold text-center">{"Your Personalized Workout"}</h2>
      {workout ? (
        <>
          <WorkoutSummaryCard summary={workout.trainingSummary} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {workout.workoutRoutine.map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

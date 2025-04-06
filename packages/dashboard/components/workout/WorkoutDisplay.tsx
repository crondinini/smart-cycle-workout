import ExerciseCard from "./ExerciseCard"
import WorkoutSummaryCard from "./WorkoutSummaryCard"
import {WorkoutPlan} from "../../lib/workout-prompt-schema"
import TimedProgressBar from "./TimedProgressBar"

interface WorkoutDisplayProps {
  isGenerating: boolean
  workout: WorkoutPlan | null
  onGenerationComplete: () => void
}

export default function WorkoutDisplay({
  isGenerating,
  workout,
  onGenerationComplete,
}: WorkoutDisplayProps) {
  if (!workout && !isGenerating) {
    return null
  }

  if (isGenerating) {
    return (
      <div className="flex flex-col gap-8 items-center w-full max-w-4xl">
        <h2 className="text-lg font-bold text-center">Generating your workout...</h2>
        <TimedProgressBar
          isActive={isGenerating}
          duration={30000} // 30 seconds
          onComplete={onGenerationComplete}
          className="w-64"
        />
      </div>
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

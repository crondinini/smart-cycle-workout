import {Button} from "@/components/ui/button"
import {Dumbbell, Scale, Activity} from "lucide-react"
import {WorkoutGoalEnum} from "@/lib/workout-prompt-schema"

interface GoalSelectionProps {
  goal: WorkoutGoalEnum | null
  onGoalChange: (goal: WorkoutGoalEnum) => void
  onNext: () => void
}

export default function GoalSelection({goal, onGoalChange, onNext}: GoalSelectionProps) {
  return (
    <div className="flex flex-col gap-8 items-center w-full max-w-2xl">
      <h2 className="text-lg font-bold text-center">What do you want to achieve?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <Button
          variant={goal === WorkoutGoalEnum.GainMuscle ? "default" : "outline"}
          className="h-32 flex flex-col gap-2"
          onClick={() => onGoalChange(WorkoutGoalEnum.GainMuscle)}
        >
          <Dumbbell size={24} />I want to gain muscle
        </Button>
        <Button
          variant={goal === WorkoutGoalEnum.LoseWeight ? "default" : "outline"}
          className="h-32 flex flex-col gap-2"
          onClick={() => onGoalChange(WorkoutGoalEnum.LoseWeight)}
        >
          <Scale size={24} />I want to lose weight
        </Button>
        <Button
          variant={goal === WorkoutGoalEnum.BeActive ? "default" : "outline"}
          className="h-32 flex flex-col gap-2"
          onClick={() => onGoalChange(WorkoutGoalEnum.BeActive)}
        >
          <Activity size={24} />I want to be active
        </Button>
      </div>
      <Button className="w-32" onClick={onNext} disabled={!goal}>
        Generate Workout
      </Button>
    </div>
  )
}

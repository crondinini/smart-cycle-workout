import Image from "next/image"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Exercise} from "../../lib/workout-prompt-schema"

interface ExerciseCardProps {
  exercise: Exercise
}

export default function ExerciseCard({exercise}: ExerciseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{exercise.name}</CardTitle>
        <CardDescription>{`${exercise.sets} sets of ${exercise.reps} reps`}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-48 mb-4">
          <Image
            src={exercise.gifUrl}
            alt={exercise.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <CardDescription>{exercise.notes}</CardDescription>
      </CardContent>
    </Card>
  )
}

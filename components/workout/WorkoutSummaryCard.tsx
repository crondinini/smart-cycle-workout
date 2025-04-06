import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Separator} from "@/components/ui/separator"
import {CalendarClock} from "lucide-react"
import {WorkoutSummary} from "../../lib/workout-prompt-schema"

interface WorkoutSummaryCardProps {
  summary: WorkoutSummary
}

export default function WorkoutSummaryCard({summary}: WorkoutSummaryCardProps) {
  return (
    <Card className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-none shadow-md">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-white/80 dark:bg-gray-800/80 shadow-sm py-1.5">
              {`${summary.currentPeriodPhase} | Last Period ${new Date(
                summary.lastPeriodDate,
              ).toLocaleDateString()}`}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
            >
              Today's Workout
            </Badge>
          </div>

          <div className="py-4 text-center">
            <p className="text-gray-600 dark:text-gray-300 font-medium mb-4">
              {summary.description}
            </p>
            <Separator className="my-4" />
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
              <CalendarClock />
              <p className="text-sm font-medium">{summary.energyConsideration}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

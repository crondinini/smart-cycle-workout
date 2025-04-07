import {Calendar} from "@/components/ui/calendar"
import {Button} from "@/components/ui/button"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Lightbulb} from "lucide-react"

interface DateSelectionProps {
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
  onNext: () => void
}

export default function DateSelection({date, onDateChange, onNext}: DateSelectionProps) {
  const lastMonth = new Date()
  lastMonth.setMonth(lastMonth.getMonth() - 1)
  return (
    <>
      <h2 className="text-lg font-bold text-center">When was your last period?</h2>
      <div className="flex flex-col gap-6 items-center">
        <Calendar
          numberOfMonths={2}
          mode="single"
          defaultMonth={lastMonth}
          // fromDate={lastMonth}
          // startMonth={new Date(2024, 6)}
          selected={date}
          onSelect={onDateChange}
          className="rounded-md border"
        />
        <Button className="w-32" onClick={onNext} disabled={!date}>
          Next
        </Button>
      </div>
      <Alert className="mt-4 mb-10">
        <Lightbulb className="h-5 w-5" />
        <AlertTitle>Did you know?</AlertTitle>
        <AlertDescription>
          The menstrual cycle directly impacts workout performance and energy. Rising estrogen in
          the follicular phase (days 1-14) boosts energy and strength, while increased progesterone
          in the luteal phase (days 15-28) often causes fatigue. Aligning workouts with these
          hormonal patterns can optimize fitness results and recovery.
        </AlertDescription>
      </Alert>
    </>
  )
}

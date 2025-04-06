import {z} from "zod"

/** Input */
export enum WorkoutGoalEnum {
  GainMuscle = "gain-muscle",
  LoseWeight = "lose-weight",
  BeActive = "be-active",
}

export const GenerateWorkoutInputSchema = z.object({
  lastPeriodDate: z.date(),
  goal: z.nativeEnum(WorkoutGoalEnum),
})

export type GenerateWorkoutInput = z.infer<typeof GenerateWorkoutInputSchema>

/** Response */
export const WorkoutSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  energyConsideration: z.string(),
  currentPeriodPhase: z.string(),
  lastPeriodDate: z.coerce.date(),
})

export const ExerciseSchema = z.object({
  name: z.string(),
  gifUrl: z.string().url(),
  sets: z.number().int().positive(),
  reps: z.number().int().positive(),
  notes: z.string().optional(),
})

export const WorkoutPlanSchema = z.object({
  trainingSummary: WorkoutSummarySchema,
  workoutRoutine: z.array(ExerciseSchema),
})

export type WorkoutSummary = z.infer<typeof WorkoutSummarySchema>
export type Exercise = z.infer<typeof ExerciseSchema>
export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>

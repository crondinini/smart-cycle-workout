import {Hono} from "hono"
import {handle} from "hono/vercel"
import {generateMessage} from "../../../lib/anthropic"
import {WorkoutPlanSchema} from "../../../lib/workout-prompt-schema"
export const runtime = "edge"

const app = new Hono().basePath("/api")

const route = app.post("/generate-workout", async (c) => {
  const {lastPeriodDate, goal} = await c.req.json()

  const prompt = `Last menstrual period was ${lastPeriodDate}. User wants a workout with the goal of ${goal}`
  const finalMessage = await generateMessage(prompt)
  if (!finalMessage) {
    return c.json({error: "Failed to generate workout"}, 500)
  }

  try {
    const parsed = JSON.parse(finalMessage)
    const result = WorkoutPlanSchema.parse(parsed)
    return c.json(result)
  } catch (error) {
    return c.json({error: "Failed to parse response from AI"}, 500)
  }
})

export type AppType = typeof route
export const POST = handle(app)

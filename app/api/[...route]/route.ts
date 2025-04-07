import {Hono} from "hono"
import {handle} from "hono/vercel"
import {generateMessage} from "../../../lib/anthropic"
import {WorkoutPlanSchema} from "../../../lib/workout-prompt-schema"
export const runtime = "edge"

const app = new Hono().basePath("/api")

app.post("/generate-workout", async (c) => {
  const {lastPeriodDate, goal} = await c.req.json()

  try {
    const prompt = `Last menstrual period was ${lastPeriodDate}. User wants a workout with the goal of ${goal}`
    const finalMessage = await generateMessage(prompt)
    if (!finalMessage) {
      return c.json({error: "Failed to generate workout"}, 500)
    }

    const parsed = JSON.parse(finalMessage)
    const result = WorkoutPlanSchema.parse(parsed)
    return c.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return c.json({error: message}, 500)
  }
})

export const POST = handle(app)

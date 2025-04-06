import {Anthropic} from "@anthropic-ai/sdk"
import type {MessageParam} from "@anthropic-ai/sdk/resources/messages"
import {tools} from "./tools-schema"
import {systemPrompt} from "./system-workout-prompt"
import {fetchExercises} from "./fetch-exercises"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

/** Quickest implementation to get it started, but could be refactored to use streams if needed */
export async function generateMessage(userPrompt: string) {
  let messages: MessageParam[] = [
    {
      role: "user",
      content: userPrompt,
    },
  ]
  const workoutSystemPrompt = systemPrompt()

  let response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-latest",
    max_tokens: 1024,
    system: workoutSystemPrompt,
    messages,
    tools,
  })

  while (response.stop_reason === "tool_use") {
    if (response.role === "assistant") {
      messages.push({
        role: "assistant",
        content: response.content,
      })
    }

    const requestedTools = response.content.filter((block) => block.type === "tool_use")
    if (requestedTools.length === 0) {
      break
    }

    for (const requestedTool of requestedTools) {
      if (requestedTool.name === "save_user_preferences") {
        const input = requestedTool.input
        if (typeof input === "object") {
          messages.push({
            role: "user",
            content: [
              {
                type: "tool_result",
                tool_use_id: requestedTool.id,
                content: "Preferences saved",
              },
            ],
          })
        }
      }

      if (requestedTool.name === "fetch_exercises") {
        try {
          // TODO: Handle input parsing/use schema
          const fetchedExercises = await fetchExercises(requestedTool.input as unknown as any)
          messages.push({
            role: "user",
            content: [
              {
                type: "tool_result",
                tool_use_id: requestedTool.id,
                content: JSON.stringify(fetchedExercises),
              },
            ],
          })
        } catch (error) {
          messages.push({
            role: "user",
            content: [
              {
                type: "tool_result",
                tool_use_id: requestedTool.id,
                content: "Could not fetch exercises",
                is_error: true,
              },
            ],
          })
        }
      }
    }

    response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 1024,
      system: workoutSystemPrompt,
      messages,
      tools,
    })
  }

  const finalResponse = response.content.find((block) => block.type === "text")?.text

  return finalResponse
}

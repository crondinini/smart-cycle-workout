import type {ToolUnion} from "@anthropic-ai/sdk/resources/messages"
import {WorkoutGoalEnum} from "./workout-prompt-schema"

export const tools: ToolUnion[] = [
  {
    name: "fetch_exercises",
    description:
      "Retrieves exercises that match specified criteria from a comprehensive exercise database. This tool returns detailed exercise information for fitness planning, workout creation, or exercise exploration. It can filter exercises by specific muscle targets, body parts, and equipment availability, making it ideal for creating personalized workout plans or finding alternatives when certain equipment is unavailable. The returned exercises include names, instructions, images, and other relevant details. Use this tool when users need exercise recommendations, are creating workout routines, or want to explore exercises for specific muscle groups. Note that at least one criterion (muscleTarget, bodyPart, or equipment) should be provided along with a limit for optimal results. The tool does not evaluate exercise effectiveness for specific fitness goals or medical conditions.",
    input_schema: {
      type: "object",
      properties: {
        muscleTarget: {
          type: "string",
          description:
            "Specific muscle group to target with the exercise." +
            "This parameter allows for precise muscle targeting beyond general body parts," +
            "which is useful for specialized training and rehabilitation programs." +
            "For example, selecting 'biceps' will find exercises specifically targeting the biceps muscles" +
            "rather than just general 'arm' exercises.",
          enum: [
            [
              "abductors",
              "abs",
              "adductors",
              "biceps",
              "calves",
              "cardiovascular system",
              "delts",
              "forearms",
              "glutes",
              "hamstrings",
              "lats",
              "levator scapulae",
              "pectorals",
              "quads",
              "serratus anterior",
              "spine",
              "traps",
              "triceps",
              "upper back",
            ],
          ],
        },
        bodyPart: {
          type: "string",
          description:
            "General body region to target with the exercise. " +
            "This parameter is ideal for creating balanced workouts " +
            "that focus on specific regions of the body. " +
            "For example, selecting 'chest' will return various exercises " +
            "that work the chest area regardless of the specific muscles being targeted.",
          enum: [
            "back",
            "cardio",
            "chest",
            "lower arms",
            "lower legs",
            "neck",
            "shoulders",
            "upper arms",
            "upper legs",
            "waist",
          ],
        },
        equipment: {
          type: "string",
          description:
            "Specific equipment required for the exercise. " +
            "This parameter is essential for filtering exercises based on available equipment, " +
            "whether at home, in a gym, or when traveling. " +
            "For example, selecting 'body weight' will return exercises that require no equipment, " +
            "while 'dumbbell' will return exercises specifically using dumbbells.",
          enum: [
            "assisted",
            "band",
            "barbell",
            "body weight",
            "bosu ball",
            "cable",
            "dumbbell",
            "elliptical machine",
            "ez barbell",
            "hammer",
            "kettlebell",
            "leverage machine",
            "medicine ball",
            "olympic barbell",
            "resistance band",
            "roller",
            "rope",
            "skierg machine",
            "sled machine",
            "smith machine",
            "stability ball",
            "stationary bike",
            "stepmill machine",
            "tire",
            "trap bar",
            "upper body ergometer",
            "weighted",
            "wheel roller",
          ],
        },
        limit: {
          type: "integer",
          description:
            "Maximum number of exercises to return in the response. " +
            "This parameter helps manage the volume of data returned and " +
            "ensures the response isn't overwhelming. " +
            "For general browsing, a limit of 5-10 is recommended, " +
            "while for comprehensive workout planning, a higher limit may be more appropriate. " +
            "Must be a positive integer.",
        },
      },
      required: ["limit"],
    },
  },
  // This extra tool was mostly added so I could learn
  // how multiple tools are handled by the LLM.
  {
    name: "save_user_preferences",
    description: "Saves the user information related to menstrual cycle and workout goal",
    input_schema: {
      type: "object",
      properties: {
        userId: {
          type: "string",
          description: "User identifier",
        },
        lastPeriod: {
          type: "string",
          description: "ISO string date of last period",
        },
        currentPhase: {
          type: "string",
          enum: ["menstrual", "follicular", "ovulation", "luteal"],
          description: "Current menstrual cycle phase",
        },
        goal: {
          type: "string",
          enum: Object.values(WorkoutGoalEnum),
          description: "Workout goal",
        },
      },
      required: ["userId", "lastPeriod", "currentPhase", "goal"],
    },
  },
]

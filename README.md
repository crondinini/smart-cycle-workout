# Smart Cycle Workout

Smart Cycle Workout is an AI-powered POC application that creates personalized workout plans considering where in the menstrual cycle the user is.

The goal of this proof of concept was to explore Anthropic SDKs closer and specifically understand better:

- How to use the Anthropic SDK, and in particular, how to use it with custom tools
- Understand what the integration of an AI SDK looks like in a regular web app
- I initially started this exercise in the context of learning more about the Model Context Protocol (MCP). I thought I could use an MCP Client/Server, but as I learned more I realized that MCP server is the protocol that exposes concepts like "Tools" and so I thought using it would be a bit of an overkill for this proof of concept. I did code and used an MCP Server locally, but nothing that I'm showing here uses it.

## Technical Implementation

The application is built with Next.js. It has an UI interface that communicates with a single HTTP POST endpoint to generate the workout. The workout generated is a JSON object that is then displayed in the UI.

The HTTP POST endpoint uses the Anthropic SDK with a custom tool for fetching exercises. I chose to use the Anthropic SDK instead of Vercel AI SDK because I wanted to understand the inner workins better and I didn't want to just abstract it away to another tool. For the fetching of exercises, initially I went API calls to RapidDB, but it was limiting in the combination of exercises I could fetch. So I explored loading the exercises from a JSON file into an in-memory database to be able to fetch any combination of exercises.

The lib/ folder contains the code related to the Anthropic SDK calls, including the System Prompt, the Tools schema and the exercise fetching function. Zod schemas are used in a couple of places, but not in all of the ones I'd like to be using it.

## Challenges

- *JSON Response Format*: It took me a few attempts to make the final response include only JSON.
- *Message History*: I learned that the message history array that is sent back to the LLM with the tool_result must include both the assistant messages as well as user & tool response messages for proper context maintenance, which was different from my initial understanding.
- *Parallel Tool Execution*: Initially implemented sequential tool handling, but discovered that the LLM can request multiple tools simultaneously. Refactored the code to support parallel tool execution for improved efficiency.

## Future Improvements

This is a proof of concept and there's endless room for improvement.

Some that come to mind (not exhaustive by any means):

### UX Improvements

- **Add back button** - Allows users to navigate to previous screens without losing context
- **Add "generate new workout" button** after a workout has been created - Currently users must refresh the entire page to generate a new workout, which disrupts their flow
- **Persist information to database** with user associations - Creates continuity across sessions and enables personalized experiences
- **Include food suggestions based on period cycle** - Adds holistic health support beyond just workouts
- **Implement workout preference sharing** - Enables the system to factor in user preferences when generating workouts
- **More feedback while waiting for the AI to generate the workout** - Currently users have no feedback while waiting for the AI to generate the workout, only a progress bar.

### AI Generation & Code Improvements

- **Replace basic fetch implementations** - I used AI to speed up development, which led to some non-optimal patterns like using the node fetch library instead of Next.js optimized approaches. Hono's client with robust typing would be a better alternative.

- **Create a smarter exercise data fetching** - Currently the tool fetches from the API every time. We should implement:

  - Data caching
  - Enhanced randomization for variety
  - A pattern where we fetch all options first, cache them, then retrieve what is needed

- **Implement more robust schema validation** - Using Zod schema also in the prompt and throughout all the relevant parts of the application would improve data integrity.

- **Other strategies for ensuring JSON response format**: A potential pattern I would have liked to explore for trying to ensure the JSON format in the final response would be to implement a dedicated "tool" that takes as input the output I need. Unsure if this is an anti-pattern or not, but I'd like to explore it in a future iteration.

- **Fine tuning exercise selection**: I want to try tweaking the prompt to ensure that the LLM makes a better selection of exercises by analyzing the list of exercises it is given before preparing the workout.

- **Exercise randomization**: It would be good to have a randomization algorithm when fetching the exercises from the list available to ensure that the LLM doesn't end up always with the same exercises.

## Learnings

- I understood why long chats with LLMs are not ideal from a technical perspective. As a user of Claude desktop, I didn't fully understand the magnitude of message stacking. Working with the SDK made it clear that the entire message history is sent to the LLM on each new message, which has implications for token usage and response times.
- I expanded my understanding of effective prompting techniques and utilized resources like the Anthropic Console dashboard (https://console.anthropic.com/dashboard) to refine my approach.
- I gained practical knowledge of how "Tools" work in the context of an LLM
- I'd like to learn more about the different AI development patterns. I chose to use a JSON response format, but it felt like I was forcing the LLM to comply with the JSON format. Perhaps I need to let go of some web patterns I'm used to and create a new mental model for how to work with LLMs.

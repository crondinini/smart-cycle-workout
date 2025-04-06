# Cycle Smart Workout

Cycle Smart Workout is an AI-powered application that creates personalized workout plans considering where in the menstrual cycle the user is.

The goal of this proof of concept was to explore AI closer and specifically understand better:

- How to use Anthropic SDK, and in particular, how to use tools with Anthropic SDK
- Understand what the integration of an AI SDK looks like in a regular web app
- I initially planned to use MCP Client/Server, but realized that MCP server is simply an abstraction on top of the "Tools" concept and chose to go with the simpler approach to focus on the core of the proof of concept

## Technical Implementation

- Built with Next.js
- Leverages Anthropic SDK with a custom tool for fetching exercises from RapidDB
- Uses Zod for some of the schema
- Parses final response from Claude API

## Challenges

- *JSON Response Format*: It took me a few attempts to make the final response include only JSON.
- *Message History*: Learned that the message history array must include both the assistant messages as well as user & tool response messages for proper context maintenance, which was different from my initial understanding - I thought the assistance messages were not needed.
- *Parallel Tool Execution*: Initially implemented sequential tool handling, but discovered that the LLM can request multiple tools simultaneously. Refactored the code to support parallel tool execution for improved efficiency.

## Future Improvements

I would like to explore the following features:

- Persist information to database
- Include food suggestions based on period cycle
- Allow user to share workout preferences and take those into account

## Learnings

- I finally realized why long chats with LLMs are not ideal from a technical perspective. As a user of Claude desktop, I didn't fully grasp the magnitude of message stacking. Working with the SDK made it clear that the entire message history is sent to the LLM on each new message, which has implications for token usage and response times.
- I deepened my understanding of effective prompting techniques and utilized resources like the Anthropic Console dashboard (https://console.anthropic.com/dashboard) to refine my approach.
- I gained practical knowledge of how "Tools" work in the context of an LLM

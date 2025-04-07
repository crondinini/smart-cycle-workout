# Cycle Smart Workout

Cycle Smart Workout is an AI-powered application that creates personalized workout plans considering where in the menstrual cycle the user is.

The goal of this proof of concept was to explore Anthropic SDKs closer and specifically understand better:

- How to use the Anthropic SDK, and in particular, how to use it with custom tools
- Understand what the integration of an AI SDK looks like in a regular web app
- I initially started this exercise in the context of learning MCP. I thought I could create an MCP Client/Server, but as I learned more I realized that MCP server is an abstraction on top of the "Tools" concept.

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

This is a proof of concept and there's endless room for improvement.

Some that come to mind (not exhaustive by any means):

### UX Related

- Add back button
- Add generate new workout button once a workout has been generated. Now the user needs to refresh
- Persist information to database by associating this with a user
- Include food suggestions based on period cycle
- Allow user to share workout preferences and take those into account

## AI Generation Related

- The exercise tool fetches data from the API every time, we might want to have a smarter service on top of that API that includes caching of results as well as some more randomess to the options. Possibly fetch all options first, cache that, then fetch it from the database.
- I don't know if this is the "correct" way of using tools but I was thinking that one way to possibly solve the issue of JSON response format is to use include a tool that tells the AI the response, and so instead of getting the information
- More robust schema, by using Zod schema in the prompt and in other places


## Learnings

- I finally understood why long chats with LLMs are not ideal from a technical perspective. As a user of Claude desktop, I didn't fully grasp the magnitude of message stacking. Working with the SDK made it clear that the entire message history is sent to the LLM on each new message, which has implications for token usage and response times.
- I expanded my understanding of effective prompting techniques and utilized resources like the Anthropic Console dashboard (https://console.anthropic.com/dashboard) to refine my approach.
- I gained practical knowledge of how "Tools" work in the context of an LLM

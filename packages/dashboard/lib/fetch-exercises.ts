export async function fetchExercises(params: {
  muscleGroup: string
  equipment: string
  bodyPart: string
  limit?: number
}) {
  // Quick prototyping logic, needs to be refactored,
  // since it is not handling all possible parameters
  let url = new URL("https://exercisedb.p.rapidapi.com/exercises")
  if ("bodyPart" in params) {
    url = new URL(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${params.bodyPart}`)
  }

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY || "",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    let results = await response.json()
    if (params.limit && params.limit > 0) {
      results = results.slice(0, params.limit)
    }
    return results
  } catch (error) {
    return {
      error: "Failed to fetch exercises",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

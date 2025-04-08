import loki from 'lokijs';
import exercisesData from './exercises.json';

const db = new loki('fitness.db');

type RapidDBExercise = {
    name: string
    bodyPart: string
    equipment: string
    target: string
    gifUrl: string
    secondaryMuscles: string[]
    instructions: string[]
}

const exercisesCollection = db.addCollection<RapidDBExercise>('exercises', {
  indices: ['bodyPart', 'equipment', 'target']
});


exercisesCollection.insert(exercisesData);

export async function fetchExercises(params: {
  muscleGroup?: string
  equipment?: string
  bodyPart?: string
  limit?: number
}) {
  const results = exercisesCollection.chain().find({
    ...(params.bodyPart && {bodyPart: params.bodyPart}),
    ...(params.equipment && {equipment: params.equipment}),
    ...(params.muscleGroup && {target: params.muscleGroup}),
  })
  .limit(params.limit || 10)
  .data()


  return results.map((object) => {
    return {
      name: object.name,
      bodyPart: object.bodyPart,
      equipment: object.equipment,
      target: object.target,
      gifUrl: object.gifUrl,
    }
  })
}


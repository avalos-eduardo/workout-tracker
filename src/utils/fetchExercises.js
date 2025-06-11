import { API_KEY } from "./API_KEY";

const options = {
    method: "GET",
    headers: {
        "x-rapidapi-key": API_KEY,
		"x-rapidapi-host": "exercisedb.p.rapidapi.com"
    }
};

const equipmentAllowed = ["barbell", "dumbbell", "smith machine"];

export const getExerciseInfo = async () => {
    try{
        const exercisePromises = equipmentAllowed.map(async (equipment) => {
            const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment}?limit=150&offset=0`, options);
            const data =  await response.json();
            return data.map((exercise) => {
                return {
                    name: exercise.name,
                    id: exercise.id,
                    bodyPart: exercise.bodyPart,
                    instructions: exercise.instructions,
                    equipment: exercise.equipment,
                    gifUrl: exercise.gifUrl,
                }
            })
        })

        const exercises = (await Promise.all(exercisePromises)).flat();

        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem("exercises", JSON.stringify({ date: today, data: exercises }));

        return exercises;

    } catch (error){
        console.error("Error fetching exercises:", error);
        return [];
    }
}
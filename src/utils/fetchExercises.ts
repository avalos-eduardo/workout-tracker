const options = {
    method: "GET",
    headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
		"x-rapidapi-host": "exercisedb.p.rapidapi.com"
    }
};

export interface Exercise {
    id: string,
    name: string,
    bodyPart: string;
    instructions: string[];
    equipment: string;
    gifUrl: string;
}

const equipmentAllowed: Array<"barbell" | "dumbbell" | "smith machine"> = ["barbell", "dumbbell", "smith machine"];

export const getExerciseInfo = async (): Promise<Exercise[]> => {
    try{
        const exercisePromises = equipmentAllowed.map(async (equipment) => {
            const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment}?limit=150&offset=0`, options);
            const data =  await response.json();
            return data.map((exercise: Exercise) => {
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
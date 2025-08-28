import { useEffect, useReducer } from "react";
import { WorkoutContext } from "./workoutContext";
import workoutReducer, { initialWorkoutState } from "./workoutReducer";
import { WorkoutState, Template } from "./types";

function loadWorkoutHistoryFromLocalStorage(): WorkoutState["workoutHistory"] {
  try {
    const stored = localStorage.getItem("workoutHistory");
    const parsed = stored ? JSON.parse(stored): [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadTemplatesFromLocalStorage(): Template[] {
  try {
    const stored = localStorage.getItem("templates");
    const parsed = stored ? JSON.parse(stored) : [];
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (error) {
    console.error("Failed to parse templates from localStorage:", error);
  }

  const hasInitialized = localStorage.getItem("hasInitializedTemplates");
  if (!hasInitialized) {
    const defaultTemplates: Template[] = [
      {
        id: crypto.randomUUID(),
        title: "Upper Body Day Example",
        exercises: [
          {
            id: crypto.randomUUID(),
            name: "Barbell Bench Press",
            bodyPart: "chest",
            equipment: "barbell",
            gifUrl: "",
            instructions: ["No instructions provided."],
            sets: [
              { weight: "", reps: "" },
              { weight: "", reps: "" },
              { weight: "", reps: "" }
            ]
          },
          {
            id: crypto.randomUUID(),
            name: "Barbell Incline Row",
            bodyPart: "back",
            equipment: "barbell",
            gifUrl: "",
            instructions: ["No instructions provided."],
            sets: [
              { weight: "", reps: "" },
              { weight: "", reps: "" },
              { weight: "", reps: "" }
            ]
          },
          {
            id: crypto.randomUUID(),
            name: "Dumbbell Biceps Curl",
            bodyPart: "upper arms",
            equipment: "dumbbell",
            gifUrl: "",
            instructions: ["No instructions provided."],
            sets: [
              { weight: "", reps: "" },
              { weight: "", reps: "" },
              { weight: "", reps: "" }
            ]
          },
          {
            id: crypto.randomUUID(),
            name: "Dumbbell Incline Triceps Extension",
            bodyPart: "upper arms",
            equipment: "dumbbell",
            gifUrl: "",
            instructions: ["No instructions provided."],
            sets: [
              { weight: "", reps: "" },
              { weight: "", reps: "" },
              { weight: "", reps: "" }
            ]
          },
          {
            id: crypto.randomUUID(),
            name: "Dumbbell Lateral Raise",
            bodyPart: "shoulders",
            equipment: "dumbbell",
            gifUrl: "",
            instructions: ["No instructions provided."],
            sets: [
              { weight: "", reps: "" },
              { weight: "", reps: "" },
              { weight: "", reps: "" }
            ]
          }
        ],
      },
      {
        id: crypto.randomUUID(),
        title: "Lower Body Day Example",
        exercises: [
          {
            id: crypto.randomUUID(),
            name: "Barbell Front Squat",
            bodyPart: "upper legs",
            equipment: "barbell",
            gifUrl: "",
            instructions: ["No instructions provided."],
            sets: [
              { weight: "", reps: "" },
              { weight: "", reps: "" },
              { weight: "", reps: "" }
            ]
          },
          {
            id: crypto.randomUUID(),
            name: "Barbell Romanian Deadlift",
            bodyPart: "upper legs",
            equipment: "barbell",
            gifUrl: "",
            instructions: ["No instructions provided."],
            sets: [
              { weight: "", reps: "" },
              { weight: "", reps: "" },
              { weight: "", reps: "" }
            ]
          },
          {
            id: crypto.randomUUID(),
            name: "Barbell Standing Calf Raise",
            bodyPart: "lower legs",
            equipment: "barbell",
            gifUrl: "",
            instructions: ["No instructions provided."],
            sets: [
              { weight: "", reps: "" },
              { weight: "", reps: "" },
              { weight: "", reps: "" }
            ]
          }
        ],
      },
    ];

    localStorage.setItem("templates", JSON.stringify(defaultTemplates));
    localStorage.setItem("hasInitializedTemplates", "true");

    return defaultTemplates;
  }

  return [];
}

interface WorkoutProviderProps {
  children? : React.ReactNode,
}

export function WorkoutProvider({ children }: WorkoutProviderProps) {
  const [state, dispatch] = useReducer(workoutReducer, {
    ...initialWorkoutState,
    workoutHistory: loadWorkoutHistoryFromLocalStorage(),
    templates: loadTemplatesFromLocalStorage(),
  });

  useEffect(() => {
    localStorage.setItem(
      "workoutHistory",
      JSON.stringify(state.workoutHistory)
    );
  }, [state.workoutHistory]);

  useEffect(() => {
    localStorage.setItem("templates", JSON.stringify(state.templates));
  }, [state.templates]);

  return (
    <WorkoutContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
}

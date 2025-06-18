import { useEffect, useReducer } from "react";
import { WorkoutContext } from "./workoutContext";
import workoutReducer, { initialWorkoutState } from "./workoutReducer";

function loadWorkoutHistoryFromLocalStorage() {
  try {
    const stored = localStorage.getItem("workoutHistory");
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadTemplatesFromLocalStorage() {
  try {
    const stored = localStorage.getItem("templates");
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) return parsed;
  } catch (error) {
    console.error("Failed to parse templates from localStorage:", error);
  }

  const hasInitialized = localStorage.getItem("hasInitializedTemplates");
  if (!hasInitialized) {
    const defaultTemplates = [
      {
        id: crypto.randomUUID(),
        title: "Upper Body Day Example",
        exercises: [
          {
            name: "Barbell Bench Press",
            sets: [{}, {}, {}],
          },
          {
            name: "Barbell Incline Row",
            sets: [{}, {}, {}],
          },
          {
            name: "Dumbbell Biceps Curl",
            sets: [{}, {}, {}],
          },
          {
            name: "Dumbbell Incline Triceps Extension",
            sets: [{}, {}, {}],
          },
          {
            name: "Dumbbell Lateral Raise",
            sets: [{}, {}, {}],
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        title: "Lower Body Day Example",
        exercises: [
          {
            name: "Barbell Front Squat",
            sets: [{}, {}, {}],
          },
          {
            name: "Barbell Romanian Deadlift",
            sets: [{}, {}, {}],
          },
          {
            name: "Barbell Standing Calf Raise",
            sets: [{}, {}, {}],
          },
        ],
      },
    ];

    localStorage.setItem("templates", JSON.stringify(defaultTemplates));
    localStorage.setItem("hasInitializedTemplates", "true");

    return defaultTemplates;
  }

  return [];
}

export function WorkoutProvider({ children }) {
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

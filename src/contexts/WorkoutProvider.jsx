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
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
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

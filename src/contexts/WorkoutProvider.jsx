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

export function WorkoutProvider({ children }) {
  const [state, dispatch] = useReducer(workoutReducer, {
    ...initialWorkoutState,
    workoutHistory: loadWorkoutHistoryFromLocalStorage(),
  });

  useEffect(() => {
    localStorage.setItem(
      "workoutHistory",
      JSON.stringify(state.workoutHistory)
    );
  }, [state.workoutHistory]);

  return (
    <WorkoutContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
}

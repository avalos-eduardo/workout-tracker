import { useReducer } from "react";
import { WorkoutContext } from "./workoutContext";
import workoutReducer, { initialWorkoutState } from "./workoutReducer";

export function WorkoutProvider({ children }) {
  const [state, dispatch] = useReducer(workoutReducer, initialWorkoutState);

  return (
    <WorkoutContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
}

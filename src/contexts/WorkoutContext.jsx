import { createContext, useContext, useReducer } from "react";
import workoutReducer, { initialWorkoutState } from "./workoutReducer";

const WorkoutContext = createContext(null);

export function WorkoutProvider({ children }) {
  const [state, dispatch] = useReducer(workoutReducer, initialWorkoutState);

  return (
    <WorkoutContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  return useContext(WorkoutContext);
}

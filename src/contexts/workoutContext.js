import { createContext, useContext } from "react";

export const WorkoutContext = createContext(null);

export function useWorkoutContext() {
  return useContext(WorkoutContext);
}
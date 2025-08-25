import { createContext, useContext, Dispatch } from "react";
import { WorkoutState, WorkoutAction} from "./types";

export interface WorkoutContextValue {
  state: WorkoutState;
  dispatch: Dispatch<WorkoutAction>;
}

export const WorkoutContext = createContext<WorkoutContextValue | null>(null);

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkoutContext must be used inside a WorkoutProvider");
  }
  return context;
}

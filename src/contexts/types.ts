import { Exercise } from "../utils/fetchExercises";

export interface WorkoutSet {
  weight: string;
  reps: string;
}

export interface WorkoutExercise extends Exercise {
  sets: WorkoutSet[];
}

export interface Workout {
  id: string;
  title: string;
  startTime: number;
  endTime?: string;
  dateCompleted?: string;
  exercises: WorkoutExercise[];
}

export interface Template {
  id: string;
  title: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutState {
  exercises: Exercise[];
  currentWorkout: Workout | null;
  workoutHistory: Workout[];
  templates: Template[];
  currentTemplate: Template | null;
}

export type WorkoutAction =
  | { type: "SET_EXERCISES"; payload: Exercise[] }
  | { type: "START_WORKOUT" }
  | { type: "UPDATE_WORKOUT_TITLE"; payload: string }
  | { type: "ADD_EXERCISE_TO_WORKOUT"; payload: Exercise }
  | { type: "REMOVE_EXERCISE_FROM_WORKOUT"; payload: string } // exercise id
  | { type: "ADD_SET"; payload: { exerciseId: string } }
  | { type: "UPDATE_SET"; payload: { exerciseId: string; setIndex: number; updates: Partial<WorkoutSet> } }
  | { type: "REMOVE_SET"; payload: { exerciseId: string; setIndex: number } }
  | { type: "FINISH_WORKOUT" }
  | { type: "CANCEL_WORKOUT" }
  | { type: "DELETE_WORKOUT"; payload: string } // workout id
  | { type: "ADD_TEMPLATE"; payload: Template }
  | { type: "DELETE_TEMPLATE"; payload: string }
  | { type: "START_TEMPLATE" }
  | { type: "UPDATE_TEMPLATE_TITLE"; payload: string }
  | { type: "ADD_EXERCISE_TO_TEMPLATE"; payload: Exercise }
  | { type: "REMOVE_EXERCISE_FROM_TEMPLATE"; payload: string }
  | { type: "ADD_TEMPLATE_SET"; payload: { exerciseId: string } }
  | { type: "UPDATE_TEMPLATE_SET"; payload: { exerciseId: string; setIndex: number; updates: Partial<WorkoutSet> } }
  | { type: "REMOVE_TEMPLATE_SET"; payload: { exerciseId: string; setIndex: number } }
  | { type: "COMPLETE_TEMPLATE" }
  | { type: "START_WORKOUT_FROM_TEMPLATE"; payload: Template };

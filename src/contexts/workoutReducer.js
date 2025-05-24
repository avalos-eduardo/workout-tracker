export const initialWorkoutState = {
  exercises: [],
  currentWorkout: null,
  workoutHistory: [],
  templates: [],
};

export default function workoutReducer(state, action) {
  switch (action.type) {
    case "SET_EXERCISES":
      return { ...state, exercises: action.payload };
    case "START_WORKOUT":
      return { ...state, currentWorkout: action.payload };
    case "FINISH_WORKOUT":
      return {
        ...state,
        workoutHistory: [...state.workoutHistory, action.payload],
        currentWorkout: null,
      };
    case "CANCEL_WORKOUT":
      return { ...state, currentWorkout: null };
    case "ADD_TEMPLATE":
      return { ...state, templates: [...state.templates, action.payload] };
    default:
      return state;
  }
}

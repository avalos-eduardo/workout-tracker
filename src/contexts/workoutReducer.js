export const initialWorkoutState = {
  exercises: [],
  currentWorkout: null,
  workoutHistory: [],
  templates: [],
};

export default function workoutReducer(state, action) {
  switch (action.type) {
    case "SET_EXERCISES":
      return { 
        ...state,
        exercises: action.payload, 
      };

    case "START_WORKOUT":
      return { 
        ...state,
        currentWorkout: {
          title: "New Workout",
          startTime: Date.now(),
          exercises: [],
      },
    };

    case "UPDATE_WORKOUT_TILE":
        return {
          ...state,
          currentWorkout: {
            ...state.currentWorkout,
            title: action.payload,
          }
        }

    case "ADD_EXERCISE_TO_WORKOUT":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: [...state.currentWorkout.exercises, action.payload],
        },
      };

    case "REMOVE_EXERCISE_FROM_WORKOUT":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: state.currentWorkout.exercises.filter(
            (ex) => ex.id !== action.payload
          ),
        },
      };

    case "ADD_SET_TO_EXERCISE":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: state.currentWorkout.exercises.map((ex) =>
            ex.id === action.payload.exerciseId
              ? {
                  ...ex,
                  sets: [...ex.sets, action.payload.newSet],
                }
              : ex
          ),
        },
      };

    case "UPDATE_SET":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: state.currentWorkout.exercises.map((ex) =>
            ex.id === action.payload.exerciseId
              ? {
                  ...ex,
                  sets: ex.sets.map((set, idx) =>
                    idx === action.payload.setIndex
                      ? { ...set, ...action.payload.updatedData }
                      : set
                  ),
                }
              : ex
          ),
        },
      };

    case "REMOVE_SET":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: state.currentWorkout.exercises.map((ex) =>
            ex.id === action.payload.exerciseId
              ? {
                  ...ex,
                  sets: ex.sets.filter(
                    (_, idx) => idx !== action.payload.setIndex
                  ),
                }
              : ex
          ),
        },
      };

    case "FINISH_WORKOUT":
      return {
        ...state,
        workoutHistory: [
          ...state.workoutHistory,
          {
            ...state.currentWorkout,
            endTime: new Date().toISOString(),
            id: Date.now(),
          },
        ],
        currentWorkout: null,
      };

    case "CANCEL_WORKOUT":
      return {
        ...state,
        currentWorkout: null,
      };

    case "ADD_TEMPLATE":
      return {
        ...state,
        templates: [...state.templates, action.payload],
      };


    default:
      return state;
  }
}

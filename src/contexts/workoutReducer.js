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

    case "ADD_EXERCISE_TO_WORKOUT": {
      const alreadyAdded = state.currentWorkout.exercises.some((ex) => ex.id === action.payload.id);
      if (alreadyAdded) return state;

      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: [
            ...state.currentWorkout.exercises,
            {
              ...action.payload,
              sets: [{weight: 0, reps: 0}],
              }
          ]
        },
      };
    }
    case "REMOVE_EXERCISE_FROM_WORKOUT":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: state.currentWorkout.exercises.filter(
            (exercise) => exercise.id !== action.payload
          ),
        },
      };

    case "ADD_SET":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: state.currentWorkout.exercises.map((exercise) =>
            exercise.id === action.payload.exerciseId
              ? {
                  ...exercise,
                  sets: [...exercise.sets || [], {weight: 0, reps: 0 }],
                }
              : exercise
          ),
        },
      };

    case "UPDATE_SET":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: state.currentWorkout.exercises.map((exercise) =>
            exercise.id === action.payload.exerciseId
              ? {
                  ...exercise,
                  sets: exercise.sets.map((set, index) =>
                    index === action.payload.setIndex
                      ? { ...set, ...action.payload.updates }
                      : set
                  ),
                }
              : exercise
          ),
        },
      };

    case "REMOVE_SET":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: state.currentWorkout.exercises.map((exercise) =>
            exercise.id === action.payload.exerciseId
              ? {
                  ...exercise,
                  sets: exercise.sets.filter((_, i) => i !== action.payload.setIndex),
                }
              : exercise
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

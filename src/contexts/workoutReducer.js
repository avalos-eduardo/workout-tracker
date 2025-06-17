export const initialWorkoutState = {
  exercises: [],
  currentWorkout: null,
  workoutHistory: [],
  templates: [],
  currentTemplate: null,
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
          id: crypto.randomUUID(),
          startTime: Date.now(),
          exercises: [],
        },
      };

    case "UPDATE_WORKOUT_TITLE":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          title: action.payload,
        },
      };

    case "ADD_EXERCISE_TO_WORKOUT": {
      const alreadyAdded = state.currentWorkout.exercises.some(
        (ex) => ex.id === action.payload.id
      );
      if (alreadyAdded) return state;

      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: [
            ...state.currentWorkout.exercises,
            {
              ...action.payload,
              sets: [{ weight: "", reps: "" }],
            },
          ],
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
                  sets: [...(exercise.sets || []), { weight: "", reps: "" }],
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
                  sets: exercise.sets.filter(
                    (_, i) => i !== action.payload.setIndex
                  ),
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
            dateCompleted: new Date().toISOString(),
          },
        ],
        currentWorkout: null,
      };

    case "CANCEL_WORKOUT":
      return {
        ...state,
        currentWorkout: null,
      };

    case "DELETE_WORKOUT":
      return {
        ...state,
        workoutHistory: state.workoutHistory.filter(
          (workout) => workout.id !== action.payload
        ),
      }

    case "ADD_TEMPLATE":
      return {
        ...state,
        templates: [...state.templates, action.payload],
      };

    case "DELETE_TEMPLATE":
      return {
        ...state,
        templates: state.templates.filter(
          (template) => template.id !== action.payload
        )
      }

    case "START_TEMPLATE":
      return {
        ...state,
        currentTemplate: {
          id: crypto.randomUUID(),
          title: "New Template",
          exercises: [],
        }
      }

    case "UPDATE_TEMPLATE_TITLE":
      return {
        ...state, 
        currentTemplate: {
          ...state.currentTemplate,
          title: action.payload,
        }
      }

    case "COMPLETE_TEMPLATE":
      return {
        ...state,
        templates: [
          ...state.templates,
          {
            ...state.currentTemplate
          },
        ],
        currentTemplate: null,
      }  

    case "START_WORKOUT_FROM_TEMPLATE": {
      const template = action.payload;

      return {
        ...state,
        currentWorkout: {
          title: template.title || "Workout from Template",
          startTime: Date.now(),
          id: crypto.randomUUID(),
          exercises: template.exercises.map((ex) => ({
            ...ex,
            sets: ex.sets.map(() => ({
              weight: "",
              reps: "",
            })),
          })),
        },
      };
    }

    default:
      return state;
  }
}

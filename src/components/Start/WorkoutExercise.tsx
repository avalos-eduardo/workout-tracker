import "./WorkoutExercise.css";
import { capitalizeWords } from "../../utils/capitalizeWords";
import { WorkoutExercise as WorkoutExerciseType, WorkoutAction } from "../../contexts/types";

interface WorkoutExerciseProps {
  exercise: WorkoutExerciseType;
  dispatch: React.Dispatch<WorkoutAction>;
}

export default function WorkoutExercise({ exercise, dispatch }: WorkoutExerciseProps) {
  const handleAddSet = () => {
    dispatch({ type: "ADD_SET", payload: { exerciseId: exercise.id } });
  };

  const handleRemoveSet = (index:number) => {
    dispatch({
      type: "REMOVE_SET",
      payload: { exerciseId: exercise.id, setIndex: index },
    });
  };

  const handleChange = (index:number, field: "weight" | "reps", value: string) => {
    dispatch({
      type: "UPDATE_SET",
      payload: {
        exerciseId: exercise.id,
        setIndex: index,
        updates: { [field]: value },
      },
    });
  };

  const handleRemoveExercise = () => {
    dispatch({
      type: "REMOVE_EXERCISE_FROM_WORKOUT",
      payload: exercise.id,
    });
  };

  return (
    <div className="workout-exercise">
      <div className="exercise-title">
        <h2>{capitalizeWords(exercise.name)}</h2>
        <button onClick={handleRemoveExercise}>Remove Exercise</button>
      </div>
      {exercise.sets?.map((set, index) => (
        <div key={index} className="set-row">
          <label>Set {index + 1}: </label>
          <label>Weight (lbs):</label>
          <input
            type="number"
            placeholder="0"
            value={set.weight}
            min="0"
            onChange={(e) => handleChange(index, "weight", e.target.value)}
          />
          <label>Reps:</label>
          <input
            type="number"
            placeholder="0"
            value={set.reps}
            min="0"
            onChange={(e) => handleChange(index, "reps", e.target.value)}
          />
          <button onClick={() => handleRemoveSet(index)} className="remove-set">
            Delete
          </button>
        </div>
      ))}
      <button onClick={handleAddSet} className="add-set">
        Add Set
      </button>
    </div>
  );
}

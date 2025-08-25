import "./TemplateExercise.css";
import { capitalizeWords } from "../../utils/capitalizeWords";
import { WorkoutExercise, WorkoutAction } from "../../contexts/types";

interface TemplateExerciseProps {
  exercise: WorkoutExercise,
  dispatch: React.Dispatch<WorkoutAction>,
}

export default function TemplateExercise({ exercise, dispatch }: TemplateExerciseProps) {
  const handleAddSet = () => {
    dispatch({
      type: "ADD_TEMPLATE_SET",
      payload: { exerciseId: exercise.id },
    });
  };

  const handleRemoveSet = () => {
    if (exercise.sets.length === 0) return;
    dispatch({
      type: "REMOVE_TEMPLATE_SET",
      payload: { exerciseId: exercise.id, setIndex: exercise.sets.length - 1 },
    });
  };

  const handleRemoveExercise = () => {
    dispatch({
      type: "REMOVE_EXERCISE_FROM_TEMPLATE",
      payload: exercise.id,
    });
  };

  return (
    <div className="template-exercise">
      <div className="exercise-title">
        <h2>{capitalizeWords(exercise.name)}</h2>
        <button onClick={handleRemoveExercise}>Remove Exercise</button>
      </div>
      <div className="set-count">
        <label>
          <b>Set Count:</b> {exercise.sets.length}
        </label>
      </div>
      <div className="set-buttons">
        <button onClick={handleAddSet} className="add-set">
          Add Set
        </button>
        <button onClick={handleRemoveSet} className="delete-set">
          Remove Set
        </button>
      </div>
    </div>
  );
}

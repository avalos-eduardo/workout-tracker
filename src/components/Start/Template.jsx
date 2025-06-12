import "./Template.css";
import { useNavigate } from "react-router-dom";

export default function Template({ template, dispatch }) {
  const navigate = useNavigate();

  const handleStartWorkoutFromTemplate = () => {
    dispatch({ type: "START_WORKOUT_FROM_TEMPLATE", payload: template });
    navigate("/start/active");
  };

  return (
    <div className="template">
      <div className="template-card-header">
        <h2>{template.title}</h2>
        <h3>Exercises:</h3>
      </div>
      <div className="template-card-info">
        {template.exercises.map((exercise) => (
          <div key={exercise.id} className="exercise-row">
            <div className="exercise-left">{exercise.name}</div>
            <div className="exercise-right">Sets: {exercise.sets.length}</div>
          </div>
        ))}
      </div>
      <div className="template-buttons">
        <button
          className="start-from-template"
          onClick={handleStartWorkoutFromTemplate}
        >
          Start Workout
        </button>
        <button className="delete-template">Delete</button>
      </div>
    </div>
  );
}

import "./ExerciseList.css";
import { capitalizeWords } from "../../utils/capitalizeWords";
import { Link } from "react-router-dom";

export default function ExerciseList({ exercises }) {
  if (exercises.length === 0) {
    return <p className="no-results">No exercises found.</p>;
  }

  return (
    <section className="exercise-list">
      {exercises.map((exercise) => (
        <Link
          to={`/exercise/${exercise.id}`}
          key={exercise.id}
          className="exercise-list-item"
        >
          <p>{capitalizeWords(exercise.name)}</p>
        </Link>
      ))}
    </section>
  );
}

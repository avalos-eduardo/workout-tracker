import "../styles/ExerciseList.css";

export default function ExerciseList({ exercises }) {
  const capitalizeWords = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  if (exercises.length === 0) {
    return <p className="no-results">No exercises found.</p>;
  }

  return (
    <section className="exercise-list">
      {exercises.map((exercise) => (
        <div className="exercise-list-item" key={exercise.id}>
          <p>{capitalizeWords(exercise.name)}</p>
        </div>
      ))}
    </section>
  );
}

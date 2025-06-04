import "./PastWorkout.css";
import { capitalizeWords } from "../../utils/capitalizeWords";

export default function PastWorkout({ workout }) {
  const start = new Date(workout.startTime);
  const end = new Date(workout.endTime);
  const durationMs = end - start;
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  const duration = `${minutes}m ${seconds}s`;

  const formattedDate = start.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const getBestSet = (sets = []) => {
    if (!sets.length) return null;
    // Define "best" as the one with highest weight x reps
    return sets.reduce((best, current) => {
      const bestScore = best.weight * best.reps;
      const currentScore = current.weight * current.reps;
      return currentScore > bestScore ? current : best;
    });
  };

  return (
    <div className="past-workout">
      <p className="past-date">Completed on: {formattedDate}</p>
      <div className="past-workout-header">
        <h2>{workout.title}</h2>
        <h2>Duration: {duration}</h2>
      </div>
      <div className="past-workout-info">
        {workout.exercises.map((exercise) => {
          const bestSet = getBestSet(exercise.sets);
          return (
            <div key={exercise.id} className="exercise-row">
              <div className="exercise-left">
                {capitalizeWords(exercise.name)} × {exercise.sets.length}{" "}
                {exercise.sets.length == 1 ? "set" : "sets"}
              </div>
              <div className="exercise-right">
                {bestSet
                  ? `Best Set: ${bestSet.weight} lbs × ${bestSet.reps} reps`
                  : "No sets"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

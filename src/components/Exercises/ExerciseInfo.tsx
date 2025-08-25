import { capitalizeWords } from "../../utils/capitalizeWords";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Exercise } from "../../utils/fetchExercises";
import "./ExerciseInfo.css";
import backIcon from "../../assets/back.png";

export default function ExerciseInfo() {
  const { id } = useParams();
  const [exercise, setExcercise] = useState<Exercise | null>(null);

  useEffect(() => {
    if (!id) return;

    const stored = localStorage.getItem("exercises");
    if (stored) {
      try {
        const parsed: { date: string; data: Exercise[] } = JSON.parse(stored);
        const allExercises = Array.isArray(parsed.data) ? parsed.data : [];
        const found = allExercises.find((ex) => ex.id === id) ?? null;
        setExcercise(found);
      } catch (e) {
        console.error("Failed to parse stored exercises:", e);
      }
    }
  }, [id]);

  if (!exercise) return <p className="not-found">Exercise not found.</p>;

  return (
    <div className="exercise-info">
      <Link className="go-back" to="/exercises">
        <img src={backIcon} alt="back icon" className="back-icon" />
        <p>Go back</p>
      </Link>
      <img src={exercise.gifUrl} alt={exercise.name} className="exercise-gif" />
      <h1>{capitalizeWords(exercise.name)}</h1>
      <p>
        <strong>Body Part:</strong> {capitalizeWords(exercise.bodyPart)}
      </p>
      <p>
        <strong>Equipment:</strong> {capitalizeWords(exercise.equipment)}
      </p>
      <div className="instructions">
        <h1>Instructions:</h1>
        <ul>
          {exercise.instructions?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

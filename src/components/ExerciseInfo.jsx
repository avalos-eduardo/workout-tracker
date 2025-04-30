import { capitalizeWords } from "../utils/capitalizeWords";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/ExerciseInfo.css";
import backIcon from "../assets/back.png";
import Exercises from "./Exercises";

export default function ExerciseInfo() {
  const { id } = useParams();
  const [exercise, setExcercise] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("exercises");
    if (stored) {
      const allExercises = JSON.parse(stored);
      const found = allExercises.find((ex) => ex.id === id);
      setExcercise(found);
    }
  }, [id]);

  if (!exercise) return <p className="not-found">Exercise not found.</p>;

  return (
    <div className="exercise-info">
      <Link className="go-back" to="/">
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
          {exercise.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

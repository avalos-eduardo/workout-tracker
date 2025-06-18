import "./ActiveWorkout.css";
import Heading from "../Common/Heading";
import WorkoutExercise from "./WorkoutExercise";
import { useWorkoutContext } from "../../contexts/workoutContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ActiveWorkout() {
  const { state, dispatch } = useWorkoutContext();
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [editableTitle, setEditableTitle] = useState(
    state.currentWorkout?.title || "New Workout"
  );

  useEffect(() => {
    if (state.currentWorkout?.title) {
      setEditableTitle(state.currentWorkout.title);
    }
  }, [state.currentWorkout?.title]);

  useEffect(() => {
    if (!state.currentWorkout.startTime) return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - state.currentWorkout.startTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [state.currentWorkout.startTime]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleTitleChange = (e) => {
    const updated = e.target.value;
    setEditableTitle(updated);
    dispatch({ type: "UPDATE_WORKOUT_TITLE", payload: updated });
  };

  const handleFinishWorkout = () => {
    dispatch({ type: "FINISH_WORKOUT" });
    navigate("/history");
  };

  const handleCancelWorkout = () => {
    dispatch({ type: "CANCEL_WORKOUT" });
    navigate("/start");
  };

  return (
    <>
      <Heading headingTitle="Active Workout" />
      <div className="active-workout">
        <input
          className="workout-title-input"
          value={editableTitle}
          onChange={handleTitleChange}
        />
        <p className="workout-timer">Time Elapsed: {formatTime(elapsedTime)}</p>
        <hr />

        <section className="exercises-list">
          {state.currentWorkout.exercises.length === 0 ? (
            <p>No exercises yet. Add some below!</p>
          ) : (
            state.currentWorkout.exercises.map((exercise) => (
              <WorkoutExercise
                key={exercise.id}
                exercise={exercise}
                dispatch={dispatch}
              />
            ))
          )}
          <hr />
        </section>

        <div className="active-buttons">
          <button
            className="add-exercises"
            onClick={() => navigate("/start/add-exercises")}
          >
            Add Exercises
          </button>
          <button className="finish-workout" onClick={handleFinishWorkout}>
            Finish Workout
          </button>
          <button className="cancel-workout" onClick={handleCancelWorkout}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

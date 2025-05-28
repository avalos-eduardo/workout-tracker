import Heading from "../Common/Heading";
import "./Start.css";
import { useNavigate } from "react-router-dom";
import { useWorkoutContext } from "../../contexts/workoutContext";

export default function Start() {
  const navigate = useNavigate();
  const { dispatch } = useWorkoutContext();

  const handleStartEmptyWorkout = () => {
    dispatch({ type: "START_WORKOUT" });
    navigate("/start/active");
  };

  return (
    <>
      <Heading headingTitle="Start" />
      <button className="start-empty" onClick={handleStartEmptyWorkout}>
        Start Empty Workout
      </button>
      <div className="template-header">
        <Heading headingTitle="Templates" />
        <button className="add-new-template">Add New</button>
      </div>
    </>
  );
}

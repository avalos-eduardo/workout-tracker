import "./History.css";
import Heading from "../Common/Heading";
import { useWorkoutContext } from "../../contexts/workoutContext";
import PastWorkout from "./PastWorkout";

export default function History() {
  const { state, dispatch } = useWorkoutContext();

  return (
    <>
      <Heading headingTitle="History" />
      <section className="past-workout-section">
        {state.workoutHistory.map((workout) => (
          <PastWorkout key={workout.id} workout={workout} dispatch={dispatch} />
        ))}
      </section>
    </>
  );
}

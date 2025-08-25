import "./Exercises.css";
import searchIcon from "../../assets/search.png";
import ExerciseList from "./ExerciseList";
import Heading from "../Common/Heading";
import { useEffect, useState } from "react";
import { Exercise, getExerciseInfo } from "../../utils/fetchExercises";
import { useWorkoutContext } from "../../contexts/workoutContext";

export default function Exercises() {
  const { state, dispatch } = useWorkoutContext();
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("all");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      const stored = localStorage.getItem("exercises");
      const today = new Date().toISOString().split("T")[0];

      if (stored) {
        const parsed: { date: string; data: Exercise[] } = JSON.parse(stored);

        if (parsed.date === today) {
          dispatch({ type: "SET_EXERCISES", payload: parsed.data });
          setLoading(false);
          return;
        }
      }

      const fetched = await getExerciseInfo();
      dispatch({ type: "SET_EXERCISES", payload: fetched });
      setLoading(false);
    };

    if (state.exercises.length === 0) {
      fetchExercises();
    } else {
      setLoading(false);
    }
  }, [dispatch, state.exercises.length]);

  const filteredExercises: Exercise[] = state.exercises.filter((exercise) => {
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const matchesEquipment =
      selectedEquipment === "all" ||
      exercise.equipment?.toLowerCase() === selectedEquipment;
    const matchesMuscle =
      selectedMuscleGroup === "all" ||
      exercise.bodyPart?.toLowerCase() === selectedMuscleGroup;

    return matchesSearch && matchesEquipment && matchesMuscle;
  });

  return (
    <>
      <header>
        <Heading headingTitle={"Exercises"} />
        <div className="search-bar">
          <img src={searchIcon} alt="Search icon" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search"
          />
        </div>
        <div className="filter">
          <select
            name="by-equipment"
            id="by-equipment"
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
          >
            <option value="all">All Equipment</option>
            <option value="barbell">Barbell</option>
            <option value="dumbbell">Dumbbell</option>
            <option value="smith machine">Smith Machine</option>
          </select>
          <select
            name="by-muscle-group"
            id="by-muscle-group"
            value={selectedMuscleGroup}
            onChange={(e) => setSelectedMuscleGroup(e.target.value)}
          >
            <option value="all">All Muscle Groups</option>
            <option value="back">Back</option>
            <option value="chest">Chest</option>
            <option value="upper arms">Upper Arms</option>
            <option value="upper legs">Upper Legs</option>
            <option value="lower arms">Lower Arms</option>
            <option value="lower legs">Lower Legs</option>
            <option value="shoulders">Shoulders</option>
            <option value="waist">Waist</option>
          </select>
        </div>
      </header>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <ExerciseList exercises={filteredExercises} />
      )}
    </>
  );
}

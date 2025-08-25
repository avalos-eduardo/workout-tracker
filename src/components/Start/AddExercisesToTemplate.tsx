import searchIcon from "../../assets/search.png";
import Heading from "../Common/Heading";
import { capitalizeWords } from "../../utils/capitalizeWords";
import { useState, useEffect } from "react";
import { useWorkoutContext } from "../../contexts/workoutContext";
import { getExerciseInfo, Exercise } from "../../utils/fetchExercises";
import { useNavigate } from "react-router-dom";

export default function AddExercisesToTemplate() {
  const { state, dispatch } = useWorkoutContext();
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("all");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      const stored = localStorage.getItem("exercises");

      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: "SET_EXERCISES", payload: parsed.data });
      } else {
        const fetched = await getExerciseInfo();
        dispatch({ type: "SET_EXERCISES", payload: fetched });
      }
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

  const handleAddExercise = (exercise: Exercise) => {
    dispatch({ type: "ADD_EXERCISE_TO_TEMPLATE", payload: exercise });
    navigate("/start/add-template");
  };

  return (
    <>
      <header>
        <Heading headingTitle="Add Exercises" />
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
        <div className="cancel">
          <button onClick={() => navigate("/start/add-template")}>
            Cancel
          </button>
        </div>
      </header>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <ul className="exercise-list">
          {filteredExercises.map((exercise) => (
            <li
              key={exercise.id}
              className="exercise-list-item"
              onClick={() => handleAddExercise(exercise)}
            >
              {capitalizeWords(exercise.name)}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

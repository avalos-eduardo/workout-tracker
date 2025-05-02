import "../styles/Exercises.css";
import "../styles/Heading.css";
import searchIcon from "../assets/search.png";
import ExerciseList from "./ExerciseList";
import Heading from "./Heading";
import { useEffect, useState } from "react";
import { getExerciseInfo } from "../utils/fetchExercises";

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("all");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      const stored = localStorage.getItem("exercises");
      if (stored) {
        setExercises(JSON.parse(stored));
      } else {
        const fetched = await getExerciseInfo();
        localStorage.setItem("exercises", JSON.stringify(fetched));
        setExercises(fetched);
      }
      setLoading(false);
    };

    fetchExercises();
  }, []);

  const filteredExercises = exercises.filter((exercise) => {
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

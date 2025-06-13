import "./App.css";
import "@fontsource/play/700";
import "@fontsource/play";
import "@fontsource/inter";
import "@fontsource/inter/600";
import Navbar from "./components/Common/Navbar";
import Exercises from "./components/Exercises/Exercises";
import ExerciseInfo from "./components/Exercises/ExerciseInfo";
import Dashboard from "./components/Dashboard/Dashboard";
import Start from "./components/Start/Start";
import History from "./components/History/History";
import ActiveWorkout from "./components/Start/ActiveWorkout";
import AddExercises from "./components/Start/AddExercises";
import AddTemplate from "./components/Start/AddTemplate";
import { WorkoutProvider } from "./contexts/WorkoutProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <WorkoutProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/exercise/:id" element={<ExerciseInfo />} />
            <Route path="/history" element={<History />} />
            <Route path="/start" element={<Start />} />
            <Route path="/start/active" element={<ActiveWorkout />} />
            <Route path="/start/add-exercises" element={<AddExercises />} />
            <Route path="/start/add-template" element={<AddTemplate />} />
          </Routes>
        </Router>
      </WorkoutProvider>
    </>
  );
}

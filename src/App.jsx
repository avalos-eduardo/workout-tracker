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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WorkoutProvider } from "./contexts/WorkoutProvider";

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
          </Routes>
        </Router>
      </WorkoutProvider>
    </>
  );
}

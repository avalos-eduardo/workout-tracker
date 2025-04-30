import "./styles/App.css";
import "@fontsource/play/700";
import "@fontsource/play";
import "@fontsource/inter";
import "@fontsource/inter/600";
import Navbar from "./components/Navbar";
import Exercises from "./components/Exercises";
import ExerciseInfo from "./components/ExerciseInfo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Exercises />} />
          <Route path="/exercise/:id" element={<ExerciseInfo />} />
        </Routes>
      </Router>
    </>
  );
}

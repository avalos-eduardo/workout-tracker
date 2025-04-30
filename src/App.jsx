import "./styles/App.css";
import Navbar from "./components/Navbar";
import "@fontsource/play/700.css";
import Exercises from "./components/Exercises";

export default function App() {
  return (
    <>
      <Navbar />
      <Exercises />
    </>
  );
}

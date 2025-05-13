import Heading from "./Heading";
import "../styles/Start.css";

export default function Start() {
  return (
    <>
      <Heading headingTitle="Start" />
      <button className="start-empty">Start Empty Workout</button>
      <div className="template-header">
        <Heading headingTitle="Templates" />
        <button className="add-new-template">Add New</button>
      </div>
    </>
  );
}

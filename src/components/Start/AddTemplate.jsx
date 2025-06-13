import "./AddTemplate.css";
import Heading from "../Common/Heading";
import { useState } from "react";
import { useWorkoutContext } from "../../contexts/workoutContext";
import { useNavigate } from "react-router-dom";

export default function AddTemplate() {
  const { state, dispatch } = useWorkoutContext();
  const navigate = useNavigate();

  const [editableTitle, setEditableTitle] = useState(
    `Template # ${state.templates.length + 1}`
  );

  const handleTitleChange = (e) => {
    setEditableTitle(e.target.value);
  };

  const handleAddTemplate = () => {
    const newTemplate = {
      id: crypto.randomUUID(),
      title: editableTitle,
      exercises: [],
    };
    dispatch({ type: "ADD_TEMPLATE", payload: newTemplate });
    navigate("/start");
  };

  const handleCancelTemplate = () => {
    navigate("/start");
  };
  return (
    <>
      <Heading headingTitle="Add Template" />
      <div className="add-template-section">
        <input
          className="template-title-input"
          value={editableTitle}
          onChange={handleTitleChange}
        />
        <hr />

        <div className="template-page-buttons">
          <button className="add-exercises">Add Exercises</button>
          <button className="add-template" onClick={handleAddTemplate}>
            Complete Template
          </button>
          <button className="cancel-template" onClick={handleCancelTemplate}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

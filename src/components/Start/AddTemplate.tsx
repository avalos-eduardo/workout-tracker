import "./AddTemplate.css";
import Heading from "../Common/Heading";
import { ChangeEvent, useEffect, useState } from "react";
import { useWorkoutContext } from "../../contexts/workoutContext";
import { useNavigate } from "react-router-dom";
import TemplateExercise from "./TemplateExercise";

export default function AddTemplate() {
  const { state, dispatch } = useWorkoutContext();
  const navigate = useNavigate();

  const [editableTitle, setEditableTitle] = useState(
    state.currentTemplate?.title || "New Template"
  );

  useEffect(() => {
    if (state.currentTemplate?.title) {
      setEditableTitle(state.currentTemplate.title);
    }
  }, [state.currentTemplate?.title]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updated = e.target.value;
    setEditableTitle(updated);
    dispatch({ type: "UPDATE_TEMPLATE_TITLE", payload: updated });
  };

  const handleAddTemplate = () => {
    dispatch({ type: "COMPLETE_TEMPLATE" });
    navigate("/start");
  };

  const handleCancelTemplate = () => {
    navigate("/start");
  };

  const handleAddExercises = () => {
    navigate("/start/add-exercises-to-template");
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

        <section className="exercises-list">
          {state.currentTemplate?.exercises.length === 0 ? (
            <p>No exercises yet. Add some below!</p>
          ) : (
            state.currentTemplate?.exercises.map((exercise) => (
              <TemplateExercise
                key={exercise.id}
                exercise={exercise}
                dispatch={dispatch}
              />
            ))
          )}
          <hr />
        </section>

        <div className="template-page-buttons">
          <button className="add-exercises" onClick={handleAddExercises}>
            Add Exercises
          </button>
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

import { useState } from "react";
import "./UserGreeting.css";

export default function UserGreeting() {
  const [name, setName] = useState("User");
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className="user-greeting">
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Name Here"
          className="greeting-input"
          autoFocus
        />
      ) : (
        <h2 onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
          Hello, {name}
        </h2>
      )}
    </div>
  );
}

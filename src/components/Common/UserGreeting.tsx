import { useEffect, useState } from "react";
import "./UserGreeting.css";

export default function UserGreeting() {
  const [name, setName] = useState<string>("User");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setName(storedName);
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    localStorage.setItem("username", newName);
  };

  return (
    <div className="user-greeting">
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={handleChange}
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

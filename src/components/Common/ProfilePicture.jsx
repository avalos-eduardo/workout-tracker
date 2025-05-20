import { useState, useRef } from "react";
import "./ProfilePicture.css";

export default function ProfilePicture() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="profile-picture-container">
      <div className="profile-picture-wrapper" onClick={triggerFileInput}>
        <img
          src={
            image ||
            "data:image/png;base64,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"
          }
          alt="Profile Picture"
          className="profile-picture"
        />
        <div className="overlay">
          <button className="change-button">Change Picture</button>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
}

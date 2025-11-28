import { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [imageSrc, setImageSrc] = useState("placeholder.png");
  const imageInputRef = useRef(null);
  const localStorageKey = "profilePictureDataURL";

  // Load image from LocalStorage when app starts
  useEffect(() => {
    const savedDataURL = localStorage.getItem(localStorageKey);
    if (savedDataURL) {
      setImageSrc(savedDataURL);
    }
  }, []);

  // Open hidden file input
  const openFileDialog = () => {
    imageInputRef.current.click();
  };

  // Handle selected image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.log("File selection cancelled.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = e.target.result;

      // Update preview
      setImageSrc(dataURL);

      // Save image to Local Storage
      localStorage.setItem(localStorageKey, dataURL);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="container">
      <h1>Profile Picture Uploader</h1>

      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      <div className="image-preview-area" onClick={openFileDialog}>
        <img id="profileImage" src={imageSrc} alt="Profile Preview" />
        {imageSrc === "placeholder.png" && (
          <p id="promptText">Click to Select/Change Image</p>
        )}
      </div>

      <button onClick={openFileDialog}>Select/Change Image</button>
    </div>
  );
}

import "./profile-setup.scss";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileSetup() {
  const navigate = useNavigate();

  // Holds the uploaded image path
  const [image, setImage] = useState(null); 

  // Load Image from LocalStorage
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user
    const userId = user?.id;

    if (file && userId) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", userId);

      try {
        const res = await axios.post("/the_coche-events/api/upload.php", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.status === "success") {
          const imagePath = `/the_coche-events/uploads/${res.data.image}`;
          setImage(imagePath);
          localStorage.setItem("profileImage", imagePath);
        } else {
          console.error(res.data.message);
        }
      } catch (err) {
        console.error("Upload failed", err);
      }
    }
  };

  const handleRemoveImage = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    try {
      const res = await axios.post("/the_coche-events/api/delete.php", { userId });
      if (res.data.status === "success") {
        setImage(null);
        localStorage.removeItem("profileImage");
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSave = () => {
    // Here you could also send a final save request if needed
    console.log("Saved image URL:", image);
    navigate("/setup");
  };

  return (
    <div className="profilesetup-container">
      <h2 className="page-title">Setup Profile</h2>

      <div className="card">
        <div className="profile-section">
          <div
            className="pfp"
            style={{
              backgroundImage: image ? `url(${image})` : "none",
            }}
          />
          <div className="actions">
            <input
              type="file"
              id="uploadInput"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <button
              className="btn upload"
              onClick={() => document.getElementById("uploadInput").click()}
            >
              <i className="fa-solid fa-file-arrow-up"></i> Upload
            </button>
            <button className="btn remove" onClick={handleRemoveImage}>
              <i className="fa-solid fa-trash-can"></i> Remove
            </button>
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <button className="back" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <button className="save" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default ProfileSetup;
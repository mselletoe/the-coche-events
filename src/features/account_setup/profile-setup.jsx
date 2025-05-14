import "./profile-setup.scss";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileSetup() {
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState(null); // Local preview
  const [imageFile, setImageFile] = useState(null); 

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // Load Image from LocalStorage
  useEffect(() => {
    if (userId) {
      const savedImage = localStorage.getItem(`profileImage_${userId}`);
      if (savedImage) {
        setPreviewImage(savedImage);
      }
    }
  }, [userId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Local preview only
    }
  };

  const handleSave = async () => {
    if (!imageFile || !userId) {
      navigate("/setup");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("userId", userId);

    try {
      const res = await axios.post("/the_coche-events/api/upload.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status === "success") {
        const imagePath = `/the_coche-events/uploads/${res.data.image}`;
        localStorage.setItem(`profileImage_${userId}`, imagePath);
        navigate("/setup");
      } else {
        console.error(res.data.message);
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleRemoveImage = async () => {
    if (!userId) return;

    try {
      const formData = new FormData();
      formData.append("userId", userId);

      const res = await axios.post("/the_coche-events/api/delete.php", formData);
      if (res.data.status === "success") {
        setPreviewImage(null);
        setImageFile(null);
        localStorage.removeItem(`profileImage_${userId}`);
      } else {
        console.error("Server error:", res.data.message);
      }
    } catch (err) {
      console.error("Failed to delete image", err);
    }
  };

  return (
    <div className="profilesetup-container">
      <h2 className="page-title">Setup Profile</h2>

      <div className="card">
        <div className="profile-section">
          <div className="pfp">
            {previewImage && <img src={previewImage} alt="Profile" />}
          </div>
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
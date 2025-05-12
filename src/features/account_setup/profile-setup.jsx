import "./profile-setup.scss";
import { useState } from "react";

function ProfileSetup() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      fetch("/the_coche-events/api/upload.php", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setImage(`/the_coche-events/uploads/${data.image}`);
          }
        });
    }
  };

  const handleRemoveImage = () => {
    fetch("/the_coche-events/api/delete.php", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setImage(null);
        }
      });
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
        <button className="back">
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <button className="save">Save</button>
      </div>
    </div>
  );
}

export default ProfileSetup;

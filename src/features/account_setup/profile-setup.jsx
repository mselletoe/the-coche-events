import "./profile-setup.scss";

function ProfileSetup() {
  return (
    <div className="profilesetup-container">
      <h2>Set profile picture</h2>
      <div className="pfp-container"></div> {/* this is a circle */}
      <button><i className="fa-solid fa-cloud-arrow-up"></i>Upload</button>
      <button>Remove</button>
    </div>
  );
}

export default ProfileSetup;
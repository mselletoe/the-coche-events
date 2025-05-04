import { Outlet } from "react-router-dom";
import { sideimage } from '../../assets/images.js';
import "./auth.scss";

function Auth() {
  return (
    <div className="auth-page-wrapper">
      <div className={'auth-container'}>
        <Outlet />
      </div>

      <div id="side-image-container">
        <img src={sideimage} alt="coche" />
      </div>
    </div>
  );
}

export default Auth;
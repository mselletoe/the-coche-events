import { Outlet } from "react-router-dom";
import { pinkFlower } from '../../assets/images.js';
import "./auth.scss";

function Auth() {
  return (
    <div className="auth-page-wrapper">
      <div className={'auth-container'}>
        <Outlet />
      </div>

      <div id="side-image-container">
        <div id="circle"><img src={pinkFlower} alt="pinkFlower" /></div>
      </div>
    </div>
  );
}

export default Auth;
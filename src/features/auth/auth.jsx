import { Outlet } from "react-router-dom";
import "./auth.scss";

function Auth() {
  return (
    <div className="auth-page-wrapper">
      <div className={'auth-container'}>
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;
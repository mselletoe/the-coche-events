import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './features/auth/auth.jsx';
import LandingPage from './pages/landing_page/landing-page.jsx';


function App() {
  return(
    <>
    <Router>
        <div>
            {/* <Name /> <<< place here if something has to always appear on screen */} 
            <Routes>
                {/* <Route path="/" element={<Navigate to="/landing-page" />} /> */}
                <Route path="/" element={<Navigate to="/auth" />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Other pages */}
            </Routes>
        </div>
    </Router>
    </>
    
  );
}

export default App
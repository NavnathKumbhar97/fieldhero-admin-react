import logo from './logo.svg';
import './App.css';
import LoginDesign from './Pages/Login/LoginDesign';
import ForgotPass from './Pages/ForgotPassword/ForgotPassDesign';
import { Routes, Route, Outlet } from "react-router-dom";



function App() {
  return (
    <div className="App" >
      <Routes>
        <Route path="/"  element={<LoginDesign />}>
          
        </Route>
        <Route path="/forgot-password" element={<ForgotPass />} />
      </Routes>
      <Outlet></Outlet>
      
    </div>
  );
}

export default App;

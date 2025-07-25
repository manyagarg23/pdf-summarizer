import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import GeneralMode from './Modes/GeneralMode';
import NavBar from './Components/NavBar';
import { AuthProvider } from './Components/AuthContext';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <div className="flex justify-between items-center bg-modern-blue px-6 py-4 shadow-md">
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<GeneralMode />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<GeneralMode />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

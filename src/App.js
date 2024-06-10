// src/App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Connect from './pages/Connect';
import Dashboard from './pages/Dashboard'; // Assurez-vous d'importer Dashboard
import AuthProvider from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Start from './pages/Start';
import SocialLogin from './pages/SocialLogin';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Start />} />
            <Route path='/register' element={<Register />} />
            <Route path='/connect' element={<Connect />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/socialLogin' element={<SocialLogin />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>    </div>
  );
}

export default App;

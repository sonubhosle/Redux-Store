import { Suspense } from 'react'
import './App.css'
import AuthPage from './pages/AuthPage'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './pages/ForgotPassword'
function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
       <Routes>
        <Route path='/' element={<Home/>} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
       </Routes>
       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </Suspense>
  )
}

export default App

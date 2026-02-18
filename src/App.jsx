import { Suspense, useEffect } from 'react'
import './App.css'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthPage from './pages/AuthPage'
import Admin from './pages/Admin'
import Home from './pages/Home'
import ProtectedRoutes from './components/ProtectedRoutes'
import Layout from './admin/Layout'
import Dashboard from './admin/dashboard/Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { restoreAuth } from './states/Auth/Action'


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.jwt && !auth.user) {
      dispatch(restoreAuth());
    }
  }, [dispatch]);


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoutes requiredRole="ADMIN">
            <Layout />
          </ProtectedRoutes>
         }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </Suspense>
  )
}

export default App

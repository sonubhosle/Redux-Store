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
import Header from './components/Header/Header'
import Profile from './pages/Profile'
import ProductsPage from './pages/ProductsPage'
import CategoryProducts from './components/Categories/CategoryProducts'
import ProductDetails from './pages/ProductDetails'
import Footer from './components/Footer/Footer'


function App() {
   const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.jwt && !auth.user) {
      dispatch(restoreAuth());
    }
  }, [dispatch]);

  const hideLayout =
    location.pathname === "/auth" ||
    location.pathname.startsWith("/admin");


  return (
    <>
      {!hideLayout && <Header />}
        <Suspense fallback={<div>Loading...</div>}>
     
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
         <Route path="/profile" element={<Profile />} />
         <Route path='/products' element={<ProductsPage />} />
         <Route path='/products/:category' element={<CategoryProducts />} />
         <Route path='/product/:id' element={<ProductDetails />} />
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
     <Footer/>
    </Suspense>
    </>
  
  )
}

export default App

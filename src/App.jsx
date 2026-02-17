import { Suspense } from 'react'
import './App.css'

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

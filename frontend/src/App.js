
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import {AuthProvider} from './context/authContext'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/homePage';
import RegisterPage from './pages/RegisterPage'
import VerifyPage from './pages/verifyPage'
import ForgotPassword from './pages/forgotPassword';
import EmployerReg from './pages/employerRegPage';

function App() {
  return (
    <div>
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<HomePage/>} exact path='/'/>
          <Route element={<LoginPage/>} path='/login'/>
          <Route element={<RegisterPage/>} path='/register'/>
          <Route element={<VerifyPage/>} path='/verify'/>
          <Route  element={<ForgotPassword/>} path='/forgot_password'/>
          <Route  element={<EmployerReg/>} path='/employer/register'/>
        </Routes>
        
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

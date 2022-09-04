
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/user/LoginPage';
import {AuthProvider} from './context/authContext'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/user/homePage';
import RegisterPage from './pages/user/RegisterPage'
import VerifyPage from './pages/user/verifyPage'
import ForgotPassword from './pages/user/forgotPassword';
import EmployerReg from './pages/employer/employerRegPage';
import EmployerHomePage from './pages/employer/employerHomePage';
import JobPost from './pages/employer/jobPostPage'
import AddSkillPage from './pages/employer/addSkillPage'
import DashboardPage from './pages/employer/dashboardPage'
import JobDetailPage from './pages/employer/jobDetailPage'
import UploadResumePage from './pages/user/uploadResumePage'

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
          <Route element={<UploadResumePage/>} exact path='/resume'/>

          {/* employer */}
          <Route  element={<EmployerReg/>} path='/employer/register'/>
          <Route  element={<EmployerHomePage/>} path='/employer/home'/>
          <Route  element={<JobPost/>} path='/employer/postjob'/>
          <Route  element={<AddSkillPage/>} path='/employer/postjob/:id/addskill'/>
          <Route  element={<DashboardPage/>} path='/employer/dashboard'/>
          <Route  element={<JobDetailPage/>} path='/employer/job/:id'/>
        </Routes>
        
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

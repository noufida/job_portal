import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/user/LoginPage';
import {AuthProvider} from './context/authContext'
import {JobProvider} from './context/jobContext'
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
import SplitPage from './pages/user/splitPage'
import ProfilePage from './pages/user/profilePage'
import QualificationPage from './pages/user/qualificationPage'
import ExperiencePage from './pages/user/experiencePage'
import SkillSetPage from './pages/user/skillSetPage'
import JobPage from './pages/user/jobPage'
import SingleJob from './pages/user/singleJobPage'
import RecJob from './pages/user/recJobPage'
import AccountPage from "./pages/user/accountPage";
import ApplicantPage from "./pages/employer/applicantPage";
import ApplicantProfPage from "./pages/employer/applicantProfPage";

import { EmpProvider } from './context/empContext';
import PrivateRoute from './utils/privateRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
      <AuthProvider>
        <JobProvider>
          <EmpProvider>
        <Routes>
          <Route element={<HomePage/>} exact path='/'/>
          <Route element={<LoginPage/>} path='/login'/>
          <Route element={<RegisterPage/>} path='/register'/>
          <Route element={<VerifyPage/>} path='/verify'/>
          <Route  element={<ForgotPassword/>} path='/forgot_password'/>
          <Route element={<SplitPage/>}  path='/path'/>

          {/* candidates */}
          <Route element={<AccountPage/>}  path='/candidate/account'/>
          <Route element={<UploadResumePage/>}  path='/candidate/resume'/>
          <Route element={<ProfilePage/>}  path='/candidate/profile'/>
          <Route element={<QualificationPage/>}  path='/candidate/qualification'/>
          <Route element={<ExperiencePage/>}  path='/candidate/experience'/>
          <Route element={<SkillSetPage/>}  path='/candidate/skill'/>
          <Route element={<RecJob/>}  path='/recommended_jobs'/>

          <Route element={<JobPage/>}  path='/jobs'/>
          <Route element={<SingleJob/>}  path='/jobs/:id'/>

          {/* employer */}
          <Route element={<PrivateRoute/>}  >
          <Route  element={<EmployerReg/>} path='/employer/register'/>
          <Route  element={<EmployerHomePage/>} path='/employer/home'/>
          <Route  element={<JobPost/>} path='/employer/postjob'/>
          <Route  element={<AddSkillPage/>} path='/employer/postjob/:id/addskill'/>
          <Route  element={<DashboardPage/>} path='/employer/dashboard'/>
          <Route  element={<JobDetailPage/>} path='/employer/job/:id'/> 
          <Route  element={<ApplicantPage/>} path='/employer/job/:id/applicants'/> 
          <Route  element={<ApplicantProfPage/>} path='/employer/job/:id/applicants/:aid'/> 
          </Route>
        </Routes>
        </EmpProvider>
        </JobProvider>
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

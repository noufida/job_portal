import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import {AuthProvider} from './context/authContext'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/homePage';

function App() {
  return (
    <div>
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<HomePage/>} path='/'/>
          <Route element={<LoginPage/>} path='/login'/>

        </Routes>
        
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

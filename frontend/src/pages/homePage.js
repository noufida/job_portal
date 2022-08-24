
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../components/NavBar'
import Login from '../components/Login'
import './loginpage.css'
import axiosInstance from '../axios'
import { useState,useContext } from 'react';

function HomePage() {
  const [first, setfirst] = useState([])
  let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  const user=async(e)=>{
         
    await axiosInstance.get('user/get_user/', { headers:{Authorization: `Bearer ${authTokens?.token}`}}).then((response)=>{
       console.log(response.data)
      setfirst(response.data)
  
     }) 
  
   
  
  }
  return (
   <>
      <Row >
      <NavBar/>
     
      </Row>
      <Row className='justify-content-center mt-5 pt-5' >
       <h1>my home page</h1>
      <button onClick={user}>f</button>
      </Row>
 </>
  );
}

export default HomePage;
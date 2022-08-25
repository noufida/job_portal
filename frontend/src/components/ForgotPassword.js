import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import { useState,useContext } from 'react';
import axios from '../axios'
import AuthContext from '../context/authContext';
import {  useNavigate} from 'react-router-dom'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const {authTokens} = useContext(AuthContext)

    const [detail, setDetail] = useState('') //for catching response
    
    const navigate = useNavigate()
 
    //api call for password reset email
    const forgotPassword=async(e)=>{
        e.preventDefault()
        await axios.post('user/forgot_password/',{
          email:email
          },
          { headers:{Authorization: `Bearer ${authTokens?.token}`}}
          ).then((response)=>{
            console.log(response.data.detail)
            setDetail(response.data.detail)
      
          }) 

      }
 
  return (
    <div className='box-email'>
      <h2 style={{'textAlign':'center'}}>ENTER YOUR EMAIL</h2><br/>
    <Form onSubmit={forgotPassword}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter your email</Form.Label>
        <Form.Control type="email" placeholder="" value={email} onChange={(e)=>
              setEmail(e.target.value)
                }/>
      </Form.Group>

 
      <div  style={{'textAlign':'center'}}>
      <Button variant="success" className='sub-button' type="submit" >
        Submit
      </Button><br/><br/><br/><br/>
            {  detail &&(<> <h5 style={{color:'red'}}>Password reset link has been sent to your email</h5>  <br/>
            <Button onClick={()=>navigate('/login')} 
            style={{border:'solid green',color:'green'}} 
            variant="" className='sub-button' type="" > 
            Login
            </Button></>) }
      </div>
    
    </Form></div>
  );
}

export default ForgotPassword;
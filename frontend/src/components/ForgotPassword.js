import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import { useState,useContext } from 'react';
import axios from '../axios'
import AuthContext from '../context/authContext';
import { Navigate, useNavigate} from 'react-router-dom'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const {authTokens} = useContext(AuthContext)
    
    const navigate = useNavigate()
 
    const {mobile} =useContext(AuthContext)

    const forgotPassword=async(e)=>{
        e.preventDefault()
        await axios.post('user/forgot_password/',{
          email:email
          },
          { headers:{Authorization: `Bearer ${authTokens?.token}`}}
          ).then((response)=>{
            console.log(response.data)
          
      
          }) 

      }
 
  return (
    <div className='box'>
      <h2 style={{'textAlign':'center'}}>EMAIL</h2>
    <Form onSubmit={forgotPassword}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter the code</Form.Label>
        <Form.Control type="email" placeholder="" value={email} onChange={(e)=>
              setEmail(e.target.value)
                }/>
      </Form.Group>

 
      <div  style={{'textAlign':'center'}}>
      <Button variant="success" className='sub-button' type="submit" >
        Submit
      </Button>
      </div>
    
    </Form></div>
  );
}

export default ForgotPassword;
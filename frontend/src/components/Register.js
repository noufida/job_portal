import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import { useState,useContext } from 'react';
import AuthContext from '../context/authContext';
import axios from '../axios'
import axiosInstance from "../axios";
import { Navigate, useNavigate} from 'react-router-dom'


function BasicExample() {
  const {setMobile,mobile} =useContext(AuthContext)
  const navigate = useNavigate()
  

  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirm_password] = useState('')

  const registerHandler = async(e)=>{
    e.preventDefault()
    await axios.post('user/register/',{
      first_name:first_name,
      last_name:last_name,
      email:email,
      mobile:mobile,
      password:password,
      confirm_password:confirm_password

    }).then((response)=>{
      console.log(response.data)
      if (response.data.mobile){

        navigate('/verify')
      }

    }) 
  }

 
  return (
    <div className='box-signup'>
    <h2 style={{'textAlign':'center'}}>SIGNUP</h2>
    <Form onSubmit={registerHandler} >
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>First name</Form.Label>
      <Form.Control type="text" placeholder="Enter first name" value={first_name} onChange={(e)=>                
              setFirst_name(e.target.value)
              }/>
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Last name</Form.Label>
      <Form.Control type="text" placeholder="Enter last name" value={last_name} onChange={(e)=>
              setLast_name(e.target.value)
              }/>
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>
              setEmail(e.target.value)
              }/>
      
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Mobile</Form.Label>
      <Form.Control type="text" placeholder="Enter Mobile number" value={mobile} onChange={(e)=>
              setMobile(e.target.value)
              }/>
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>
              setPassword(e.target.value)
              } />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" placeholder="confirm_password" value={confirm_password} onChange={(e)=>
              setConfirm_password(e.target.value)
              } />
    </Form.Group>
    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group> */}
    <div  style={{'textAlign':'center'}}>
    <Button variant="success" className='sub-button' type="submit" >
      Submit
    </Button>
    </div>
    
    </Form></div>
  );
}

export default BasicExample;






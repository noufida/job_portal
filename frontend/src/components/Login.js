import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import { useState,useContext } from 'react';
import AuthContext from '../context/authContext';


function BasicExample() {

  

const {userLogin,values,setValues} = useContext(AuthContext)




const loginHandler=(e)=>{
  e.preventDefault()
  userLogin({...values})
}
 
  return (
    <div className='box'>
      <h2 style={{'textAlign':'center'}}>LOGIN</h2>
    <Form onSubmit={loginHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e)=>
                setValues({ ...values,[e.target.name]:e.target.value})
                }/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>
                setValues({ ...values,[e.target.name]:e.target.value})
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
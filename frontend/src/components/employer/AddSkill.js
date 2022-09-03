import React,{useContext,useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import Badge from 'react-bootstrap/Badge';

function AddSkill() {
    const {authTokens} = useContext(AuthContext) 
    const [skill, setSkill] = useState('') //for adding skills
    const [skills, setSkills] = useState([]) //for getting skills of a job
    
    useEffect(() => {
      getSkillsHandler()
    }, [])
    

    //for getting id from url
    const params = useParams();
    let a=params.id


    //api call to add skill
    const addSkillHandler = async(e)=>{
        e.preventDefault()
       
       await axios.post(`employer/${a}/add_skill/`,{          
        skill:skill
        },{headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
          console.log(response.data)
          if (response.status===200){
            console.log("success")            
            getSkillsHandler()
            e.target.reset();
          
          }
        })  
        .catch((err)=>{
          console.log(err.response.data.detail,"erorr")
         
        }) 
      
      }


      //api call to get skills for a particular job
    const getSkillsHandler = async(e)=>{
     
     await axios.get(`employer/${a}/get_skills/`,
     {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data)
        if (response.status===200){
          console.log("succesfffffffffs")
          setSkills(response.data)
          
        }
      })  
      .catch((err)=>{
        console.log(err.response.data.detail,"erorr")
       
      }) 
    
    }

        //api call to delete skill of a particular job
        const deleteSkillsHandler = async(id)=>{
     
          await axios.delete(`employer/${a}/delete_skill/${id}`,
          {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
             console.log(response.data)
             if (response.status===200){
               console.log("deleted successfully")
               getSkillsHandler()
             }
           })  
           .catch((err)=>{
             console.log(err.response.data.detail,"erorr")
            
           }) 
         
         }

  return (
    <div>
        <h2>Skill Set Needed</h2>
     
 
        {
          skills.map((obj)=><>
          <Badge  bg="secondary">{obj.skill}</Badge>
          <Button style={{borderRadius:'700px',marginRight:'4px',width:'20px',height:'25px'}} onClick={()=>deleteSkillsHandler(obj.id)}>x</Button>
       
          </> )
        }
        <h2>Add New skill</h2>
        {/* form to add skill */}
        <Form onSubmit={addSkillHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Add a skill" onChange={(e)=>setSkill(e.target.value) } />
      </Form.Group>
    
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>

    </div>
  )
}

export default AddSkill
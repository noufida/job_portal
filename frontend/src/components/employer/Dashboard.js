import Table from 'react-bootstrap/Table';
import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../../context/authContext';
import axios from '../../axios'

function Dashboard() {
    const {authTokens} = useContext(AuthContext)
    const [job, setJob] = useState([])

    useEffect(() => {
        getJobs()
    }, [])
    
    const getJobs=async(e)=>{
     
        await axios.get(`employer/${authTokens.user_id}/jobs/`,
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
           console.log(response.data)
           if (response.status===200){
             console.log("success")
             setJob(response.data)
             
           }
         })  
         .catch((err)=>{
           console.log(err.response.data.detail,"erorr")
          
         }) 
       
       }
    
  return (
    <div>
         <Table >
      <thead>
        <tr>
          <th>Sl. No.</th>
          <th>Job Title</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
       
            {
                job.map((obj,key)=>
                 <tr>
                <td>{key+1}</td>
                <td>{obj.designation}</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                 )
            }
         
     
      </tbody>
    </Table>
    </div>
  )
}

export default Dashboard
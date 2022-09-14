import { createContext,useState, useEffect,useContext } from "react";
import { useNavigate} from 'react-router-dom'
import axios from '../axios'
import AuthContext from './authContext';

const JobContext = createContext()

export default JobContext;

export const JobProvider = ({children})=>{

    const {authTokens} = useContext(AuthContext)


    const [job, setJob] = useState([])

     //api call for getting skills of candidate
     const getJobHandler=async(e)=>{
        await axios.get('employer/jobs/',
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
            console.log(response.data,"skills")
            setJob(response.data)
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
            
          })
  
      }

      

  
    let contextData={
        getJobHandler:getJobHandler,
        job:job
       
    }
    return(
        <JobContext.Provider value={contextData}>
            {children}
        </JobContext.Provider>
    )
}
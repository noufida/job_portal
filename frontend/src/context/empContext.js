import { createContext,useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom'

const EmpContext = createContext()

export default EmpContext;

export const EmpProvider = ({children})=>{

    const navigate = useNavigate()

    
     
  const [company, setCompany] = useState({})
 
          
       

    
   
  
    let contextData={
        company:company,
        setCompany:setCompany
        
       
    }
    return(
        <EmpContext.Provider value={contextData}>
            {children}
        </EmpContext.Provider>
    )
}
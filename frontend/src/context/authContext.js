import { createContext,useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate} from 'react-router-dom'
import axios from '../axios'
import axiosInstance from "../axios";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children})=>{
    const navigate = useNavigate()
    const [mobile, setMobile] = useState('')
      
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [values,setValues]= useState({
        email:"",
        password:""
    })


              
        const userLogin=async(e)=>{
         
          await axios.post('user/login/',{
             ...values
           }).then((response)=>{
             console.log(response.data)
            if (response.data.token){
                // console.log("jfretgeryerjj")
                // console.log(response.data,"jijij")
                // console.log(jwt_decode(response.data.token),"kkkk")
                setAuthTokens(response.data)
                setUser(jwt_decode(response.data.token))
                localStorage.setItem('authTokens', JSON.stringify(response.data))
                navigate('/')
            }
       
           }) 

         
       
    }

    


    let logoutUser = async()=>{

        await axiosInstance.post('user/logout/',).then((response)=>{
            console.log(response.data)
          
      
          }) 


        setAuthTokens(null)           
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

  
    let contextData={
        user:user,
        authTokens:authTokens,
        userLogin:userLogin,
        setValues:setValues,
        values:values,
        logoutUser:logoutUser,
        mobile:mobile,
        setMobile:setMobile
       
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
import React, { useState,useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { useNavigate } from 'react-router-dom';

function UploadResume() {
  const navigate = useNavigate()
  const {authTokens} =useContext(AuthContext)

  //states for onchange event
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false)

  //onchange event 
  const changeHandler = (event) => {
    console.log(event.target.files[0].type,"kkk")
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

  //api call to upload resume
  const handleSubmission=async(e)=>{
    console.log(selectedFile)
    const formData = new FormData();
		formData.append('resume', selectedFile);

    await axios.post('user/resume/',
   formData,
    {headers:{Authorization:`Bearer ${authTokens?.token}`,  'content-type': 'multipart/form-data'} } ).then((response)=>{
       console.log(response.data)
       if (response.status===200){
         console.log("success")
         
       }
     })  
     .catch((err)=>{
       console.log(err.response.data.detail,"erorr")
      console.log(formData)
     }) 
   
   }
  return (
    <div>
        
        <Card className='' style={{ width: '28rem',backgroundColor:'' }}>
       
      <Card.Body>
        <Card.Title>Upload a Resume</Card.Title>
        <Card.Text>
        <input type="file" name='resume' onChange={changeHandler}  required/>
        { isFilePicked ? (
            selectedFile.type !== 'application/pdf' &&
            <div>
              <p style={{color:'red'}}>*only pdf format is supported</p>
            </div>
          // <div>
          //   <p>Filename: {selectedFile.name}</p>
          //   <p>Filetype: {selectedFile.type}</p>
          //   <p>Size in bytes: {selectedFile.size}</p>
          //   <p>
          //     lastModifiedDate:{' '}
          //     {selectedFile.lastModifiedDate.toLocaleDateString()}
          //   </p>
          //</div>

          ) : (
          <p>Select a file to show details</p>
          )}
        </Card.Text>
        {selectedFile  && 
        selectedFile.type == 'application/pdf' &&       
        <Button  onClick={handleSubmission} type='submit' variant="primary">Upload Resume</Button>}
      </Card.Body>
      {selectedFile  && 
        selectedFile.type == 'application/pdf' &&  <Button style={{margin:'15px'}} onClick={()=>navigate('/jobs')} >Explore Jobs</Button>}
    </Card>
    <Button onClick={()=>navigate('/candidate/skill')} style={{margin:'15px'}} variant="dark">Previous</Button>

    </div>
  )
}

export default UploadResume
import React, { useState,useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AuthContext from '../../context/authContext';
import axios from '../../axios'

function UploadResume() {
  const {authTokens} =useContext(AuthContext)

  //states for onchange event
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false)

  //onchange event 
  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

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
        {isFilePicked ? (

          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{' '}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>

          ) : (
          <p>Select a file to show details</p>
          )}
        </Card.Text>
        <Button onClick={handleSubmission} type='submit' variant="primary">Upload Resume</Button>
      </Card.Body>
       
    </Card>

    </div>
  )
}

export default UploadResume
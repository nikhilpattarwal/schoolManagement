import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from "./signup.module.scss"
import axios from 'axios';
import { Audio } from 'react-loader-spinner';
import { Alert } from '@mui/material';

const SignUp = ({setLoggedIn,setUser_id}) => {


  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
 
  const [isDisabled, setIsdisabled] = useState(true);
  const[loading,setLoading] = useState(false);
  const[message, setMessage] = useState({severity:"",msg:""});
  const navigate = useNavigate();



  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  useEffect(()=>{
    if ( !userData.name || !userData.email || !userData.password || !userData.confirmPassword ||  userData.password !== userData.confirmPassword) {
      setIsdisabled(true);
    } else {
      setIsdisabled(false);
    }
  },[userData])

  const handleSignUp = async () => {
    if(  userData.password !== userData.confirmPassword){
      return;
    }
    try {
      const config = {
        headers:{
          "Content-type":"application/json"
        },
      };
      setLoading(true);
      const {data} = await axios.post("http://localhost:3000/register",{
        userData
      }, config);
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setLoggedIn(true)
      setUser_id(data._id);
      setMessage((prevData)=>({
        ...prevData,
        severity:"success",
        msg:"Logged in Successfully"
      }));
       navigate("/");
    } catch (error) {
      console.log(error)
      setLoading(false);
      setMessage((prevData)=>({
        ...prevData,
        severity:"error",
        msg:error.response.data.message
      }));
    }

    setUserData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
  };
  

  return (
    <>
  
      <div className={style.mainCont}>
        <div className={ style.cont} >
        {loading &&
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
       /> 
      }
      {message.msg !=="" &&
        <Alert severity={message.severity}>{message.msg}</Alert>
      }

            <input type="text"
             placeholder='Name' 
             name="name"
             value={userData.name}  
             onChange={handleInputChange}/>

            <input type="email" 
            placeholder='Email' 
            name="email" 
            value={userData.email}  
            onChange={handleInputChange}/>

            <input type="password" 
            placeholder='Create new Password' 
            name="password" 
            value={userData.password}  
            onChange={handleInputChange}/>

            <input type="password" 
            placeholder='Confirm password' 
            name="confirmPassword" 
            value={userData.confirmPassword}  
            onChange={handleInputChange}/>
            
            <button className={isDisabled ? style.notButton : style.button} onClick={handleSignUp} disabled={isDisabled}>Sign up</button>
            <p onClick={()=>{navigate('/signin');}}>Already a user? Sign in</p>
        </div>
      </div>
   
    </>
  )
}

export default SignUp;
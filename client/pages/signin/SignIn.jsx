import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from "./signin.module.scss";
import axios from 'axios';
import { Audio } from 'react-loader-spinner';
import { Alert } from '@mui/material';

const SignIn = ({setLoggedIn,setUser_id}) => {
  
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const [isDisabled, setIsdisabled] = useState(true);
  const[loading,setLoading] = useState(false);
  const[message, setMessage] = useState({severity:"",msg:""});
  const navigate = useNavigate();


  

  const handleInputChange = (event) => {
     setMessage((prevData)=>({
        ...prevData,
        severity:"",
        msg:""
      }));
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  

  useEffect(()=>{
    if ( !userData.email || !userData.password) {
      setIsdisabled(true);
    } else {
      setIsdisabled(false);
    }
  },[userData]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log('Signin data:', userData);

    try {
      const config = {
        headers:{
          "Content-type":"application/json"
        },
      };
      const {email, password} = userData;
      console.log(email, password);
      setLoading(true);
      const {data} = await axios.post("http://localhost:3000/login",{
        userData
      }, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setLoggedIn(true)
      setUser_id(data._id);
      console.log(data);
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
      email: '',
      password: ''
    })
  };

  return (
    <>
     
      <div className={ style.mainCont} >
      <div className={style.cont}>
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
            placeholder='Email'
            name="email"
            value={userData.email}  
            onChange={handleInputChange} 
            /> 
            <input type="text" 
            placeholder='Password'
            name="password" 
            value={userData.password}  
            onChange={handleInputChange}
            />
            <button className={isDisabled ? style.notButton : style.button} onClick={handleSignIn} disabled={isDisabled}>Sign in</button>
            <p onClick={()=>navigate('/signup')}>Not a user? Sign up</p>
        </div>
      </div>
   
    </>
  )
}

export default SignIn
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from "./signin.module.scss";
import axios from 'axios';


const SignIn = ({navigateto}) => {
  
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const [isDisabled, setIsdisabled] = useState(true);
  const navigate = useNavigate();


  

  const handleInputChange = (event) => {
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
      const {data} = await axios.post("http://localhost:3000/login",{
        userData
      }, config);
      console.log(data);
    } catch (error) {
      console.log(error)
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
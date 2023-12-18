import React from 'react'
import "./navbar.scss";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = (link) => {
        navigate(link);
      };
  return (
    <>
      <div className="navCont">
        <ul>
          <li onClick={()=>handleClick('/')}>Home</li>
          <li onClick={()=>handleClick('/student')}>Add Student</li>
          <li onClick={()=>handleClick('/day-attendance')}>Attendance of day</li>
          <li onClick={()=>handleClick('/classes')}>Classes</li>  
        </ul>
        <div className="signup-in" onClick={()=>handleClick('/signin')}>
            <p className='login'>Login</p>
        </div>
      </div>   
    </>
  )
}

export default Navbar
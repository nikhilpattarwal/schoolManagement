import React, { useState } from 'react'
import "./navbar.scss";
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({loggedIn, setLoggedIn}) => {
    const navigate = useNavigate();
     const [show, setShow] = useState(false);
    const handleClick = (link) => {
        navigate(link);
      };

      const handleLogout=()=>{
        localStorage.removeItem("userInfo");
        setLoggedIn(false);
        navigate("/signin");
      }

      const handletoggle=()=>{
        setShow((prev) => !prev);
      }

  return (
    <>
      <div className="navCont">
        <GiHamburgerMenu className="hamburger-icon" onClick={handletoggle}/>
        
          {!show && (
          <ul>
          <li onClick={()=>handleClick('/')}>Home</li>
        {loggedIn && (
          <>
          <li onClick={()=>handleClick('/student')}>Add Student</li>
          <li onClick={()=>handleClick('/day-attendance')}>Attendance of day</li>
          <li onClick={()=>handleClick('/classes')}>Classes</li>  
          </>
          )}
        </ul>
        )}

        {loggedIn?(
           <div className="signup-in" onClick={handleLogout}>
           <IoIosLogOut className="logout-icon" />
           <p className='login'>Logout</p>
       </div>
        
        ):(
        <div className="signup-in" onClick={()=>handleClick('/signin')}>
            <p className='login'>Login</p>
        </div>)}
      </div>   
    </>
  )
}

export default Navbar

import { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Student from '../pages/addStudents/Student'
import AttendanceDay from '../pages/attendanceDay/AttendanceDAy'
import Home from '../pages/home/Home'
import SignIn from '../pages/signin/SignIn'
import SignUp from '../pages/signup/SignUp'
import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Classes from '../pages/classes/Classes'

function App() {
const[classData, setClassData] = useState("");
const [loggedIn, setLoggedIn] = useState(false);
const [user_id, setUser_id] = useState("");

const userInfo=localStorage.getItem("userInfo");
// console.log("userInfo",JSON.parse(userInfo)._id);
// console.log("user_id", user_id);
useEffect(()=>{
  if(userInfo){
    setLoggedIn(true);
    setUser_id(JSON.parse(userInfo)._id);
  }
},[userInfo]);

console.log(loggedIn);

console.log("appData",classData);
  return (
    <>
    <BrowserRouter>
    <Navbar  loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path='/' element={<Home classData={classData} setClassData={setClassData} loggedIn={loggedIn} user_id={user_id}/>}/>
        {loggedIn&&(
          <>
        <Route path='/student' element={<Student loggedIn={loggedIn}/>}/>
        <Route path='/day-attendance' element={<AttendanceDay/>}/>
        <Route path ='/classes' element={<Classes classData={classData} setClassData={setClassData} loggedIn={loggedIn} user_id={user_id}/>}/>
        </>
        )}
        <Route path='/signin' element={<SignIn setLoggedIn={setLoggedIn} setUser_id={setUser_id}/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


import { useState } from 'react'
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
console.log("appData",classData);
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home classData={classData} setClassData={setClassData}/>}/>
        <Route path='/student' element={<Student/>}/>
        <Route path='/day-attendance' element={<AttendanceDay/>}/>
        <Route path ='/classes' element={<Classes classData={classData} setClassData={setClassData}/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

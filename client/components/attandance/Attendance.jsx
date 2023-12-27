// AttendanceSheet.js

import React, { useEffect, useState } from 'react';
import style from'./attendance.module.scss'; // Import the CSS file for styling
import { useDispatch, useSelector } from 'react-redux';
import { dataActions, dataSelector } from '../../redux/reducers/dataReducer';
import axios from 'axios';

const Attendance = ({date}) => {
  const dispatch = useDispatch();
  const {dailyAttendance} = useSelector(dataSelector);
  const [attendance, setAttendance] = useState([]);
  const [classs, setClass] = useState("none");
  
  const month = date.getMonth();
  const options = { month: 'long' };
  const monthString = date.toLocaleString('en-US', options);
  // console.log(monthString)
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  console.log(daysInMonth)
  const monthDays = [];
  const today = date.getDate();
  // console.log(dailyAttendance);
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = new Date(year, month, day);
    const dayOfWeek = currentDay.toLocaleString('en-US', { weekday: 'long' });
    monthDays.push({
      dayOfWeek,
      dayNumber: day,
    });
  }
  
  useEffect(()=>{
    data();
  },[classs])

  let candidates;
  let [students,setStudents] = useState();
  const data = async () => {
    try {
      const {data} = await axios.get("http://localhost:3000/students");
        candidates=  data[0]?.Students;
       console.log(candidates);
       setStudents(candidates?.[classs]);
         console.log("students", students);
         students && students.map((student)=>{
          console.log(student)
        })
    } catch (error) {
      console.log(error)
    }
  }
  console.log(classs);
  // console.log(candidates.nursery);
  const settingClass = (e)=>{
   setClass(e.target.value)
  }



  useEffect(() => {
    if (dailyAttendance) {
      const classAttendance = dailyAttendance?.[classs]?.[monthString];
      if (classAttendance && Array.isArray(classAttendance) && classAttendance.length > 0) {
        setAttendance(classAttendance[0]);
      } else {
        setAttendance();
      }
    }
  }, [dailyAttendance, classs, monthString]);
  
  
  
  const handleRadioChange = (studentIndex, dayIndex, value) => {
    
    setAttendance((prevAttendance) => {
      return {
        ...prevAttendance,
        [studentIndex]: {
          ...prevAttendance?.[studentIndex],
          [dayIndex]: value,
        },
      };
    });
  };
  
 

  const handlePayload = async ()=>{
    dispatch(dataActions.ADD_ATTENDANCE({payload:attendance,month:monthString, classs:classs}))
    try {
      const config = {
        headers:{
          "Content-type":"application/json"
        },
      };
     
      const {data} = await axios.post("http://localhost:3000/schooldata",{
        data:attendance,month:monthString, classs:classs
      }, config);
      // console.log(data);
    } catch (error) {
      // console.log(error)
    }
  }

  const handleCompare = (studentIndex, dayIndex, value, student) => {
    let result = false;
    
    if (attendance && attendance[studentIndex]) {
      const studentAttendance = attendance[studentIndex][dayIndex];
      if (studentAttendance && studentAttendance.includes(value)) {
        result = true;
        // console.log(result);
      }
    } else if (
      dailyAttendance &&
    dailyAttendance?.[classs] &&
    dailyAttendance?.[classs]?.[monthString]
  ) {
    const classAttendance = dailyAttendance[classs][monthString];
    
    for (let i = 0; i < classAttendance.length; i++) {
      if (
        classAttendance[0] &&
        classAttendance[0][studentIndex] &&
        classAttendance[0][studentIndex][dayIndex] === value
      ) {
        result = true;
        break; 
      }
    }
  }
  return result;
  };
   
  
  
  return (
    <>
    <div className={style.attendanceSheet}>
      <div className={style.boxButtonCont}>
        <div>
        <label htmlFor="classSelect">Choose a class:</label>
        <select id="classSelect" className={style.select} name="classes" onChange={settingClass}>
          <option value="none">None</option>
          <option value="nursery">Nursery</option>
          <option value="lkg">L.K.G</option>
          <option value="ukg">U.K.G</option>
          <option value="first">Ist</option>
          <option value="second">2nd</option>
          <option value="third">3rd</option>
          <option value="fourth">4th</option>
          <option value="fifth">5th</option>
          <option value="sixth">6th</option>
          <option value="seventh">7th</option>
          <option value="eighth">8th</option>
          <option value="nineth">9th</option>
          <option value="tenth">10th</option>
          <option value="eleventh">11th</option>
          <option value="twelveth">12th</option>
        </select>
        </div>
        {classs !== "none" && (
          <>        
        <div className={style.buttonSave} onClick={handlePayload}>SaveChanges</div>
        <div style={{color:"white", fontWeight:"bold"}}>{`Attendance for : ${today}th ${ monthString}`}</div>
        </>
        )
         }
      </div>
      {classs !== "none" && students && students.length>0 && (
      <table>
        <thead>
          <tr className={style.dayMonthText}>
            <th>Student Name</th>
            {monthDays.map(day => (
              <th key={day.dayOfWeek +  day.dayNumber} style={day.dayNumber === today? {background:"cyan"}:{}}>
                <div className={style.dayWeekPCont}>
                  <div >{day.dayOfWeek } { day.dayNumber}</div>
                  <div className={style.markCont} >
                    <p style={{color:"green"}}>P</p>
                    <p style={{color:"red"}}>A</p>
                    <p style={{color:"blue"}}>L</p>
                    <p style={{color:"black"}}>N</p>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students && students.map((student, studentIndex) => (
            <tr key={studentIndex}>
                {console.log(student)}
              <td className={style.studentName}>{student.name}</td>
              {[...Array(daysInMonth).keys()].map((dayIndex,i) => (
                <td key={i}>
                   {console.log(dayIndex)}
                  <div className={style.radioButtons}>
                  <input
                      className={style.attInput}
                      type="radio"
                      id={style.present}
                      key={`${studentIndex}-${dayIndex}-present`}
                      name={`attendance-${studentIndex}-${dayIndex}`}
                      value="present"
                      checked={handleCompare(student.id, dayIndex +1, 'present')}
                      onChange={() => handleRadioChange(student.id, dayIndex +1, 'present')}
                    />

                    <input
                      className={style.attInput}
                      type="radio"
                      id={style.absent}
                      key={`${studentIndex}-${dayIndex}-absent`}
                      name={`attendance-${studentIndex}-${dayIndex}`}
                      value="absent"
                      checked={handleCompare(student.id, dayIndex +1, 'absent',student)}
                      onChange={() => handleRadioChange(student.id, dayIndex +1, 'absent')}
                    />

                    <input
                      className={style.attInput}
                      type="radio"
                      id={style.leave}
                      key={`${studentIndex}-${dayIndex}-leave`}
                      name={`attendance-${studentIndex}-${dayIndex}`}
                      value="leave"
                      checked={handleCompare(student.id, dayIndex +1, 'leave')}
                      onChange={() => handleRadioChange(student.id, dayIndex +1, 'leave')}
                    />

                    <input
                      className={style.attInput}
                      type="radio"
                      id={style.none}
                      key={`${studentIndex}-${dayIndex}-none`}
                      name={`attendance-${studentIndex}-${dayIndex}`}
                      value="none"
                      checked={handleCompare(student.id, dayIndex +1, 'none')}
                      onChange={() => handleRadioChange(student.id, dayIndex +1, 'none')}
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      )
      }
    </div>
    </>
    
  );
}        

export default Attendance;

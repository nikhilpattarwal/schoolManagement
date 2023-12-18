import React, { useState } from 'react'
import Attendance from '../../components/attandance/Attendance'
import { dailyStudents } from '../../data'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CiCalendarDate } from "react-icons/ci";
import styles from "./attendanceday.module.scss"
const AttendanceDAy = () => {
  const [value, onChange] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleDateChange = (newValue) => {
    onChange(newValue);
    setShow(false);
  };
  

  return (
    <>
      <div className={styles.month_container}>
      <div className={styles.monthButton}  onClick={() => setShow(prev => !prev)}>Select Date <CiCalendarDate className={styles.calIcon} /></div>
      <div className={styles.headingCont}>
        <p style={{color:"Green"}}>P - Present</p>
        <p style={{color:"Red"}}>A - Absent</p>
        <p style={{color:"Blue"}}>L - Leave</p>
        <p style={{color:"black"}}>N - None</p> 
     </div>
      {show && (
      <div className={styles.month}>
        <Calendar onChange={handleDateChange} value={value} />
      </div>
      )}
      </div>
      <Attendance students={dailyStudents} date={value}/>
    </>
  )
}

export default AttendanceDAy
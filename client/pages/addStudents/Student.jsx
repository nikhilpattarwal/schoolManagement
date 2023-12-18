import React, { useState } from 'react';
import img from "../../src/assets/studentsData.jpg";
import styles from "./student.module.scss";
import { dataActions, dataSelector } from '../../redux/reducers/dataReducer';
import { useDispatch, useSelector} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const Student = () => {
  const dispatch = useDispatch();
  const {students} = useSelector(dataSelector);
  console.log("students", students);
  const uniqueId = uuidv4();
  const [err, setErr] = useState("");
  const [studentsData, setStudentsData] = useState(
    {
      name:"",
      address:"",
      admissiondate:"",
      contact:"",
      class:"",
      dob:"",
      id:uniqueId
    }
  );

  const handleInputChange =(e)=>{
   e.preventDefault();
   setErr("");
   const name = e.target.name;
   const value = e.target.value;
   setStudentsData({
    ...studentsData,
    [name]:value
   })
  }

  const handleClick = (e) =>{
    e.preventDefault();
    if(!studentsData.name || !studentsData.address || !studentsData.admissiondate || !studentsData.contact || !studentsData.dob || !studentsData.class){
      setErr("*Please fill all fields");
      return;
    }
    dispatch(dataActions.ADD({payload:studentsData,type:"students"}));
    setErr("");
    setStudentsData({
      name:"",
      address:"",
      admissiondate:"",
      contact:"",
      class:"",
      dob:"",
      id:""
    });
  }

  return (
    <>
    <div className={styles.students_cont}>
    <img src={img} alt="" />
        <div className={styles.Stu_mainCont}>
        <h3>Student's Data</h3>
           <form action="">

                <input type="text"
                 name='name' 
                 placeholder='Name' 
                 className={styles.stuInput}
                 onChange={handleInputChange}
                 value={studentsData.name}
                 />

                <label htmlFor="dob">Date of Birth</label>
                <input type="date" 
                name='dob' 
                className={styles.stuInput}
                onChange={handleInputChange}
                value={studentsData.dob}
                />

                <input type="text" 
                name='class' 
                placeholder='Class' 
                className={styles.stuInput}
                onChange={handleInputChange}
                value={studentsData.class}
                />

                <input type="number" 
                name='contact' 
                placeholder='Contact No.' 
                className={styles.stuInput}
                onChange={handleInputChange}
                value={studentsData.contact}
                />

                <label htmlFor="admissiondate">Date of Admission</label>
                <input type="date" 
                name='admissiondate' 
                className={styles.stuInput}
                onChange={handleInputChange}
                value={studentsData.admissiondate}
                />

                <textarea 
                name="address" 
                cols="10" rows="5" 
                placeholder='Address'
                onChange={handleInputChange}
                value={studentsData.address}
                >
                </textarea>
                <button className={styles.button} onClick={handleClick}>Submit</button>
                <p>{err?err:""}</p>
           </form>
        </div>
    </div>
    </>
  )
}

export default Student
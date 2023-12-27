import React, { useState } from 'react';
import img from "../../src/assets/studentsData.jpg";
import styles from "./student.module.scss";
import { dataActions, dataSelector } from '../../redux/reducers/dataReducer';
import { useDispatch, useSelector} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const Student = () => {
  const dispatch = useDispatch();
  const {students} = useSelector(dataSelector);
  console.log("students", students);
  const uniqueId = uuidv4();
  const [err, setErr] = useState("");
  const [studentsData, setStudentsData] = useState(
    {
      name:"",
      grade:"none",
      address:"",
      admissiondate:"",
      contact:"",
      dob:"",
      id:""
    }
  );

  const handleInputChange =(e)=>{
   e.preventDefault();
   setErr("");
   const name = e.target.name;
   const value = e.target.value;
   setStudentsData({
    ...studentsData,
    [name]:value,
    id: uniqueId
   })
  }

  console.log("studentsData",studentsData);

  const handleClick = async (e) =>{
    e.preventDefault();
    if(studentsData.grade === "none" || !studentsData.name || !studentsData.address || !studentsData.admissiondate || !studentsData.contact || !studentsData.dob){
      setErr("*Please fill all fields");
      return;
    }

    dispatch(dataActions.ADD({payload:studentsData,type:"students"}));

    try {
      const config = {
        headers:{
          "Content-type":"application/json"
        },
      };
     
      const {data} = await axios.post("http://localhost:3000/students",{
        studentsData
      }, config);
      console.log(data);
    } catch (error) {
      console.log(error)
    }
    setErr("");
    setStudentsData({
      name:"",
      address:"",
      admissiondate:"",
      contact:"",
      grade:"none",
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

<div className={styles.labelSelect}>
        <label htmlFor="classSelect">Choose a class:</label>
        <select id="classSelect" className={styles.select} value={studentsData.grade} name="grade" onChange={handleInputChange}>
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
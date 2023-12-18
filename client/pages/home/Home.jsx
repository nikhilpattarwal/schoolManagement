import React, { useState, memo, useEffect } from 'react'
import img from "../../src//assets/homeimage.jpg"
import style from "./home.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { dataActions, dataSelector } from '../../redux/reducers/dataReducer';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const Home = memo(({classData,setClassData, className}) => {
  

  const [inputValue, setInputValue] = useState({ name: '', classss: 'none', id:''});
  const dispatch = useDispatch();
  const {classes} = useSelector(dataSelector);
  const uniqueId = uuidv4();
  const handleOnchange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
  
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
      id:uniqueId
    }));
  };

  useEffect(()=>{
  if(classData?.name && classData?.classss){
    console.log("dispatchingitem");
    dispatch(dataActions.ADD_CLASSES(classData));
    setClassData("");
    console.log("classData", classData);
  }
  },[classData?.name, classData?.classss])

  
  
  const handleClick = () => {
    console.log("clicked button")
    if (inputValue.name.trim() !== "" && inputValue.classss !== "none") {
      setClassData(inputValue);
      setInputValue({ name: '', classss: 'none', id:'' });
    }
    
  };

  return (
    <>
      <div className={className?.class1 || style.homeMaincont}>
        <img src={img} alt="" />
        <div className={ className?.class2 || style.inputButton}>
          <input type="text" placeholder='Subject' value={inputValue.name} name="name"  onChange={handleOnchange}/> 

          <span><label htmlFor="classSelect"> Class:</label></span>
          <span><select id="classSelect" className={style.select}  name="classss" value={inputValue.classss} onChange={handleOnchange}>
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
          </select></span>
          <button onClick={handleClick}>Create Class</button>
        </div>
      </div>
    </>
  )
})

export default Home;
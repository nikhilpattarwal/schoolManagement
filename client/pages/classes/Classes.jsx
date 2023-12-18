import React, { useEffect, memo, useState } from 'react'
import Home from '../home/Home'
import style from "./classes.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { dataActions, dataSelector } from '../../redux/reducers/dataReducer'
import { MdDelete } from "react-icons/md";
import axios from 'axios'

const Classes = memo(({classData,setClassData}) => {

  const dispatch = useDispatch();
  const {classes} = useSelector(dataSelector);
  const [show, setShow] = useState(false);

  const [inputValue, setInputValue] = useState({classss: 'none' });
  console.log("Classes",classes);

  useEffect(()=>{
    if(classData?.name && classData?.classss){
      console.log("dispatchingitem");
      dispatch(dataActions.ADD_CLASSES(classData));
      setClassData("");
      console.log("classData", classData);
    }
    },[classData?.name, classData?.classss])

    const sendData = async()=>{
      try {
        const config = {
          headers:{
            "Content-type":"application/json"
          },
        };
        
        const {data} = await  axios.post("http://localhost:3000/classes",{
          classes
        }, config);
        console.log(data);
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(()=>{
      
      sendData()
      
    },[classes])

 

    const handleOnchange = (e) => {
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
    
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        [name]: value,
      }));
    };

  return (
    <>
    <div className={style.mainCont}>
      <div className={style.searchBar}>
        <Home setClassData={setClassData} className={{ class1: style.class1, class2: style.class2 }} />      
      </div> 
      <div className={style.mainData}>
        <div className={style.selectClass}>
          <h3>Created Classes</h3>
           <span><label htmlFor="classSelect"> Class:</label></span>
           <span><select id="classSelect" className={style.select} value={inputValue.classss} name="classss"  onChange={handleOnchange}>
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
        </div>
        <div className={style.mainContent}>
            {classes && classes[inputValue.classss] ? (
              classes[inputValue.classss].map((item, i) => (
                <div className={style.wrapper} key={i}>
                  <div className={style.name}><span>Class Name:</span> {item.name.charAt(0).toUpperCase() + item.name.slice(1)}</div>
                  <div className={style.classname}> <span>Class:</span>  {item.classss.charAt(0).toUpperCase() + item.classss.slice(1)}</div>
                  <MdDelete className={style.delIcon} />
                </div>
              ))
            ) : (
              <div>No classes available</div>
            )}
          </div>
      </div>
    </div>
    </>
  )
})

export default Classes
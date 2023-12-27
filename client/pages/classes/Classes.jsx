import React, { useEffect, memo, useState } from 'react'
import Home from '../home/Home'
import style from "./classes.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { dataActions, dataSelector } from '../../redux/reducers/dataReducer'
import { MdDelete } from "react-icons/md";
import axios from 'axios'


const Classes = memo(({classData,setClassData,user_id,loggedIn}) => {
  console.log("user_id",user_id);
  const {classes} = useSelector(dataSelector);

  const [inputValues, setInputValues] = useState({ classss: 'none' });
  const [lectures,setLectures] = useState();
  const dispatch = useDispatch();
  console.log("classes",classes);

  useEffect(()=>{
    const fetchData = async () => {
       await data();
    };
    fetchData();
  },[inputValues.classss])

  useEffect(() => {
    if (lectures && lectures.length) {
      lectures.forEach((cls)=>{
        let apiData ={
          classss: inputValues.classss,
          id: cls.id,
          name: cls.name,
          user_id: cls.user_id,
        }
        dispatch(dataActions.ADD_CLASSES(apiData));
        apiData={};
      })
    }
    setLectures("");
  }, [lectures, inputValues.classss]);

  const data = async () => {
    try {
      const {data} = await axios.get(`http://localhost:3000/classes?userId=${user_id}`);
      console.log(data[0]?.classesData);
      const fetchStudents = data[0]?.classesData;
      setLectures(fetchStudents?.[inputValues.classss])
    } catch (error) {
      console.log(error)
    }
  }

    console.log(lectures);
    const handleOnchange = (e) => {
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
      
      setInputValues((prevInputValue) => ({
        ...prevInputValue,
        [name]: value
      }));
    };
     console.log(inputValues);
    let handleClick = () => {};
     
    const handleDelete = async(item)=>{
      console.log(item);
      dispatch(dataActions.DELETE(item));
      try {
        const {data} = await axios.delete(`http://localhost:3000/delete?userId=${user_id}&classss=${item.classss}&id=${item.id}`);
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
    <div className={style.mainCont}>
      <div className={style.searchBar}>
        <Home classData={classData} user_id={user_id} loggedIn={loggedIn} handleClick={handleClick} setClassData={setClassData} className={{ class1: style.class1, class2: style.class2 }} />      
      </div> 
      <div className={style.mainData}>
        <div className={style.selectClass}>
          <h3>Created Classes</h3>
           <span><label htmlFor="classSelect"> Class:</label></span>
           <span><select id="classSelect" className={style.select} value={inputValues.classss} name="classss"  onChange={handleOnchange}>
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
            {classes && classes[inputValues.classss] ? (
              classes[inputValues.classss].map((item, i) => (
                <div className={style.wrapper} key={i}>
                  <div className={style.name}><span>Class Name:</span> {item.name?.charAt(0).toUpperCase() + item.name?.slice(1)}</div>
                  <div className={style.classname}> <span>Class:</span>  {item.classss?.charAt(0).toUpperCase() + item.classss?.slice(1)}</div>
                  <MdDelete onClick={()=>handleDelete(item)} className={style.delIcon} />
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
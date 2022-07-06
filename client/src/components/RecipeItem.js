import React, { useContext, useState } from 'react'
import RecipeContext from '../context/RecipeContext';
import {Link, useNavigate} from 'react-router-dom'
export default function RecipeItem(props) {
  const context = useContext(RecipeContext);
  const {setRecipe,DeleteRecipe,setBtn,setAddrecipe} = context;
  const [like, setLike] = useState("regular")
  const [save, setSave] = useState("regular")
  const navigate=useNavigate();
  const onClickHandeler=()=>{
    setRecipe({
      title:props.Recipe.title,
      ingredients:props.Recipe.ingredients,
      procedure:props.Recipe.procedure,
      imageUrl:props.Recipe.imageUrl,
    })
    navigate("/detailedRecipe",{replace:false});
  }
  const onClickdelHandeler=()=>{
        DeleteRecipe(props.Recipe._id);
        props.giveAlert("success","Recipe Deleted Successfully");
  }
  const onClickeditHandeler=()=>{
      setAddrecipe({title:props.Recipe.title,ingredients:props.Recipe.ingredients,procedure:props.Recipe.procedure,imageUrl:props.Recipe.imageUrl})
      setBtn(["Update",props.Recipe._id]);
  }

  return (
    <div className='col-md-4 my-2'>
        <div className="card">
            <div className="card-body mb-0" onClick={onClickHandeler}>
                <img style={{height: "18rem"}} src={props.Recipe.imageUrl} className="card-img-top mb-2" alt="..."/>
                <h5 className="card-title">{props.Recipe.title}</h5>
                <p className='text-muted m-0'>{(new Date(props.Recipe.date)).toDateString()} By {props.Recipe.username}</p>
            </div>
            <hr className='mt-0 mb-0'/>
              {props.readersID===props.Recipe.userId ? <div className='d-flex align-items-center justify-content-around p-2'><i className={`fa-${like} fa-thumbs-up fa-2xl`} onClick={()=>{setLike(like==="solid"?"regular":"solid")}}></i><i className={`fa-${save} fa-bookmark fa-xl`} onClick={()=>{setSave(save==="solid"?"regular":"solid")}}></i><i className="fa-solid fa-trash-can mx-2 fa-lg" onClick={onClickdelHandeler}></i>
                <Link to='/addrecipe'><i className="fa-solid fa-file-pen mx-2 fa-lg" onClick={onClickeditHandeler}></i></Link></div>:<div className='d-flex align-items-center justify-content-around p-3'><i className={`fa-${like} fa-thumbs-up fa-2xl`} onClick={()=>{setLike(like==="solid"?"regular":"solid")}}></i><i className={`fa-${save} fa-bookmark fa-xl`} onClick={()=>{setSave(save==="solid"?"regular":"solid")}}></i></div>}
        </div>
    </div>
  )
}

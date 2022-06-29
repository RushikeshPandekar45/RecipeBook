import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
export default function DetailedRecipe() {
    const context = useContext(RecipeContext);
    const { recipe } = context;
    const navigate=useNavigate();
    useEffect(() => {
      if(recipe.title==="" && recipe.ingredients.length===0 && recipe.procedure===""){
         navigate('/',{replace:true});
      }
      // eslint-disable-next-line
    }, [])
    
  return (
    <div className='container d-flex justify-content-center mt-3'>
    {(recipe.title==="" && recipe.ingredients.length===0 && recipe.procedure==="") ? <h2>Redirecting To Home</h2> : 
        <div className="card text-center" style={{width:"100%"}}>
            <img style={{height: "45vw",width:"65%"}} src={recipe.imageUrl} className="mx-auto d-block" alt="..."/>
            <div className="card-body">
                <h3 className="card-title">{recipe.title}</h3>
                <p><strong>Ingredients : </strong>{recipe.ingredients.map((ele,ind)=>{
                   return ind===recipe.ingredients.length-1 ? <span key={ind}> {ele}</span>:<span key={ind}> {ele} ,</span>
                })}</p>
                <h4>Procedure</h4>
                <p className="card-text">{recipe.procedure}</p>
            </div>
        </div>}
    </div>
  )
}

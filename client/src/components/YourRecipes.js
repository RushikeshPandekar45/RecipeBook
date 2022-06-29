import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import RecipeItem from './RecipeItem';

export default function YourRecipes() {
    const context = useContext(RecipeContext);
    const {yourrecipes,getYourRecipes,userName,userID,getUserDetails,searchVal}=context;
    useEffect(() => {
       getYourRecipes();
       getUserDetails();
       // eslint-disable-next-line
    }, [])
    
  return (
    <div className="container d-flex flex-column justify-content-center mt-2">
        <Link to="/account" className="btn btn-secondary" data-bs-container="body">
        <i className="fa-solid fa-circle-user fa-2xl"></i> <strong> {userName} </strong>
              </Link>
              <hr />
        <div className='row'>
            {
                yourrecipes.map((ele,ind)=>{
                    return ele.title.toLowerCase().includes(searchVal.toLowerCase()) && <RecipeItem Recipe={ele} readersID={userID} key={ind}/>
                })
            }
        </div>
    </div>
  )
}

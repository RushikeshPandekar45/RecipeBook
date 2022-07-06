import React, { useContext, useEffect } from 'react'
import RecipeContext from '../context/RecipeContext';
import Recipes from './Recipes'

export default function Home(props) {
  const context = useContext(RecipeContext);
  const {getAllRecipes}=context;
  useEffect(() => {
    // eslint-disable-next-line
    getAllRecipes();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div className='container my-2'>
        <h1>Recipes</h1>
        <hr />
        <Recipes giveAlert={props.giveAlert}/>
    </div>
  )
}

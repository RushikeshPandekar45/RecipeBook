import React,{useContext, useEffect} from 'react'
import RecipeContext from '../context/RecipeContext'
import RecipeItem from './RecipeItem';
export default function Recipes() {
    const context = useContext(RecipeContext);
    const {recipes,userID,getUserDetails,searchVal}=context;
    useEffect(() => {
      getUserDetails();
      // eslint-disable-next-line
    }, [])
    
  return (
    <div className='container'>
        <div className='row md-4'>
        {
            recipes.map((ele,ind)=>{
                return ele.title.toLowerCase().includes(searchVal.toLowerCase()) && <RecipeItem Recipe={ele} readersID={userID} key={ind}></RecipeItem>
            })
        }
        </div>
    </div>
  )
}

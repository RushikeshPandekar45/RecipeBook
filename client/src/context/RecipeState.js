import React, { useState } from 'react'
import RecipeContext from "./RecipeContext";

export default function RecipeState(props) {
    const [recipes, setRecipes] = useState([])
    const [yourrecipes, setYourrecipes] = useState([])
    const [userID, setUserID] = useState("");
    const [userName, setUserName] = useState("");
    const [recipe, setRecipe] = useState({title:"",ingredients:[],procedure:"",imageUrl:""})
    const [addrecipe, setAddrecipe] = useState({title:"",ingredients:[],procedure:"",imageUrl:""})
    const [btn, setBtn] = useState(["Add",""]);
    const [searchVal, setSearchVal] = useState("");
    
    //get All Recipes
    const getAllRecipes=async()=>{
        const response = await fetch("http://localhost:5000/api/recipes/getallrecipes", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        });
        const data=await response.json();
        setRecipes(data);
    }
    //Get Your Recipes
    const getYourRecipes=async()=>{
      if(localStorage.getItem('token')===null){
        setYourrecipes([]);
      }
      else{
        const response = await fetch("http://localhost:5000/api/recipes/getyourrecipes", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "token":localStorage.getItem('token')
          }
        });
        const data=await response.json();
        setYourrecipes(data);
      }
    }

    // Get User Details
    const getUserDetails=async()=>{
      if(localStorage.getItem('token')===null){
        setUserID("");
        setUserName("");
      }
      else{
        const response = await fetch("http://localhost:5000/api/auth/getuserdetails", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "token":localStorage.getItem('token')
          }
        });
        const data=await response.json();
        setUserID(data._id);
        setUserName(data.name);
      }
    }

    // // Get User Details
    // const getUserDetailsById=async(id)=>{ 
    //   console.log(id);
    //   const response = await fetch(`http://localhost:5000/api/auth/getuserdetails/${id}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    //   });
    //   const data=await response.json();
    //   console.log(data);
    //   setUser({name:data.name,id:data._id});
    // }

    // Add Recipe function
    const addNewRecipe=async(title,ingredients,procedure,imageUrl)=>{
      const response = await fetch("http://localhost:5000/api/recipes/addrecipe", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "token":localStorage.getItem('token')
        },
        body:JSON.stringify({title,ingredients,procedure,imageUrl})
      });
      const data=await response.json();
      setRecipes(recipes.concat(data));
    }


    // Delete Recipe
    const DeleteRecipe=async(id)=>{
      const response = await fetch(`http://localhost:5000/api/recipes/deleterecipe/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "token":localStorage.getItem('token')
        }
      });
      const data=await response.json();
      const temp1=recipes.filter(recipe1=>(recipe1._id!==id));
      setRecipes(temp1);
      const temp2=yourrecipes.filter(recipe2=>(recipe2._id!==id));
      setYourrecipes(temp2);
    }
    const UpdateRecipe=async(id,title,ingredients,procedure,imageUrl)=>{
      const response = await fetch(`http://localhost:5000/api/recipes/updaterecipe/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "token":localStorage.getItem('token')
        },
        body:JSON.stringify({title,ingredients,procedure,imageUrl}),
      });
      const data=await response.json();
      console.log(data);
    }
  return (
     <RecipeContext.Provider value={{recipes,getAllRecipes,recipe,setRecipe,addrecipe,setAddrecipe,addNewRecipe,yourrecipes,getYourRecipes,userID,getUserDetails,setUserID,userName,setUserName,DeleteRecipe,UpdateRecipe,btn,setBtn,searchVal,setSearchVal}}>
        {props.children}
     </RecipeContext.Provider>
  )
}

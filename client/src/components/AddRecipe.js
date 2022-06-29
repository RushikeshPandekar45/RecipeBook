import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function AddRecipe() {
  const context = useContext(RecipeContext);
  const {addrecipe,setAddrecipe,addNewRecipe,btn,setBtn,UpdateRecipe}=context;
  const naviagate=useNavigate();
  const onChangeHandeler=(e)=>{
     setAddrecipe({...addrecipe,[e.target.name]:e.target.value})
  }
  const addTag = async() => {
    const tag = document.getElementById("tags").value;
    if(tag===""){
        return;
    }
    setAddrecipe({...addrecipe,"ingredients":addrecipe.ingredients.concat(tag)});
    document.getElementById("tags").value = "";
  }
  const delTag=(e)=>{
      const val=document.getElementById(e.target.title).innerText;
      let temp=addrecipe.ingredients.filter(tag => tag!==val.toString())
      setAddrecipe({...addrecipe,"ingredients":temp})
  }
  const onClickAddHandeler=async()=>{
    if(btn[0]==="Add"){
      addNewRecipe(addrecipe.title,addrecipe.ingredients,addrecipe.procedure,addrecipe.imageUrl);
      setAddrecipe({title:"",ingredients:[],procedure:"",imageUrl:""});
      naviagate('/yourrecipes',{replace:false})
    }
    else{
      UpdateRecipe(btn[1],addrecipe.title,addrecipe.ingredients,addrecipe.procedure,addrecipe.imageUrl);
      setAddrecipe({title:"",ingredients:[],procedure:"",imageUrl:""});
      setBtn(["Add",""]);
      naviagate('/yourrecipes',{replace:false})
    }
  }
  const onClickCancel=()=>{
      setAddrecipe({title:"",ingredients:[],procedure:"",imageUrl:""});
      setBtn(["Add",""])
  }
  return (
    <div>
    {localStorage.getItem('token') ? <div>
        <div className="container mt-3">
          <h1>Recipe Book</h1>
          <div className="card">
            <h5 className="card-header">{btn[0]} a Recipe</h5>
            <form className="card-body"  onSubmit={onClickAddHandeler}>
              <div className="form-floating">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="title" placeholder="Title" name="title" value={addrecipe.title} onChange={onChangeHandeler}  minLength={"4"} required/>
                  <label htmlFor="floatingInput">Title</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="tags" style={{ width: "80%", display: "inline" }} placeholder='Tags' minLength={0} required={false}/>
                  <i className="fa-solid fa-plus fa-2xl" style={{ position: "relative", right: "40px" }}   onClick={addTag}></i>
                  <label htmlFor="floatingInput">Ingredients</label>
                </div>
                <div>
                  {
                    (addrecipe.ingredients).map((ele, ind) => {
                      return <span className="badge bg-secondary mx-1" key={ind} id={`tag-${ind}`} value={ele}>{ele}<i className="fa-solid fa-xmark mx-1" title={`tag-${ind}`} onClick={delTag}></i></span>
                    })
                  }
                </div>
                <div className="form-floating mb-3">
                  <textarea className="form-control my-2" placeholder="Procedure" id="floatingTextarea2"
                    style={{ height: "100px" }} name="procedure" value={addrecipe.procedure} onChange={onChangeHandeler}  minLength={"50"} required></textarea>
                  <label htmlFor="floatingInput">Procedure</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="imageUrl" placeholder="ImageUrl" name="imageUrl" value={addrecipe.imageUrl} onChange={onChangeHandeler} required/>
                  <label htmlFor="floatingInput" >Image Url</label>
                </div>
                
              </div>
              <button type="submit" className="btn btn-primary my-2" id="addNote" disabled={addrecipe.procedure.length<50 || addrecipe.ingredients.length<3}>{btn[0]}</button>
              <button type="button" className="btn btn-success mx-2" onClick={onClickCancel}>Cancel</button>
              {(addrecipe.procedure.length<50 || addrecipe.ingredients.length<3) && <button type="button" className="btn btn-warning mx-2">3 <strong>Ingredients</strong> and 50 Characters long <strong>Procedure </strong>are necessary</button>}
            </form>
          </div>
        </div>
      </div>:<div className='container' style={{backgroundImage:""}}>
        <div class="card my-5" >
        <div class="card-body">
            <h5 class="card-title">RecipeBook</h5>
            <h6 class="card-subtitle mb-2 text-muted">Login Or Signup To Start Using RecipeBook</h6>
            <p class="card-text">Login Or Signup To Start Using RecipeBook App And Start Adding Your personal Recipes to taste Your Recipes to World</p>
            <Link className="btn btn-outline-success mx-1" to="/login" type="submit">Login</Link>
            <Link className="btn btn-outline-success mx-1" to="/signup" type="submit">SignUp</Link>
        </div>
        </div>
    </div>}
      </div>
    )
}

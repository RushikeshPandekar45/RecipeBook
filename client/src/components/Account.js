import React, { useContext } from 'react'
import RecipeContext from '../context/RecipeContext'
import { Link } from 'react-router-dom'
export default function About() {
  const context = useContext(RecipeContext);
  const { userName } = context;

  return (
    <div className='container my-5'>
      {localStorage.getItem('token') ? <div class="card">
        <div class="card-body">
          <i className="fa-solid fa-circle-user fa-2xl m-4"></i><h5 class="card-title d-inline-flex align-items-center">{userName}</h5>
          <p class="card-text text-muted">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Change Password</li>
          <li class="list-group-item">Privacy Policy</li>
          <li class="list-group-item">Liked Recipes</li>
          <li class="list-group-item">Saved Recipes</li>
        </ul>
      </div>:<div className='container' style={{ backgroundImage: "" }}>
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

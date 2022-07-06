import React, { useContext } from 'react'
import RecipeContext from '../context/RecipeContext'
import { Link } from 'react-router-dom'
export default function About() {
  const context = useContext(RecipeContext);
  const { userName } = context;

  return (
    <div className='container my-5'>
      {localStorage.getItem('token') ? <div className="card">
        <div className="card-body">
          <i className="fa-solid fa-circle-user fa-2xl m-4"></i><h5 className="card-title d-inline-flex align-items-center">{userName}</h5>
          <p className="card-text text-muted">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Change Password</li>
          <li className="list-group-item">Privacy Policy</li>
          <li className="list-group-item">Liked Recipes</li>
          <li className="list-group-item">Saved Recipes</li>
        </ul>
      </div>:<div className='container' style={{ backgroundImage: "" }}>
        <div className="card my-5" >
          <div className="card-body">
            <h5 className="card-title">RecipeBook</h5>
            <h6 className="card-subtitle mb-2 text-muted">Login Or Signup To Start Using RecipeBook</h6>
            <p className="card-text">Login Or Signup To Start Using RecipeBook App And Start Adding Your personal Recipes to taste Your Recipes to World</p>
            <Link className="btn btn-outline-success mx-1" to="/login" type="submit">Login</Link>
            <Link className="btn btn-outline-success mx-1" to="/signup" type="submit">SignUp</Link>
          </div>
        </div>
      </div>}
    </div>
  )
}

import RecipeCard from './RecipeCard'
import {useHistory} from 'react-router-dom'

function Home({randomRecipes, newRecipes}){
    const history = useHistory()

    function handleClick(id) {
        history.push(`/recipes/${id}`);
      }

    return(
        <div>
        <h1 className="title">yes, chef.</h1>
        <p> <h1>Check Out Our Recipes! </h1>
        {randomRecipes.map((recipe) => (
          <RecipeCard key = {recipe.id} 
          id= {recipe.id}
          name = {recipe.name} 
          image = {recipe.image}
          description = {recipe.description}
          cuisine = {recipe.cuisine}
          favorited = {recipe.favorited}
          onSwitch = {() => handleClick(recipe.id)} />
        ))}       
        </p>
        <p><h1>Just Added!</h1>
        {newRecipes.map((recipe) => (
        <RecipeCard key = {recipe.id} 
          id= {recipe.id}
          name = {recipe.name} 
          image = {recipe.image}
          description = {recipe.description}
          cuisine = {recipe.cuisine}
          favorited = {recipe.favorited}
          onSwitch = {() => handleClick(recipe.id)}/> 
        ))}
        </p>
        </div>
    )
}


// const getRandomPlaneteer = () => 
//   arrayOfPlaneteers[Math.floor(Math.random() * arrayOfPlaneteers.length)]

export default Home
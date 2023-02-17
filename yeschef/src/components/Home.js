import RecipeCard from './RecipeCard'
import {useHistory} from 'react-router-dom'
import logo from '../yeschefbig.png'

function Home({randomRecipes, newRecipes, handleFavoriteToggle}){
    const history = useHistory()

    function handleClick(id) {
        history.push(`/recipes/${id}`);
      }

    return(
        <div className="home">
            <img className="title__image" src={logo}
            alt= "yeschef"/>
            <h1 className="title">The recipe book for kitchen commanders</h1>
            <h2 className="home-heading">Need some inspiration? Try one of these!</h2>
            <div className="random-recipes">
                {randomRecipes.map((recipe) => (
                    <RecipeCard 
                        key = {recipe.id} 
                        id= {recipe.id}
                        name = {recipe.name} 
                        image = {recipe.image}
                        description = {recipe.description}
                        cuisine = {recipe.cuisine}
                        favorited = {recipe.favorited}
                        onSwitch = {() => handleClick(recipe.id)}
                        handleFavoriteToggle = {handleFavoriteToggle}
                    />
                ))}       
            </div>
            <h2 className="home-heading">Or try out one of your newest recipes!</h2>
            <div className="new-recipes">
                {newRecipes.map((recipe) => (
                    <RecipeCard 
                        key = {recipe.id} 
                        id= {recipe.id}
                        name = {recipe.name} 
                        image = {recipe.image}
                        description = {recipe.description}
                        cuisine = {recipe.cuisine}
                        favorited = {recipe.favorited}
                        onSwitch = {() => handleClick(recipe.id)}
                        handleFavoriteToggle = {handleFavoriteToggle}
                    /> 
                ))}
            </div>
        </div>
    )
}

export default Home
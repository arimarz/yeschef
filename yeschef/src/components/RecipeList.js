import RecipeCard from "./RecipeCard"
import {useHistory} from "react-router-dom"

function RecipeList({recipes}){
const history = useHistory()

    function handleClick(id) {
        history.push(`/recipes/${id}`);
      }

    const recipeCard = recipes.map((recipe)=> {
        return <RecipeCard 
        key = {recipe.id} 
        name = {recipe.name} 
        image = {recipe.image}
        ingredients = {recipe.ingredients}
        instructions = {recipe.instructions}
        cuisine = {recipe.cuisine}
        onClick = {() => handleClick(recipe.id)} />
    })
    return(
        <div>
        {recipeCard}
        </div>
)};

export default RecipeList
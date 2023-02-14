import RecipeCard from "./RecipeCard"

function RecipeList({recipes}){

    const recipeCard = recipes.map((recipe)=> {
        return <RecipeCard 
        key = {recipe.id} 
        name = {recipe.name} 
        image = {recipe.image}
        ingredients = {recipe.ingredients}
        instructions = {recipe.instructions}
        cuisine = {recipe.cuisine}/>
    })
    return(
        <div>
        {recipeCard}
        </div>
)};

export default RecipeList
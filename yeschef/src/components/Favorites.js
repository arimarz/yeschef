import RecipeCard from "./RecipeCard"

function Favorites({ recipes }) {
    const favoriteRecipes = recipes.filter((recipe) => recipe.favorited);
  
    return (
      <div>
        {favoriteRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            name={recipe.name}
            image={recipe.image}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            cuisine={recipe.cuisine}
            favorited={recipe.favorited}
          />
        ))}
      </div>
    );
  }

  export default Favorites
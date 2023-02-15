import FavoriteCard from "./RecipeCard";

function Favorites({ favorites, setFavorites, recipes}) {
    function addRecipeToFavorites(recipe) {
        setFavorites([...favorites, recipe]);
        fetch(`http://localhost:3001/recipes/${recipe.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ favorited: true }),
        });
      }
      
      function removeRecipeFromFavorites(recipe) {
        const updatedFavorites = favorites.filter(
          (favorite) => favorite.id !== recipe.id
        );
        setFavorites(updatedFavorites);
        fetch(`http://localhost:3001/recipes/${recipe.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ favorited: false }),
        });
      }



      const favoriteRecipes = recipes.filter(recipe => recipe.favorited).map((recipe) => {
        return (
          <FavoriteCard
            key={recipe.id}
            name={recipe.name}
            image={recipe.image}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            cuisine={recipe.cuisine}
            favorited={recipe.favorited}
            onAddRecipeToFavorites={() => addRecipeToFavorites(recipe)}
            onRemoveRecipeFromFavorites={() => removeRecipeFromFavorites(recipe)}
          />
        );
      });

  return (
    <div>
      <h1>Favorite Recipes</h1>
      {favorites.length > 0 ? (
        <div>
          {favoriteRecipes}
        </div>
      ) : (
        <p>You have no favorite recipes.</p>
      )}
    </div>
  );
}

export default Favorites;
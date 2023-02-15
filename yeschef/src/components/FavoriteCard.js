import { useHistory } from "react-router-dom";

function FavoriteCard({
  id,
  name,
  image,
  cuisine,
  favorite,
  onAddRecipeToFavorites,
  onRemoveRecipeFromFavorites,
  onClick,
}) {
  const history = useHistory();

  function handleClick() {
    onClick(id);
    history.push(`/recipes/${id}`);
  }

  // function handleFavorited() {
  //   setFavorite((isFavorite) => !isFavorite)
  // }

  return (
    <div className="recipe-card">
      <div className="recipe-card-content" onClick={handleClick}>
        <h2>{name}</h2>
        <img className="image" src={image} alt={name} />
        <p>
          <strong>Cuisine:</strong> {cuisine}
        </p>
      </div>
      <button
        onClick= {favorite ? onRemoveRecipeFromFavorites : onAddRecipeToFavorites}
        className="favorite-button"
      >
        {favorite ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
}

export default FavoriteCard;
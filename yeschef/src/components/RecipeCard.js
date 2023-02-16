import {useState} from 'react'

function RecipeCard({ name, image, cuisine, onSwitch, favorited, id, description, handleFavoriteToggle}) {
  
  const [isFavorite, setFavorite] = useState(favorited)

    function handleFavorite() {
      fetch(`http://localhost:3001/recipes/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({favorited: !isFavorite})
      })
        .then(response => response.json())
        .then(data => {
          setFavorite(data.favorited);
          handleFavoriteToggle(data, data.favorited)
        })
        .catch(error => console.error(error))
    }


  return (
    <div>
      <div className="recipe-card-content">
        <div onClick={onSwitch}>
          <h2>{name}</h2>
          <img className="image" src={image} alt={name} />
          <p><strong>{description}</strong> 
          </p>
          <p>
            <strong>Cuisine:</strong> {cuisine}
          </p>
          <p>{isFavorite? "One of your favorites!" : null}</p>
        </div>
        <button className="fav-button" onClick={handleFavorite}>
          {isFavorite ? "💔 Remove from Favorites 💔" : "❤️ Add to Favorites ❤️"}</button>
      </div>
    </div>
  );
}

export default RecipeCard;
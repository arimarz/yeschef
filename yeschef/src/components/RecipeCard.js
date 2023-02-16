import {useState} from 'react'

function RecipeCard({ name, image, cuisine, onSwitch, favorited, id, description}) {
  
  const [isFavorite, setFavorite] = useState(favorited)

    function handleFavorite() {
      fetch(`http://localhost:3001/recipes/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({favorited: !isFavorite})
      })
        .then(response => response.json())
        .then(data => setFavorite(data.favorited))
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
        </div>
        <button onClick={handleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favotires"}</button>
      </div>
    </div>
  );
}

export default RecipeCard;
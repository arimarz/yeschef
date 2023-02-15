import {useState} from 'react'

function RecipeCard({ name, image, cuisine, onSwitch, favorited, id, description}) {
  const [isFavorite, setFavorite] = useState(favorited)

    function handleFavorite() {
    setFavorite((isFavorite)=> !isFavorite)

    fetch(`http://localhost:3001/recipes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        favorited: isFavorite
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
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
          {isFavorite ? "UNFAVORITE" : "FAVORITE"}</button>
      </div>
    </div>
  );
}

export default RecipeCard;
import{useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {useParams} from "react-router-dom";

function SingleRecipe(){
  const[recipe, setRecipe]= useState(null)
  const [isLoaded, setIsLoaded] = useState(false);

  const{ id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${id}`)
    .then((r)=> r.json())
    .then((recipe)=> {
      setRecipe(recipe);
      setIsLoaded(!isLoaded);
    });
  }, [id])

  if (!isLoaded) return <h1>Loading...</h1>;

  const {name, image, ingredients, instructions, cuisine, vegan, vegetarian} = recipe

  return(
      <div className="single-recipe">
        <div className="single-nontext">
          <h2>{name}</h2>
          <img className="image" src={image} alt={name} />
          <Link to={`/recipes/${id}/edit`}><p className="linkToEdit">Edit This Recipe</p></Link>
          <p>
            <strong>Cuisine:</strong> {cuisine}
          </p>
        </div>
        <div className="ingredients">
          <h3>Ingredients:</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="instructions">
          <h3>Instructions:</h3>
          <ul>
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>
        <div className="single-nontext">
          <span>{vegetarian ? <img className= "veg-image" src= "https://img.myloview.com/posters/vegetarian-food-diet-icon-organic-bio-eco-symbol-no-meat-vegetarian-healthy-and-nonviolent-food-round-green-vector-illustration-with-ribbon-and-leaves-for-stickers-labels-and-logos-700-179938004.jpg"/> : null}
          </span>
          <span>{vegan ? <img  className= "veg-image" src= "https://t4.ftcdn.net/jpg/02/99/88/93/360_F_299889394_1prIwRtf6ndCfZegWOEeJRPKc56dTHFK.jpg"/> : null }
          </span>
        </div>
    </div>
  )
}

export default SingleRecipe
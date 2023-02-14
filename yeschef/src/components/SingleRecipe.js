function SingleRecipe({recipes}){

    return(
        recipes.map((recipe)=> {
        return <div>
        <div className="ingredients">
        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="instructions">
        <h3>Instructions:</h3>
        <ul>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
      {recipe.vegetarian ? <img className= "veg-image" src= "https://img.myloview.com/posters/vegetarian-food-diet-icon-organic-bio-eco-symbol-no-meat-vegetarian-healthy-and-nonviolent-food-round-green-vector-illustration-with-ribbon-and-leaves-for-stickers-labels-and-logos-700-179938004.jpg"/> : null}
      {recipe.vegan ? <img  className= "veg-image" src= "https://t4.ftcdn.net/jpg/02/99/88/93/360_F_299889394_1prIwRtf6ndCfZegWOEeJRPKc56dTHFK.jpg"/> : null }
      </div>}
    ))
}

export default SingleRecipe
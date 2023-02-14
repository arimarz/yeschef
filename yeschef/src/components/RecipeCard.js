// import { Card } from "semantic-ui-react";

function RecipeCard({ name, image, ingredients, instructions, cuisine }) {
  return (
      <div className="recipe-card-content">
        <h2>{name}</h2>
        <img className="image" src={image} alt={name} />
        <p>
          <strong>Cuisine:</strong> {cuisine}
        </p>
      </div>
  );
}

export default RecipeCard;
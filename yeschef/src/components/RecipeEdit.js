import {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom"

function RecipeEdit({onUpdatedRecipe}){

    const initialState = {
        name: "",
        description: "",
        ingredients: "",
        instructions: "",
        cuisine: "",
        image: "",
        vegan: false,
        vegetarian: false,
      };

    const [formData, setFormData] = useState(initialState);

    const {name, description, ingredients, instructions, cuisine, image, vegan, vegetarian} = formData;

    const history = useHistory()

    const{id} = useParams();

    useEffect(()=> {
    fetch(`http://localhost:3001/recipes/${id}`)
    .then((r)=> r.json())
    .then((recipe) => setFormData(recipe))
    }, [id]);

    function handleVeganCheckbox() {
        setFormData((prevFormData) => ({
          ...prevFormData,
          vegan: !prevFormData.vegan,
          vegetarian: true
        }));
      }

    function handleVegetarianCheckbox(){
        setFormData(() => ({ ...formData, "vegetarian": !vegetarian }));
    }

    function handleChange (e) {
        if(e.target.type === "text" || "textbox"){
            const { name, value } = e.target;
            setFormData(() => ({ ...formData, [name]: value }));
        } else if (e.target.type === "checkbox"){
            const { name, checked } = e.target;
            setFormData(() => ({ ...formData, [name]: !checked }));
        }
    };

    // console.log(formData);

    function handleSubmit(e){
        e.preventDefault();
        const configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData),
        };
    
        fetch(`http://localhost:3001/recipes/${id}`, configObj)
          .then((resp) => resp.json())
          .then((updatedRecipe) => {
            onUpdatedRecipe(updatedRecipe);
            history.push(`/recipes/${id}`)
          });
      };

    return(
        <form onSubmit={handleSubmit}>
            <ul>
                <li>
                    <label htmlFor="name">Recipe Name: </label>
                    <input type="text" id="name" name="name" onChange={handleChange} value={name}/>
                </li>
                <li>
                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" name="description" onChange={handleChange} value={description}/>
                </li>
                <li>
                    <label htmlFor="ingredients">Ingredients: </label>
                    <input type="textbox" id="ingredients" name="ingredients" onChange={handleChange} value={ingredients}/>
                </li>
                <li>
                    <label htmlFor="instructions">Instructions: </label>
                    <input type="textbox" id="instructions" name="instructions" onChange={handleChange} value={instructions}/>
                </li>
                <li>
                    <label htmlFor="cuisine">Type of Cuisine: </label>
                    <input type="text" id="cuisine" name="cuisine" onChange={handleChange} value={cuisine}/>
                </li>
                <li>
                    <label htmlFor="image">Recipe Image Link: </label>
                    <input type="text" id="image" name="image" onChange={handleChange} value={image}/>
                </li>

                <label htmlFor="vegan">Vegan</label>
                <input type="checkbox" id="vegan" name="vegan" onChange={handleVeganCheckbox} checked={vegan}/>

                <label htmlFor="vegetarian">Vegetarian</label>
                <input type="checkbox" id="vegetarian" name="vegetarian" onChange={handleVegetarianCheckbox} checked={vegetarian}/>

                <button type="submit">Submit</button>
           </ul>
        </form>
    )
}

export default RecipeEdit
import {useState} from "react"

function NewRecipeForm(){

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

    function handleVeganCheckbox(){
        setFormData(() => ({ ...formData, "vegan": !vegan }));
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
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData),
        };
    
        fetch("http://localhost:3001/recipes", configObj)
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            // onAddRecipe(data);
            // history.push("/recipes")
          });
      };

    return(
        <form onSubmit={handleSubmit}>
            <ul>
                <li>
                    <label for="name">Recipe Name: </label>
                    <input type="text" id="name" name="name" onChange={handleChange} value={name}/>
                </li>
                <li>
                    <label for="description">Description: </label>
                    <input type="text" id="description" name="description" onChange={handleChange} value={description}/>
                </li>
                <li>
                    <label for="ingredients">Ingredients: </label>
                    <input type="textbox" id="ingredients" name="ingredients" onChange={handleChange} value={ingredients}/>
                </li>
                <li>
                    <label for="instructions">Instructions: </label>
                    <input type="textbox" id="instructions" name="instructions" onChange={handleChange} value={instructions}/>
                </li>
                <li>
                    <label for="cuisine">Type of Cuisine: </label>
                    <input type="text" id="cuisine" name="cuisine" onChange={handleChange} value={cuisine}/>
                </li>
                <li>
                    <label for="image">Recipe Image Link: </label>
                    <input type="text" id="image" name="image" onChange={handleChange} value={image}/>
                </li>

                <label for="vegan">Vegan</label>
                <input type="checkbox" id="vegan" name="vegan" onChange={handleVeganCheckbox} checked={vegan}/>

                <label for="vegetarian">Vegetarian</label>
                <input type="checkbox" id="vegetarian" name="vegetarian" onChange={handleVegetarianCheckbox} checked={vegetarian}/>

                <button type="submit">Submit</button>
           </ul>
        </form>
    )
}

export default NewRecipeForm
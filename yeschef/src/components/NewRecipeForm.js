import {useState} from "react"

function NewRecipeForm(){

    const initialState = {
        name: "",
        ingredients: "",
        instructions: "",
        cuisine: "",
        image: "",
      };

    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({ ...formData, [name]: value }));
      };

    console.log(formData);

    const handleSubmit = (e) => {
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
           <input type="text" id="name" name="name" onChange={handleChange}/>
           <input type="text" id="ingredients" name="ingredients" onChange={handleChange}/>
           <input type="text" id="instructions" name="instructions" onChange={handleChange}/>
           <input type="text" id="cuisine" name="cuisine" onChange={handleChange}/>
           <input type="text" id="image" name="image" onChange={handleChange}/>
           <button type="submit">Submit</button>
        </form>
    )
}

export default NewRecipeForm
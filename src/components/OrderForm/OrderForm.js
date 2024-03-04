import { useState } from "react";

function OrderForm({addOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    if (name && ingredients.length) {
      fetch('http://localhost:3001/api/v1/orders', {
        method: 'POST',
        body: JSON.stringify({
          id: Date.now(),
          name: name,
          ingredients: ingredients
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.json())
      .then(postResult => {
          addOrder(postResult)
        })
        .catch(err => console.error(err))
    } else {
      setError("Please fill out form!")
    }
    clearInputs()
  }

  function addIngredients(e) {
    e.preventDefault();
    setIngredients([...ingredients, e.target.name])
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={(e) => addIngredients(e)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
      {error && <p>{error}</p> }
    </form>
  );
}

export default OrderForm;

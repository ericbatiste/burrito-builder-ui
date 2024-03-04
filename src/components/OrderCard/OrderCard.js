import './OrderCard.css';

export default function OrderCard ({name, ingredients}) {
  return (
      <div className="order">
        <h3>{name}</h3>
        <ul className="ingredient-list">
          {ingredients.map((ingredient) => {
            return <li>{ingredient}</li>;
          })}
        </ul>
      </div>
  )
}
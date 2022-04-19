import React from "react";
import "./Column.scss";
import Card from "../Card/Card";
const Column = (props) => {
  const { column } = props;

  const cards = column.cards;
  return (
    <div className="column">
      <header>{column.title}</header>
      <ul className="card-list">
        {cards.map((card, index) => (
          <Card key={card.id} card={card} />
        ))}
        <Card />
        <li className="card-item">Add what you'd like to work on below</li>
        <li className="card-item">Add what you'd like to work on below</li>
        <li className="card-item">Add what you'd like to work on below</li>
        <li className="card-item">Add what you'd like to work on below</li>
        <li className="card-item">Add what you'd like to work on below</li>
        <li className="card-item">Add what you'd like to work on below</li>
        <li className="card-item">Add what you'd like to work on below</li>
        <li className="card-item">Add what you'd like to work on below</li>
      </ul>
      <footer>Add another card</footer>
    </div>
  );
};

export default Column;

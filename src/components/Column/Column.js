import React from "react";
import "./Column.scss";
import Card from "../Card/Card";
const Column = (props) => {
  const { column } = props;

  const cards = column.cards;
  console.log("abc", cards);
  return (
    <div className="column">
      <header>{column.title}</header>
      <ul className="card-list">
        {cards.map((card, index) => {
          return (        
              <Card key={card.id} card={card} />
          )
        })}
      </ul>
      <footer>Add another card</footer>
    </div>
  );
};

export default Column;

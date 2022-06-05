import React from "react";
import "./Card.scss";
const Card = (props) => {
  const { card } = props;
  // console.log("11111111", card);
  return (
    <div className="card-item">
      {
      card && card.cover && (
        <img className="card-cover" 
        src={card.cover} 
        alt="nguychung-img"
        onMouseDown={e => e.preventDefault()}
        />
      )}
      {card && card.title}
    </div>
  );
};

export default Card;

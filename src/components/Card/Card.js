import React from "react";
import "./Card.scss";
const Card = (props) => {
  const { card } = props;
  // console.log("11111111", card);
  return (
    <li className="card-item">
      {
      card && card.cover && (
        <img className="card-cover" src={card.cover} alt="nguychung-img" />
      )}
      {card && card.title}
    </li>
  );
};

export default Card;

import React, { useEffect, useState } from "react";
import "./BoardContent.scss";
import _ from "lodash";
import { initialData } from "../../actions/initialData";
import Column from "../Column/Column";
import { mapOrder } from "../../utilities/sorts";
const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === "board-1"
    );

    if (boardFromDB) {
      setBoard(boardFromDB);
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    }
  }, []);

  if (_.isEmpty(board)) {
    return (
      <div className="not-found" style={{ padding: "10px", color: "#fff" }}>
        Board not found
      </div>
    );
  }

  return (
    <div className="board-content">
      {columns.map((column, index) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default BoardContent;

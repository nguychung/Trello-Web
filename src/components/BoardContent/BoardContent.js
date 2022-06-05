import React, { useEffect, useState } from 'react'
import './BoardContent.scss'
import _ from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'
import { initialData } from '../../actions/initialData'
import Column from '../Column/Column'
import { mapOrder } from '../../utilities/sorts'
const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === 'board-1'
    );

    if (boardFromDB) {
      setBoard(boardFromDB);
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, []);

  if (_.isEmpty(board)) {
    return (
      <div className="not-found" style={{ padding: '10px', color: '#fff' }}>
        Board not found
      </div>
    );
  }

  const onColumnDrop = (dropResult) => {
    console.log(dropResult);
  }

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={column.id}>
          <Column column={column} />
          </Draggable>
        ))}
      </Container>
    </div>
  );
};

export default BoardContent;

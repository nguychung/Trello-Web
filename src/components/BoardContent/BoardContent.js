import React, { useEffect, useRef, useState } from 'react'
import './BoardContent.scss'
import _ from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BoostrapContainer, Row, Col, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { initialData } from '../../actions/initialData'
import Column from '../Column/Column'
import { mapOrder } from '../../utilities/sorts';
import { applyDrag } from '../../utilities/dragDrop'
const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const newColumnInputRef = useRef(null);
  const [newColumnTitle, setNewColumnTitle] = useState('')

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === 'board-1'
    );

    if (boardFromDB) {
      setBoard(boardFromDB);
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, []);

  useEffect(() => {
    if(newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumnForm]);

  if (_.isEmpty(board)) {
    return (
      <div className="not-found" style={{ padding: '10px', color: '#fff' }}>
        Board not found
      </div>
    );
  }

  const onColumnDrop = (dropResult) => {
    console.log(dropResult);
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult);
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns
    setColumns(newColumns)
    setBoard(newBoard)
  }

  const onCardDrop = (columnId, dropResult) => {
    if(dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
      console.log(columnId);
      console.log(dropResult);
      let newColumns = [...columns]
      let currentColumn = newColumns.find(c => c.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(i => i.id)
      setColumns(newColumns)
    }
  }

  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)
  }

  const addNewColumn = () => {
    if(!newColumnTitle) {
      newColumnInputRef.current.focus();
      return;
    }
    const newColumnToAdd = {
      id: Math.random().toString(36).substring(2, 5), // random 5 characters
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: []
    }

    let newColumns = [...columns];
    newColumns.push(newColumnToAdd)
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns
    setColumns(newColumns)
    setBoard(newBoard);
    setNewColumnTitle('');
    toggleOpenNewColumnForm()

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
          <Column column={column} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>
      <BoostrapContainer className='trello-container'>
        {!openNewColumnForm && 
            <Row>
            <Col className='add-new-column' onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon" /> Add new column
            </Col>
          </Row>
        }
      
      {openNewColumnForm && 
        <Row>
          <Col className='enter-new-column'>
            <Form.Control 
              ref={newColumnInputRef}
              className='input-enter-new-column'
              size="sm" type="text" 
              placeholder="Enter column title..."
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              onKeyDown={event => (event.key === "Enter") && addNewColumn()}
              />
            <Button size="sm" variant="success" onClick={addNewColumn}>Add column</Button>
            <span onClick={toggleOpenNewColumnForm} className='cancel-new-column'><i className='fa fa-trash icon' /></span>
         </Col>
       </Row>
      }
      </BoostrapContainer>
    </div>
  );
};

export default BoardContent;

import * as React from 'react';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { BoardItem } from './board-item';
import { Button } from './button';

// Define types for board column element properties
type BoardColumnProps = {
  column: any,
  dataState: any,
  items: any,
  setDataState: any,

}

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}

// Create styles for BoardColumnWrapper element
const BoardColumnWrapper = styled.div`
  flex: 1;
  width: 270px;
  padding: 15px;
  background-color:#ecf0f3;
  border-radius: 4px;
  box-shadow: inset 9px 9px 15px #d1d9e6, inset -9px -9px 15px #fff;  
  transition: all 0.2s ease-in-out; 
  & + & {
    margin-left: 12px;
  }
`
// Create styles for BoardColumnHeader element
const BoardColumnHeader = styled.div`
  display:flex;
  padding: 15px;
  justify-content:space-between;
  align-items: center;
`
// Create styles for BoardColumnTitle element
const BoardColumnTitle = styled.h2`
  font: 24px sans-serif;
  color: #61677C;
  letter-spacing: -0.2px;
  text-shadow: 1px 1px 0 #FFF;
`
// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? '#d1d9e6' : null};
  border-radius: 4px;
`

// Create and export the BoardColumn component
export const BoardColumn: React.FC<BoardColumnProps> = (props) => {
  //refactor the props
  const { dataState, items, column, setDataState } = props;
  const itemList = dataState.items;
  const columns = dataState.columns;
  console.log('Column,Props:', props);
  // Create handler for button to add item 
  const addItemHandler = (e: any) => {
    //Check out the clicked button and define its column
    let targetKey = (e.target as any).id;
    console.log('add e.id:', targetKey)
    //Check out the number of the keys and name the added item
    let count = Object.keys(itemList).length;
    let lastId = Object.keys(itemList)[count - 1];
    let largestIndex = parseInt(lastId.substring(5));
    let newIndex = largestIndex + 1;
    let newItemId: string = 'item-' + newIndex;
    // let newItemContent: string = `Content of New item.`;

    // update the current column list with the new added item    
    console.log('column column(prop):', column);
    let newItemsIds = column.itemsIds;
    console.log('column oldItemsIds:', newItemsIds)
    newItemsIds.unshift(newItemId);
    console.log('column newItemsIds:', newItemsIds)
    let newColumn = {
      ...column,
      itemsIds: newItemsIds
    }
    columns[`${targetKey}`] = newColumn;
    // column.itemsIds=newItemsIds;
    console.log('column new column:', column)
    // console.log('column dataState1:',dataState)
    // Create new Item to update Items 
    let newItem = {
      id: newItemId,
      content: '',
      isActive: true
    };
    itemList[`${newItemId}`] = newItem;

    // update dataState (update items list as well)
    const newDataState = {
      ...dataState,
      items: itemList
    }
    console.log('add item newDataState:', newDataState)
    setDataState(newDataState);
  }

  // Create handler for uplift the edited item state to its parent component
  const [editState, setEditState] = useState<any>('');
  // const [confirmState, setConfirmState] = useState<any>('');
  console.log('column :column(prop)', column)
  console.log('column :column.itemsIds', column.itemsIds)
  // const [deleteState, setDeleteState] = useState<any>(column.itemsIds);


  // const [deleteState, setDeleteState] = useState<any>(dataState);
  // console.log('column deleteState:',deleteState)
  // console.log('column editState:',editState)
  // console.log('column confirmState:',confirmState) 
  // console.log('column setEditState:',setEditState)
  // console.log('column setConfirmState:',setConfirmState) 
  // console.log('column confirmState:',confirmState) 
  return (
    <BoardColumnWrapper>
      <BoardColumnHeader>
        <BoardColumnTitle>
          {column.title}
        </BoardColumnTitle>
        <Button variant='add' key={column.id} id={column.id} onClick={addItemHandler} />
      </BoardColumnHeader>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <BoardColumnContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {items.map((item: any, index: number) =>
              <BoardItem
                key={item.id}
                item={item}
                column={column}
                index={index}
                editState={editState}
                setEditState={setEditState}
                // confirmState={confirmState}
                // setConfirmState={setConfirmState}
                dataState={dataState}
                setDataState={setDataState}

              />)}
            {provided.placeholder}
          </BoardColumnContent>
        )}
      </Droppable>
    </BoardColumnWrapper>
  )
}
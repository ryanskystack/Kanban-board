import * as React from 'react';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import device from '../data/breakpoint';
// Import data for board
import { initialBoardData } from '../data/board-initial-data';
// Import BoardColumn component
import { BoardColumn } from './board-column';

// Create styled head element properties
const HeadEl = styled.h1`

text-align:center; 
margin:auto;
line-height:51px;
vertical-align:middle;
font:  sans-serif;
color: #61677C;
letter-spacing: -0.1px;
text-shadow: 3px 3px 0 #FFF;
background-color: #EBECF0;
border-radius: 4px;
box-shadow: 9px 9px 15px #d1d9e6, -9px -9px 15px #fff;
padding:10px;

@media ${device.galaxyFold} { 
  max-width: 180px;
  padding:1px;
  font-size:21px;
  margin-top: 4vh;
  line-height:40px;
}
@media ${device.iphone5se} {   
  max-width: 180px;
  padding:1px;
  font-size:23px;
}

@media ${device.iphone678} { 
  max-width: 210px;
  padding:3px;
  font-size:25px;
}

@media ${device.surfaceDuo} { 
  max-width: 250px;
  padding:3px;
  font-size:28px;
}

@media ${device.ipad} { 
  max-width: 270px;
  padding:0.1vw;
  font-size:4vw;
  margin-top: 3vh;
  margin-bottom:3vh;
  line-height:8vw;
}
@media ${device.laptop} { 
  max-width: 30vw;
  padding:0.2vh;
  font-size:3vw;
  line-height:10vh;
}
`

// Create styled draggable board Column element properties
const DroppableBoardEl = styled.div`
  display: flex;
  justify-content: space-around; 
  align-items: flex-start;
  margin: auto;  
`

export const Board: React.FC = (props) => {

  // Initialize board state with board data

  const initialDataState = { ...initialBoardData };
  const initialItems: object = initialDataState.items;

  for (const value in initialItems) {
    if (Object.prototype.hasOwnProperty.call(initialItems, value)) {
      Object.assign(value, { isActive: false })
    }
  };

  if (!localStorage.dataState) {
    localStorage.setItem('dataState', JSON.stringify({ dataState: initialDataState }));
  };
  console.log("localStorage:", localStorage);
  let jsonLocalData: any = localStorage.getItem('dataState');
  console.log("jsonLocalData:", jsonLocalData);
  const jsonParsedDataState: any = JSON.parse(jsonLocalData);
  console.log("jsonParsedDataState:", jsonParsedDataState);
  const [dataState, setDataState] = useState<any>(jsonParsedDataState.dataState);
  console.log("dataState:", dataState);
  // Handle drag & drop
  const onDragEnd = (result: any) => {
    const { source, destination, draggableId, type } = result

    // Do nothing if item is dropped outside the list
    if (!destination || destination === undefined || destination === null) {
      return
    }

    // Do nothing if the item is dropped into the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }
    //Check out that the column is being dragged
    if (type === "column") {
      // Get all columns ids
      const newColumnsOrder = Array.from(dataState.columnsOrder);
      // Remove the id of dragged column from its original position
      newColumnsOrder.splice(source.index, 1);
      // Insert the id of dragged column to the new position
      newColumnsOrder.splice(destination.index, 0, draggableId);
      // Update new data state with updated order for columns
      const newDataState = {
        ...dataState,
        columnsOrder: newColumnsOrder
      };
      setDataState(newDataState);
      localStorage.setItem('dataState', JSON.stringify({ dataState: newDataState }));
      return
    }

    // Find column from which the item was dragged from
    const columnStart = (dataState.columns as any)[source.droppableId]

    // Find column in which the item was dropped
    const columnFinish = (dataState.columns as any)[destination.droppableId]

    // Moving items in the same list
    if (columnStart === columnFinish) {
      // Get all item ids in currently active list     
      const newItemsIds = Array.from(columnStart.itemsIds)

      // Remove the id of dragged item from its original position
      newItemsIds.splice(source.index, 1)

      // Insert the id of dragged item to the new position
      newItemsIds.splice(destination.index, 0, draggableId)

      // Create new, updated, object with data for columns
      const newColumnStart = {
        ...columnStart,
        itemsIds: newItemsIds
      }

      // Create new board state with updated data for columns
      const newState = {
        ...dataState,
        columns: {
          ...dataState.columns,
          [newColumnStart.id]: newColumnStart
        }
      }

      // Update the board state with new data
      setDataState(newState);
      localStorage.setItem('dataState', JSON.stringify({ dataState: newState }));

    } else {
      // Moving items from one list to another
      // Get all item ids in source list
      const newStartItemsIds = Array.from(columnStart.itemsIds)

      // Remove the id of dragged item from its original position
      newStartItemsIds.splice(source.index, 1)

      // Create new, updated, object with data for source column
      const newColumnStart = {
        ...columnStart,
        itemsIds: newStartItemsIds
      }

      // Get all item ids in destination list
      const newFinishItemsIds = Array.from(columnFinish.itemsIds)

      // Insert the id of dragged item to the new position in destination list
      newFinishItemsIds.splice(destination.index, 0, draggableId)

      // Create new, updated, object with data for destination column
      const newColumnFinish = {
        ...columnFinish,
        itemsIds: newFinishItemsIds
      }

      // Create new board state with updated data for both, source and destination columns
      const newState = {
        ...dataState,
        columns: {
          ...dataState.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish
        }
      }
      // Update the board state with new data
      setDataState(newState);
      localStorage.setItem('dataState', JSON.stringify({ dataState: newState }));
    }
  }

  return (
    <>
      <HeadEl>
        Kanban Board
      </HeadEl>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='all-columns' direction="horizontal" type="column" >
          {(provided, snapshot) => (
            <DroppableBoardEl
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {dataState.columnsOrder.map((columnId: string, index: number) => {
                // Get id of the current column
                const column = (dataState.columns as any)[columnId]
                // Get item belonging to the current column
                const items = column.itemsIds.map((itemId: string) => (dataState.items as any)[itemId])
                // Render the BoardColumn component

                console.log('board items:', items);
                console.log('board column:', column);
                console.log('board dataState:', dataState);
                return (
                  <Draggable
                    draggableId={columnId}
                    index={index}
                    key={columnId}
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <BoardColumn
                          key={column.id}
                          dataState={dataState}
                          column={column}
                          items={items}
                          setDataState={setDataState}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              })
              }
              {provided.placeholder}
            </DroppableBoardEl>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
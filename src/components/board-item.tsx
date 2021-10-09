import * as React from 'react';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Button } from './button';
import device from '../data/breakpoint';

// Define types for board item element properties
type BoardItemProps = {
  item: any,
  index: any,
  column: any,
  editState: any,
  setEditState: any,
  // confirmState: any,
  // setConfirmState: any,
  dataState: any,
  setDataState: any,
  // deleteState: any,
  // setDeleteState: any
}
// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
  isDragging: boolean
}

// Create style for board item element
const BoardItemEl = styled.div<BoardItemStylesProps>`
  display:flex;
  background-color: ${(props) => props.isDragging ? '#d3e4ee' : '#ecf0f3'};
  border-radius: 4px;
  box-shadow: 9px 9px 15px #d1d9e6, -9px -9px 15px #fff;
  margin-bottom:12px;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -0.2px;
  padding:3px;
  margin:6px;
  background-color: #EBECF0;
  text-shadow: 1px 1px 0 #FFF;
  color: #61677C;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  cursor: move;
  line-height:3vh;  

  &:hover {
    box-shadow: -2px -2px 5px #FFF, 2px 2px 5px #BABECC;
    cursor: pointer;
  }

  & + & {
    margin-top: 8px;
  }
  @media ${device.galaxyFold} { 
    margin-block-start: 1px;
    margin-block-end: 1px;
    max-width: 60px;
    font-size: 4.5vw;
  }

  @media ${device.iphone5se} { 
    margin-block-start: 1px;
    margin-block-end: 1px;
    max-width: 76px;
    font-size: 4vw;
  }
  
  @media ${device.iphone678} { 
    margin-block-start: 2px;
    margin-block-end: 2px;
    max-width: 90px;
    font-size: 4vw;
  }
  @media ${device.iphone678plus} { 
    max-width: 120px;
    font-size: 3.5vw;
    margin:2px;
  }
  @media ${device.surfaceDuo} { 
    max-width: 150px;
    font-size: 2.5vw;
    margin:3px;
    padding:8px;
  }
  
  @media ${device.ipad} { 
    max-width: 200px;
    font-size: 2vw;
    margin:2vh;
    padding:4vh;
  }
  @media ${device.laptop} { 
    max-width: 27vw;
    font-size: 4vh;
    margin:3vh;
    padding:3vh;
  }
`

// Create style for input item element
const InputWrapperEl = styled.div`
 display:flex;
 z-index: 1;
 justify-content: space-between; 
 align-items: center;
 box-sizing: border-box;
 transition: all 0.2s ease-in-out;
 height:21px;
 max-width:400px;
 padding:2px; 
`

// Create style for input item element
const InputEl = styled.input`
  
  margin-right: 4px;
  background: #d0f6ec;
  border-width:0; 
  box-shadow:  inset 2px 2px 5px #87a099, inset -5px -5px 10px #ffffff;
  color: #61677C;
  font-weight: bold; 

  &:focus {
    outline: none;
    color: #61677C;
    font-weight: bold;  
    box-shadow:  inset 1px 1px 2px #BABECC, inset -1px -1px 2px #FFF;
  }
  @media ${device.galaxyFold} { 
    font-size: 12px;
    width: 100px;
    height:30px;  
    padding:2px;
  }

  @media ${device.iphone5se} { 
    font-size: 12px;
    width: 110px;
    height:20px;  
    padding:3px;
    margin:8px;
  }
  
  @media ${device.iphone678} { 
    font-size: 15px;
    width: 120px;
    height:25px;  
    padding:3px;
    margin:3px;
  }
  @media ${device.iphone678plus} { 
    font-size:15px;
    padding:3px;
    margin:3px;
    height:27px; 
  }
  @media ${device.surfaceDuo} { 
    font-size:15px;
    width:150px;
    padding:3px;
    margin:3px;
    height:28px; 
  }
  
  @media ${device.laptop} { 
    width:18vw;
    padding:6px;
    margin:6px;
    height:32px; 
    font-size:1.6vw;
  }
`

// Create and export the BoardItem component
export const BoardItem = (props: BoardItemProps) => {
  const { item, index, column, dataState, setDataState, setEditState } = props;
  const [inputState, setInputState] = useState<any>(item.content);
  console.log('Item,Props:', props);

  // Create handler for update the input content of item 
  const changeHanddler = (e: any) => {
    console.log('change:e:', e.target.value)
    console.log('change:item:', item)
    if (!e.target.value || e.target.value === null || e.target.value === '') {
      setInputState(item.content);
    } else { setInputState(e.target.value); }
  }
  // Create handler for confirming the input content of item 
  const confirmHandler = (e: any) => {
    console.log('confirm,e:', e.target);
    // let columnId: string = e.target.id.substr(7, 8);
    let itemId = e.target.id.substring(15);
    // console.log('confirm columnId:', columnId);
    console.log('confirm itemId:', itemId);
    let newDataState = { ...dataState };
    let newItem = newDataState['items'][itemId];
    if (inputState === null) {
      newItem.content = ''
    } else {
      newItem.content = inputState;
    }
    newItem['isActive'] = false;
    console.log('confirm dataState:', newDataState);
    setDataState(newDataState);
  }

  // Create handler for deleting the item 
  const deleteHandler = (e: any) => {
    console.log('delete dataState', dataState);
    console.log('delete column:', column);

    console.log('e.target:', e.target);
    let columnId: string = e.target.id.substr(6, 8);

    let itemId = e.target.id.substring(14);

    console.log('delete columnId', columnId);
    console.log('delete itemId', itemId);

    // console.log('delete deleteState', deleteState);
    // console.log('delete item:',dataState.items[`${itemId}`]);

    console.log('delete item:', item);
    // delete dataState.items[`${itemId}`];
    // let itemsIds = dataState.columns[`${columnId}`].itemsIds;
    // let newDataState=JSON.parse(JSON.stringify(dataState));
    let newDataState = { ...dataState };
    console.log('init newDataState:', newDataState);
    delete newDataState['items'][itemId];
    console.log('pre newDataState:', newDataState);
    let itemsArr = newDataState['columns'][columnId]['itemsIds'];
    console.log('old itemsIds:', itemsArr);
    for (let i = 0; i < itemsArr.length; i++) {
      if (itemsArr[i] === itemId) {
        itemsArr.splice(i, 1);
        i--;
      }
    }
    console.log('New itemsArr:', itemsArr);

    // console.log('delete deleteState:', deleteState);

    console.log('new newDataState:', newDataState);

    setDataState(newDataState);


  }


  //Create handler for editting the item by click the item itself
  const editHandler = (e: any) => {
    console.log('confirm, item id:', e.target.id);
    let itemId = e.target.id;
    let newDataState = { ...dataState };
    let newItem = { ...item };
    newItem['isActive'] = true;
    newDataState['items'][itemId] = newItem;
    item['isActive'] = true;

    console.log('confirm newDataState:', newDataState);
     setEditState(item); 
    //  setDataState(newDataState);
  
    // console.log('edit,editState:', editState);
    // console.log('edit,confirmState:', confirmState);
    // item === confirmState && setConfirmState('');


    // setEditState(item);
  }

  return <Draggable draggableId={item.id} index={index}>
    {(provided, snapshot) => (
      <BoardItemEl
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {
          item.isActive ?
            (<InputWrapperEl>
              {item.content !== '' ?
                <InputEl autoFocus type="text" onChange={changeHanddler} placeholder={item.content} value={inputState} />
                :
                <InputEl autoFocus type="text" onChange={changeHanddler} placeholder='New content of item' value={inputState} />
              }
              <Button variant='confirm' key={`confirm${item.id}`} id={`confirm${column.id}${item.id}`} onClick={confirmHandler} />
              <Button variant='delete' key={`delete${item.id}`} id={`delete${column.id}${item.id}`} onClick={deleteHandler} />
            </InputWrapperEl>
            )
            :
            <div id={item.id} key={item.id} onClick={editHandler}>
              {/* {item.content===''?"\u00A0":item.content} */}
              {item.content===''?"✐":item.content}
            {/* if in JS, put &nbsp  */}
            </div>
        }
      </BoardItemEl>
    )}
  </Draggable>
}
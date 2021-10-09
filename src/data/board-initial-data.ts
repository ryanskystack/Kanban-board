export const initialBoardData = {
    items: {
      'item-1': { id: 'item-1', content: 'Content of item 1.'},
      'item-2': { id: 'item-2', content: 'Content of item 2.'},
      'item-3': { id: 'item-3', content: 'Content of item 3.'}
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        itemsIds: ['item-1', 'item-2', 'item-3']
      },
      'column-2': {
        id: 'column-2',
        title: 'Doing',
        itemsIds: []
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        itemsIds: []
      }
    },
    columnsOrder: ['column-1', 'column-2', 'column-3']
  }
---
layout: post
title: React, TicTacToe
description: >
  React, 틱택토
hide_description: true
sitemap: false
date: 2021-06-25 23:58:00 +0900
category: react
---

# [React, WebGame] 틱택토

## CSS

```css
table,
th,
td {
    border: 1px solid black;
    text-align: center;
    font-size: 20px;
}

td {
    width: 60px;
    height: 60px;
}
```

## Table, Tr, Td Components

```js
// Table
import React, { memo } from 'react';
import Tr from './Tr';

const Table = ({ onClick, tableData, dispatch }) => {
    return (
        <table>
            <tbody>
                {Array(tableData.length).fill().map((tr, i) => (<Tr key={i.toString()} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />))}
            </tbody>
        </table>
    );
};


export default Table;
```

```js
// Tr
import React, { memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => (
                <Td key={rowIndex.toString() + i.toString()} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} />
            ))}
        </tr>
    );
});

export default Tr;
```

```js
// Td
import React, { useCallback, memo } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
    // 최적화할 때 사용할 수 있는 방법
    // 어떤 props가 변경될 때 렌더링이 발생하는지 확인
    // const ref = useRef([]);
    // useEffect(() => {
    //     console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
    //     console.log(cellData, ref.current[3]);
    //     ref.current = [rowIndex, cellIndex, dispatch, cellData];
    // }, [rowIndex, cellIndex, dispatch, cellData]);

    const onClickTd = useCallback(() => {
        if (cellData) {
            return;
        }
        console.log('click_cell');

        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    }, [cellData]);
    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
});

export default Td;
```

## Hooks

### 전체 코드

```js
import React, { useState, useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

// useReducer의 등장

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner,
            };
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME:
            return {
                ...state,
                turn: 'O',
                tableData: [['', '', ''], ['', '', ''], ['', '', '']],
                recentCell: [-1, -1],
            };
    }

};

// dispatch에는 action이 전달되고, action이 실행될 때 마다
// reducer가 실행된다.
// 어떻게 바꿀지를 reducer에서 작성(return 객체로)


const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { winner, tableData, turn, recentCell } = state;

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [TableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'O' });
    }, []);

    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
            // 초기화했을 때는 useEffect의 실행을 막는다.
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }
        if (win) { // 승리시
            console.log('set_winner');
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        } else {
            let all = true; // all이 true면 무승부
            tableData.forEach((row) => {
                row.forEach(cell => {
                    if (!cell) {
                        all = false;
                    }
                })
            })
            if (all) {
                console.log('reset_game');
                dispatch({ type: RESET_GAME });
            } else {
                console.log('change_turn');
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]); // tableData가 바꼈을 때 실행

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리!</div>}
        </>
    );
};

export default TicTacToe;
```
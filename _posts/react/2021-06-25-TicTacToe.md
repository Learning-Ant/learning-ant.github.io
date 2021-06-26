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

> 틱택토 게임을 구현하면서 React의 useReducer에 대해서 공식문서를 참고해가며 알아본다.
{:.note title="attention"}

## CSS

> 틱택토 Component를 테이블로 구성할 예정이다. 테이블에 관한 CSS부터 설정한다.
{:.note title="attention"}

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

## Hooks


### Table, Tr, Td Components

> HTML에서 Table에 관한 태그를 지원하지만, useReducer를 사용해 구현해보기 위해 Table과 그의 요소들인 Tr와 Td를 각각 Component로 구현한다.
{:.note title="attention"}

```js
// Table
import React from 'react';
import Tr from './Tr';

const Table = memo() => {
    return (
        <table>
            <tbody>
                <Tr />
            </tbody>
        </table>
    );
};


export default Table;
```

```js
// Tr
import React from 'react';
import Td from './Td';

const Tr = memo(() => {
    return (
        <tr>
            <Td />
        </tr>
    );
});

export default Tr;
```

```js
// Td
import React from 'react';

const Td = memo(() => {

    return (
        <td></td>
    );
});

export default Td;
```

지금은 각 Table, Tr, Td Component의 props들이 아무것도 없지만, 진행하면서 점점 추가되는 요소들이 많을 예정이다. 우선은 그 뼈대만 작성해 둔 것이라 생각하면 된다.

### useReducer

본격적으로 Reducer를 구성해보기 전에 [공식문서](https://reactjs.org/docs/hooks-reference.html#usereducer)부터 읽어보도록 한다.

> An alternative to useState. Accepts a reducer of type (state, action) => newState, and returns the current state paired with a dispatch method. (If you’re familiar with Redux, you already know how this works.)  
> useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. useReducer also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.  
> Here’s the counter example from the useState section, rewritten to use a reducer:  

> `useState`의 대안이다. `(state, action) => newState`타입의 Reducer도 허용하며, dispatch method와 쌍을 이루는 현재의 State를 반환한다. (Redux가 익숙하다면, 이게 어떻게 동작하는지 알고있을 것이다.)  
> `useReducer`는 보통 다중의 복잡한 sub-values를 포함하는 복잡한 state logic을 가지거나 다음 State가 이전 State에 의존적을 경우 `useState`보다 선호된다. `useReducer`는 dispatch를 callbacks 대신 하위컴포넌트로 넘겨줄 수 있기때문에 deep update하는 trigger Component의 성능을 최적화 할 수 있다.  
> `useState` section의 counter 예시를 Reducer를 사용해 재작성된 예시:

```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

모든 State의 초기화를 initialState의 객체로 다루고, reducer가 받는 action에 따라 어떤 로직이 수행되는지 정할 수 있고, dispatch를 하위 컴포넌트로 넘겨주어 관리한다는 의미인 듯하다. 우리가 만들 틱택토 게임 역시 가장 하위 컴포넌트인 Td를 클릭했을 경우 가장 상위 컴포넌트인 TicTacToe의 State가 변하게 되므로 dispatch를 TicTacToe에서부터 Table -> Tr -> Td 순으로 넘겨주어야 할 것이다.

### TicTacToe

#### initialState

공식문서에 나온대로 우리가 사용할 State들을 initialState의 객체로 생성해본다.

```js
const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: [-1, -1],
};
```

* winner : 승자
* turn : 현재 턴
* tableData : table에 표시될 데이터
* recentCell : 현재 Cell

#### reducer

공식문서에서 제시한 것처럼 reducer도 만들어준다.

```js
const reducer = (state, action) => {
    switch (action.type) {
        default:
            throw new Error();
    }
};
```

#### Component

```js
const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { winner, tableData, turn, recentCell } = state;

    return (
        <>
            <Table tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리!</div>}
        </>
    );
};

export default TicTacToe;
```

공식문서의 예시처럼 구성했다. 다소 다른점은 state라는 객체에서 구조분해문법을 통해 각각의 state를 뽑아온 것인데, 이는 앞으로의 코딩 편의성을 위한 것이다.

#### action

이제 action들을 정의할 것이다. action들은 constant value로 모두 대문자로 구성하고, 이는 하위 컴포넌트에서 넘어오는 action들을 판단해 dispatch가 어떤 로직을 수행할지 정하게 된다.

설정할 action들은 다음과 같다.

```js
export const SET_WINNER = 'SET_WINNER';     // 승자가 판별된 경우
export const CLICK_CELL = 'CLICK_CELL';     // Cell(Td)를 클릭했을 경우
export const CHANGE_TURN = 'CHANGE_TURN';   // 클릭 후 턴을 바꾸는 경우
export const RESET_GAME = 'RESET_GAME';     // 게임 초기화
```

`export` 명령어는 외부에서 해당 const를 import 할 수 있도록 해주는 예약어이다. 이제 위 const들을 다른 Component에서 구조 분해 문법으로 import 할 수 있게 된다.

#### 하위 Components

로직들을 구성하기 전에 뼈대만 만들어 두었던 Table과 그 하위 컴포넌트들을 제대로 작성해보도록 하자.  

먼저 Table Component에서 Tr은 tableData의 row 수 만큼 생성되어야 한다. 이를 위해서 상위 Component인 TicTacToe에서 tableData를 props로 넘겨주어야 한다. 추가적으로 dispatch도 넘겨주어야 하는데 이는 Table이 dispatch를 사용할 예정은 없지만 가장 하위 Component인 Td에서 dispatch를 활용해 TicTacToe Component의 tableData를 변경해주어야 하기 때문이다.

##### Table

```js
import React, { memo } from 'react';
import Tr from './Tr';

const Table = memo({ tableData, dispatch }) => {
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

Array 객체의 fill() 메소드와 map 메소드를 활용해 Tr Component를 상위 Component에서 props로 넘겨준 tableData의 length를 활용해 생성한다. 마찬가지로 Tr Component에도 dispatch를 넘겨주어야 한다.

##### Tr

```js
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

Tr Component는 Table Component에서 props로 넘겨준 rowData(Td에 들어갈 Data들), rowIndex, dispatch를 받고 이 props를 활용해 Td에 props를 넘겨준다. 

##### Td

```js
import React, { useCallback, memo } from 'react';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {

    const onClickTd = () => {

    };
    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
});

export default Td;
```

이제 Td에서 cell을 Click 했을 경우의 로직을 작성해야한다. 여기서 dispatch를 활용해 action을 넘겨준다.

```js
const onClickTd = useCallback(() => {
    if (cellData) {
        return;
    }
    // console.log('click_cell');

    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
}, [cellData]);
```

useCallback을 사용해 rendering 될 때마다 함수를 새로 생성하는 것이 아닌 cellData가 바뀔 경우에만 함수를 재 생성하도록 한다.

이미 cellData가 존재할 경우엔 action을 넘겨주지 않고, 없을 경우만 dispatch를 통해 action을 넘겨준다. 이렇게 넘겨준 action을 TicTacToe Component의 reducer에서 수행할 기능을 작성해준다.

```js
const reducer = (state, action) => {
    switch (action.type) {
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
        default:
            throw new Error()
    }
};
```

아마 여기까지 잘 이해하고 따라왔다면 reducer를 어떻게 사용해야할 지 감이 좀 잡혔을 것이다. 이제 useEffect를 사용해 승자를 판정하는 로직을 구성해본다.

#### useEffect

```js
useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
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
        if (win) {
            console.log('set_winner');
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        } else {
            let all = true;
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
    }, [recentCell]);
```

우선 안의 로직을 다 빼고 그 뼈대부터 살펴보자.

```js
useEffect(() => {
    ...
, [recentCell]})
```

useEffect를 사용하는데 recentCell이 변경될 때만 실행하는 componentDidUpdate의 기능을 활용하는 것이다.(물론 componentDidMount의 역할도 한다.) Td를 클릭할 때마다 dispatch를 통해 action을 전달해주고, CLICK_CELL action이 실행되었다면 recentCell이 변경되므로 클릭할 때마다 해당 로직이 수행될 것이다.  

이제 로직을 나눠서 살펴보면

```js
const [row, cell] = recentCell;
if (row < 0) {
    // 초기화했을 때는 useEffect의 실행을 막는다.
    return;
}
```

row와 cell을 recentCell로부터 받아온다. 그 후 initialState의 상태라면 row가 -1 일테니 수행을 멈춘다. componentDidMount를 막는다고 볼 수 있고, 새로운 게임을 시작했을 경우의 useEffect 실행 역시 막는다고 할 수 있겠다.

```js
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
```

win 변수를 false로 선언하고 이제 검사를 시작한다. 위 로직은 클릭한 대각선, 같은 행, 같은 열들을 검사하고 각 경우마다 모두 현재의 턴 값과 일치한다면 승자라는 것이니 win의 값을 true로 바꿔준다.

```js
if (win) { // 승리시
    // console.log('set_winner');
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
        // console.log('reset_game');
        dispatch({ type: RESET_GAME });
    } else {
        // console.log('change_turn');
        dispatch({ type: CHANGE_TURN });
    }
}
```

승리했다면 dispatch를 통해 SET_WINNER와 RESET_GAME action을 넘겨준다. win이 false라면 이제 all이라는 변수를 선언하고 모든 칸이 채워졌는지 확인한다.  
승자가 없고 모든 칸이 다 채워졌다면 무승부(게임은 끝났으므로 RESET_GAME을 전달), 아직 덜 채워졌다면 게임이 끝나지 않은 것이니 action으로 CHANGE_TURN을 넘겨준다.

이제 나머지 action들도 모두 완성해하면 reducer는 다음처럼 구성될 것이다.

```js
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
        default :
            throw new Error();
    }
};
```

이렇게 TicTacToe 게임이 완성되었다.

### 전체 코드

#### Table, Tr, Td Components

##### Table.jsx

```js
// Table
import React, { memo } from 'react';
import Tr from './Tr';

const Table = memo({ tableData, dispatch }) => {
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

##### Tr.jsx

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

##### Td.jsx

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
        // console.log('click_cell');

        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    }, [cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
});

export default Td;
```

#### TicTacToe.jsx

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
        default :
            throw new Error();
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

    // 동작 테스트용 코드
    // const onClickTable = useCallback(() => {
    //     dispatch({ type: SET_WINNER, winner: 'O' });
    // }, []);

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
            // console.log('set_winner');
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
                // console.log('reset_game');
                dispatch({ type: RESET_GAME });
            } else {
                // console.log('change_turn');
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]); // tableData가 바꼈을 때 실행

    return (
        <>
            <Table {/*onClick={onClickTable}*/} tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리!</div>}
        </>
    );
};

export default TicTacToe;
```
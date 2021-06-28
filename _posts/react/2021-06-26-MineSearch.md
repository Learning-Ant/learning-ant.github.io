---
layout: post
title: React, MineSearch
description: >
  React, 지뢰찾기
hide_description: true
sitemap: false
date: 2021-06-26 19:58:00 +0900
category: react
---

# [React, WebGame] 지뢰찾기

## CSS

우선 지뢰찾기를 진행할 Table에 대한 CSS부터 구성해보자.

```css
table.mine,
td.mine {
    border: 1px solid white;
    text-align: center;
    font-size: 15px;
}

td.mine {
    width: 30px;
    height: 30px;
}
```

## Hooks

> 이전 포스팅에서는 dispatch와 `useReducer`를 통해 각 하위 Component로 dispatch를 전달해주고 상위의 State를 변경하는 Handling하는 방법에 대해 알아보았었다. 하지만 dispatch가 필요없는 중간 Component에도 하위 Component에 전달 해 주기 위해 전달해 주어야 했었다. `useContext`를 사용하면 이런 과정을 생략 할 수 있다.  
> 지뢰찾기를 구현하면서 `useContext`를 활용해 dispatch를 사용하는 방법에 대해 알아보도록 한다.
{:.note title="attention"}

### Form, Td, Tr, Table

> 지뢰찾기를 구현하기 위해 필요한 하위 Component들의 뼈대부터 만들어본다.
{:.note}

#### Form

```js
import React, { useState, useCallback, memo } from 'react';

const Form = memo(() => {
    const [row, setRow] = useState(10);
    const [cell, setCell] = useState(10);
    const [mine, setMine] = useState(20);

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    }, [row]);
    const onChangeCell = useCallback((e) => {
        setCell(e.target.value);
    }, [cell]);
    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    }, [mine]);

    const onClickBtn = useCallback(() => {

    }, []);

    return (
        <div>
            <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
            <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
            <input type="number" placeholder="지뢰개수" value={mine} onChange={onChangeMine} />
            <button onClick={onClickBtn} >시작</button>
        </div>
    );
});

export default Form;
```

지뢰판을 만들 때 가로 세로의 값과 지뢰의 개수를 받아서 구성하기 위한 Form Component이다. 특별한 것은 없고 버튼을 클릭했을 때 `onClickBtn`의 로직으로 상위 Component의 State의 값을 전달하기 위해 `useContext`와 dispatch를 사용해 입력받은 값을 설정할 예정이다. 그렇기에 아직 `onClickBtn`의 로직은 구현되지 않은 상태이다.

#### Td

```js
import React, { useCallback, memo, useMemo } from 'react';

const getTdStyle = (code) => {
    switch (code) {
        default:
            return {
                background: 'white',
            };
    }
};

const getTdText = (code) => {
    switch (code) {
        default:
            return code || '';
    }
};

const MineTd = memo(({ rowIndex, cellIndex }) => {

    const onClickTd = useCallback((e) => {
        e.preventDefault();
        
    }, []);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
       
    }, []);

    return useMemo((
        <td
            style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
            className="mine"
        >
            {getTdText(tableData[rowIndex][cellIndex])}
        </td>
    ), [tableData[rowIndex][cellIndex]]);

});

export default MineTd;
```

지금은 구현되지 않고 뼈대만 있어 무슨 역할을 할지 잘 알 수 없지만 점점 `Context API`를 활용해 data flow가 어떻게 흘러가는지 살펴보면서 조금씩 채워나가도록 한다.

#### MineTr, MineTable

##### MineTr

```js
import React, { memo } from 'react';
import MineTd from './MineTd';

const MineTr = memo(({ rowIndex }) => {
    return (
        <tr>
            <MineTd key={i} rowIndex={rowIndex} cellIndex={i} />
        </tr>
    );
});

export default MineTr;
```

##### MineTable

```js
import React, { memo } from 'react';
import MineTr from './MineTr';

const MineTable = memo(() => {
    return (
        <table className="mine">
            <tbody>
                <MineTr key={i} className="mine" rowIndex={i} />
            </tbody>
        </table>
    )
});

export default MineTable;
```

#### MineSearch

```js
import React from 'react';
import MineTable from './MineTable';
import Form from './Form';

const MineSearch = () => {
    return (
        <>
            <Form />
            <div>{timer}</div> {/*경과 시간*/}
            <MineTable />
            <div>{result}</div> {/*게임 결과*/}
        </>
    );
}

export default MineSearch;
```

먼저 가장 기본적인 형태로 Component를 구성해보았다. 지뢰판에 대한 정보를 입력하는 `Form`, 경과시간을 표시해주는 `timer`, 실제 지뢰판을 구성할 `MineTable`, 게임 결과를 표시해줄 `result`.  

이제 Context API를 활용해 차근차근 단계를 밟아가며 구현에 들어가보도록 하자.

### Context API

> Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language. For example, in the code below we manually thread through a “theme” prop in order to style the Button component:

> Context는 현재 인증된 사용자, 테마 혹은 선호 언어와 같은 tree형태의 React Component에 대해 global로 다룰 수 있는 데이터를 공유하기위해 디자인되었다. 예를 들어, 아래의 코드에서 우리는 Button component를 style하기 위한 theme prop을 통해 수동적으로 thread한다.

이해를 돕기 위해 설명을 그림으로 표현해보면,

![Context API](/assets/img/about-react/MineSearch/ContestAPI.png)
{:.lead loading="lazy" align="center"}

Context API
{:.figcaption}

Context를 만들고, 그림에는 없지만 reducer를 통해 dispatch의 action을 받고 받은 action에 따라 로직을 수행할 수 있도록 지뢰찾기를 구현해 나갈 것이다.

---
---
---
---

정리중

#### createContext


#### Context.Provider


#### useContext


### 전체코드

#### CSS

```css
table.mine,
td.mine {
    border: 1px solid white;
    text-align: center;
    font-size: 15px;
}

td.mine {
    width: 30px;
    height: 30px;
}
```

#### Components

##### Form

```js
import React, { useState, useCallback, useContext, memo } from 'react';
import { TableContext, START_GAME } from './MineSearch';


const Form = memo(() => {
    const [row, setRow] = useState(10);
    const [cell, setCell] = useState(10);
    const [mine, setMine] = useState(20);
    const { dispatch } = useContext(TableContext);

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    }, [row]);
    const onChangeCell = useCallback((e) => {
        setCell(e.target.value);
    }, [cell]);
    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    }, [mine]);

    const onClickBtn = useCallback(() => {
        dispatch({ type: START_GAME, row, cell, mine })
    }, [row, cell, mine]);

    return (
        <div>
            <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
            <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
            <input type="number" placeholder="지뢰개수" value={mine} onChange={onChangeMine} />
            <button onClick={onClickBtn} >시작</button>
        </div>
    );
});

export default Form;
```

##### MineTd

```js
import React, { useContext, useCallback, memo, useMemo } from 'react';
import { CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, TableContext } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: 'white',
            };
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow'
            };
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'red',
            };
        default:
            return {
                background: 'white',
            };
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        default:
            return code || '';
    }
};

const MineTd = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback((e) => {
        e.preventDefault();
        console.log('clicked');
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        console.log('right-clicked');
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    // return useMemo((
    //     <td
    //         style={getTdStyle(tableData[rowIndex][cellIndex])}
    //         onClick={onClickTd}
    //         onContextMenu={onRightClickTd}
    //         className="mine"
    //     >
    //         {getTdText(tableData[rowIndex][cellIndex])}
    //     </td>
    // ), [tableData[rowIndex][cellIndex]]);

    return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />;
});

const RealTd = memo(({ onClickTd, onRightClickTd, data }) => {
    return (
        <td
            style={getTdStyle(data)}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
            className="mine"
        >
            {getTdText(data)}
        </td>
    );
});

export default MineTd;
```

##### MineTr

```js
import React, { memo, useContext } from 'react';
import MineTd from './MineTd';
import { TableContext } from './MineSearch';

const MineTr = memo(({ rowIndex }) => {
    const { tableData } = useContext(TableContext);
    return (
        <tr>
            {tableData[0] && Array(tableData[0].length).fill().map((td, i) => <MineTd key={i} rowIndex={rowIndex} cellIndex={i} />)}
        </tr>
    );
});

export default MineTr;
```

##### MineTable

```js
import React, { memo, useContext } from 'react';
import MineTr from './MineTr';
import { TableContext } from './MineSearch';

const MineTable = memo(() => {
    const { tableData } = useContext(TableContext);
    return (
        <table className="mine">
            <tbody>
                {Array(tableData.length).fill().map((tr, i) => <MineTr key={i} className="mine" rowIndex={i} />)}
            </tbody>
        </table>
    )
});

export default MineTable;
```

##### MineSearch

```js
import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import MineTable from './MineTable';
import Form from './Form';

// Context API

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0 // 0 이상이면 다 opened
};

export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => { }
});

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer: 0,
    result: '',
    halted: true,
    openedCount: 0
};

const plantMine = (row, cell, mine) => {
    // console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    // 지뢰 후보 뽑기
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    // 지뢰판 만들기
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    // 지뢰심기
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    // console.log(data);
    return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE'
export const FLAG_CELL = 'FLAG_CELL'
export const QUESTION_CELL = 'QUESTION_CELL'
export const NORMALIZE_CELL = 'NORMALIZE_CELL'
export const INCREMENT_TIMER = 'INCREMENT_TIMER'

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                data: { row: action.row, cell: action.cell, mine: action.mine },
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
                openedCount: 0,
                timer: 0
            };
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => {
                tableData[i] = [...row];
            });
            const checked = [];
            let openedCount = 0;
            const checkArround = (row, cell) => {
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
                    return;
                }
                if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) { // 상하좌우 칸이 아닌 경우 필터링
                    return;
                }
                if (checked.includes(row + ',' + cell)) { // dp. 이미 검사한 칸인지 검사
                    return;
                } else {
                    checked.push(row + ',' + cell);
                }

                let around = [
                    tableData[row][cell - 1], tableData[row][cell + 1],
                ];
                if (tableData[row - 1]) {
                    around = around.concat(tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]);
                }
                if (tableData[row + 1]) {
                    around = around.concat(tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]);
                }
                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
                if (count === 0) {
                    if (row > -1) {
                        const near = [];
                        if (row - 1 > -1) {
                            near.push([row - 1, cell - 1]);
                            near.push([row - 1, cell]);
                            near.push([row - 1, cell + 1]);
                        }
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);
                        if (row + 1 > tableData.length) {
                            near.push([row + 1, cell - 1]);
                            near.push([row + 1, cell]);
                            near.push([row + 1, cell + 1]);
                        }
                        near.filter(v => !!v).forEach((n) => {
                            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                                checkArround(n[0], n[1]);
                            }
                        });
                    }
                }
                if (tableData[row][cell] === CODE.NORMAL) { // 열린칸이 아닌 경우에만 증가
                    openedCount += 1;
                }
                tableData[row][cell] = count;
            };
            checkArround(action.row, action.cell);
            let halted = false;
            let result = '';
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) { // 승리
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다`;
            }
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result
            }
        }
        case CLICK_MINE:
            const tableData1 = [...state.tableData];
            tableData1[action.row] = [...state.tableData[action.row]];
            tableData1[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData1,
                halted: true
            }
        case FLAG_CELL:
            const tableData2 = [...state.tableData];
            tableData2[action.row] = [...state.tableData[action.row]];
            if (tableData2[action.row][action.cell] === CODE.MINE) {
                tableData2[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData2[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData2
            }
        case QUESTION_CELL:
            const tableData3 = [...state.tableData];
            tableData3[action.row] = [...state.tableData[action.row]];
            if (tableData3[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData3[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData3[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData3
            }
        case NORMALIZE_CELL:
            const tableData4 = [...state.tableData];
            tableData4[action.row] = [...state.tableData[action.row]];
            if (tableData4[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData4[action.row][action.cell] = CODE.MINE;
            } else {
                tableData4[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData4
            }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1
            }
        }

        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;

    const value = useMemo(() => (
        { tableData, halted, dispatch }
    ), [tableData, halted]);

    useEffect(() => {
        let timer
        if (halted === false) {
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER });
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [halted]);

    return (
        // 묶어줘야 아래 컴포넌트들이 데이터에 접근이 가능하다.
        // 하지만 아래처럼 value에 객체형태로 전달하게 되면 매번 새로운 객체를 전달하게 되므로
        // 이 값을 따로 캐싱해주어야 한다.(useMemo사용)
        // <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <MineTable />
            <div>{result}</div>
        </TableContext.Provider>
    );
}

export default MineSearch;
```
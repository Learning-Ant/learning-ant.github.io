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

#### createContext

>Creates a Context object. When React renders a component that subscribes to this Context object it will read the current context value from the closest matching Provider above it in the tree.  
> The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. This default value can be helpful for testing components in isolation without wrapping them. Note: passing undefined as a Provider value does not cause consuming components to use defaultValue.

> Context 객체를 만든다. React가 이 Context 객체를 구독하는 component를 rendering할 때, Provider tree에서 가장 가깝게 일치하는 현재 context 값을 읽는다.  
> `defaultValue` 인자는 component가 Provider tree에서 가장 가깝게 일치하는 Provider가 없을 때만 쓰인다. 이 기본값은 그들을 래핑하지 않고 독립적으로 component를 test할 때 유용하다. Note: Provider value로 undefined를 넘겨도 consuming components(context를 사용하는 component)가 `defaultValue`를 사용하지 않습니다.

간단히 말해 Provider tree에서 사용할 Context를 생성하는 함수라는 의미이다. 하위의 consuming component들이 사용할 Context를 만들어 반환해주며, 이를 저장해 export로 외부에서 사용이 가능하도록 하는 것이다. 이를 사용해 이전 포스팅에서 사용했던 dispatch를 요소요소마다 넘기지 않고 import만으로 사용할 수 있게 되는 것이다.

그렇다면 createContext는 어떻게 구성하면 될까? 우리는 하위 Component에서 사용하고 싶은 변수들의 기본값(`defaultValue`)을 저장해두면 되는 것 이다. 

```js
export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => { }
});
```

모든 곳에서 tableData와 halted(중단 유무), dispatch를 사용할 수 있도록 이 기본값으로 해당 State들을 넣어준다. dispatch를 보면 아무것도 없는 화살표 함수를 할당해주었는데, 이는 먼저 기본값으로 Context를 만들고 `useReducer`를 통해 다른 State들과 dispatch들을 초기활 예정이기 때문이다.

이제 지뢰찾기에서 사용할 State들의 최초값을 설정해보자.

```js
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
```

* tableData : 지뢰판이 될 State
* data : 지뢰판에 대한 meta data라고 할 수 있다. 지뢰판에 대한 정보를 Form Component로부터 받는다.
* timer : 경과시간을 표시하기 위한 State
* result : 게임결과를 표시하기 위한 State
* halted : 게임이 종료되었는지 판단하기 위한 State(중간에 지뢰를 밟았는지)
* openedCount : 게임 종료를 판단하기 위한 State(총 칸수와 열린 칸수의 비교해 모든 지뢰를 찾았는지 판단)

#### Context.Provider

```js
<MyContext.Provider value={/* some value */}>
```

> Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes.  
> The Provider component accepts a value prop to be passed to consuming components that are descendants of this Provider. One Provider can be connected to many consumers. Providers can be nested to override values deeper within the tree.  
> All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes. The propagation from Provider to its descendant consumers (including .contextType and useContext) is not subject to the shouldComponentUpdate method, so the consumer is updated even when an ancestor component skips an update.  
> Changes are determined by comparing the new and old values using the same algorithm as Object.is.

> 모든 Context 객체는 consuming component가 context를 변경을 할 수 있도록하는 Provider React Component와 함께 제공된다.  
> Provider Component는 Provider의 자손인 consuming Component에 전달될 prop의 값을 허용한다. 한 Provider는 많은 consumer들에 연결될 수 있다. Provider들은 중첩되어 트리 안에서 값을 재정의 될 수 있다.  
> Provider의 자손인 모든 Consumer들은 Provider의 prop 값이 변경될 때마다 re-rendering된다. Provider에서 그 자손인 Consumer로의 전파는 `shouldComponentUpdate` 메소드에 종속되지 않는다.(해당 method가 적용되지 않는다는 의미인 것 같다) 그렇기에 Consumer는 상위 Component의 update가 생략되더라도 갱신된다.  
> 변화는 `Object.is`의 알고리즘과 같은 방법을 사용해 새로운 값과 예전 값의 비교로 결정된다.

장황한 설명이지만 결국 Context를 사용하려면 예시와 같이 createContext로 만든 Context를 Provider를 통해 제공해야하고, 그 객체를 value로 전달해야 한다는 의미인 듯 하다.  

우리가 사용하는 Context는 TableContext이므로 예시를 맞게 변경하면,

```js
<TableContext.Provider value={ { tableData: state.tableData, state.halted, dispatch } }>
```

하지만 주의사항이 있다. Hooks는 re-rendering이 발생할 때마다 value에 새로운 객체를 생성해 전달하게 될 것이다. 그렇기에 이에 대한 cashing 작업이 필요하다. useMemo를 통해 cashing을 해준다.

```js
const value = useMemo(() => (
    { tableData, halted, dispatch }
), [tableData, halted]);

return (
    <TableContext.Provider value={value}>
        <Form />
        <div>{timer}</div>
        <MineTable />
        <div>{result}</div>
    </TableContext.Provider>
);
```

위와 같이 해주면 tableData나 halted에 대한 변경이 일어날 때만 새로 객체를 만들어 value에 전달 할 것이다.

#### useContext

> Accepts a context object (the value returned from React.createContext) and returns the current context value for that context. The current context value is determined by the value prop of the nearest <MyContext.Provider> above the calling component in the tree.  
> When the nearest <MyContext.Provider> above the component updates, this Hook will trigger a rerender with the latest context value passed to that MyContext provider. Even if an ancestor uses React.memo or shouldComponentUpdate, a rerender will still happen starting at the component itself using useContext.  
> Don’t forget that the argument to useContext must be the context object itself:  
> Correct: useContext(MyContext)  
> Incorrect: useContext(MyContext.Consumer)  
> Incorrect: useContext(MyContext.Provider)  
> A component calling useContext will always re-render when the context value changes. If re-rendering the component is expensive, you can optimize it by using memoization.

> Context 객체(React.createContext로부터 반환된 값)을 허용하고, 그 객체로부터 현재의 Context 값을 반환한다. 현재 Context 값은 tree안에서 호출한 Component의 상위 중 가장 가까운 Provider의 prop 값에 의해 결정된다.  
> Component 상위이ㅡ 가장 가까운 Provider가 갱신될 때 Hook은 Context Provider로 전달 된 최신 context 값으로 re-rendering을 시작한다. 상위 Component(ancestor)가 `React.memo`나 `shouldComponentUpdate`를 사용하더라도, `useContext`를 사용하는 Component 자체로부터 re-rendering은 여전히 발생한다.  
> `useContext`의 인자는 Context객체 자체여야 함을 기억해야한다.
> Correct: useContext(MyContext)  
> Incorrect: useContext(MyContext.Consumer)  
> Incorrect: useContext(MyContext.Provider)  
> `useContext`를 호출하는 Component는 Context 값이 변할 때 항상 re-rendering된다. 만약 re-rendering되는 Component가 무겁다면, memoization을 사용해 최적화 할 수 있다.

예전 Context API에서는 useContext가 아닌 Context.Consumer나 contextType과 같은 것을 사용했었다. 하지만 지금은 `useContext`를 사용해 보다 쉽게 사용할 수 있게 된 듯 하다. 지금도 여전히 위와 같은 것들을 사용할 수 있지만 굳이 사용할 필요는 없을 듯 하다. 이에 대해 알아보고 싶다면 [여기](https://reactjs.org/docs/context.html)를 참고하길 바란다.

`useContext`를 사용할 때 주의할 점은 외부(상위)에서 객체를 받아오는 것이므로 import를 통해 상위에서 export한 객체를 받아주어야 한다. 예를 들어, MineSearch에서 `export const TableData`의 dispatch를 Form Component에서 불러오고 싶다면 `import { TableData } from './MineSearch'`를 통해 불러와야 한다는 것이다.

### Actions & CODE

먼저 구현할 Action들과 지뢰인지 아닌지 판단할 코드들에 대해 미리 소개하겠다.

#### CODE

```js
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
```

각 숫자들이 의미하는 것들을 CODE로 미리 만들어두어 가독성과 코딩 효율성을 높인다. enum과 비슷한 역할이라고 보면 될 듯 하다.

#### Actions

```js
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';
```

해당 게임에서 취해질 Action들에 대해 미리 설정해 두고, 이를 외부로 넘겨 가독성과 코딩 효율성을 높여준다. 

### Form 구현

우선 Context를 불러오기 위해 import로 `useContext, TableContext`를 불러온다. 또한 추가할 사항은 버튼을 클릭했을 때 게임을 시작할 수 있도록 dispatch를 통해 START_GAME Action을 입력받은 지뢰판 메타데이터들과 함께 넘겨준다.

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
    
    //////////////////////////////////////////////////////////////////////////
    const onClickBtn = useCallback(() => {
        dispatch({ type: START_GAME, row, cell, mine })
        // 입력받은 row, cell, mine(지뢰수)를 START_GAME Action과 함께 넘겨준다.
    }, [row, cell, mine]);
    //////////////////////////////////////////////////////////////////////////

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

### MineTable, MineTr 구현

MineTable과 MineTr은 이전 포스팅과 한가지 달라진 점이 있다. 전에는 Table에 대한 데이터를 props로 받아왔지만 여기서는 Context를 이용해 받아온다.

#### MineTable

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

#### MineTr

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

### MineTd

MineTd에서 대부분의 Action들을 dispatch를 통해 넘겨주게 된다. 여기서 보내는 action들을 토대로 상위 Component인 MineSearch에서 Action들을 구현하게 된다.

코드가 상당히 길어 부분부분 나누어 설명을 진행한다.

```js
import React, { useContext, useCallback, memo, useMemo } from 'react';
import { CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, TableContext } from './MineSearch';
```

MineTd를 구현하기 위해 받아오는 import들이다. 대부분의 Action들이 import된 것을 볼 수 있다.

```js
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
```

각 칸에 대한 Style을 지정하기 위한 함수이다. switch를 통해 해당 Td에 있는 code로 background color를 가진 객체를 반환하게 된다.

```js
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
```

각 Code에 맞게 칸에 들어갈 Text를 지정한다. 실제 지뢰찾기처럼 Flag와 '?'도 사용할 수 있도록 한다. Flag는  '!'로 사용한다.

이제 본격적으로 MineTd Component를 구현할텐데 위의 요소들처럼 한 Component를 나눠 설명하면 가독성이 떨어질 것 같아 method 별 주석으로 설명하겠다.

```js
const MineTd = memo(({ rowIndex, cellIndex }) => {
    // useContext를 사용해 구조분해 문법으로 각 객체를 할당한다.
    const { tableData, dispatch, halted } = useContext(TableContext);

    // 마우스 클릭 구현
    const onClickTd = useCallback((e) => {
        e.preventDefault();
        // console.log('clicked');

        // 중단 되었으면 Click 기능 사용 불가
        if (halted) {
            return;
        }

        // 각 칸에 있는 Data를 통해 클릭했을 경우 어떤 action을 보낼지 선택하고,
        // 행과 열의 위치도 같이 보낸다.
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

    // 마우스 우클릭 구현
    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        // console.log('right-clicked');

        // 중단된 상태라면 우클릭 사용 금지
        if (halted) {
            return;
        }

        // 우클릭 했을 시 각 tableData를 바탕으로 어떤 action을 행할 지 선택하고,
        // 행과 열의 값을 같이 보낸다.
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


    // 각 칸에 위에 구현한 함수를 부여하고,
    // Style과 Text를 미리 구현한 함수를 통해 해당하는 값을 부여한다.
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

export default MineTd;
```

### MineSearch

먼저 지뢰판을 만드는 함수부터 구현하고, 각 action들을 구현한다. 그 후 마지막으로 timer기능을 구현한다.

#### plantMine

```js
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
```

Form에서 받은 지뢰판에 대한 메타데이터로 지뢰판을 구성하는 함수이다. 해당 로직은 차근차근 따라가다 보면 이해하기 그렇게 어렵지 않을 것이다.

#### reducer

이제 각 action에 관한 로직을 실제로 구현하게 된다. OPEN_CELL에 대한 로직이 모든 경우의 수를 고려해야하고,  클릭했을 때 주변에 지뢰가 없을 경우 연쇄적으로 오픈해야 하기에 쉽지 않다.

```js
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
```

#### MineSearch

이제 마지막으로 timer기능을 구현한다. `useEffect`를 사용해 action을 넘기고 실제로 증가하는 로직은 action에서 수행하게 된다.

```js
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
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

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
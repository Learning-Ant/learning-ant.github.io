---
layout: post
title: React, Response Check
description: >
  React, 반응속도 체크
hide_description: true
sitemap: false
date: 2021-06-14 15:29:00 +0900
category: react
---

# [React, WebGame] 반응속도 체크

> 여기서는 setTimeOut을 활용한 반응속도 체크 게임을 만들어보고자 한다. React에서는 setTimeOut을 따로 저장해두었다가 clearTimeOut으로 해당 객체를 전달해 초기화시켜주어야 한다.
{:.note title="attention"}

```
A setTimeout timer must be cleared and handle properly, otherwise,
you may experience adverse side effects in your code.
```

공식문서에서 제시한 내용이다. 해석하면 `setTimeout timer는 지워져야하고 적당히 handling되어야 한다. 그렇지 않으면 코드에서 부작용이 발생할 수 있다`는 내용이다.  


## class

### State, Component, render

> 우선 필요한 state를 선정하고, Class형 Component와 render메소드를 구성해본다.
{:.note title="attention}

```js
import React, { Component } from 'react';

// class Component
class ResponseCheck extends Component {

    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요',
        result: [],
    }

    // 변경 되더라도 rendering 되지 않음
    timeout;
    startTime;
    endTime;

    render() {
        const { state, message } = this.state;
        return (
            <>
                <div id="screen"
                    className={state}
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>
                <div>{/*반응속도 평균치를 나타낼 div*/}</div>
            </>
        );
    }
}

export default ResponseCheck;
```

#### State

State로는 다음 세가지를 선정했다.

* state : 현재 클릭 박스의 상태(이 데이터로 screen의 색깔을 변경한다.)
* message : 클릭 박스에 나타낼 메세지
* result : 반응속도 측정 결과

State는 변경되는 값들로 선정하는 것이다. 이 값들이 변경되면 다시 rendering되어 변경된 내용이 화면에 적용될 수 있도록 잘 생각한 후 선정해야한다.  

위 코드를 보면 State에 들어가지 않은 변수들이 세가지 있다. 이 세가지는 변경은 되지만 이로인해 re-rendering이 일어날 필요는 없지만 화면에 나타낼 필요없는 것들을 저장할 때 사용하는 변수라 보면 된다.

* timeout : timer를 저장할 변수
* startTime : 클릭한 시점(측정 시작)을 저장할 변수
* endTime : 초록색으로 변한 시점(측정 끝)을 저장할 변수

startTime과 endTime의 차이로 반응속도를 측정할 수 있다. 

#### onClickScreen

```js
onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === 'waiting') {
        this.setState({
            state: 'ready',
            message: '초록색이 되면 클릭하세요',
        });
        this.timeout = setTimeout(() => {
            this.setState({
                state: 'now',
                message: '지금 클릭',
            });
            this.startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 사이에 바뀜
    } else if (state === 'ready') { // 초록색이 되기 전에 클릭한 경우
        clearTimeout(this.timeout); // Timeout 초기화
        this.setState({
            state: 'waiting',
            message: '성급하셨네요. 초록색이 되면 클릭해주세요!',
        });

    } else if (state === 'now') { // 반응 속도 체크
        this.endTime = new Date();

        this.setState((prevState) => {
            return {
                state: 'waiting',
                message: '클릭해서 시작하세요',
                result: [...prevState.result, this.endTime - this.startTime],
            }
        });
    }
}
```

위 코드에서 주목해야할 부분은

```js
    this.timeout = setTimeout(() => {
        this.setState({
            state: 'now',
            message: '지금 클릭',
        });
        this.startTime = new Date();
    }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 사이에 바뀜
} else if (state === 'ready') { // 초록색이 되기 전에 클릭한 경우
    clearTimeout(this.timeout); // Timeout 초기화
```

timer를 timeout에 저장해두었다가 만약 초록색이 되기 전에 클릭했다면 timer를 clearTimeout에 전달해 그 timer를 정지시키는 것이다. 이것이 앞에서 React 공식문서에서 언급한 부작용을 막는 사례라고 할 수 있다.

만약 timer를 clearTimeout로 다루지 않는다면 game이 시작된 후, 초록색(클릭해야하는 시점)으로 화면이 바뀌기전에 클릭했을 경우 게임이 멈춰 화면이 초록색으로 변하지 말아야 함에도 불구하고 계속 진행되어 초록색으로 바뀌는 것이 의도하지 않은 기능이다.  

그렇기에 react 공식문서에서는 setTimeout을 다룰때는 적절한 Handling을 위해 timer 객체를 특정 변수에 저장해 두는 것을 언급해둔 것이다.

#### onReset과 renderAverage

```js
onReset = () => {
    this.setState({
        result: [],
    });
}

renderAverage = () => {
    const { result } = this.state;
    return result.length === 0
        ? null
        : <>
            <div>평균 시간:{this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
            <button onClick={this.onReset}>리셋</button>
        </>
}

render() {
    const { state, message } = this.state;
    return (
        <>
            <div id="screen"
                className={state}
                onClick={this.onClickScreen}
            >
                {message}
            </div>
            {this.renderAverage()}
        </>
    );
}
```

renderAverage에서 return을 보면 삼항 연산자를 통해 result 배열의 길이를 판별하고 0이면 null을 아니면 jsx문법으로 태그들을 반환하고 있다. 이는 적어도 한 번 이상의 게임을 진행 한 경우 반응속도의 평균값을 나타내 주기위함이다.  

여기서 초기화하는 버튼을 제공해 처음부터 진행할 수 있도록 onReset도 만들어 주었다.

### 전체 코드

#### ResponseCheck.css

```css
#screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
}

#screen.waiting {
    background-color: aqua;
}

#screen.ready {
    background-color: red;
    color: white;
}

#screen.now {
    background-color: greenyellow;
}
```

#### ResponseCheck.jsx

```js
import React, { Component } from 'react';

// class Component
class ResponseCheck extends Component {

    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요',
        result: [],
    }

    // 변경 되더라도 rendering 되지 않음
    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state, message, result } = this.state;
        if (state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요',
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭',
                });
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 사이에 바뀜
        } else if (state === 'ready') { // 초록색이 되기 전에 클릭한 경우
            clearTimeout(this.timeout); // Timeout 초기화
            this.setState({
                state: 'waiting',
                message: '성급하셨네요. 초록색이 되면 클릭해주세요!',
            });

        } else if (state === 'now') { // 반응 속도 체크
            this.endTime = new Date();

            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요',
                    result: [...prevState.result, this.endTime - this.startTime],
                }
            });
        }

    }

    onReset = () => {
        this.setState({
            result: [],
        });
    }

    renderAverage = () => {
        const { result } = this.state;
        return result.length === 0
            ? null
            : <>
                <div>평균 시간:{this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
                <button onClick={this.onReset}>리셋</button>
            </>
    }

    render() {
        const { state, message } = this.state;
        return (
            <>
                <div id="screen"
                    className={state}
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>
                {this.renderAverage()}
            </>
        );
    }
}

export default ResponseCheck;
```

## Hooks

```js
import React, { Component, useState, useRef } from 'react';

// Hooks
const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    // useRef의 값이 변경될때는 rendering이 실행되지 않는다.
    // useRef는 화면에 영향을 주지 않음
    const timeout = useRef(null);
    const startTime = useRef(null);
    const endTime = useRef(null);

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
            startTime = new Date();
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        } else if (state === 'ready') { // 초록색이 되기 전에 클릭한 경우
            clearTimeout(timeout.current); // Timeout 초기화
            setState('waiting');
            setMessage('성급하셨네요. 초록색이 되면 클릭해주세요!');
        } else if (state === 'now') { // 반응 속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <>
                <div>평균 시간:{result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </>
    }

    return (
        <>
            <div id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {renderAverage()}
        </>
    );
};

export default ResponseCheck;
```
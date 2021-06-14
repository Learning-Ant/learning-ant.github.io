---
layout: post
title: React, Number Baseball
description: >
  React, 숫자야구
hide_description: true
sitemap: false
date: 2021-06-09 20:20:00 +0900
category: react
---

# [React, WebGame] 반응속도 체크

> 반응속도 체크
{:.note title="attention"}

## class

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
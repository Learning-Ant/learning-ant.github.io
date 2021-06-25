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

# [React, WebGame] 숫자야구

> 이번 포스팅에서는 숫자야구를 만들어보며 React의 몇가지 기능을 소개하고, 하위 컴포넌트로 그 데이터를 넘기는 방법과 Immutable에 대해 알아보도록 한다.
{:.note title="attention"}

## class

> 먼저 숫자야구를 하기 위해선 정답을 생성해야한다. 그 번호를 생성하기 위한 함수부터 작성해보자.
{:.note title="attention"}

```js
function getNumbers() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}
```

1~9까지의 숫자들 중 하나씩 네 번 선정 한 후 배열에 넣어주고 반환해주는 함수이다.

### Component

> 답을 맞출 입력창과 그를 비교할 수 있도록 Component를 구성해본다.
{:note title="attention"}

#### State

```js
class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };
```

Component에서 필요한 state는 위와 같다.

* result : 정답여부
* value : 입력값
* answer : 만들어둔 함수롤 통해 미리 답을 생성해 저장해 둘 State
* tries : 시도한 목록을 저장할 배열

#### Render

```js
render() {
    const { result, value, tries } = this.state;
    return (
        <> {/* React.Flagment */}
            <h1>{result}</h1>
            <form onSubmit={this.onSubmitForm}>
                <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
            </form>
            {/*
                React에서는 key를 기준으로 Element의 추가, 수정, 삭제를
                판단하기 때문에 index를 key로 설정하면 배열의 순서가 바뀔 때 문제가 생긴다.
                그렇기에 항상 고유한(Unique) 값을 가지는 key를 설정해주어야 한다.
            */}
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((n, i) => {
                    return (
                        <Try key={`${i + 1}차 시도 :`} tryInfo={n} />
                    );
                })}
            </ul>
        </>
    )
}
```

앞선 포스팅에서는 `this.state`가 필요할 때마다 써줄 필요성이 있었다. 이를 `const { result, value, tries } = this.state;`와 같은 구조 분해 문법을 통해 미리 받아 준 후 보다 편하게 사용할 수 있도록 해주었다.

다른 요소들(`onSubmitForm, inputRef, onChageInput`)은 차차 만들어나가기로 하고 주의 깊게 봐야할 곳은 `tries.map`이다. 

js의 배열에는 map이라는 메소드가 존재한다. 배열의 각 요소를 callback으로 handling 할 수 있는 메소드이다. 이를 통해 각 배열의 요소를 Try라는 Component에 props로 넘겨 handling하게 된다.

#### Try Component & PureComponent

> PureComponent는 최적화에 관련된 기능이다. 해당 컴포넌트의 요소(props)가 바뀔때만 다시 rendering하게 해주는 기능을 가지고 있다.
{:.note title="attention"}

```js
import React, { PureComponent } from 'react';

class Try extends PureComponent {
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     PureComponent의 커스터마이징이 가능
    // }
    render() {
        const { tryInfo } = this.props
        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        );
    }
}

export default Try;
```

위처럼 Try component까지 만들어 줬다면 이제 onSubmitForm을 완성해, 입력했을 때 각 시도의 입력값과 스트라이크, 볼의 개수를 표시해줄 수 있게 할 수 있다.

#### onSubmitForm, onChangeInput, inputRef

onSubmitForm의 로직이 상당히 긴 관계로 onSubmitForm에 주석으로 설명을 달아두었다.

```js
onSubmitForm = (e) => {
    // 구조 분해
    const { value, tries, answer } = this.state;
    e.preventDefault();
    if (value === answer.join('')) { // 정답을 맞췄을 경우
        this.setState((prevState) => {
            // High-order function
            return {
                result: '홈런',
                // React의 Rendering은 state가 변경되어야 실행된다.
                // 그렇기때문에 원본에 push method를 쓰는 것이 아닌
                // 새로운 객체를 만들어 전달해주어야 변화를 감지한다.
                // spread syntax
                tries: [...prevState.tries, { try: value, result: '홈런!' }]
            }
        });
        alert('게임을 다시 시작합니다');
        this.setState({
            value: '',
            answer: getNumbers(),
            tries: [],
        });
    } else { // 홈런이 아닐경우
        // 입력값을 숫자의 배열로 만들어준다.
        const answerArray = value.split('').map((v) => parseInt(v));
        let strike = 0;
        let ball = 0;
        if (tries.length >= 9) { // 시도 횟수가 초과했을 경우
            this.setState({
                result: `10번 초과. 실패! 답은 ${answer.join(',')}입니다.`,
            });
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: []
            });
        } else { // 시도 횟수가 남았을 경우
            // 자릿수만큼 돌면서 strike와 ball의 개수를 구한다.
            for (let i = 0; i < 4; i++) {
                if (answerArray[i] === answer[i]) {
                    strike += 1;
                } else if (answer.includes(answerArray[i])) {
                    ball += 1;
                }
            }
            this.setState((prevState) => {
                return {
                    tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }],
                    value: '',
                }
            });
        }
    }
    this.inputRef.current.focus();
};
```

이렇게 각 strike와 ball의 수를 입력값과 정답끼리 차례로 비교하며 구한 후 이를 js의 spread 문법을 통해 setState로 전달해 새로운 객체를 전달해 준다.  

여기서 react의 immutable한 특징이 드러난다. 여기서 만약 이렇게 새로운 객체를 전달하는 것이 아닌 원본에 push로 주입해준다면 state중 하나인 tires는 원본이 그대로 유지된 것으로 판단하기 때문에 re-rendering이 일어나지 않게 된다.  

그렇기에 원본을 spread 문법으로 추가해주고, 새롭게 추가된 데이터를 마지막에 붙여 완전히 새로운 객체를 전달해 줘야만 re-rendering이 일어난다.

```js
onChangeInput = (e) => {
    this.setState({ value: e.target.value })
};

inputRef = createRef();
// onInputRef = (c) => {
//     this.inputRef = c;
//     createRef를 쓰지않는 방법은 미세한 조정이 가능하다(커스터마이징)
// }
```

onChangeInput은 이전과 달라진점이 없고, inputRef는 새롭게 `createRef()`를 사용했다. 특별한 점은 없고 요소에 접근하기위한 참조를 만들 때 딱히 조정할 부분이 없다면 craeteRef를 통해 간단하게 참조를 형성할 수 있다.

### 전체 코드

```js
import React, { Component, createRef } from 'react';
import Try from './Try';

// 4자리 난수 생성
function getNumbers() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = (e) => {
        // 구조 분해
        const { value, tries, answer } = this.state;
        e.preventDefault();
        if (value === answer.join('')) {
            this.setState((prevState) => {
                // High-order function
                return {
                    result: '홈런',
                    // React의 Rendering은 state가 변경되어야 실행된다.
                    // 그렇기때문에 원본에 push method를 쓰는 것이 아닌
                    // 새로운 객체를 만들어 전달해주어야 변화를 감지한다.
                    tries: [...prevState.tries, { try: value, result: '홈런!' }]
                }
            });
            alert('게임을 다시 시작합니다');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                this.setState({
                    result: `10번 초과. 실패! 답은 ${answer.join(',')}입니다.`,
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: []
                });
            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }],
                        value: '',
                    }
                });
            }
        }
        this.inputRef.current.focus();
    };

    onChangeInput = (e) => {
        this.setState({ value: e.target.value })
    };

    inputRef = createRef();
    // onInputRef = (c) => {
    //     this.inputRef = c;
    //     createRef를 쓰지않는 방법은 미세한 조정이 가능하다(커스터마이징)
    // }

    render() {
        const { result, value, tries } = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
                </form>
                {/*
                    React에서는 key를 기준으로 Element의 추가, 수정, 삭제를
                    판단하기 때문에 index를 key로 설정하면 배열의 순서가 바뀔 때 문제가 생긴다.
                    그렇기에 항상 고유한(Unique) 값을 가지는 key를 설정해주어야 한다.
                */}
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((n, i) => {
                        return (
                            <Try key={`${i + 1}차 시도 :`} tryInfo={n} />
                        );
                    })}
                </ul>
            </>
        )
    }
}

export default NumberBaseball;
```
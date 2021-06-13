---
layout: post
title: React, WordRelay
description: >
  React, 끝말잇기 게임
hide_description: true
sitemap: false
date: 2021-06-07 20:20:00 +0900
category: react
---

# [React, WebGame] 끝말잇기 게임

> 앞으로 React에 대해서 간단한 Web Game들을 만들어가며 하나하나씩 배워나가보려 한다.
{:.note title="attention"}

## class형 Component

> React에서 Hooks이 나오기전에는 보통 class나 함수형 Component를 사용했었다.  
> 먼저 class형 Component에 대해 알아본 후 이어서 이를 Hooks로 변경하는 방법에 대해 알아보며 둘 모두에 익숙해져 보도록 한다.
{:.note title="attention"}

먼저 Component를 편하게 사용하기 위해서는 react 모듈을 가져오는 것이 좋다.

![WordRelay](/assets/img/about-react/word-relay/docs-react.PNG)
{:.lead loading="lazy" align="center"}

React.js 공홈의 공식문서
{:.figcaption}

위 공식문서에 따르면 ES6를 사용한다면 `import React from 'react'`를, ES5라면 `var React = require('react')`를 사용하라고 한다.

```js
// ES5 with npm
const React = require('react');
const { Component } = React; // js의 구조 분해 문법

// ES6 with npm
import React, { Component } from 'react';
```

Component는 React 안에 존재하고 있다. React만 불러와도 되지만, 위와 같이 따로 구조분해문법을 통해 Component를 선언해주지 않는다면 우리는 React의 기능을 사용하기 위해 `React.~`과 같이 dot operator를 사용할 수 밖에 없다.  

### render()

> Component를 상속받은 class는 render()함수를 overriding해야한다. Component는 이 render 함수가 return 하는 요소를 화면에 뿌려주게 된다.
{:.note title="attention"}

```js
class WordRelay extends Component {
    render() {
        return (
            <h1>Hello, React!</h1>
            // render함수에서 return 되는 태그는
            // 단 하나의 최상위 태그만을 허용한다.
        );
    }
}
```

위와 같이 render함수의 return에 jsx로 작성한 요소들이 지정한 곳에 Component로 흩뿌려지게 된다. 얼핏보면 그저 HTML을 적어준 것으로 보일 수 있지만 지금 작성하는 문서는 html문서가 아니기 때문에 tag를 읽을 수 없다. 그럼에도 이러한 tag를 사용할 수 있는 이유는 react에서 보다 편하게 코드를 작성할 수 있도록 지원하는 jsx때문이다.

### State

> Component에서의 '변수'라고 할 수 있는 State가 있다. 이 State가 변경되면 Component가 새로 Rendering 되면서 변경된 State의 값이 적용되게 된다.
{:.note title="attention"}

바로 그 작성방법에 대해 알아보자. document에 따르면 state의 선언은 아래와 같이 하면 된다고 제시해준다.

```js
class WordRelay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state1 : '',
            state2 : 0,
            state3 : false,
            state4 : new Date(),
        };
    }

    render() {
        return (
            <h1>Hello, React!</h1>
        );
    }
}
```



예시처럼 state는 객체 형태로 선언해주며, 그 안에는 여러 property들이 존재한다. 이 state들의 타입은 js에서 지원하는 타입들이 모두 가능하다.  
위와 같은 방법으로도 가능하지만 constructor없이 바로 선언해주는 방법도 가능하다.

```js
class Wordrelay extends Component {
    state = {
        state1 : '',
        state2 : 0,
        state3 : false,
        state4 : new Date(), 
    }

    render() {
        return (
            <h1>Hello, React!</h1>
        );
    }
}
```

### event

> 그럼 이제 저 state들을 변경하기 위해서는 어떤 방법을 사용해야할까?  
> 어떤 이벤트가 발생할 때 state가 변경되면 Component가 새로 rendering될 것이다.
> 즉, event로 state를 변경하고 Component를 re-rendering시킨다.
{:.note title="attention"}

본격적으로 WordRelay Game을 만들어보자.  
먼저, 뼈대인 입력칸과 바로 전에 입력된 단어를 표시해줄 div를 render함수의 return으로 적어주면 다음과 같은 Component가 만들어진다.

```js
class Wordrelay extends Component {
    state = {
        word = '무지개',
        value = '',
        result = '',
    };

    render() {
        return (
            <div>
                <div>{this.state.word}</div>
                <form>
                    <input value={this.state.value} />
                    <button>입력</button>
                </form>
                <div>{this.state.result}</div>
            </div>
        );
    }
}
```

* State
    1. word : 바로 이전에 제시된 단어를 표시
    2. value : 입력칸에 입력되는 데이터
    3. result : 게임 법칙에 어긋나는지 판단한 결과 표시

하지만 실제로 입력창에 입력을 하려고하면 입력이 되지 않는다. 입력창에 입력되어있는 value가 state로 가져왔기 때문인데, React에서는 이를 event로 관리를 해주어야 한다.  

#### onChange, setState

> input에 value를 변경하는 이벤트를 input 태그에 추가하고, 거기에 할당되는 함수를 따로 설정한다.
{:.note title="attention"}

여기서 화살표 함수를 사용하는 것이 좋다. 화살표 함수를 사용해야 this binding이 좀 더 편해진다. 화살표 함수를 사용하지 않으면 bind(this)를 통해 해당 객체에 대한 binding이 필요해진다.

* setState

    State를 변경할 때는 setState를 사용하게 된다. 여기에 객체를 전달해 주면서 State안에 있는 요소를 변경할 수 있게 되는 것이다.

이를 고려해 입력창에 입력이 가능해지도록 변경하면..

```js
class WordRelay extends Component {
    state = {
        word: '무지개',
        value: '',
        result: '',
    };
    
    onChangeInput = (e) => {
        this.setState({ value: e.target.value });
    };

    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form>
                    <input value={this.state.value} onChange={this.onChangeInput} />
                    <button>입력</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}
```

추가적으로 설명하면 input의 상태가 변경(여기서는 value의 변경)이 event로 발생하면 onChange에 저장된 함수가 실행되고, setState로 전달된 객체를 토대로 WordRelay의 State가 변경된다. State가 변경되면 Component가 re-rendering되므로 입력창에 입력되어 있는 값이 변경되는 것이다. React에서는 이런식으로 입력창을 관리하게 된다.

#### Submit, ref

> submit 역시 event이므로 별로 다를 것은 없다.
{:.note title="attention"}

```js
// Form에 onSubmit을 추가
<form onSubmit={}>
    ...
</form>
```

그 후 submit할 때 작동할 로직을 함수로 만들어준다.

```js
// Submit 시 이전 단어의 끝 글자와 입력된 글자의 첫 글자를 비교하고
// 그 결과를 표시
onSubmitForm = (e) => {
    e.preventDefault(); // 기존 event 없애기
    if(this.state.word[this.state.word.length - ] === this.state.value[0]) {
        this.setState({
            result: '딩동댕',
            word: this.state.value,
            value: ''
        })
    } else {
        this.setState({
            result: '땡',
            value: ''
        })
    }
}
```

이렇게 만든 `onSubmitForm`을 `onSubmit={onSubmitForm}`에 넣어주면 submit할 때 만들어준 함수가 실행되게 된다.  

여기에 추가적으로 submit 후 입력창으로 focus를 하고 싶다면 ref를 사용하면 된다.  

우선 focus를 주고 싶은 input에 ref를 부여해 주고, 이를 저장할 공간을 선언해준다.

```js
input; // input에 대한 참조
onRefInput = (c) => {
        this.input = c;
    }
render() {
    return (
        <>
            <div>{this.state.word}</div>
            <form onSubmit={this.onSubmitForm}>
                <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
                <button>입력</button>
            </form>
            <div>{this.state.result}</div>
        </>
    );
}
```

공간에 저장하는 함수 `onRefInput`을 따로 정의하고 이를 input의 ref에 할당해준다. 이렇게 해주면 이제 input에 focus를 할 수 있게 된다.  

우리가 focus해주려는 시점이 submit한 직후이므로 이를 `onSubmitForm` 함수의 끝부분에 focus해주는 코드를 적어준다.

```js
onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
        this.setState({
            result: '딩동댕',
            word: this.state.value,
            value: '',
        });
    } else {
        this.setState({
            result: '땡',
            value: ''
        })
    }
    this.input.focus(); // focus
};
```

이렇게 그저 글자의 비교만으로 이루어지는 단순한 끝말잇기가 완성되었다.  

#### 전체 코드

```js
const React = require('react');
const { Component } = React; // class형에서 사용
// import React, { Component } from 'react';

class WordRelay extends Component {
    state = {
        word: '무지개',
        value: '',
        result: '',
    };
    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                result: '딩동댕',
                word: this.state.value,
                value: '',
            });
        } else {
            this.setState({
                result: '땡',
                value: ''
            })
        }
        this.input.focus();
    };

    onChangeInput = (e) => {
        this.setState({ value: e.target.value });
    };

    input;
    onRefInput = (c) => {
        this.input = c;
    }
    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
                    <button>입력</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

module.exports = WordRelay;
```

## Hooks

> WebGame을 진행하면서 React에서 추천하는 Hooks 역시 같이 진행할 생각이다. Hooks는 React에 생긴 최신 기능이며, 앞으로 만들 Component들은 이를 활용하길 추천하고 있다.  
> 그렇다고 이미 class형으로 만든 Component들 모두를 Hooks로 다시 만들 필요는 없다. React가 공식적으로 class형도 계속 지원할 것이라고 했으니 말이다.
{:.note title="Attention"}

Hooks에서는 class형과 달리 state를 useState를 통해 정의하고 수정한다.

예를 들어, 위에서 만든 State들을 useState를 통해 하게되면 아래와 같이 할 수 있다.

```js
const React = require('react');
const { useState } = React;
// 다음 포스팅부터는 import ~ from ~ 방식을 쓸 예정

const WordRealy = () = {
    const [word, setWord] = useState('무지개');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
}
```

기존의 class형과 비교하면 좀 귀찮아 진 것처럼 보일 수 있다. 하지만 위 과정을 제외하면 오히려 code의 양은 줄어들고, 훨씬 편한 coding이 가능해진다.  

자 그럼 이 때 state를 변경하려면 어떤 것을 써야할까? 아마 프로그래밍을 좀 해본 사람들은 감이 좀 올 것이다. `setWord, setValue, setResult`를 사용해 각각의 state를 변경할 수 있다.   

class형으로 만든 Component에서 State를 바꾸는 `onChangeInput`을 Hooks로 바꿔보면 아래와 같다.

```js
// class형
onChangeInput = (e) => {
    this.setState({ value: e.target.value });
};

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// Hooks
onChangeInput = (e) => {
    setValue(e.target.value);
}
```

둘의 차이점을 살펴보면, 일단 this가 사라졌다. class형에서 여기저기 사용된 this들이 모두 사라진다는 전조가 보인다.  
또한 특정 State의 변경을 위해 객체를 전달하던 setState와 달이 이미 setValue로써 변경하려는 State를 특정했으므로 그 값만 전달하는 모습이 보인다.  

이를 활용해 `onSubmitForm` 역시 변경해보자.

```js
// class형
onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
        this.setState({
            result: '딩동댕',
            word: this.state.value,
            value: '',
        });
    } else {
        this.setState({
            result: '땡',
            value: ''
        })
    }
    // this.input.focus();
};

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// Hooks
onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
        setResult('딩동댕');
        setWord(value);
        setValue('');
    } else {
        setResult('땡');
        setValue('');
    }
}
```

일단 focus를 수행하기 위한 ref의 변경법을 제외하고 State들을 변경하는 부분들부터 살펴보자.

예상대로 Hooks에서는 this가 사라졌다. 이렇게 code의 양이 상당히 줄어들게 된다. 또한 각 State가 무엇인지는 이미 `set~`에 명시되어 있으므로 이 또한 객체르 전달해 줄 필요없이 각각의 set으로 가능하게 되었다.  

딱 보기에도 양이 상당히 줄어들었음을 알 수 있다.

### Ref

> Hooks에서의 ref는 `useRef`를 사용한다.
{:.note title="attention"}

ref는 `useRef`를 사용해 구현할 수 있는데 기존의 class형보다 훨씬 간단해 진다.  

먼저 `useState`처럼 `useRef`를 가져와 준 후 저장할 공간을 설정해주고 거기에 `useRef`로 이를 설정한다.

```js
const React = require('react');
const { useState, useRef } = React;

const WordRelay= () => {
    const inputRef = useRef(null);

    return {
        <div>
            <form>
                ///////////////////////
                <input ref={inputRef}/>
                ///////////////////////
                <button>입력</button>
            </form>
        </div>
    };
}
```

위와 같이 ref와 useRef를 사용해 준 후 아래처럼 사용하고자 하는 곳에 `inputRef.current.focus()`를 추가해주면 된다.

```js
onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
        setResult('딩동댕');
        setWord(value);
        setValue('');
    } else {
        setResult('땡');
        setValue('');
    }
    //////////////////////////
    inputRef.current.focus();
    //////////////////////////
}
```

### 전체 코드

```js
const React = require('react');
const { useState, useRef } = React;

// Hooks
const WordRelay = () => {
    const [word, setWord] = useState('무지개');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    onSubmitForm = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]) {
            setResult('딩동댕');
            setWord(value);
            setValue('');
        } else {
            setResult('땡');
            setValue('');
        }
        inputRef.current.focus();
    }

    onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} value={value} onChange={onChangeInput} />
                <button>입력</button>
            </form>
            <div>{result}</div>
        </>
    );
};

module.exports = WordRelay;
```
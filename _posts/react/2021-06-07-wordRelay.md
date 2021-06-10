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
        if (this.state.word[this.state.word.leanth - 1] === this.state.value[0]) {
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

![WordRelay](/assets/img/about-react/word-relay/1.gif)
{:.lead loading="lazy" align="center"}

끝말잇기
{:.figcaption}

## Hooks

```js

const React = require('react');
const { useState, useRef } = React;
// const { Component } = React; // class형에서 사용

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
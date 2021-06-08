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

```js
const React = require('react');
const { Component } = React; // class형에서 사용

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
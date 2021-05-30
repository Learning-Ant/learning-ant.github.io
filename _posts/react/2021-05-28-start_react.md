---
layout: post
title: React
description: >
  React 시작하기
hide_description: true
sitemap: false
date: 2021-05-28 21:20:00 +0900
category: react
---

# [React] React 시작하기

> React를 이용해 본격적으로 프로젝트를 만들어 보기 전에 먼저 React가 무엇인지 대충 감은 잡고가보자.
{:.note title="attention"}

어떤 새로운 영역을 알아가기 위해서 가장 먼저 해야할 것은 역시 기본 개념서라고 생각한다. 개발자에게 이런 기본 개념서는 [공식 홈페이지](https://reactjs.org/)와 [공식 문서](https://reactjs.org/docs/getting-started.html)라고 생각한다.  

![React Homepage](/assets/img/about-react/start-react/react-home.PNG)
{:.lead loading="lazy" align="center"}

React 공식 홈페이지
{:.figcaption}

공식 홈페이지를 들어가면 가장 먼저 보이는 문구가 `A JavaScript library for building user interfaces`이다. UI를 구성하기 위한 JS 라이브러리라고 한다. 거기에 추가적으로 React가 가지는 강점, 특징들을 설명해 두었다.

React가 가지는 큰 특징들은 아래와 같다.

1. Component-Based

  React는 Component들을 모아 UI를 구성하게 된다. 웹페이지를 쪼개 각각의 요소(sidebar, nav, header, footer, ...)를 Componenet로 만들고, 그것을 모아 하나의 페이지를 만드는 것이다.  
  이렇게 페이지의 각 요소들을 Component로 구성하게되면 전체적인 코드의 파악이 쉬워지고, 필요한 요소를 불러올 때 import만 하면 되기때문에 코드의 중복성 역시 줄어들게 된다. 또한, Component 별로 유지 보수 할 수 있기 때문에 유지보수와 관리가 쉬워진다.

  보통 최종적으로 한 페이지에 삽입되는 Component는 다음과 같은 구성을 가지게 된다.

  ```js
  // Class형
  class App extends Component{
    this.state = {
      contents : [
        {name: 'contents1', title: 'title1', contents: 'desc1'}
        {name: 'contents2', title: 'title2', contents: 'desc2'}
        {name: 'contents3', title: 'title3', contents: 'desc3'}
        ...
      ]
      ...
    };

    render() {
      return (
        <React.Fragment>
          <Container>
            <Header />
            <Navigation />
            <Contents>
              <Article className={this.state.contents[0]} />
              <Article className={this.state.contents[1]} />
              <Article className={this.state.contents[2]} />
              ...
            </Contents>
          </Container>
        </React.Fragment>
      );
    }
  }

  // 함수형(Hooks)
  const App = () => {
    const [example, setExample] = React.useState(...);
    ...

    return (
      <React.Fragment>
        <Container>
          <Header />
          <Navigation />
          <Contents>
            <Test className={example}>
          </Contents>
        </Container>
      </React.Fragment>
    );
  }
  ```

  위 예시는 엄격하게 작성된 것이 아니다. 대충 형태만 갖춘 예시일 뿐이다.

2. Virtual DOM

  React는 가상 DOM을 가지고, 이벤트 발생 시 실제 DOM과 전후 상태를 비교해 변경이 필요한 최소한의 변경사항만 DOM에 반영해 앱의 효율성과 속도를 개선했다고 한다.  
  이 부분은 솔직히 잘 이해가 가진 않지만 핵심은 변경이 일어난 부분만 반영한다는 것일 듯 하다. 통상 웹 앱의 경우 AJAX가 아닌이상 변화가 생기면 변화를 적용해 페이지를 통째로 다시 렌더링 하게 된다. 평소에 웹을 이용할 때 이를 감지할 수 있는 경우가 어떤 버튼을 눌렀을 때 화면이 깜빡이는 경우이다. 이는 페이지 전체를 다시 Rendering해오기 때문에 어쩔 수 없이 페이지를 처음부터 다시 작성하는 것이다.  
  하지만 React는 이러한 변경사항을 적용할 DOM을 선정하고 각각 따로 Rendering한다는 의미 인 듯하다.

3. Props와 State

  * Props  
    Props는 부모 Component가 자식 Component에게 전달하는 데이터이다. 이 Props를 받은 자식 Component는 직접적인 Props 변경이 불가능하며, 이를 변경하기 위해서는 이벤트를 통해 부모 Component가 Props를 변경하도록 해야한다.

  * State
    State는 각 Component가 가지는 데이터이며, 변경 가능한 값이다. 변경 가능한 값이므로 동적인 값을 다룰 때 사용하고, 사용자와 직접적으로 상호작용을 하게 된다.

  4. Data Flow

    위의 Props와 State를 통해 React는 단방향 Data Flow를 가진다. 

  5. JSX

    JSX는 JavaScript XML로 React에서 사용되는 문법이다. 필수적으로 사용할 필요는 없다. 다만 사용시 닫는 태그를 생략하면 안된다. 컴파일 단계에서 오류를 캐치해주니 크게 걱정할 필요는 없을 듯 하다.
    
    공식문서에 나온 예시를 하나 들어보면

    ```js
    const name = 'Josh Perez';
    const element = <h1>Hello, {name}</h1>;
    ```
    
    태그를 변수에 담을수 있고, 태그 안에 '{}'를 이용해 JavaScript를 사용할 수 있게 된다.

## Node.js

> React는 의존성 관리를 npm을 통해 하게된다. 필요한 모듈들을 npm(node package manager)로 인스톨하고 관리하게 되는 것이다. 그렇기에 Node.js가 필수적이다.
{:.note title="attention"}

React를 시작하기 위해 [Node.js](https://nodejs.org/) 공식 홈페이지에서 설치부터 진행한다. 

홈페이지에서 인스톨 파일을 다운받고 설치하게 되면 가장 먼저 제대로 설치가 됐는지 확인이 필요하다. cmd를 통해 버전확인을 실시해보자.

![Node.js 버전확인](/assets/img/about-react/start-react/node-ver.PNG)
{:.lead loading="lazy" align="center"}

정상적으로 설치가 됐으면 버전이 뜬다.
{:.figcaption}

## Toolchains

> 공식 문서에 따르면 React를 이용해 Web Page를 만들 때 주로 사용하는 ToolChain들을 아래와 같이 분류해서 추천해준다.
{:.note title="attention"}

* Recommended Toolchains
  The React team primarily recommends these solutions:

  * If you’re learning React or creating a new single-page app, use <u>Create React App</u>.
  * If you’re building a server-rendered website with Node.js, try <u>Next.js</u>.
  * If you’re building a static content-oriented website, try <u>Gatsby</u>.
  * If you’re building a component library or integrating with an existing codebase, try <u>More Flexible Toolchains</u>.

사실 위와 같은 Toolchain들을 이용해 시작하면 쉽게 프로젝트를 구성할 수 있다. 하지만 이렇게 자동적으로 프로젝트를 구성해주면 솔직히 정확히 어떤 방식으로 프로젝트가 구성되는지, 설정을 어떻게 해야하는지 감을 잡기가 쉽지 않다. 편한 방법의 딜레마인 것이다.  

## 처음부터 구성하기

> npm을 통해 모든 것을 처음부터 구성해나가려 한다. 그 과정들을 세세하게 그려나가면서 어떤 모듈이 필요한지, 어떻게 공식문서를 보면서 활용할 수 있는지, 오류가 발생했을 때 어떻게 해결해야하는지 차근차근 짚어나갈 생각이다.
{:.note title="attention"}

작성중...
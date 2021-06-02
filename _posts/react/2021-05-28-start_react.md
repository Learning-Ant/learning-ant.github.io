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

  // Hooks
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

우선 프로젝트를 구성할 폴더를 하나 만든다. 앞으로 만들어나갈 Web Game을 위한 webgame 폴더를 하나 만들어 보자.

![Web Game 폴더](/assets/img/about-react/start-react/webGame_folder.png)
{:.lead loading="lazy" align="center"}

원하는 곳에 폴더를 생성한다.
{:.figcaption}

그 후 본인이 사용하는 IDE나 에디터의 console을 통해 해당 경로로 이동한다. 이제 npm(Node Package Manager)를 통해 프로젝트 폴더로 만들어준다.

![init](/assets/img/about-react/start-react/1.PNG)
{:.lead loading="lazy" align="center"}

만들고자 하는 폴더로 이동해 `npm init`을 입력
{:.figcaption}

위와 같은 명령을 입력하면 정보를 입력하는 과정에 돌입한다.

![Input info](/assets/img/about-react/start-react/2.PNG)
{:.lead loading="lazy" align="center"}

일단 본격적인 프로젝트가 아닌 연습을 위한 프로젝트이므로 나머지 정보들은 기입하지 않고, Package Name과, author, license 정도만 기입한 후 나머지는 default로 둔다.  

자 우리는 React 라이브러리로 프로젝트를 만들어나갈 예정이므로 npm을 통해 react와 react-dom을 받아줘야한다.

![react&react-dom](/assets/img/about-react/start-react/3.PNG)
{:.lead loading="lazy" align="center"}

위와 같은 `npm i react react-dom` 명령으로 설치한다. 여기까지 잘 따라왔다면 아래와 같이 몇몇 파일이 생성된다.

![Package Files](/assets/img/about-react/start-react/4.PNG)
{:.lead loading="lazy" align="center"}

새로운 파일이 생성되었으니 한번 살펴보도록 하자.

![Package.json](/assets/img/about-react/start-react/5.PNG)
{:.lead loading="lazy" align="center"}

만약 위에서 입력한 `npm i react react-dom`이 제대로 적용되었다면 `package.json`파일 안에 `"dependencies" : {"react", "react-dom"}`이 기입되어 잇을 것이다. 현재 이 프로젝트의 dependency들이 적혀있는 것이다. 실제 프로젝트라면 프로젝트가 진행 될 수록 이 dependency들이 차츰 늘어갈 것이다.

### Webpack

> React Component들의 관리를 마법같이 편하게 할 수 있도록 해주는 Webpack이라는 것이 있다.
{:.note title="attention"}

React에서는 기본적으로 한 페이지에 하나의 js파일만 가져올 수 있다고 한다. 하지만 한 페이지에는 무수히 많은 Component들이 존재할 것이다. 이런 Component들을 하나의 js파일에만 다 적어둔다면 갈수록 관리도 힘들어질 뿐더러, 수정사항이 발생할 때 마다 골치아픈 과정을 겪게 될 것이다.  
이런 Component들을 각각의 파일로 분할시켜 작성하면, 마법같은 Webpack이 이를 하나의 파일로 통합시켜준다. 이 Webpack을 사용하기 위한 설치와 설정과정을 한 번 알아보도록 하자.

![Webpack](/assets/img/about-react/start-react/6.PNG)
{:.lead loading="lazy" align="center"}

-D는 개발용 dependency로 사용하겠다는 의미
{:.figcaption}

위와 같이 webpack과 webpack-cli를 설치해준다. 그 후 다시 `package.json`를 확인해 잘 설치되었는지 확인한다.

![Webpack](/assets/img/about-react/start-react/7.PNG)
{:.lead loading="lazy" align="center"}

무사히 설치된 것이 확인 되었다면 이제 webpack을 사용하기위한 설정을 시작해본다.  

먼저, `webpack.config.js`파일을 생성해준다.

![Setting Webpack](/assets/img/about-react/start-react/8.PNG)
{:.lead loading="lazy" align="centeR"}

이 파일에는 webpack에 관한 설정들을 Templete형태로 기입해줄 것이다. webpack은 여기에 적힌 내용을 토대로 통합을 진행시켜준다.

여기까지했으면 Webpack의 설정을 진행하기 전에 먼저 프로젝트를 진행하기 위한 뼈대를 잡아보도록 하자.  

### 뼈대 만들기

![setting frames](/assets/img/about-react/start-react/9.PNG)
{:.lead loading="lazy" align="center"}

제작한 Component를 ReactDOM을 사용해 rendering할 `client.jsx`
{:.figcaption}

![setting frames](/assets/img/about-react/start-react/10.PNG)
{:.lead loading="lazy" align="center"}

React Component가 추가될 html
{:.figcaption}

![setting frames](/assets/img/about-react/start-react/13.PNG)
{:.lead loading="lazy" align="center"}

WordRelay Component가 작성될 jsx파일
{:.figcaption}

Component를 작성하는 방법에는 여러가지가 존재한다. 위의 사진은 Class형으로 제작한 방법이며, 이외에도 함수형으로도 제작이 가능하고 가장 최신에 나온 Hooks를 사용할 수도 있다. 이에 대해선 포스팅 상단에 간단한 예시로 소개해두었다.  

자 이제 webpack에 대한 설정을 시작해본다.

### Setting Webpack

일단 가장 기본적인 설정을 한 결과물을 먼저 보도록 하자.

![setting webpack](/assets/img/about-react/start-react/15.PNG)
{:.lead loading="lazy" align="center"}

위의 사진에도 간략하게 적어두었지만 다시 처음부터 설명하겠다.  

name : 은 말그대로 그저 이름이다. 편한대로 작성하면된다.

mode : 개발할때는 이 모드를 `development`로 한다. 실제로 배포단계에서는 이를 `production`으로 교체해준다.

devtool: Source-mapping 스타일을 선택하는 옵션이다. 이에 관한 자세한 사항은 [여기](https://webpack.js.org/configuration/devtool/)에서 확인할 수 있다.

resolve.extensions : `보다 편한 import를 가능하도록 하며, 같은 이름의 다른 확장자를 가진 파일들이 있을 경우 배열의 첫 확장자를 가져온다`고 설명되어있다. 보다 자세한 설명은 [여기](https://webpack.js.org/configuration/resolve/#resolveextensions)에 있다.

entry : App bundle의 시작점을 설정한다. 종속관계에 있는 파일들까지 모두 자동으로 읽어들인다. 여기에 기입된 Component들이 `webpack`명령어를 입력해주면 output에서 설정한대로 통합된다.[공식문서](https://webpack.js.org/configuration/entry-context/#entry)

output : [path](https://webpack.js.org/configuration/output/#outputpath) - 통합된 파일이 저장되는 위치, [filename](https://webpack.js.org/configuration/output/#outputfilename) - 통합 파일 이름

> create-react-app을 통해 프로젝트를 생성한 경우에도 이 webpack.config.js파일은 존재한다. CRA에서 이를 숨겨두었기에 일반적으로는 확인이 불가능하다. 하지만 CRA에서 제공하는 `npm run eject` 명령을 통해 확인이 가능하다. 하지만 한번 `eject`한 경우에는 다시 돌릴 수 없다.
{:note title="참고"}

자 이제 설정이 되었으니 실제로 잘 동작하는지 확인해보도록 하자. webpack을 구동하기위에서는 명령어 등록이 필요하다. 방법은 2가지가 있다.

1. `package.json`에서 `"dev" : "webpack"`을 script에 추가한 후 `npm run dev`를 입력해 실행
2. 추가 후 `npx webpack` 실행

먼저 `package.json`파일로 이동 후 script에 명령어를 등록한다.

![webpack 등록](/assets/img/about-react/start-react/16.PNG)
{:.lead loading="lazy" align="center"}

설정해준 후 `npm run dev`를 입력해본다.

![npm run dev](/assets/img/about-react/start-react/17.PNG)
{:.lead loading="lazy" align="center"}

개발자의 숙명 ~ The Debug ~
{:.figcaption}

당황하지 말자. 모든 오류는 오류 메세지에 그 원인과 해결법이 나와있다. 차분히 내용을 읽어보면 6번째 줄 16번째 열에서 Unexpected token이 발생해 parse에 실패했으며,
```
`You may need an appropriate loader to handle this file type`  
이런 파일 타입을 다룰 적당한 로더가 필요할거야
`currently no loaders are configured to process this file.`  
현재 이 파일을 처리하도록 구성된 로더가 없어  
```

라고 한다. 즉, jsx파일을 읽기 위한 loader가 필요하다는 의미이다. 그럼 이제 어디를 확인해야할까? 당연히 [로더에 관한 공식문서](https://webpack.js.org/concepts/#loaders)로 가면 된다. Loader의 역할이 적혀 있다. 한 번 읽어보자.

```
Out of the box, webpack only understands JavaScript and JSON files.
Loaders allow webpack to process other types of files
and convert them into valid modules [that can be consumed by your application and added to the dependency graph]

기본적으로(Out of the box), webpack은 JS과 JSON파일들만 이해할 수 있다. Loader는 webpack이 다른 타입의 파일들을 처리할 수 있도록 하고, [app에 사용되고 의존성 그래프에 추가할 수 있는] 유요한 모듈들로 변환해준다.
```

공식문서는 친절하다. 궁금한 것들에 대한 정의와 실사례들을 몇 가지씩 직접 제공해주니 이 만한 교과서가 따로 없다.  
결국 종합하면 내가 만든 jsx확장자를 webpack은 이해할 수 없으니까 loader라는 번역기를 option으로 지정해 주어야 한다는 의미이다. 그러기 위해서는 loader module을 설치해야한다. 여기서 우리가 필요한 것은 jsx를 번역해줄 babel-loader이다. 여기에 추가적으로 필요한 plugin들을 모아둔 preset들도 같이 받아주도록 한다.

```
npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react 
```
위의 명령어를 통해 필요한 모듈들을 설치한다. 각 모듈들은 아래와 같은 역할을 한다.

* babel-loader - babel과 webpack 연결
* @babel/core - 바벨의 기본적인 것이 들어있음
* @babel/preset-env - 각자의 브라우저에 맞게 최신문법을 예전 문법으로 바꿔줌
* @babel/preset-react - jsx를 지원

필요한 모듈들을 설치했으니 이제 이를 webpack.config.js에 적용시켜보자.

공식문서에 따르면 

![babel loader](/assets/img/about-react/start-react/babelLoader_docs.png)
{:.lead loading="lazy" align="center"}

모든 것이 들어있는 공식문서
{:.figcaption}

위와 같이 정규표현식으로 확장자를 지정해 test의 옵션으로 전달하고  
exclude는 오류를 일으킬 수 있는 module들을 설정해 제외시키며  
loader에는 사용할 loader를,  
options안에 preset과 plugin들을 기입한다.

예시를 토대로 작성해보도록 하자.

```js
rules: [{
  test: /\.jsx?/, // 규칙을 적용할 파일들(정규표현식)
  // exclude: 제외할 것이 딱히 없다.
  use: {
    loader: 'babel-loader', // babel-loader를 적용
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      // plugins: 딱히 적용할 plugins이 없다.
    }
  }
}]
```

이제 설정한 것을 적용하고 `npm run dev`를 실행해보자. 위에 적어준대로 했다면 dist 폴더에 `app.js`라는 파일이 생성되었을 것이다. 그 파일을 열어보면 도무지 알 수 없는 코드들이 엄청난 양으로 적혀있다.

![app.js](/assets/img/about-react/start-react/18.PNG)
{:.lead loading="lazy" align="center"}

난독화된 코드이기에 거의 읽을 수 없다.
{:.figcaption}

### Hello, World!

> Hello, webpack!
{:.note title="attention"}

개발자라면 시작할 때 항상 하는 것이 있다. 그것을 해보도록 한다.

먼저 이전에 만들어둔 `WordRelay.jsx`파일로 이동한다. 그 후 아래와 같이 작성한다.

![Hello, webpack](/assets/img/about-react/start-react/22.PNG)
{:.lead loading="lazy" align="center"}

~~아.. Hello, React로 했어야 했는데..~~
{:.figcaption}

위와 같이 작성한 후 console에 `npm run dev` 명령을 입력해주면 complie을 시작한다. 이제 html 파일을 열어보면 아래와 같이 무사히 Hello, webpack!이 뜨는 것을 볼 수 있다!

![Hello, webpack](/assets/img/about-react/start-react/23.PNG)
{:.lead loading="lazy" align="center"}

## 마무리

> 가장 기본적인 설정들은 끝이 났다. 다음 포스팅에서는 Server를 설정해 일정 포트를 로컬 서버로 사용할 수 있도록 설정하는 방법에 대해서 알아보도록 하겠다.
---
layout: post
title: React, Server
description: >
  React Local Server 구성
hide_description: true
sitemap: false
date: 2021-06-05 20:20:00 +0900
category: react
---

# [React] Local Server

> 웹 앱을 개발할 때 항상 빌드의 과정을 거치면서 개발을 해가거나, 디버깅을 하는 것은 개발이 진행 될 수록 많은 시간이 걸리기 마련이다. 이런 수정사항을 감지하고 자동으로 빌드와 새로고침을 진행해주는 모듈이 있다. 이런 모듈과 함께 Local Server를 구성하는 방법에 대해 알아보도록 한다.
{:.note title="attention"}

먼저 개발용 server를 구현하기 위한 모듈을 설치한다. 

![webpack-dev-serve](/assets/img/about-react/start-react/27.PNG)
{:.lead loading="lazy" align="center"}

Local Server를 구현하기위한 모듈
{:.figcaption}

추가적으로 변화를 감지하고 자동으로 새로고침을 진행해주는 핫 리로딩 모듈도 같이 설치해준다.

![Hot-Reloading](/assets/img/about-react/start-react/26-hotReloadingStart.PNG)
{:.lead loading="lazy" align="center"}

핫 리로딩을 구현하기 위한 모듈.
{:.figcaption}

[@pmmmwh/react-refresh-webpack-plugin, Github](https://github.com/pmmmwh/react-refresh-webpack-plugin)

위 Github에 들어가보면 좀 더 자세한 사용방법이 나온다. 이를 따라 우리도 그에 맞는 환경설정을 해보도록 한다.

우선 `webpack.config.js`로 가서 환경설정을 진행해본다. Hot-Reloading을 구현하기 위해 다음과 같이 모듈을 불러온다.

![RefreshWebpackPlugin](/assets/img/about-react/start-react/29.PNG)
{:.lead loading="lazy" align="center"}

`RefreshWebpackPlugin`를 `@pmmmwh/react-refresh-webpack-plugin`으로부터 가져온다.
{:.figcaption}

그 후 plugins에 가져온 `RefreshWebpackPlugin`을 기입해 준다.

![Plugins](/assets/img/about-react/start-react/30.PNG)
{:.lead loading="lazy" align="center"}

module안에도 plugin을 기입해준다.

![module:plugins](/assets/img/about-react/start-react/31.PNG)
{:.lead loading="lazy" align="center"}

마지막으로 개발용 서버에 관한 정보 역시 기입해주어야 한다.

![devServer](/assets/img/about-react/start-react/32.PNG)
{:.lead loading="lazy" align="center"}

`devServer: {publicPath, hot}`
{:.figcaption}

그 후 마지막으로 이전까지는 webpack으로 실행했던 script를 수정해준다. 여기까지 진행한다면 이제 webpack 명령어를 통한 빌드 작업없이 서버를 켜두면 수정작업이 즉각적으로 hot-reloading되면서 반영 될 것이다.

![scripts](/assets/img/about-react/start-react/28.PNG)
{:.lead loading="lazy" align="center"}

## Port Error

![Port Error](/assets/img/about-react/start-react/33-run_dev_port_error.PNG)
{:.lead loading="lazy" align="center"}

아마 8080 Port를 이미 다른 어플리케이션이 사용하고 있을 경우 위와 같은 에러가 발생할 것이다. 처음에 이 에러를 봤을 때 문득 예전에 Spring을 배우면서 설정한 Oracle의 Port가 8080이었던 것이 생각났다.

에러 역시 `Permission denied 127.0.0.1:8080`이라고 뜬 것을 알 수 있다. 먼저 정말 8080을 사용하고 있는지 확인해보자.

cmd를 켠 후 `netstat -ano`를 쳐보면 현재 등록되어 있는 모든 포트에 대한 정보들을 알 수 있다. 이 중 알고싶은 포트는 8080이므로 이를 찾아보면..

![8080 port](/assets/img/about-react/start-react/34.PNG)
{:.lead loading="lazy" align="center"}

이 정보를 가지고 어떤 앱이 이를 사용중인지는 작업관리자를 통해 알 수 있다.

![tns_listener](/assets/img/about-react/start-react/35-tns_listener(Oracle).PNG)
{:.lead loading="lazy" align="center"}

작업관리자를 통해 3092의 PID를 가지는 프로그램을 확인해보면 `TNSLSNR.EXE`가 보인다. 이게 무엇인지 구글링해보니 역시나 Oracle이었다.  

자, 그렇다면 이제 오라클은 공부할 때 사용해야하므로 React를 공부하기위한 포트를 따로 설정해주도록 하자.  

역시 공식문서를 확인해보면 Port를 설정할 수 있도록 되어있음을 알 수 있다.

![Port Error](/assets/img/about-react/start-react/33-run_dev_port_error-1.PNG)
{:.lead loading="lazy" align="center"}

공식문서처럼 Port번호를 설정해주도록 하자. 아마 Spring을 배울 때 Tomcat의 Port도 8090으로 해두었던 것 같지만, 아마 React와 Tomcat을 동시에 사용할 것 같진 않으니 8090으로 설정해보도록 하겠다.

![Port Error](/assets/img/about-react/start-react/36.PNG)
{:.lead loading="lazy" align="center"}

그 후 다시 콘솔에서 `npm run dev`를 입력해보면..

## Typo

![Port Error](/assets/img/about-react/start-react/37.PNG)
{:.lead loading="lazy" align="center"}

![Port Error](/assets/img/about-react/start-react/38.PNG)
{:.lead loading="lazy" align="center"}

이번에도 역시 에러를 살펴보면 build에 실패했고, 알 수 없는 browser query가 있다고 한다. 이 전에 한국에서 5%이상의 점유율을 가지는 browser를 target에 적어두었던 부분이 문제가 생겼다. <u>5%라 적어야하는데 %5라 적어</u> 생긴 오류이다.

![Port Error](/assets/img/about-react/start-react/39.PNG)
{:.lead loading="lazy" align="center"}

고쳐준 후 다시 `npm run dev`를 콘솔에 적어주면 아래와 같이 성공적으로 진행된 것을 볼 수 있을 것이다.

![Port Error](/assets/img/about-react/start-react/40.PNG)
{:.lead loading="lazy" align="center"}

가장 위에 적힌 `Project is running at http://localhost:8090`을 클릭하거나(IDE에 따라 지원이 될 수도 되지 않을 수도 있음) 인터넷 주소창에 똑같이 적어주면 아래처럼 무사히 접근 가능하다.

![Port Error](/assets/img/about-react/start-react/41.PNG)
{:.lead loading="lazy" align="center"}

여기까지 Local Server를 구성하고 Hot-Reloading으로 좀 더 편하게 개발할 수 있는 환경을 세팅했다. 다음 포스팅부터는 WebGame을 만들면서 React에 관해 하나하나 알아가는 시간을 가져보도록 하겠다.
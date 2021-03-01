---
layout: post
title: First-step
description: >
  쉬워보이는 일도 해보면 어렵다. 못할 것 같은 일도 시작 해 놓으면 이루어진다. - 채근담
hide_description: true
sitemap: false
tag: [blog]
---

# 시작은...

&nbsp;&nbsp; 언젠가 내가 공부하는 내용들을 나만의 공간에 정리하고 싶다는 생각이 들었었다. 그 생각을 하고, 자료를 찾아보면서 **_아 생각보다 쉽겠는데?_** 라고 생각한 내 자신을 반성한다.
[![Github](https://img.shields.io/badge/Github-Pages-181717?style=flat-square&logo=Github&logoColor=white)](https://pages.github.com/)
와
[![Jekyll](https://img.shields.io/badge/Jekyll-CC0000?style=flat-square&logo=Jekyll&logoColor=white)](http://jekyllrb-ko.github.io/)
을 이용하기 위해
[![Ruby](https://img.shields.io/badge/Ruby-CC342D?style=flat-square&logo=Ruby&logoColor=white)](https://www.ruby-lang.org/ko/)
에서부터 시작했던 어제(2021-01-24 일요일) 하루를 복기하면서 과정을 적어보려 한다.<br/>
&nbsp;&nbsp; 솔직히 시작은 구글에 올라온 수 많은 글들을 읽고 그대로 따라하면 쉽게 될 줄 알았다. 이 오산이 내 하루를 통째로 날려버릴 줄은 상상도 못하고 말이다.

&nbsp;&nbsp; 잡설은 여기까지 하도록하고, 본론으로 들어가보자.

---

## 개념

<br/>

- [![Github](https://img.shields.io/badge/Github-Pages-181717?style=flat-square&logo=Github&logoColor=white)](https://pages.github.com/)

  *Github Pages*는 *Github Repository*를 이용해 자신만의 사이트를 만들 수 있도록 Github에서 제공하는 서비스라고 할 수 있다.

- [![Jekyll](https://img.shields.io/badge/Jekyll-CC0000?style=flat-square&logo=Jekyll&logoColor=white)](http://jekyllrb-ko.github.io/)

  *Github Page*를 제작하는 일종의 프로그램인데, *Ruby*로 만들어져 있어 사용하려면 *Ruby*의 설치가 필수적이다. 꼭 이걸 설치해야하는 것인지 의문이 있었는데 사실 하나하나의 변경사항들을 로컬환경에서 즉각적으로 확인하기 위해서 사용하는 것 같다. 그냥 repository에 무한 commit하면서 확인해도.. 블로그를 꾸리는 것이 가능하긴 할 것 같다는 것이 내 생각이다. 아마 Jekyll을 붙잡고 있는 시간이 2일이상 지났었다면 포기하고 일단 repository로만 블로그 작성을 진행했지 않았을까..

- [![Ruby](https://img.shields.io/badge/Ruby-CC342D?style=flat-square&logo=Ruby&logoColor=white)](https://www.ruby-lang.org/ko/)

  *Jekyll*을 사용하기 위해 필수적으로 사용해야하는 '언어'이다.

## 설치

<br/>

> 위의 설명을 읽었다면 예상이 가능할 것이다.  
> 우리는 먼저 *Ruby*를 설치해야한다.  
> 나는 먼저 버전을 *Github Pages*와 일치시키기 위해 [_Github Pages의 Dependencies_](https://pages.github.com/versions/)를 확인했다.  
> 이 글을 적고 있는 현재 _Ruby_ 2.7.1 버전을 사용하고 있는데 _Ruby_ 홈페이지에 가보면 ver 2.7.2를 안정 릴리즈로 채택하고 있어 [2.7.2 버전](https://rubyinstaller.org/downloads/)을 사용했다.
>
> ## 이 글은 Windows 환경으로 진행하니 MacOS나 Linux 등 다른 OS는 다른 글을 참고하길 바란다.

<br/>

1.  위의 링크를 통해 RubyInstaller를 설치한다. 그 후 Installer를 통해 설치를 진행한다.  
    이 과정에서 **설치 경로**만 주의하자.  
    필자는 이 설치경로를 `C:\Program Files`에 했다가 3시간 정도 날린 기억이 있다. 설치경로 상에 띄어쓰기가 있을 경우 제대로 설치가 안되는 것 같다. 띄어쓰기로 인해 안되는 것을 보면 아마 경로 상에 한글도 주의해야 하지 않을까.

2.  만약 설치가 모두 끝났다면 아래 화면이 나올 것이다.

    ![Install_Ruby](/assets/img/Get-Start/Install_Ruby2.PNG)
    {:.lead loading="lazy" align="center"}

    - 이제 여기서 **숫자 1**을 입력해 주고 엔터!
    - 그럼 알아서 무언가를 설치하기 시작할 것이다. 기다리도록 하자.

3.  무사히 설치 되었는지 확인하기 위해 cmd를 실행한다. 아마 github blog를 시작하려는 사람이면 cmd가 무엇인지는 따로 설명하지 않아도 알 것이다. `ruby -v`로 버전을 확인하고 추가적으로 `chcp 65001`을 입력해 인코딩방식을 UTF-8로 변경해 준다.

    ```cmd
    ruby -v
    ruby 2.7.2~~

    chcp 65001
    Active code page: 65001
    ```

4.  자 이제 *Ruby*의 설치는 모두 끝이 났다. 테마를 가져올 차례다. 테마소스를 저장해 둘 폴더를 만들어두고 테마를 받는다. 선정해둔 테마가 없다면 찾아보도록 하고, 미리 선정해둔 테마가 있다면 해당 Theme Repository를 자신의 Github repository로 Fork해오도록 하자

    > 참고로 필자가 사용한 Theme는 [HydeJack](https://github.com/hydecorp/hydejack)이다. 기본적으로 이 테마는 Github에서 지원하지 않는다고 한다. 그래서 로컬환경에서 구성해야한다는 말이 있던데 그 때문인지 commit할 때마다 내 구글계정에 (지원하지 않는다는)메일이 하나하나씩 쌓이고 있다...

    설명의 기준은 현재 적용하고 있는 HydeJack Theme로 하도록 하겠다.

    ![Git_Fork1](/assets/img/Get-Start/Git_Fork1.png)
    {:.lead loading="lazy" align="center"}
    ![Git_Fork2](/assets/img/Get-Start/Git_Fork3.png)
    {:.lead loading="lazy" align="center"}
    ![Git_Fork3](/assets/img/Get-Start/Git_Fork4.png)
    필자는 이미 만들어 두었기 때문에 에러가 뜬다.
    {:.figcaption}

    이렇게 자신의 repository로 Fork해오는 것에 성공했다면 해당 repository의 URL을 복사해온다. 그 후 **_Git Bash_**를 켠다.

    ```bash
    cd /d/Blog
    git clone {복사한 URL}
    # 여기까지하면 본인의 directory안으로 소스파일들이 다운로드 된다.
    ```

5.  자 이제 본인의 로컬환경에서 하기 자신만의 블로그로 편집하기 위해 *Start Command Prompt with Ruby*를 켠다. 시작 메뉴에 있다.

    ![Install_Jekyll](/assets/img/Get-Start/Install_Jekyll1.png)
    {:.lead loading="lazy" align="center"}

    ![Install_Jekyll](/assets/img/Get-Start/Install_Jekyll2.PNG)
    {:.lead loading="lazy" align="center"}
    cmd와 같은 창이 뜬다.
    {:.figcaption}

    다른 블로그들 같은 경우에 이 때, bundler와 jekyll을 다 깔으라고 되어 있는데 HydeJack에서 설명하는 방법은 약간 다르다.

    ```ruby
    cd {복사한 경로}
    # 필자의 경우 cd d:\Blog\learning-ant.github.io
    # change directory command로 드라이브가 변경되는 경우
    # 해당 드라이브를 한 번 더 쳐주는 것을 잊지 말 것.
    # d:

    gem install bundler

    bundle install

    bundle exec jekyll serve
    ```

    위와 같은 과정을 수행하면 된다고 나온다.

    > 여기서 엄청난 고통의 시간을 가졌다. 저 순서로 아무리 진행해도 진행이 되질 않았다. 더군다나 이 글을 쓰려고 trouble shooting을 해결하는 과정들을 스크린샷으로 남겨 두었었는데, 그 파일들을 실수로 다 날려버렸다... ~~아주 멍청하다. 욕해도 좋다~~.  
    >  그래도 기억나는대로 써보고자 한다.

    - 위의 *Ruby*코드를 실행하면 `gem install bundler`까지는 무난하게 잘 install이 진행된다. **But** bundle install 과정에서 github-pages와 jekyll에 관련된 어떤부분에서 충돌이 일어나거나 찾을 수 없다는 오류가 발생한다.  
       이를 고치기 위해 먼저 \_config.yml 파일과 Gemfile을 살펴봤다.  
       ~~사실 아래의 과정들은 HydeJack Install 설명을 읽어보고 미리 했었어야하는 과정인데 읽어보지 않고 진행했었다.~~

      ![config파일수정](/assets/img/Get-Start/config.PNG)
      {:.lead loading="lazy" align="center"}
      \_config.yml파일의 #Theme부분에 `remote_theme: hydecorp/hydejack@v9.0.0-rc.6`을 추가해준다.
      {:.figcaption}

      ![Gem파일수정](/assets/img/Get-Start/Gemfile.PNG)
      {:.lead loading="lazy" align="center"}
      가장 처음에는 `gem "jekyll"`이 부분 뒤에 최소버전 조건이 있다. 최소 버전보다 높은 버전의 jekyll을 깔아도 계속적으로 충돌이 일어나서 아예 해당 부분의 최소버전 조건을 삭제했다.
      {:.figcaption}

    - 이 부분 외에도 여러 오류가 있었던 것 같은데 기억의 한계로 인해 어떻게 해결했는지 까먹었다..

6.  이제 다시 위의 `bundle exec jekyll serve`를 입력하면 아래와 같은 화면이 나올 것이다.

    ![성공!](/assets/img/Get-Start/success.PNG)
    {:.lead loading="lazy" align="center"}
    실제로 이 화면이 떴을때 필자는 입에서 저절로 탄성이 나왔다.
    {:.figcaption}

7.  이제 [https://127.0.0.1:4000](https://127.0.0.1:4000) 혹은 [https://localhost:4000](https://localhost:4000) 으로 접속해보자.

    ![성공웹페이지](/assets/img/Get-Start/success-blog.png)
    {:.lead loading="lazy" align="center"}
    대단히 감격스러운 페이지의 모습
    {:.figcaption}

---

## 마침내..

그저 공부하는 것들을 정리하기 위해 만들고자 한 블로그였는데, 블로그 자체를 만드는 것도 공부해야 제대로 사용할 수 있었다. 이렇게 알아내기까지의 과정은 쉽지 않았지만, 문제가 발생했을 때 어디서 문제가 발생했는지, 어떤 부분을 수정해야할지 등등 하나하나 해결해가며 마침내 오류없이 실행 될 때의 그 기쁨은 어떤 것과도 비교할 수 없다고 생각한다.  
더군다나 아무리 생각해도 jekyll을 까는 이유는 로컬에서 어떤 요소를 바꿨을 때 어떻게 바뀌는지 즉각적으로 확인하기 위함인 듯해서.. 오류가 해결될 기미가 보이지 않을 때는 포기하고 Github으로 일일이 commit하면서 확인할까싶기도 했다.

결론적으로는 로컬환경에서 미리미리 볼 수 있어서 \_config.yml의 어떤 요소가 어떤 역할을 하는지, 각 md파일의 설정 요소엔 어떤 것들이 있는지 등 이 테마의 구조파악에 크나큰 도움이 되고 있다.  
아직 모든 구조와 요소들을 파악하지는 못했지만 여러 글들을 포스팅하면서 알아갈 생각이다.

~~about.md랑 다른 것들은 또 언제 바꾸나..~~

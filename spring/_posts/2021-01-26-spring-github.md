---
layout: page
title: Remote Repository(Github)에 있는 프로젝트 Import하기
description: >
  .gitignore를 설정하고 github에 자료를 올리면 .project파일이 없어 IDE가 프로젝트로 인식하지 못한다.  
  이를 해결하기 위해 작성하는 포스팅
hide_description: false
sitemap: false
related_posts:
---

## Spring-Tool-Suite에서 Import하기

1. 먼저 프로젝트를 불러와서 저장할 폴더를 만듭니다.
  저는 `SPRING0914/project/workspace`의 경로로 폴더를 생성했습니다.
  이제 이 경로를 sts로 실행해줍니다.

2. package explorer에서 우클릭 한 후 `import...` 을 선택합니다.

![step1](/assets/img/Remote/sts1.png)
{:.lead width="800" align="center" loading="lazy"}

3. 목록에서 Git → Projects from Git을 선택합니다.

![step2](/assets/img/Remote/sts2.png)
{:.lead width="800" align="center" loading="lazy"}

4. Clone URI를 선택합니다.

![step3](/assets/img/Remote/sts3.png)
{:.lead width="800" align="center" loading="lazy"}

5. github에서 repository url를 복사해옵니다.

![step4](/assets/img/Remote/sts4.png)
{:.lead width="800" align="center" loading="lazy"}

6. 가져오려는 branch를 선택하고 next를 누릅니다.

![step5](/assets/img/Remote/sts5.png)
{:.lead width="800" align="center" loading="lazy"}

7. 원격저장소에 있는 프로젝트를 불러와서 local에 저장할 위치를 선택합니다.

![step6](/assets/img/Remote/sts6.png)
{:.lead width="800" align="center" loading="lazy"}

8. 생성한 폴더를 선택해주고, 

![step7](/assets/img/Remote/sts7.png)
{:.lead width="800" align="center" loading="lazy"}

9. 그 후 NEXT 클릭

![step8](/assets/img/Remote/sts8.png)
{:.lead width="800" align="center" loading="lazy"}

10. 누르면 아래 화면처럼 import as general project가 선택되어 있고 가져올 수 있는 Working Tree목록이 나옵니다.
딱히 바꿀 필요 없으니 그대로 Next를 눌러줍니다.

![step9](/assets/img/Remote/sts9.png)
{:.lead width="800" align="center" loading="lazy"}

11. IDE project explorer에 표시될 프로젝트 이름을 적는건데 자신이 원하는 이름으로 바꾸셔도 됩니다. Finish를 눌러줍니다.

![step10](/assets/img/Remote/sts10.png)
{:.lead width="800" align="center" loading="lazy"}

12. 이제 project explorer에 아래처럼 프로젝트가 생성되는데 소스파일만 존재하기 때문에 maven 프로젝트로 인식하지 않습니다.  
한 가지 과정을 거쳐 자동으로 설정들을 적용해 줄 수 있도록 합니다.

![step11](/assets/img/Remote/sts11.jpg)
{:.lead width="800" align="center" loading="lazy"}

13. 프로젝트에서 우클릭을 한 후 Configure ⇒ Convert to Maven Project를 선택합니다.

![step12](/assets/img/Remote/sts12.png)
{:.lead width="800" align="center" loading="lazy"}

<br/>

![step13](/assets/img/Remote/sts13.jpg)
{:.lead width="800" align="center" loading="lazy"}
완성!
{:.figcaption}


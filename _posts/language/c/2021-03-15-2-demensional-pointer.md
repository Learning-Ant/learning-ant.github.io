---
layout: post
title: 다차원 배열과 포인터
description: >
  다차원 배열이름의 포인터 형
hide_description: true
sitemap: false
date: 2021-03-15 19:21:00 +0900
category: language
tag: [c]
---

# 다차원 배열과 포인터의 관계

## 2차원 배열이름의 포인터형

> 앞서 1차원 배열이름의 포인터형에 대해서 배웠다. 또한 배열을 함수의 매개변수로 받으려 할 때 매개변수를 어떤 타입으로 선언해주어야 하는지 역시 배운 상태이다. 그렇다면 2차원 배열이름의 포인터형은 어떻게 될까?
{:.note title="attention"}

### 2차원 배열이름의 포인터 타입

* 1차원 배열 이름의 포인터 타입을 결정하는 포인트
  * 포인터가 가리키는 요소의 자료형
  * 포인터 연산 시 증가하는 바이트의 크기
* 1차원 배열이름
  * 배열 이름이 가리키는 요소의 자료형이 일치 한다면 포인터 연산 시 증가하는 값의 크기도 일치한다.
  * 따라서 1차원 배열이름의 경우 가리키는 요소만 참조한다.

* 다차우너 배열의 포인터 타입을 결정하는 포인트
  * 포인터가 가리키는 요소의 자료형
  * 포인터 연산 시 증가하는 바이트의 크기
* 2차원 배열이름
  * 포인터가 가리키는 요소의 <u>자료형이 같다 하더라도</u> 포인터 연산 시 증가하는 값의 크기가 일치하지 않는다.
  * 포인터 연산 결과도 생각해 봐야한다.

```c
//2DArrayAddress.c
#include <stdio.h>

int main(void)
{
  int arr2d[3][3];
  printf("%d \n", arr2d);
  printf("%d \n", arr2d[0]);
  printf("%d \n\n", &arr2d[0][0]);

  printf("%d \n", arr2d[1]);
  printf("%d \n\n", &arr2d[1][0]);

  printf("%d \n", arr2d[2]);
  printf("%d \n\n", &arr2d[2][0]);

  printf("sizeof(arr2d): %d \n", sizeof(arr2d));
  printf("sizeof(arr2d[0]): %d \n", sizeof(arr2d[0]));
  printf("sizeof(arr2d[1]): %d \n", sizeof(arr2d[1]));
  printf("sizeof(arr2d[2]): %d \n", sizeof(arr2d[2]));
  
  return 0;
}

// 실행결과
6422000
6422000
6422000

6422012
6422012

6422024
6422024

sizeof(arr2d): 36
sizeof(arr2d[0]): 12
sizeof(arr2d[1]): 12
sizeof(arr2d[2]): 12
```

&nbsp;&nbsp;실행 시 나오는 결과를 보면 결국 arr2d[i]도 역시 포인터라고 볼수 있다는 점이다. arr2d[i]는 arr2d의 i+1번째 행을 의미하고, 해당 행의 첫번째 요소를 가리킨다고 할 수 있다. 그렇다면 2차원 배열이름으로 포인터연산을 실행한다면 어떤 결과를 얻을 수 있을까?

```c
#include <stdio.h>

int main(void)
{
  int a[3][2] = {1, 2, 3 ,4 , 5, 6};

  printf("a : %d \n", a);
  printf("a+1 : %d \n", a + 1);
  printf("a+2 : %d \n", a + 2);

  return 0;
}

// 실행결과
6422000
6422008
6422016
```

&nbsp;&nbsp;결과를 보면 8byte단위로 포인터 연산이 수행되는 것을 알 수 있다. 이는 한 행이 int형(4byte) 두 열로 이루어져 있기때문이라는 것은 쉽게 유추할 수 있다. 

![2차원 배열이름](/assets/img/language/c/2d_array_i.png)
{:.lead loading="lazy" align="center"}

결국 2차원 배열의 포인터 연산은 각 행과 매칭된다는 것을 알 수 있다.
{:.figcaption}

### 2차원 배열 이름의 특성 이해

![2차원 배열이름 특성](/assets/img/language/c/2d_array_result.png)
{:.lead loading="lazy" align="center"}

&nbsp;&nbsp;앞에서 `a[i] == *(a + 1)`라는 것을 실제로 구현해보고, 결론으로써 도출해냈었다. 그렇다면 2차원 배열에서도 이것이 유효할까? 소스코드를 통해 구현하고 결과를 보도록 하자.

```c
#include <stdio.h>

int main(void)
{
  int a[3][2] = {1, 2, 3, 4, 5, 6}l

  printf("a + 1 : %d \n", sizeof(a + 1));

  printf("a + 1 : %d \n", sizeof(a[1]));
  printf("a + 1 : %d \n", sizeof(*(a + 1)));

  return 0;
}

// 실행결과
a + 1 : 4
a + 1 : 8
a + 1 : 8
```

&nbsp;&nbsp;위 결과에서 보듯 단순히 배열이름의 연산을 통해 계산한 sizeof의 크기는 int형의 크기를 나타내고, a + 1를 참조하여 값을 가져온 데이터의 크기는 그 두배의 크기를 나타낸다. 이는 한 행 전체의 데이터를 가지고 있다는 의미이다.  
&nbsp;&nbsp;추가적으로 알 수 있는 사실은 열의 수에 따라 배열이름의 포인터형이 달라진다는 것이다. `int a[3][2]`의 경우 배열이름의 포인터형은 가리키는 대상이 int형 변수이며, 연산 시 8byte의 크기단위로 값이 증가 및 감소하는 포인터형이다. 그렇다면 일반화시켰을 때 `int a[n][m]`은 배열이름 a의 포인터형은 가리키는 대상이 int형 변수이며, 연산 시 (4byte × m)의 크기 단위로 값이 증가 및 감소한느 포인터형이라고 할 수 있다.
&nbsp;&nbsp;이러한 유형의 포인터 변수 선언은 `int (*pArr)[m];`과 같이 할 수 있다.

![2차원 배열이름과 포인터형](/assets/img/language/c/array_pointertype.png)
{:.lead loading="lazy" align="center"}

2차원 배열 이름에 일치하는 포인터 선언
{:.figcaption}

### 매개변수로 선언되는 포인터의 또 다른 표현

![2차원 배열이름과 포인터형](/assets/img/language/c/arr_name_parameter.png)
{:.lead loading="lazy" align="center"}

다른 표현 방식
{:.figcaption}

> 그림에서처럼 두 표현방식이 같은 의미를 가잘 때는 <u>매개변수</u>로써 쓰일 때 뿐이라는 점을 잊지않도록 하자. 
{:.note title="주의"}

### '배열 포인터'와 '포인터 배열'

> 앞서 배운 `배열 포인터`와 `포인터 배열`을 혼동하지 않도록 한다.
{:.note title="attention"}

![배열포인터와 포인터배열](/assets/img/language/c/arr's_pointer&pointer's_arr.png)
{:.lead loading="lazy" align="center"}

배열 포인터와 포인터 배열
{:.figcaption}

### 다양한 형태의 배열 요소 접근 방법

> 아래 세 코드는 각각 같은 의미를 지닌다.
{:.note title="attention"}

* `a[1][0] == (*(a + 1))[0];`
* `a[1][2] == *(a[1] + 2);`
* `a[2][1] == *(*(a + 2) + 1);`

---

&nbsp;&nbsp;2차원 배열이름과 포인터까지 알아보았다. 이전 내용까지는 그럭저럭 쉽게 이해하고 넘어올 수 있었다. 하지만 이번 단원은 확실하게 이해했다는 느낌이 들지 않는다. 이 개념을 프로그래밍 할 때 어떻게 활용해야할지 감이 잡히지 않는다. 솔직히 java를 먼저 배웠던 입장에서는 포인터를 굳이 배열에서 꼭 사용해야하는지 아직까지는 의구심만 들 뿐이다. 독학이지만 후에 자료구조를 공부할 때 구현을 직접 해보면서 의구심을 없애는 것도 나쁘진 않을 것 같다. 물론 자료구조 들어가기전까지 틈틈히 관련 예제나 개념도 확실히 잡아두겠지만..
---
layout: post
title: 모듈화 프로그래밍
description: >
  소스파일의 분할과 헤더파일 디자인에 대해 알아보자.
hide_description: true
sitemap: false
date: 2021-03-21 19:52:00 +0900
category: language
tag: [c]
---

# 모듈화 프로그래밍

## 프로그래밍의 모듈화

### 모듈(module)이란 무엇인가?

* 프로그램을 구성하는 구성 요소의 일부이다.
* 관련된 데이터와 함수들이 묶여서 모듈을 형성한다.
* 파일 단위로 나뉘는 것이 보통이다.

```
비디오 관리 시스템
ㄴ고객
  ㄴ vip
  ㄴ 일반
  ㄴ 블랙리스트
ㄴ비디오(Item)
  ㄴ ...
ㄴ회계관리
  ㄴ ...
```

&nbsp;&nbsp;위와 같이 프로그램을 단위별로 쪼개다보면 가장 작은 단위는 함수가 되고, 이 함수도 하나의 모듈이다. 이처럼 모듈이라는 것은 그 크기가 딱 정해져 있지 않다.  
즉, 기능별로 나뉘어지는 프로그램의 영역을 `모듈`이라고 한다.

### 모듈화 프로그래밍

* 기능별로 파일을 나눠가며 프로그래밍하는 것이다.
* 유지 보수성이 좋아진다.
* 프로그램 구현이 쉬워진다.
* 가독성이 좋아진다.

### 파일의 분할 및 컴파일

* 파일을 나눌지라도 완전히 독립되는 것은 아니다.
* 파일이 나뉘어도 <u>상호 참조가 발생</u>할 수 있는데, 이는 전역 변수 및 전역 함수로 제한된다.

![파일의 분할](/assets/img/language/c/divide_file.png)
{:.lead loading="lazy" align="center"}

하나의 파일을 분할한 모습
{:.figcaption}

&nbsp;&nbsp;파일을 나누면 컴파일러는 각각의 파일을 독립적으로 해석한다. 즉, 어떤 프로그램을 컴파일할 때 참조할 파일을 명시해주지 않는다면 컴파일러는 그 파일들의 관계를 알 수 없다. 이 때 `extern`이라는 키워드를 이용해 외부에 존재하는 변수나 함수임을 알려준다. 컴파일 과정에서 `extern`키워드로 해당 변수나 함수가 외부에 선언되어있음을 알려주었지만, 컴파일러는 그 외부가 어떤 파일인지는 역시 알지 못한다. 파일간의 관계를 통해 연결하는 과정을 `링크`에서 수행한다.

### 외부 접근 금지

* static 키워드에 의한 접근의 제한

```c
// abc1.c
static int val1;
int val2;
// abc2.c
extern int val1;
extern int val2;
```

&nbsp;&nbsp;이 때 `static` 키워드가 붙은 val1은 내부 파일에서만 접근할 수 있다. 외부파일인 `abc2.c`에서는 접근할 수 없게 된다.  
즉, `static` 키워드가 붙은 변수나 함수는 접근 범위(scope)가 `파일 내부`에 종속된다는 것이다.

### 링크에 대한 이해

* 링크라는 이름이 의미하는 것처럼 연결에 관련된 작업을 한다.
* 선언된 변수와 함수의 정의를 찾아서 연결시켜 주는 작업이다.

## 헤더 파일의 구현과 유용성

### 헤더 파일의 포함이 지니는 의미

> 우리는 지금껏 `#include <stdio.h>`가 가지는 의미에 대해서 알지 못한채로 사용해 왔다. 이 단원에서 그 의미를 알아본다.
{:.note title="attention"}

* 전처리기에 의해 하나의 파일을 다른 하나의 파일에 포함시키는 작업이다.

![헤더파일](/assets/img/language/c/include.png)
{:.lead loading="lazy" align="center"}

`#include`의 의미
{:.figcaption}

### 헤더파일 포함 방법

```c
#include <abc.h>
// 표준 디렉토리에서 abc.h를 찾아서 포함
#include "c:/include/abc.h
// c:\include에서 abc.h를 찾아서 포함
#include "plus.h"
// 현재 작업 디렉토리에 존재하는 plus.h를 포함
#include "c:/header/lib/plus.h"
// c:/header/lib에 존재하는 plus.h를 포함
```

### 헤더 파일의 정의 방법 및 유용성

* 함수 및 변수의 extern 선언의 간략화
* 파일 변경의 최소화 
* 함수 선언에는 기본적으로 extern이 포함되어 있다.

* 예제

```c
// cal_main.c
#include <stdio.h>

#include "calculator.h"

int main(void)
{
    double a = 10.2;
    double b = 2.1;

    printf("덧셈: %f \n", add(a, b));
    printf("뺄셈: %f \n", minus(a, b));
    printf("곱셈: %f \n", multiple(a, b));
    printf("나눗셈: %f \n", divide(a, b));

    printf("총 연산 수 : %d \n", cal_num);

    return 0;
}

// calculator.c
int cal_num = 0;

double add(double a, double b)
{
    cal_num++;
    return a + b;
}

double minus(double a, doubel b)
{
    cal_num++;
    return a - b;
}

double multiple(double a, double b)
{
    cal_num++;
    return a * b;
}

double divide(double a, double b)
{
    cal_num++;
    return a / b;
}

// calculator.h

extern int cal_num;

double add(double a, double b);
double minus(double a, double b);
double multiple(double a, double b);
double divide(double a, double b);

// 실행결과
덧셈: 12.300000
뺄셈: 8.100000
곱셈: 21.420000
나눗셈: 4.857143
총 연산 수 : 4
```

&nbsp;&nbsp;헤더파일을 보면 변수에만 `extern` 키워드가 선언 되어있고, 함수에는 선언되어 있지 않다. 이는 앞서 설명했듯이 함수는 `extern`키워드를 디폴트로 포함하고 있기 때문이다.  
&nbsp;&nbsp;이런식으로 한 프로그램을 각각 파일을 나눠 구성하면 <u>어떤 변수나 함수에 변동사항이 생겼을 때 일일이 해당 코드를 바꿔줄 필요가 없다.</u> 즉, 프로그램의 유지보수성이 아주 좋아진다는 것이다.

## 조건부 컴파일

### #if, #elif, #else, #endif 기반 조건부 컴파일

```c
#if CONDITION1
    expression1
#elif CONDITION2
    expression2
#else
    expression3
#endif
```

### 헤더 파일 포함 관계에서 발생하는 문제

* 하나의 헤더 파일을 두 번 이상 포함할 경우
* 이는 함수가 중복 정의되거나 변수가 중복 선언되는 문제점을 발생시킨다.
* 조건부 컴파일로 이러한 문제를 해결한다.

### #ifndef, #endif 기반 조건부 컴파일

> 위의 헤더파일 포함관계에서 발생하는 문제는 `#ifndef, #define, #endif` 지시자를 통해 해결할 수 있다.
{:.note title="attention"}

* #ifndef : if not define

```c
#ifndef _COUNT_H_   
// _COUNT_H_라는 매크로가 정의되어 있지 않다면
    #define _COUNT_H_
    // 해당 매크로를 정의하고
    ...
    // 헤더파일 명령들을 실행한다.
#endif
```

&nbsp;&nbsp;위와 같은 코드를 각각의 헤더파일마다 선언해두면 헤더파일이 중복으로 include되었을 때 중복선언, 중복정의의 오류를 미리 방지할 수 있다.

---

> 이로써 C언어에 대한 전반적인 내용 학습이 끝이났다. 이제 기초적인 내용들을 끝냈다는 생각이 든다. 아직 많은 부분에서 부족하거나 모르는 부분들이 있을 것이다. 이는 실제로 자료구조를 구현해보면서 좀 더 알아보고, 학습해 나갈 것이다.


# Fin
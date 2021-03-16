---
layout: post
title: 함수포인터와 void포인터
description: >
  함수포인터와 void포인터 알아보기
hide_description: true
sitemap: false
date: 2021-03-16 17:45:00 +0900
category: language
tag: [c]
---

# 함수포인터와 void포인터

## 함수 포인터

### 함수 포인터의 이해

![함수포인터](/assets/img/language/c/function_pointer.png)
{:.lead loading="lazy" align="center"}

함수 포인터
{:.figcaption}

&nbsp;&nbsp;위의 그림처럼 되어 있는 코드를 컴파일하면 main memory에 fct함수에 대한 정보를 memory에 저장한다. main도 역시 함수이니 main도 저장된다. 이 때, 이 함수에 대한 정보를 저장한 위치를 알아야 cpu가 찾아가서 실행 할 수 있기 때문에 이 함수위치 정보는 함수의 이름에 저장된다.

### 함수 이름의 포인터 타입을 결정짓는 요소

* 리턴 타입 + 매개변수 타입

```c
int fct(int a)
{
    a++
    return a;
}
```

위의 함수는 `int (*fPtr1) (int);`라는 포인터 타입이다.

그럼 아래의 함수의 포인터 타입은 어떻게 표현할 수 있을까?

```c
double fct2(double a, double b)
{
    double add = a + b;
    return add
}
```

위의 함수는 아래와 같이 표현된다.
<br/>
<br/>
<br/>

`double (*fPtr2) (double, double);`

&nbsp;&nbsp;이렇게 선언된 포인터에 함수이름을 대입하면 선언된 포인터도 함수의 역할을 수행할 수 있다. 즉 아래와 같이 사용이 가능하다는 것이다.

```c
int (*fPtr1) (int) = fct1;
fPtr(10);
```

&nbsp;&nbsp;위 처럼 fct1과 fPtr1의 타입이 일치하기 때문에 대입이 가능하다. 여기서 fct1과 fPtr1의 차이는 fct1 상수이고, fPtr1은 변수라는 점이다. 이에 관한 아래의 예제를 보도록 하자.

```c
// fct_ptr1.c
#include <stdio.h>

void Add(int a, int b);
void SPrint(char * str);

int main(void)
{
    char * string = "Function Pointer";
    int a = 10, b = 20;

    void (*fPtr1)(int, int) = Add;
    void (*fPtr2)(char*) = SPrint;

    // 함수 포인터에 의한 호출
    fPtr1(a, b);
    fPtr2(string);

    Add(a, b);
    SPrint(string);

    printf("%d, %d \n", fPtr1, fPtr2);
    printf("%d, %d \n", Add, SPrint);

    return 0;
}

void Add(int a, int b)
{
    printf("덧셈 결과 : %d \n", a + b);
}

void SPrint(char * str)
{
    printf("입력된 문자열 : %s \n", str);
}

// 실행결과
덧셈 결과 : 30
입력된 문자열 : Function Pointer
덧셈 결과 : 30
입력된 문자열 : Function Pointer
4199933, 4199976
4199933, 4199976
```

&nbsp;&nbsp;실행결과를 보면 함수롤 호출한 결과와 함수포인터로 호출한 결과가 같으며, 실제로 이름과 함수포인터에 저장된 주소값 역시도 같음을 알 수 있다.
&nbsp;&nbsp;즉, 함수의 이름은 함수의 위치를 가리키는 포인터라는 것이며 이 함수를 가리키는 포인터를 『함수포인터』라고 한다.


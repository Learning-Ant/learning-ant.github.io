---
layout: post
title: 포인터의 포인터(Double Pointer)
description: >
  포인터의 포인터에 대해 알아본다.
hide_description: true
sitemap: false
date: 2021-03-15 19:21:00 +0900
category: language
tag: [c]
---

# 포인터의 포인터

## 포인터의 포인터

### 포인터의 포인터

* Double Pointer라고 부르기도 한다.
* Single Pointer의 주소값을 저장하는 용도의 포인터

![더블 포인터](/assets/img/language/c/double_pointer.png)
{:.lead loading="lazy" align="center"}

### 더블 포인터에 의한 Call-By-Reference

* 더블포인터를 활용해 swap함수를 구현해본다.

```c
#include <stdio.h>

void SwapIntPtr(int** p1, int** p2)
{
  int* temp = *p1;
  *p1 = *p2;
  *p2 = temp;
}

int main(void)
{
  int A = 10, B = 20;
  int* pA, pB;
  pA = &A, pB = &amp;B;
  printf("*pA, *pB: %d %d \n", *pA, *pB);

  SwapIntPtr(&pA, &pB);
  printf("*pA, *pB: %d %d \n", *pA, *pB);
  return 0;
}
```

&nbsp;&nbsp;위의 코드를 보면 call-by-reference로 함수를 호출하고, 각각의 single pointer가 가리키는 주소를 double pointer를 이용해 바꾼 것이다. 코드만 보는 것으로는 이해가 쉽지 않을 수 있다. 아래 그림을 참고해보며 이해하려고 해보자.

![더블 포인터](/assets/img/language/c/double_pointer_impl.png)
{:.lead loading="lazy" align="center"}

&nbsp;&nbsp;앞서 살펴본 코드는 그림에서 single pointer들이 각각 가리키는 주소값들을 double pointer로 교차해서 바꿔준 것이다. 그림 상에 보이는 single pointer(pA, pB)의 화살표를 p1과 p2를 이용해 각각 가리키는 pA, pB 내부 데이터를 변경해 준 것이다.

### 포인터 배열과 포인터 타입

* 1차원 배열의 경우 배열이름이 가리키는 대상을 통해서 타입이 결정된다.
* 포인터 배열이라도 마찬가지이다.

&nbsp;&nbsp;`int* arr1[10];`는 int형 pointer들이 모여있는 배열이다. 즉, 배열이름이 가리키는 대상은 배열의 첫요소이고, 그 배열의 첫 요소는 int형 pointer이므로 배열이름은 int형 double pointer라고 할 수 있겠다.

---

&nbsp;&nbsp;아직까지 우리는 포인터를 그저 swap 함수의 구현에만 사용해보고 있다. 하지만 포인터의 필요성은 메모리 동적할당, 자료구조의 구현 등에 있다고 한다. 앞으로 공부할 자료구조를 위해 좀 더 확실히 포인터의 개념을 익혀두도록 하자.
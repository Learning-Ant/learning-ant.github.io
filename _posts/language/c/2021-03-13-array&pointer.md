---
layout: post
title: 포인터와 배열
description: >
  포인터와 배열 함께 이해하기
hide_description: true
sitemap: false
date: 2021-03-13 17:32:00 +0900
category: language
tag: [c]
---

# Pointer와 Array

## 포인터와 배열의 관계

### 배열의 이름의 정체

> 배열 이름은 **첫 번째 요소의 주소값**을 나타낸다.
{:.note title="attention"}

![배열의 주소값](/assets/img/language/c/pointer&array.png)
{:.lead loading="lazy" align="center"}

배열의 주소값
{:.figcaption}

```c
// pointer_array1.c
#include <stdio.h>

int main(void)
{
    int a[5] = {0, 1, 2, 3, 4};

    printf("%d, %d \n", a[0], a[1]);
    printf("%d 번지(첫 번째 요소의 주소), %d 번지(두 번째 요소의 주소) \n", &a[0], &a[1]);
    printf("배열 이름 : %d \n", a);

    return 0;
}
// 실행결과
0, 1
1245036 번지(첫 번째 요소의 주소), 1245040 번지(두 번째 요소의 주소)
배열 이름 : 1245036
```

&nbsp;&nbsp;위 실행 결과를 보면 0번째 요소의 주소값과 배열 이름 a에 저장된 값이 동일하다. 이는 배열 이름에는 첫 요소의 주소값이 저장된다는 것을 나타낸다. 아래의 표를 통해 포인터와 배열이름의 차이를 알아보자.

|   |포인터|배열이름|
|:---:|:---:|:---:|
|이름이 존재하는가|O|O|
|무엇을 나타내는가|메모리의 주소|메모리의 주소|
|변수? 상수?|변수|상수|

> 위 표에 보다시피 배열의 이름은 상수이다. 즉, 상수이기 때문에 배열이름에 저장되어있는 주소값의 변경은 불가능하다.

### 배열 이름의 타입

* 배열 이름도 포인터이므로 타입이 존재한다.
* 배열 이름이 가리키는 배열 요소에 의해 결정된다.

### 배열 이름의 활용

> 배열 이름을 포인터처럼, 포인터를 배열 이름처럼 활용 하는 것이 가능하다.
{:.note title="attention"}

```c
// pointer_array2.c
#include <stdio.h>

int main(void)
{
    int arr[3] = {0, 1, 2};
    int* ptr;

    ptr = arr;  // ptr은 변수이기때문에 배열 첫요소의 주소값을 저장하고 있는
                // 배열이름 arr의 대입이 가능하다.
                // 하지만 arr은 포인터상수기 때문에 arr = ptr은 불가능하다.

    printf("%d, %d, %d \n", ptr[0], ptr[1], ptr[2]);
    return 0;
}
```

> 여기서 중요한 점은 배열이 선언되고 선언된 배열의 이름에는 첫 요소의 주소값이 저장된다는 것, 그리고 이 같은 배열이름은 포인터의 일종이며 상수인 포인터 상수라는 것이다.
{:.note}

## 포인터 연산

### 포인터 연산이란?

* 포인터가 지니는 값을 증가 혹은 감소시키는 연산을 의미한다.

```c
// Pointer_op.c
#include <stdio.h>

int main(void)
{
    int* ptr1 = 0x0010;
    double* ptr2 = 0x0010;

    printf("%p %p \n", ptr1+1, ptr1+2);
    printf("%p %p \n", ptr2+1, ptr2+2);

    printf("%p %p \n", ptr1, ptr2);
    ptr1++;
    ptr2++;

    printf("%p %p \n", ptr1, ptr2);

    return 0;
}

// 실행결과
0000000000000014 0000000000000018
0000000000000018 0000000000000020   // 왜 26이 아니라 20일까?
0000000000000010 0000000000000010
0000000000000014 0000000000000018
```

&nbsp;&nbsp;위 소스의 결과로 포인터 연산에서의 중요한 사실을 하나 알 수 있다. 포인터의 증감은 해당 타입의 크기에 따라 증감의 크기가 달라진다는 점이다.

* int형 포인터를 대상으로 n 증감 ➡ n × sizeof(int)만큼 증감
* double형 포인터를 대상으로 n 증감 ➡ n × sizeof(double)만큼 증감

### 포인터 연산을 통한 배열 요소의 접근

&nbsp;&nbsp;이런 특징을 통해 배열에서도 이를 활용 할 수 있다. 아래 예제를 보자.

```c
// PointerBaseArrayAccess.c
#include <stdio.h>

int main(void)
{
    int arr[3] = {11, 22, 33};
    int* ptr = arr;     // int* ptr = &arr[0];과 같은 문장
    printf("%d %d %d \n", *ptr, *(ptr+1), *(ptr+2));

    printf("%d ", *ptr); ptr++; // printf 함수 호출 후 ptr 증가
    printf("%d ", *ptr); ptr++;
    printf("%d ", *ptr); ptr--; // printf 함수 호출 후 ptr 감소    printf("%d ", *ptr); ptr--;
    printf("%d ", *ptr); printf("\n");
   
    return 0;
}

// 실행결과
11 22 33
11 22 33 22 11
```

&nbsp;&nbsp;위와 같이 배열의 요소들은 연속적인 메모리공간에 각 요소들이 배치 되어 있으므로 포인터안에 있는 주소값 변경없이 포인터의 증감(연산)을 통해 다음이나 이전 혹은 n번째 요소로의 접근이 가능하다.

> *(++ptr)과 *(ptr+1)은 큰 차이점이 있다. 앞의 ++ptr의 경우에는 ptr안에 저장된 주소값이 바뀌지만, ptr+1의 경우에는 ptr안에 저장된 주소값이 바뀌지는 않는다.
{:.note title="주의"}

### 포인터와 배열을 통해서 얻을 수 있는 중대한 결론


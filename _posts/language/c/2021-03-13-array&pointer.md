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

# [C/C++]Pointer와 Array

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

> 앞서 알아본 포인터 연산으로 포인터와 배열을 통해 얻을 수 있는 결론이 있다. 먼저 아래의 코드를 살펴본다.
{:.note}

```c
// arrPointerLoop.c
#include <stdio.h>

int main(void)
{
    int arr[] = {11, 22, 33, 44, 55};
    int i, arrLen = sizeof(arr)/sizeof(int);

    for(i = 0; i < arrLen; i++)
    {
        printf("%d ", *(arr+i));
    }
    return 0;
}
// 실행결과
11 22 33 44 55
```

&nbsp;&nbsp;앞서 우리는 배열이름에는 해당 배열의 첫번째 요소 주소값이 저장되어있음을 확인했다. 더불어 위의 코드를 통해 배열이름에는 해당 배열의 타입에 대한 정보도 있다는 것을 확인 할 수 있다. 만약 배열이름에 타입에 대한 정보가 없었다면 +i를 했을 때 해당 타입 크기만큼의 이동이 이루어 지지 않을 것이기 때문이다.  
&nbsp;&nbsp;여기서 포인터의 개념을 다시 살펴본다. 포인터는 자료형 정보와 주소값 정보를 가지고 있다. 그렇다면 배열이름은 어떤가? 배열이름에도 역시 자료형에 대한 정보와 주소값에 대한 정보가 들어 있음을 우리는 확인할 수 있었다. 즉, **__배열이름도 포인터__**라는 결론을 내릴 수 있다.

> 이를 응용시킨 예시가 아래의 코드이다.

```c
// arrPointLoop2.c
#include <stdio.h>

int main(void)
{
    int arr[2] = {1, 2};
    int* pArr = arr;

    printf("%d %d \n", arr[0], *(arr + 1));
    // *(arr+0), arr[1] 과 동일
    printf("%d %d \n", pArr[0], *(pArr + 1));

    return0;
}

// 실행결과
1 2
1 2
```
&nbsp;&nbsp;두 번째 printf에서 pArr[0]을 통해 우리는 포인터로도 배열의 인덱스를 활용한 연산이 가능하다는 것을 알 수 있고, 배열이름을 포인터로써 활용할 수 있다는 것을 확실히 알 수 있다.

## 상수 형태의 문자열을 가리키는 포인터

### 문자열 표현 방식의 이해

* 배열 기반의 문자열 변수
* 포인터 기반의 문자열 상수

![문자열의 포인터](/assets/img/language/c/strPointer.png)
{:.lead loading="lazy" align="center"}

배열 기반의 문자열 변수와 포인터 기반의 문자열 상수
{:.figcaption}

&nbsp;&nbsp;위의 그림에서 `char* str2="ABCD";`의 경우 "ABCD"가 메모리 공간에 할당 될 때, 그 주소값을 반환한다. 그렇기에 char형 포인터 str2에 "ABCD" 문자열 상수의 주소값이 저장되는 것이다. 그렇기에 우리가 실제로 사용 하는 `printf("abc");` 코드는 결국 "abc"라는 문자열을 메모리 공간에 할당하고 실제로 printf함수에는 그 "abc"의 주소값이 parameter로 전달 되는 것이다.  
&nbsp;&nbsp;자 그럼 str2에는 어떤 주소값이 저장될까? 결론부터 말하자면 str2에는 "ABCD"라는 문자열의 첫 요소인 A의 주소값이 저장된다. 결국 문자열은 문자들의 배열이고, 그로인해 'A'라는 문자의 주소값이 str2에 할당되는 것이다.

```c
// str_prn.c
#include <stdio.h>

int main()
{
    char str1[5] = "abcd";
    char* str2 = "ABCD";

    printf("%s \n", str1);
    printf("%s \n", str2);

    str1[0] = 'x';
    // str2[0] = 'X';
    // 변경할 수 없다. 상수이기 때문에 에러가 발생한다.

    printf("%s \n", str1);
    printf("%s \n", str2);

    return 0;
}

// 실행결과
abcd
ABCD
xbcd
ABCD
```

## 포인터의 배열

* 배열의 요소로 포인터를 지니는 배열

![포인터의 배열](/assets/img/language/c/pointerArr.png)
{:.lead loading="lazy" align="center"}

포인터의 배열
{:.figcaption}

&nbsp;&nbsp;우리는 앞서 배열을 선언하는 방법을 이미 배웠고, 포인터에 대해서도 배웠다. 그렇기에 그림을 보면 바로 이해가 될 것이다. 그래도 그림만 보고 넘어가기엔 프로그래머로서의 자존심이 허락치 않는다. 예시를 통한 실습까지 진행해본다.

```c
//pointerArray.c
#include<stdio.h>

int main(void)
{
    int num1 = 10, num2 = 20, num3 = 30;
    int* arr[3] = {&num1, &num2, &num3};

    printf("%d %d %d", *arr[0], *arr[1], *arr[2]);

    return 0;
}

// 실행결과
10 20 30
```

&nbsp;&nbsp;그렇다면 문자열에서의 포인터배열은 어떨까? 그렇게 다르지는 않지만 그래도 쉽게 바로 이해가 되지 않을수가 있다. 예시를 통해 알아보도록 하자.

```c
// strArray.c
#include <stdio.h>

int main(void)
{
    char* strArr[3] = {
        "Simple",
        "String",
        "Array"
    };
    printf("%s %s %s", strArr[0], strArr[1], strArr[2]);

    return 0;
}

// 실행결과
Simple String Array
```

&nbsp;&nbsp;double quote로 선언된 문자열 상수는 메모리에 할당 된 후 그 주소값을 리턴하므로 위의 코드와 같이 char형 포인터 배열에 주소값이 그대로 저장된다는 것을 알 수 있다.
<br/>
<br/>

---

&nbsp;&nbsp;포인터와 배열, 그리고 포인터 연산으로 배열을 control할 수 있다는 사실, 마지막으로 포인터의 배열에 대해서 알아보았다. 쉽지않은 개념이지만 대부분의 강의자료나 책에서는 포인터의 중요성에 대해서 강조하고 있다. 아직 정확히 어떻게 사용해야하는지, 어째서 중요한 것인지에 대해서는 감이 잘 오지 않지만 좀 더 복습이나 연습문제 풀이를 통해 포인터에 대한 개념을 확실히 잡아 두는 것이 좋을 것 같다.
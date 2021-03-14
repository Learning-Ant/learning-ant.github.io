---
layout: post
title: 포인터와 함수에 대한 이해
description: >
  포인터와 함수에 대한 이해
hide_description: true
sitemap: false
date: 2021-03-14 19:02:00 +0900
category: language
tag: [c]
---

# 포인터와 함수에 대한 이해

> 포인터를 어렵게 하는 것은 포인터 자체가 아니다. 포인터가 배열과 만나고, 함수를 만나면서 그 내용이 어려워지기 시작한다. 집중해서 제대로 알아보도록 하자.
{:.note title="attention"}

## 함수의 인자로 배열 전달하기

### 기본적인 인자의 전달 방식

* 값의 복사에 의한 전달

```c
int fct(int a)
{
  a++;
  return a;
}
int main(void)
{
  int val = 10;

  printf("%d \n", fct(val));
  printf("%d \n", val);

  return 0;
}

// 실행결과
11
10
```

&nbsp;&nbsp;위의 과정에서 얼핏보면 val이라는 변수를 함수 fct에 전달하고 전달된 변수의 값이 증가되는 것처럼 보인다. 하지만 실행결과를 보면 그렇지 않다.  
&nbsp;&nbsp;fct함수가 받는 매개변수인 int a에 전달된 변수인 **__val의 값이 『복사』되어 할당__**되는 것이다. 실제로 fct함수 내부에서 변수 a가 1증가되어 리턴되는데 실제로 val이라는 변수에 저장된 데이터에는 변화가 없다. 또한 scope에 의해 fct함수는 변수 a의 데이터를 return해주면서 a라는 변수는 사라지고 fct는 종료된다.
&nbsp;&nbsp;그렇다면 실제 val의 값을 증가시키려면 어떻게 바꿔야할까? 여기서 쓰이는 것이 포인터이다. fct함수의 구조를 조금만 변경하면 원하는대로 실제 저장되어있는 val의 값을 변경할 수 있다.

```c
// copyValue.c
#include <stdio.h>

int fct(int* a)
{
    (*a)++;
    return *a;
}

int main(void)
{
    int val = 10;

    printf("%d \n", fct(&val));

    return 0;
}

// 실행결과
11
11
```

&nbsp;&nbsp;이와 같은 형태의 함수호출형태를 Call-By-Reference라고 한다. 이에 대한 개념은 뒤에서 다시 다루어보도록 한다.

### 배열의 함수 인자 전달 방식

> 그렇다면 위의 예시를 통해 배열을 함수의 인자로 전달할 수 있는 방법도 있지 않을까? 여기서 포인터의 일종이라고 배웠던 배열이름을 사용한다.
{:.note title="attention"}

* 배열 이름(배열 주소, 포인터)에 의한 전달


```c
//arrayFct.c
#include <stdio.h>

void fct(int* arr2);

int main(void)
{
  int arr1[2] = {1, 2};

  fct(arr1);
  printf("%d \n", arr1[0]);
  
  return 0;
}

void fct(int* arr2)
{
  printf("%d \n", arr2[0]);
  arr2[0] = 3;
  // *(arr+0) = 3; 동일한 코드
}

// 실행결과
1
3
```

&nbsp;&nbsp;위의 예시를 보면 포인터를 활용해 배열의 주소값을 함수에 전달하여 그 배열을 함수에서 control할 수 있게 되었다. 앞서 보였던 예시와 다르게 배열을 전달할때는 &연산자를 쓰지 않는다. **배열이름 자체에 저장된 값은 주소값**이기 때문이다.

### 배열 이름, 포인터의 sizeof 연산

> 함수의 인자로 배열을 전달할 때는 그 배열의 길이도 같이 전달해 줘야 한다. 매개변수로 배열만 받았을 때는 함수 내부에서 해당 배열의 길이를 알아낼 방법이 없기 때문이다.
{:.note title="attention"}

* 배열 이름 : 배열 전체 크기를 바이트 단위로 반환
* 포인터 : 포인터의 크기(4)를 바이트 단위로 반환

```c
// arrAdder.c
#include <stdio.h>

int arrAdder(int* pArr, int n);

int main(void)
{
  int arr[5] = {1, 2, 3, 4, 5};
  int sumOfArr;

  sumOfArr = addAdder(arr, sizeof(arr)/sizeof(int));
  printf("배열의 총 합 : %d \n", sumOfArr);

  return 0;
}

int arrAdder(int* pArr, int n)
{
  int sum = 0;
  int i;
  
  for(i = 0; i < n; i++)
  {
    sum += pArr[i];
  }

  return sum;
}

// 실행결과
배열의 총 합 : 15
```

&nbsp;&nbsp;위 코드를 살펴보면 배열과 그 배열의 길이를 arrAdder함수에서 받아주는 것이 보인다. 여기서 굳이 배열의 길이를 sizeof연산자로 계산하여 전달해주는 것을 알 수 있다. sizeof연산자를 활용하여 보내는 이유는 실제로 배열의 길이를 우리는 알고 있긴하지만, 선언해준 배열의 길이가 달라질 때마다 우리가 해당 부분의 코드를 변경해 주는 것은 비효율적이다. 또한 나눠주는 int형의 크기도 sizeof연산자로 해주었는데 이 또한 int가 언제까지고 4byte가 되지는 않을 것이다. 현재 우리는 int형이 4byte라는 것을 알고 있지만 세월이 흘러 4byte가 8byte가 될지 모르는 일이기 때문에 sizeof연산자로 int의 크기를 계산해주고 나눠주는 것이 훨씬 좋은 코딩이라고 볼 수 있다.

## Call-By-Value와 Call-By-Reference

> Call-By-Value와 Call-By-Reference는 함수의 호출방식을 의미하는 것이다. 사실 완전히 새로운 개념은 아니고 그동안 배우면서 제대로 짚고 넘어가지 않았던 부분이다. 여기서 그 개념에 대해서 제대로 짚고 넘어간다.
{:.note title="attention"}

### Call-By-Value

* 값의 복사에 의한 함수의 호출
* 가장 일반적인 함수 호출 형태

> Call-By-Value를 설명할 때는 많은 사이트에서 swap이라는 예시를 통해 설명한다. 여기서도 swap을 이용해 설명한다.
{:.note}

```c
// swap.c
#include <stdio.h>

void swap(int a, int b)
{
  int temp = a;
  a = b;
  b = temp;

  printf("a : %d \n", a);
  printf("b : %d \n", b);
}

int main(void)
{
  int val1 = 10;
  int val2 = 20;
  swap(val1, val2);

  printf("val1 : %d \n", val1);
  printf("val2 : %d \n", val2);
  
  return 0;
}

// 실행 결과
a : 20
b : 10
val1 : 10
val2 : 20
```

&nbsp;&nbsp;실행결과를 보면 매개변수로 `val1`과 `val2`를 전달해준 후 swap함수를 통해 바뀐 것은 확인 할 수 있다. 하지만 swap함수를 호출한 후 다시 `val1`과 `val2`를 확인해보면 값은 여전히 그대로이다.  
&nbsp;&nbsp;실제로 swap함수의 호출하면 `val1`과 `val2`의 값이 각각 `a`와 `b`라는 변수에 복사되어 함수 내부의 기능이 실행되는 것이다. 이로인해 함수 영역내에서는 바뀌었지만 main에 선언된 `val1`과 `val2`에는 영향을 주지 못한것이다.

### Call-By-Reference

* 참조(참조를 가능하게하는 주소 값)를 인자로 전달하는 형태의 함수 호출

```c
// swap.c
#include <stdio.h>

void swap(int* a, int* b)
{
  int temp = *a;
  *a = *b;
  *b = temp;

  printf("a : %d \n", *a);
  printf("b : %d \n", *b);
}

int main(void)
{
  int val1 = 10;
  int val2 = 20;
  swap(&val1, &val2);

  printf("val1 : %d \n", val1);
  printf("val2 : %d \n", val2);

  return 0;
}

// 실행결과
a : 20
b : 10
val1 : 20
val2 : 10
```

&nbsp;&nbsp;함수 내부에서 외부에 존재하는 변수를 조작하길 원한다면 값의 주소값, 즉 포인터를 활용하여 함수에 전달해줘야 가능하다는 것이 중요 포인트이다. 이것을 바로 함수의 Call-By-Reference이다. 

### scanf 함수 호출 시 &를 붙이는 이유

```c
#include <stdio.h>

int main(void)
{
  int val;
  scanf("%d", &val);

  char str[100];
  printf("문자열 입력 : ");
  scanf("%s", str);
}
```

&nbsp;&nbsp;앞서 공부한 것을 토대로 위의 소스코드를 한 번 살펴보자. scanf함수는 데이터를 사용자로부터 입력받아 변수에 저장할 수 있는 기능을 가진 함수이다. 하지만 어떤 변수에 접근해서 그 변수에 데이터를 저장하려면 그 변수가 어떤 메모리주소를 가지고 있는지 알아야한다. 그렇기 때문에 &연산자를 이용해 변수의 주소값을 scanf에 전달해 주는것이다.  
&nbsp;&nbsp;여기서 **scanf함수는 Call-By-Reference**임을 알 수 있다. 비슷한 이유로 그럼 왜 문자열을 넘길때는 &연산자가 붙지않는지도 알 수 있다. 우리는 배열이름에는 배열의 주소값이 저장되어있음을 이미 공부했다. 즉, &연산자 없이 배열이름만 적어주어도 해당 주소값이 전달된다는 것을 우리는 드디어 이해할 수 있게 되었다.

## 포인터와 const 키워드

> const 키워드는 변수를 상수화하는 키워드이다. 이를 포인터에 여러가지 방법으로 적용시킬 수 있다. 이에 대해 알아본다.  
> 포인터 변수를 대상으로도 const선언이 가능하다. 하지만 이 const 키워드의 "위치"에 따라서 그 의미가 확연히 달라진다. 다음 여러 예시를 통해 위치에 따른 의미를 알아본다.
{:.note title="attention"}

### 포인터가 가리키는 변수의 상수화

```c
int main(void)
{
  int a = 10;
  const int* p = &amp;a;
  *p = 30;  // Error
  a = 30;   // OK
}
```

&nbsp;&nbsp;여기서 키포인트는 변수 a가 상수가 되는 것이 아닌 **__p라는 포인터가 봤을 때 변수 a가 상수__**처럼 보인다는 이다. 그렇기 때문에 변수 a로 직접 값을 변경할 때는 Error가 발생하지 않는 것이다. p라는 포인터를 이용해 변수 a의 값을 변경하는 것을 허용하지 않겠다는 의미이다.

### 포인터 상수화

```c
int main(void)
{
  int a = 10, b = 20;
  int* const p = &amp;a;
  p = &amp;b; // Error
  *p = 30;    // OK
}
```

&nbsp;&nbsp;여기서는 const 키워드가 변수 바로 앞에 선언되어 있다. 이 의미는 포인터 변수 p가 가리키는 주소를 바꿀 수 없도록 하겠다는 의미이다. 그렇기 때문에 p가 가리키는 변수 a의 값은 변경이 가능하다.

### 포인터와 포인터가 가리키는 변수 모두 상수화 시키는 것 역시 가능하다.

```c
int main(void)
{
  int a = 10, b = 20;
  const int* const p = &amp;a;
  p = &amp;b; // Error
  *p = 30;    // Error
}
```

&nbsp;&nbsp;const 키워드가 변수형 앞과 포인터 변수 이름 앞 모두에 선언되어 있다. 이렇게 되면 p가 가리키는 주소값의 변경과 그 주소값에 저장되어 있는 데이터의 변경 둘 모두가 불가능하게 된다.

### const 키워드를 사용하는 이유

* 컴파일 시 잘못된 연산에 대한 에러 메시지를 출력해 준다.
* 프로그램을 안정적으로 구성할 수 있다.

```c
#include <stdio.h>

int main(void)
{
  double PI = 3.1415;
  // const double PI = 3.1415;
  double rad;
  PI = 3.07;
  // 변하지 말아야 할 값이 변했다. But 컴파일 시에 발견되지 않는다.
  scanf("%f", &rad);
  printf("circle area %f \n", rad*rad*PI);
  return 0;
}
```

&nbsp;&nbsp;위 코드에서 컴파일러는 컴파일 시에 어떤게 잘못되었는지 알지 못한다. 우리가 PI변수를 그냥 일반 변수로 선언했기에 컴파일러는 당연히 인지하지 못하고 순차적으로 소스코드를 실행해 나갈 뿐이다. 이를 방지하기 위해 우리는 PI변수에 const선언을 해줌으로써 컴파일 시 이런 실수를 방지하고 보다 안정적으로 프로그래밍을 할 수 있게 되는 것이다.
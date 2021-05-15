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

# [C/C++]함수포인터와 void포인터

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

## void형 포인터

### void형 포인터란 무엇인가?

* 자료형에 대한 정보가 제외된 주소 정보만을 담을 수 있는 형태의 변수이다.
* 포인터 연산, 메모리 참조와 관련된 일에 활용 할 수 없다.
* 포인터 연산시에 증감의 단위를 알 수 없기 때문에 연산 시에는 활용 불가하다.
* 마찬가지로 어디까지를 참조할지 알 수 없기때문에 참조 시 활용이 불가능 하다.

```c
int main(void)
{
    char c = 'a';
    int n = 10;
    void * vp;
    vp = &c;
    vp = &n;

    // 아래 두 줄은 error가 발생한다.
    *vp = 20;
    vp++;

    return 0;
}
```

## main 함수의 인자 전달

main_arg.exe를 CLI에서 실행할 때 있는 적어준 문자열을 배열의 형태로 메모리에 저장하고 main 함수에 매개변수로 전달할 수 있다. 아래의 코드를 보자.

```c
// main_arg.c
#include <stdio.h>

int main(int argc, char **argv)
{
    int i = 0;
    printf("전달된 문자열의 수 : %d \n", argc);

    for(i = 0; i < argc; i++)
    {
        printf("%d번째 문자열 : %s \n", i + 1, argv[i]);
    }

    return 0;
}
```

&nbsp;&nbsp;위의 코드를 보면 argc라는 int형 매개변수와 argv라는 char double pointer형 매개변수가 선언되어 있다. 이 때 첫 번째 매개변수인 argc에는 전달된 문자열의 개수를 받고, 두 번째 매개변수인 argv는 그 문자열이 저장된 배열을 가리키는 포인터가 된다. 만약 위의 코드를 가진 main_arg.c를 컴파일시켜 root directory에서 CLI를 통해 실행시키면 어떻게 될까?

&nbsp;&nbsp;cmd창에서 cd명령어를 통해 root directory로 이동하고 컴파일 후 다음 `C:\c_study>main_arg abcd 12345` 명령어를 통해 실행시키면 어떤 배열 arr에 "main_arg", "abcd", "12345" 세 요소를 넣는다. 그 후 매개변수 <u>argc에 3이 전달</u>되고, <u>argv에는 arr이 대입</u>되는 것이다.

&nbsp;&nbsp;argv가 double pointer인 이유는 <u>각 배열의 요소가 string</u>이므로 char형 배열이 되고, <u>이를 가리키려면 char형 포인터가 필요</u>하다. 그렇기 때문에 임의의 <u>배열 arr은 char형 포인터의 배열<u>이 되는것이고, 이를 가리키려면 single pointer를 가리키는 double pointer가 되어야 하기 때문에 double pointer로 매개변수를 선언해 준 것이다. 이를 그림으로 표현하면 아래와 같다.

![main함수의 인자 전달](/assets/img/language/c/main_parameter.png)
{:.lead loading="lazy" align="center"}

main함수로의 인자전달
{:.figcaption}

---

&nbsp;&nbsp;이로써 포인터와 관련된 개념들은 끝이 났다. 막상 포인터에 대한 공부를 시작하기 바로 전에는 여기저기서 어려운 개념이라는 말만 들었던 상태라 쉽지 않을 것이라 생각했다. 하지만 세세하게 설명해둔 책을 보면서, 그에 관련된 예제를 풀면서 조금씩 개념이 잡혀가는 것을 느꼈다. 아직 확실하게 이거다!라는 느낌은 없지만 어느정도는 자리잡은 느낌이다. 후에 자료구조를 실제로 구현해 보면서 좀 더 확실하게 개념을 잡을 수 있도록 해야겠다.
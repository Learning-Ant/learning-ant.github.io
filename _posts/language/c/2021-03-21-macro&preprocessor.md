---
layout: post
title: 매크로와 전처리기
description: >
  매크로와 전처리기에 대해 알아보자.
hide_description: true
sitemap: false
date: 2021-03-21 17:46:00 +0900
category: language
tag: [c]
---

# [C/C++]매크로와 전처리기(Preprocessor)

## 전처리기에 의한 매크로 처리

### 전처리기에 의한 전처리

> 컴파일 단계에서 세부적으로 들여다보면 실제로는 컴파일 이전에 전처리 과정이 실행된다. 이 전처리 과정에서는 실제 소스코드에서의 변화나 파일의 변경이 일어나지는 않는다. 전처리기가 수행하는 일은 `선행처리 명령문`대로 소스코드의 일부를 수정하는 것이다. 이 때의 수정은 <u>단순 치환</u>의 형태를 띠는 경우가 대부분이다.

![전처리기](/assets/img/language/c/preprocessor.png)
{:.lead loading="lazy" align="center"}

프로그램 작성부터 실행파일 생성까지
{:.figcaption}

### #define으로 시작하는 전처리기 지시자

* 컴파일러에 의해 처리되는 것이 아닌 `전처리기`에 의해 단순 치환 작업을 수행할 때 사용되는 지시자이다.

![#define지시자](/assets/img/language/c/define.png)
{:.lead loading="lazy" align="center"}

#define 지시자
{:.figcaption}

* 예시

```c
#define PI 3.1415
// 전처리기 지시자에는 semi-colon을 쓰지 않는다.
// 전처리기에 의해 상수화된다.
// const키워드는 컴파일러에 의해 처리가 되고,
// define지시자는 전처리기에 의해 처리가 된다.

double area;
double radius=5;

area = radius*radius*PI
// 전처리기는 여기서 쓰이는 PI를 3.1415로 치환한다.
```

* 예제

```c
// Preproce.c
#include <stdio.h>

#define string "C++ Compatible C"
#define cal (3*4)+(12/4)

#define ONE 1
#define TWO ONE + ONE
#define THREE TWO + ONE

int main(void)
{
    printf("string : %s \n", string);
    printf("cal : %d \n", cal);
    printf("ONE = %d, TWO = %d, THREE = %d \n", ONE, TWO, THREE);

    return 0;
}

// 실행결과
string : "C++ Compatible C"
cal : 15
ONE = 1, TWO = 2, THREE = 3
```

위의 실행결과를 보면 #define 지시자로 정의되는 매크로의 몇가지 특성을 알 수 있다.

1. 전처리기에 의해 매크로는 선언된 값으로 `치환`된다.
2. double quote 안에 있는 매크로는 치환되지 않는다.
3. 선언된 매크로들은 매크로를 선언할 때 재사용이 가능하다.
4. 매크로에 선언될 값은 표현식으로도 선언이 가능하다.

## 매크로를 이용한 함수의 구현

### 매크로 함수란?

* 매크로를 기반으로 정의되는 함수이다.
* `함수가 아니라 매크로`이다. 다만 함수와 유사할 뿐이다.

* 장점
    1. 함수와 유사하지만, 그 속도는 매크로 함수가 빠르다.
    2. 자료형에 독립적이다.
* 단점
    1. 기능이 복잡한 함수의 경우 매크로함수로의 구현이 힘들다.
    2. 디버깅이 쉽지 않다.(컴파일러는 이상을 잡아낼 수 없다.)
* 매크로 함수가 되기 위한 조건
    1. 매크로 함수의 크기가 작아야한다.
    2. 그렇지 않으면 실행 파일의 크기가 커지게 된다.
        ➡ 장점이 무색해질 수 있다.

* 매크로의 보완

> 아래의 예시를 보면 매크로의 `단순치환`의 문제점을 알 수 있다. 이를 알아보고, 그 보완방안에 대해서 알아본다.
{:.note title="attention"}

```c
#define SQUARE(X) X*X

SQUARE(2+5);
```

&nbsp;&nbsp;위와 같이 할 경우 `SQUARE(2+5)`는 어떤 결과를 나타낼까? 보통 `49`를 예상하겠지만 실제 결과는 `17`이 나온다. 그 이유는 매크로의 `단순치환`에 있다.  
&nbsp;&nbsp;`SQUARE(2+5)`를 치환하면 `2+5*2+5`가 되어 사칙연산 우선순위에 의해 5*2가 먼저 계산되고, 2와 5가 더해져 `17`이라는 결과가 나오게 된다.
&nbsp;&nbsp;그럼 이를 보완하기 위한 방법에는 어떤 것이 있을까? 계산 우선순위의 변경에 쓰이는 것인 괄호'()'이다. 이를 매크로에 사용해 이런 `단순치환`의 약점을 보완한다.

```C
#define SQUARE(X) ( (X) * (X) )
```

&nbsp;&nbsp;보면 가장 바깥에도 괄호를 한 번 더 씌워줬는데 이 이유는 동등하거나 높은 우선순위를 가진 연산자를 만났을 때도 매크로는 선언된 표현식부터 계산하게 할 수 있도록 하기 위함이다.

### #을 이용한 전달 인자의 문자열화

> 예제를 통해 알아보자.

```c
#include <stdio.h>
#define ADD(x, y) printf("x+y=%d \n", x+y)

int main(void)
{
    ADD(3, 4);
    return 0;
}

// 실행결과
x+y=7
```

만약 실행결과를 `3+4=7`이 나오게끔 매크로를 설정하고 싶다면 어떻게 해야할까? 이 때 쓰이는 것이 `#`이다. `#`을 사용해 위의 코들ㄹ 바꿔 실행결과가 `3+4=7`이 나오도록 매크로를 바꿔본다.

```c
#include <stdio.h>
#define ADD(x, y) printf( #x "+" #y "=%d \n", x+y)

int main(void)
{
    ADD(3, 4);
    return 0;
}

// 실행결과
3+4=7
```

![문자열](/assets/img/language/c/define_string.png)
{:.lead loading="lazy" align="center"}

#을 이용한 전달 인자의 문자열화
{:.figcaption}

### ##을 이용한 토큰의 결합

> 토큰의 결합 기능은 흔히 다른 언어에서 concatnation이라 불리는 기능과 동일하다. 단순히 두 인자(토큰)을 결합시키는 기능이라고 할 수 있겠다.
{:.note title="attention"}

```c
#define FUNC(x,y) x ## y

FUNC("AB", "CD") ➡ "AB""CD"
```

---

> 매크로를 공부하기 전에는 사실 `자동으로 어떤 일을 수행해주는  것`을 생각하고 있었다. 막상 공부하고 보니 자동으로 어떤 일을 수행하는 것이 아닌 매크로에 해당하는 것을 `치환`해준다는 것으로 생각하는 것이 좋을 것 같다. 실제로 게임들의 매크로를 생각하면 어떤 키를 눌렀을 때 수행되는 일들을 미리 지정하는 것이 매크로였다. 이것 역시 `치환`의 개념이었던 것이다.  
> 아직 모든 전처리 지시자에 대해서 배운것은 아니지만 대략적인 감은 잡은 것 같다. 슬슬 자료구조의 구현에 대해 어떻게 공부를 할지 생각해 봐야 할 듯하다.
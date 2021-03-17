---
layout: post
title: 구조체와 사용자 정의 자료형(1)
description: >
  구조체와 사용자 정의 자료형에 대해 알아보기
hide_description: true
sitemap: false
date: 2021-03-17 22:06:00 +0900
category: language
tag: [c]
---

# 구조체와 사용자 정의 자료형(1)

도전 프로그래밍에서 첫번째 도전에서 구조체를 사용하지 않는 것으로 예제를 바꿔서 풀어 볼 것. 그렇게 함으로써 구조체의 유용함에 대해 느껴보길 바란다.

구조체가 등장하지 않는 프로그래밍은 존재하지 않는다고 볼 수 있다. 그만큼 중요한 개념이니 그 중요성에 대해서 느낄 수 있는 것에 중점을 두도록 한다.

## 구조체란 무엇인가?

### 구조체의 정의

* 하나 이상의 기본 자료형을 기반으로 사용자 정의 자료형을 만들 수 있는 문법 요소

```c
struct point    // point라는 이름의 구조체 선언(사용자 정의 자료형)
{
    int x;      // 구조체 멤버 int x(기본 자료형 int)
    int y;      // 구조체 멤버 int y(기본 자료형 int)
}
```

&nbsp;&nbsp;point라는 이름의 자료형을 새로 만든 소스이다. 여기서 선언 된 int는 기본적으로 제공되는 자료형이다. 여기서 중요한 점은 struct가 자료형이 아니고 point가 자료형이라는 점이며, struct는 그 자료형을 정의하는 명령어이다. 여기서 point가 <u>사용자 정의 자료형</u>이라는 것이다.<br/>
&nbsp;&nbsp;point형으로 만든 a라는 변수가 선언되었다고 하자. 그렇다면 변수 a에는 int x, int y라는 구성을 가지고 있는 상태가 된다. 이 사용자 정의 자료형을 선언하려면 하나의 키워드가 필요하다. 이 키워드가 『struct』이다.

```c
struct point
{
    int x;
    int y;
}// p1, p2, p3;
// 사용자 자료를 정의하고 변수 선언까지 한번에 하는 소스코드

int main(void)
{
    struct point p1, p2, p3;    // 사용자 정의 자료형 point 선언
    ...
    return 0;
}
```

이 때 만들어지는 p1은 int형 멤버 변수 x, y를 포함하고 있다. 따라서 point형 p1에는 sizeof(int)*2byte의 메모리공간이 할당되는 것이다. 아래 그림을 보고 직관적으로 이해해보도록 하자.

![구조체의 메모리](/assets/img/language/c/structure.png)
{:.lead loading="lazy" align="center"}

구조체의 형태
{:.figcaption}

### 구조체 변수의 접근

* 아래의 예시 코드로 이해해보도록 하자.

```c
#include <stdio.h>
struct point
{
    int x;
    int y;
};

int main(void)
{
    struct point p1;
    p1.x = 10;  // p1의 멤버 x에 10을 대입
    p1.y = 20;  // p2의 멤버 y에 20을 대입
    
    printf("%d, %d \n", p1.x, p1.y);
    // p1의 x와 y의 멤버변수들을 출력

    // 각각 멤버들의 주소값 얻기
    printf("%d, %d \n", &p1.x, &p1.y);

    ...
    return 0;
}

// 실행결과
10, 20
6442050, 6442054
```

* 예제

```c
// point.c
#include <stdio.h>
#include <math.h>

struct point
{
    int x;
    int y;
};

int main(void)
{
    struct point p1, p2;
    double distance;

    fputs("첫번째 점의 x, y 좌표 입력 : ", stdout);
    scanf("%d %d", &p1.x, &p1.y);

    fputs("두번째 점의 x, y 좌표 입력 : ", stdout);
    scanf("%d %d", &p2.x, &p2.y);

    // 두 점 사이의 거리 계산 공식
    distance =
        sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
    printf("두 점의 거리는 %f 입니다.", distance);

    return 0;
}

// 실행결과
첫번째 점의 x, y 좌표 입력 : 1 2
두번째 점의 x, y 좌표 입력 : 5 6
두 점의 거리는 5.656854 입니다.
```

```c
// TelPhone1.c
#include <stdio.h>
#include <string.h>

struct person
{
    char name[20];
    char phone[20];
};

int main(void)
{
    struct person p;

    strcpy(p.name, "홍길동");
    strcpy(p.phone, "02-1234-5678");

    printf("name : %s, phone : %s \n", p.name, p.phone);

    return 0;
}

// 실행결과
namd : 홍길동, phone : 02-1234-5678
```

&nbsp;&nbsp;만약 구조체 person의 멤버변수 name과 phone을 입력받아서 주입하고 싶다면 scanf함수나 fgets함수를 사용하면 된다. 하지만 이 때 각각의 멤버변수들은 char형 배열이므로 멤버변수의 이름에 주소값이 저장될 것이다. 따라서 주소값을 반환하는 &연산자는 쓸 필요가 없다.

### 구조체 변수의 초기화

* 배열 초기화 문법과 일치

```c
struct person
{
    char name[20];
    char phone[20];
    int age;
};

int main(void)
{
    struct person p = {"홍길동", "02-1234-5678", 20};
    ...
    return 0;
}
```

&nbsp;&nbsp;java를 배울 때는 생성자를 통해 사용자 정의 클래스를 선언했었다. 하지만 C언어에서는 배열의 형태로 선언과 동시에 초기화하는 방식을 사용하는 것을 알 수 있다.

## 구조체와 배열 그리고 포인터

### 구조체 배열의 선언

> 배열의 선언은 앞서 배웠던 개념들을 종합한다면 그렇게 어려운 점이 없다. 간단하게 예시를 통해 학습하도록 하자.
{:.note title="attention"}

```c
struct person
{
    char name[20];
    char phone[20];
    int age;
};

int main(void)
{
    struct person pArray[10];
    ...
    return 0;
}
```

![구조체의 메모리](/assets/img/language/c/struct_array.png)
{:.lead loading="lazy" align="center"}

구조체의 형태
{:.figcaption}

&nbsp;&nbsp;각 요소에 대한 접근방법 역시 쉽게 유추할 수 있다. i번째 person요소의 멤버변수 phone에 접근한다면 어떻게 해야할까? 다음과 같다.

> `pArray[i].phone`  
> `strcpy(pArray[i].name, "홍길동");`  
> `strcpy(pArray[i].phone, "02-1234-5678");`

아래의 예제로 각각의 요소를 입력으로 초기화하는 방법을 알아보자.

```c
// TelPhone2.c
#include <stdio.h>

struct person
{
    char name[20];
    char phone[20];
};

int main (void)
{
    struct person pArray[3];
    int i;
    
    // 데이터 입력
    for(i = 0; i < 3; i++)
    {
        printf("이름, 전화번호 순으로 입력 : ");
        scanf("%s %s", pArray[i].name, pArray[i].phone);
    }

    printf("\n 입력 결과는 다음과 같습니다.\n");
    
    // 데이터 출력
    for(i = 0; i < 3; i++)
    {
        printf("이름 : %s, ", pArray[i].name);
        printf("전화번호 : %s\n", pArray[i].phone);
    }
    return 0;
}
```

### 구조체 배열의 초기화

> 이 역시 앞서 배운 내용들을 토대로 생각해보면 쉽게 유추할 수 있다. 간단하게 예시를 통해 알아보도록 하자.
{:.note title="attention"}

```c
struct person
{
    char name[20];
    char phone[20];
};

int main(void)
{
    struct person pArray[3] = {
        {"Lee", "333"},
        {"Kim", "555"},
        {"SES", "777"}
    };
    ...
    return 0;
}
```

&nbsp;&nbsp;앞서 우리는 구조체의 초기화 방법 중 배열의 형태로 초기화하는 방법을 알아보았었다. 그를 통해 쉽게 유추할 수 있는 형태이다.  
&nbsp;&nbsp;자 여기서 초기화 형태를 보면 눈에 익숙한 형태이다. 2차원 배열에서 배웠던 초기화 방법과 같아 보인다. 이를 통해 알 수 있는 점은 구조체의 배열은 그 구조를 표현할 때 2차원적으로 표현이 가능하다는 것을 알 수 있고, 초기화 방법 역시 2차원 배열과 다를 바 없다는 것 역시 알 수 있다.

### 구조체와 포인터

1. 구조체 포인터를 선언하여 구조체 변수를 가리키는 경우

    ```c
    // struct_pointer1.c
    #include <stdio.h>

    struct person
    {
        char name[20];
        char phone[20];
    };

    int main(void)
    {
        struct person man = {"Thomas", "354-00xx"};
        struct person *pMan;
        pMan = &man;

        // 구조체 변수를 이용한 출력.
        printf("name : %s \n", man.name);
        printf("phone : %s \n", man.phone);

        // 구조체 포인터를 이용한 출력1
        printf("name : %s \n", (*pMan).name);
        printf("phone : %s \n", (*pMan).phone);

        // 구조체 포인터를 이용한 출력2
        printf("name : %s \n", pMan->name);
        printf("phone : %s \n", pMan->phone);

        return 0;
    }

    // 실행결과
    name : Thomas
    phone : 354-00xx
    name : Thomas
    phone : 354-00xx
    name : Thomas
    phone : 354-00xx
    ```
    
    &nbsp;&nbsp;여기서 새로운 연산자 '->'가 나왔다. '->' 연산자는 pMan이라는 포인터가 가리키는 대상의 멤버에 접근한다는 의미이다. 즉 위의 코드에서 `(*pMan).name`과 `pMan->name`은 같은 의미를 가진다. 대부분 후자로 표현하니 가급적이면 후자의 방법으로 표현하길 바란다.

2. 구조체의 멤버로 포인터 변수가 선언되는 경우**__(중요)__**

    ```c
    // struct_pointer2.c
    #include <stdio.h>

    struct perInfo
    {
        char addr[30];
        char tel[20];
    };
    struct person
    {
        char name[20];
        char pID[20];
        struct perInfo* info;
    };

    int main()
    {
        struct perInfo info = {"Korea Seoul", "3333-4444"};
        struct person man = {"Mr.Lee", "820204-xxxx512"};

        man.info = &info;

        printf("name : %s\n", man.name);
        printf("pID : %s\n", man.pID);
        printf("addr : %s\n", man.info->addr);
        // printf("addr : %s\n", (*man.info).addr);
        printf("tel : %s\n", man.info->tel);
        // printf("tel : %s\n", (*man.info).tel);
        return 0;
    }

    // 실행결과
    name : Mr.Lee
    pID : 820204-xxxx512
    addr : Korea Seoul
    tel : 3333-4444
    ```

    ```c
    // struct_pointer3.c
    #include <stdio.h>

    struct person
    {
        char name[20];
        char pID[20];
        struct person* frnd;
    };

    int main(void)
    {
        struct person man1 = {"Mr.Lee", "820204-0000512"};
        struct person man2 = {"Mr.Lee's Friend", "820000-0000101"};

        man1.frnd = &man2;

        printf("[Mr.Lee]\n");
        printf("name : %s\n", man1.name);
        printf("pID : %s\n", man2.pID);

        printf("[His Friend]\n");
        printf("name : %s\n", man1.frnd -> name);
        printf("pID : %s\n", man1.frnd -> pID);
        
        return 0;
    }

    // 실행결과
    [Mr.Lee]
    name : Mr.Lee
    pID : 820204-0000512
    [His Friend]
    name : Mr.Lee's Friend
    pID : 820000-0000101
    ```
    
    * 구조체는 자신과 같은 사용자정의 자료형도 멤버 변수로 가질 수 있으며, 다른 구조체도 멤버 변수로 가질 수 있다. 접근 방법 역시 다를 바 없다. 코드를 보고 조금만 생각해보면 전부 위에서 배웠던 내용들이다.

### 구조체 변수와 주소 값의 관계

* 구조체 변수의 주소값과 구조체 첫 번째 멤버 변수의 주소값은 같다.

    ```c
    //pointer_pointer.c
    #include <stdio.h>

    struct simple
    {
        int data1;
        int data2;
    };

    int main(void)
    {
        struct simple s = {1, 2};

        printf("address1 : %d \n", &s);
        printf("address2 : %d \n", &s.data1);

        return 0;
    }

    // 실행결과
    address1 : 6422040
    address2 : 6422040
    ```

---

> 구조체와 사용자 정의 자료형에 대해서 알아보았다. java의 class개념과 어느정도 유사하여 이해하는데 그렇게 어려운 점은 느껴지지 않았다. 하지만 새로운 연산자의 등장은 다소 생소할 수 있는 부분인 듯하다. 당분간은 두 가지 방법을 소스코드에 기입하면서 둘이 같은 의미를 가진다는 사실을 익혀두어야 할 것 같다.  
> 또한, 한가지 의문이 드는 점은 구조체 변수에 &연산자를 붙여줘야한다는 부분이다. 우리가 앞서 배웠던 배열이름은 포인터과 같은 역할을 하여 주소값과 그 자료형에 대한 정보가 모두 들어 있어 &연산자의 사용없이 포인터 변수로의 전달이 가능했다. 하지만 구조체는 그렇게 할 수 없는 것일까? 이는 좀 더 알아보아야 할 것 같다.
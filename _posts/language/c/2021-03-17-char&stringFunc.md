---
layout: post
title: 문자와 문자열 처리 함수
description: >
  문자와 문자열을 처리하는 함수에 대해서 알아본다.
hide_description: true
sitemap: false
date: 2021-03-17 00:33:00 +0900
category: language
tag: [c]
---

# 문자와 문자열 처리 함수

## 스트림과 데이터의 전송

### 입력과 출력, 그리고 스트림에 대한 이해

* 입력과 출력 : 파일, 콘솔, 소켓
    * 지금까지 만들어왔던 실행 파일들은 콘솔이 그 대상이었다.
    * 이런 입·출력을 하기 위해서는 해당 매체들과 연결된 일종의 '다리'가 필요하다. 각각의 매체에 '다리'를 연결하는 방식이 다르다.
* 스트림 : 데이터를 송·수신 하기 위한 일종의 '다리'

### 표준 입·출력 스트림

* 프로그램 실행 시 자동으로 생성 및 소멸
* 모니터와 키보드를 그 대상으로 한다.

|이름|스트림의 종류|입·출력장치|
|:---:|:---:|:---:|
stdin|표준 입력 스트림|키보드
stdout|표준 출력 스트림|모니터
stderr|표준 에러 스트림|모니터

## 문자단위 입·출력 함수

### 문자 출력 함수

```c
#include <stdio.h>

int putchar(int c);
// putchar라는 함수는 출력스트림을 통해서 콘솔로 데이터를 보내는 용도
// 보내는 데이터가 하나의 문자일 경우 사용
// 스트림이 이미 정해져 있는 함수(콘솔)
int fputc(int c, FILE* stream)
// 첫 인자는 전달하고자 하는 데이터
// 두번째 인자는 어떤 스트림을 통해서 데이터를 보낼 것인지를 결정하는 인자
```

### 문자 입력 함수

```c
#include <stdio.h>

int getchar(void);
// 콘솔에 연결되어있는 입력스트림을 통해 문자를 하나 읽어들이는 함수
// 스트림이 이미 정해져 있는 함수(콘솔)
int fgetc(FILE* stream);
// 어떤 스트림을 통해서 데이터를 읽을 것인지 결정하는 인자
```

* 예제

```c
// char_IO.c
// 'q'를 입력할 때까지 콘솔에 입력받은 문자를 출력
#include <stdio.h>

int main()
{
    char ch = 0;

    while(ch != 'q')
    {
        ch = getchar();
        putchar(ch);
        printf("%d ", 1);
    }

    return 0;
}

// 실행결과
a   // 입력
a1 
1   // 출력
abc // 입력
a1 b1 c1
1   // 출력
```

&nbsp;&nbsp;while문 안에 printf함수를 통해 여러 문자를 입력했을 때는 어떻게 동작하는지 까지 볼 수 있다. 여기서 살짝 의문이 드는 포인트는 abc입력후 각각의 문자를 출력할 때 가장 마지막에 나오는 1이라는 숫자이다. 단순히 생각하면 `a1 b1 c1` 라고 나온다고 생각할 것이다. 하지만 실제로 콘솔에 입력된 것은 입력하기 위해 누른 `Enter`키까지 입력으로 받은 것이다. 그렇기 때문에 입력 받은 `Enter(\n)`를 출력하고 그 후에 1까지 출력한 것이다.

다음으로 fgetc()함수와 fputc()함수를 활용하도록 예제를 바꿔보자.

```c
#include <stdio.h>

int main(void)
{
    char ch = 0;

    while(ch != 'q')
    {
        ch = fgetc(stdin);
        fputc(ch, stdout);
    }
    return 0;
}

// 실행결과
a   // 입력
a   // 출력
abc // 입력
abc // 출력
```

&nbsp;&nbsp;fgetc와 fputc함수는 어떤 스트림을 활용할 건지 인자로써 전달해 주어야 한다. 여기서 우리는 콘솔을 활용해야하므로 앞서 배웠던 표준 입출력 스트림의 이름인 stdin과 stdout을 활용해 주었다.

### EOF에 대한 이해

> End-Of-File
{:.note}

* fgetc, getchar 함수가 파일의 끝에 도달하는 경우 반환한다.
* End-Of-File의 약자로써, 파일의 끝을 표현하기 위한 상수(-1의 값을 지닌다.)
* **콘솔의 경우 Ctrl-Z가 파일의 EOF를 의미**한다.

```c
// Ctrl_z.c
#include <stdio.h>

int main(void)
{
    char ch = 0;

    while(ch != EOF) // #define EOF (-1)
    {
        ch = getchar();
        putchar(ch);
    }

    printf("program 종료 \n");

    return 0;
}

// 실행결과
asdf
asdf
as
as
^Z
program 종료
```

### 문자단위 입·출력의 필요성

* 용도에 맞는 적절한 함수를 제공함으로써 성능 향상을 도모
* 문자 하나를 입·출력하는데 printf와 scanf을 쓰기에는 프로그램이 지나치게 무거워진다.

## 문자열 단위 입·출력 함수

### 문자열 출력 함수

```c
#include <stdio.h>

int puts(const char *s);
// putchar라는 함수는 출력스트림을 통해서 콘솔로 데이터를 보내는 용도
// 보내는 데이터가 하나의 문자일 경우 사용
// 스트림이 이미 정해져 있는 함수(콘솔)
int fputc(const char *s, FILE* stream)
// 첫 인자는 전달하고자 하는 데이터
// 두번째 인자는 어떤 스트림을 통해서 데이터를 보낼 것인지를 결정하는 인자
```

### 문자 입력 함수

```c
#include <stdio.h>

int getchar(char* s);
// 콘솔에 연결되어있는 입력스트림을 통해 문자를 하나 읽어들이는 함수
// 스트림이 이미 정해져 있는 함수(콘솔)
int fgetc(char* s, int n, FILE* stream);
// 어떤 스트림을 통해서 데이터를 읽을 것인지 결정하는 인자
```

* 예제

```c
// puts_fputs.c
#include <stdio.h>

int main()
{
    fputs("fputs 함수에 의한 출력, ", stdout);
    fputs("I Like Ddukbokki ", stdout);

    fputs("\n", stdout);

    puts("puts 함수에 의한 출력, ");
    puts("I Like Ddukbokki ");

    return 0;
}

// 실행결과
fputs 함수에 의한 출력, I Like Ddukbokki
puts 함수에 의한 출력,
I Like Ddukbokki
```

&nbsp;&nbsp;두 함수에 아주 큰 차이점은 없지만 fputs함수는 줄바꿈을 직접 해주어야 한다. 하지만 puts함수는 자동으로 함수가 끝나면 줄바꿈을 실행하여 다음 puts함수로 출력한 문자열은 다음 줄에 출력이 되는 것을 알 수 있다.

```c
// gets_fgets.c
#include <stdio.h>

int main()
{
    char str[10];

    fputs("문자열을 입력하세요 : ", stdout);
    fgets(str, sizeof(str), stdin);
    // sizeof(str)-1 만큼 읽는다.
    // gets(str);

    fputs("입력된 문자열 : ", stdout);
    fputs(str, stdout);
}

// 실행결과
문자열을 입력하세요 : asdfawe            // 입력
입력된 문자열 : asdfawe                 // 출력
문자열을 입력하세요 : 1234567890abcdefg // 입력
입력된 문자열 : 123456789               // 출력
```

&nbsp;&nbsp;fgets와 gets에는 아주 중요한 차이점이 존재한다. gets함수는 입력된 문자열을 받는 변수 str의 크기가 실제로 입력된 문자열의 길이보다 작을경우 **할당된 배열의 크기를 넘는 메모리까지 읽어들이고, 그로인해 오류가 발생**하게 된다. 하지만 fgets함수는 배열보다 큰 문자열이 입력되더라도 그 이상 입력된 문자열은 받지 않으며, 그 마지막에는 String terminater인 '\0'을 삽입한다. 그래서 배열의 크기는 10이지만 9개의 문자만 읽는 것 이다.

## 표준 입·출력과 버퍼(Buffer)

### 입·출력 사이에 존재하는 버퍼의 이해

![표준 입출력과 버퍼](/assets/img/language/c/string_buffer.png)
{:.lead loading="lazy" align="center"}

스트림 상에 버퍼가 존재하는 형태이다.
{:.figcaption}

* 여분의 임시 메모리적 특징을 지닌다.
* 성능 향상이 목적이다.

* 출력 버퍼의 필요성

&nbsp;&nbsp;putchar함수를 호출하면서 'A', 'B', 'C'를 보내는 경우

```c
putchar('A');
putchar('B');
putchar('C');
```

CPU는 총 세번의 일을 수행해야 한다. 이는 상당히 비효율적이다.
이를 한 번에 수행하기 위해 putchar함수는 전달된 인자들을 출력버퍼로 보내두고, cpu는 여유가 있을 때 버퍼를 방문해 출력해줄 데이터가 있을 경우 한 번에 출력해준다. 즉 버퍼는 CPU를 좀 더 효율적으로 활용하기 위한 것이다.

### 버퍼를 비우는 작업을 하는 fflush 함수

```c
#include <stdio.h>

int fflush(FILE * stream);
// 성공 시 0, 실패 시 EOF 리턴
// stdout -> 목적지(출력매체)로 보낸다.
// stdin  -> 입력버퍼에 있는 데이터를 삭제한다.
```

* fflush 함수의 필요성

```c
// fflush.c
#include <stdio.h>

int main(void)
{
    char perID[7];
    char name[10];

    fputs("주민번호 앞 6자리를 입력하세요 : ", stdout);
    fgets("perID, sizeof(perID), stdin);

    // fflush(stdin);   // 입력 버퍼를 비운다.

    fputs("이름을 입력 하세요 : ", stdout);
    fgets(name, sizeof(name), stdin);

    printf("주민번호 앞자리 : %s\n", perID);
    printf("이          름 : %s\n", name);

    return 0;
}

// fflush가 없을 경우
주민번호 앞 6자리를 입력하세요 : 123456-1234567
이름을 입력 하세요 : 주민번호 앞자리 : 123456
이          름 : -1234567

// fflush가 있을 경우
주민번호 앞 6자리를 입력하세요 : 123456-1234567
이름을 입력 하세요 : 홍길동
주민번호 앞자리 : 123456
이          름 : 홍길동
```

&nbsp;&nbsp;fflush가 없으면 읽은 문자를 제외하고 나머지는 입력버퍼에 남아있는 상태가 된다. 그 상태에서 다시 버퍼를 읽게 되면 필요없는 값을 버퍼에서 읽어오는 것이 되는 것이다. 그렇기에 남아있는 쓸모없는 값을 미리 비워져 있어야 버퍼에 다시 데이터가 입력될 때까지 fgets함수가 기다리게 된다. 그림으로 표현하면 아래와 같다.

![표준 입출력과 버퍼](/assets/img/language/c/fflush.png)
{:.lead loading="lazy" align="center"}

버퍼에 남아있는 데이터들을 
{:.figcaption}

## 문자열 조작 함수

### 문자열의 길이를 반환하는 strlen 함수

```c
#include <stdio.h>

size_t strlen(const char* s)
// strlen은 null 문자를 포함하지 않는
// 순수 문자열의 길이를 리턴한다.
```

❓ size_t ➡ `typedef unsigned int size_t`

### 문자열을 복사하는 함수

```c
#include <string.h>

char* strcpy(char* dest, const char* src);
// src로 전달된 문자열을
// dest에 복사한다.
char* strncpy(char* dest, const char* src, size_t n);
// n은 복사할 문자열의 길이를 의미한다.
// src로 전달된 문자열에서
// n만큼의 문자열을
// dest에 복사한다.
```

### 문자열을 추가하는 함수

```c
#include <string.h>

char* strcat(char* dest, const char* src);
// dest로 전달된 문자열에서 마지막 null 문자를 삭제하고
// src로 전달된 문자열을 더한다.
// 이 때 dest의 크기는 src로 전달된 문자열이 들어갈 수 있는
// 충분한 크기가 있어야한다.
char* strncat(char* dest, const char* src, size_t n);
// dest로 전달된 문자열에서 마지막 null 문자를 삭제하고
// src로 전달된 문자열 중 n만큼을 더한다.

// 예제
#include <stdio.h>
#include <string.h>

int main(void)
{
    char str1[50]="Your favorite language is ";
    char str2[10];

    fputs("What is your favorite computer language ? : ", stdout);
    fgets(str2, sizeof(str2), stdin);

    strcat(str1, str2);
    // strncat(str1, str2, 4);
    printf("생성된 문자열 : %s \n", str1);

    return 0;
}

// 실행결과
What is your favorite computer language ? : C
생성된 문자열 : Your favorite language is C
```

### 문자열을 비교하는 함수

```c
#include <string.h>

int strcmp(const char* s1, const char* s2);
// "ABC" < "BCD"
int stncmp(const char* s1, const char* s2, size_t n);
// n : 비교할 문자열의 길이
```

|리턴 값|의미|
|:---:|:---:|
|0보다 큰 값(양수)|str1이 str2보다 큰 경우|
|0|str1과 str2가 완전히 같은 경우|
|0보다 작은 값(음수)|str1이 str2보다 작은 경우|

### 문자열을 숫자로 변환하는 함수들

```c
#include <stdlib.h>

int atoi(char *ptr);
// 문자열을 int형 데이터로 변환
long atol(char *ptr);
// 문자열을 long형 데이터로 변환
double atof(char *str);
// 문자열을 double형 데이터로 변환
```

### 대·소문자의 변환을 처리하는 함수들

```c
#include <ctypes.h>

int toupper(int c);
// 소문자를 대문자로
int tolower(int c);
// 대문자를 소문자로
```

---

> 문자와 문자열에 대한 함수들을 알아보고 스트림과 스트림에 존재하는 버퍼의 개념까지 살펴봤다. java를 먼저 공부해서 그런지 그렇게 확 와닿는 이름들은 아니었지만 익히는데 어려움은 없을 것 같다. 그보단 java를 배울때는 모호했던 스트림에 대해 조금은 더 개념을 익힌 듯 하다. 뒤에서 배울 파일 입출력에서 더 확실히 익힐 수 있었으면 좋겠다.
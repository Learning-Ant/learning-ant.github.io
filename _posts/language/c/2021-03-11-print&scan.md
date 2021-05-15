---
layout: post
title: printf와 scanf 함수
description: >
  printf함수와 scanf함수에 대한 고찰
hide_description: true
sitemap: false
date: 2021-03-11 19:20:00 +0900
category: language
tag: [c]
---

# [C/C++]printf()와 scanf()함수에 대한 고찰

## printf

> printf는 문자열을 출력하는 함수이다.
{:.note title="attention"}

### printf는 특수 문자(escape sequence) 출력이 가능하다.

|Escape Sequence|의미|
|:---:|:---:|
|\a|경고음 소리|
|\b|백스페이스|
|\f|폼 피드(form feed, <br/>커서를 다음 페이지의 시작위치로)|
|\n|개행|
|\r|carriage return(활성위치 현재라인 시작위치로)|
|\t|수평 Tab|
|\v|수직 Tab|
|\'|single quote|
|\"|double quote|
|\\|백슬래시|
|\O__|8진수|
|\xhh|16진수|

### Escape Sequence의 필요성

```c
#include <stdio.h>

int main(void)
{
  printf("앞집 강아지가 짖는다. "멍! 멍!" 귀엽다.");
  return 0;
}
```

> 위에서 원하는 출력문은 <앞집 강아지가 말했다."멍! 멍" 귀엽다.> 이다.
> 이 때, 컴파일러가 인식하는 범위에 double quote 사이에 있는 『멍! 멍!』은 포함되지 않는다.
> 원하는대로 출력하기 위해서는 Escape Sequence를 사용해 아래와 같이 적어야 한다.

```c
printf(앞집 강아지가 짖는다. \"멍! 멍!\" 귀엽다.");
```

### Format Specifier

* printf의 f는 "formatted"를 의미한다.
* 서식 지정 : 출력의 형태를 지정한다는 의미
* 예시

```c
#include <stdio.h>

int main(void)
{
  int age = 12;
  printf("10진수로 %d살이고 16진수로 %x살 입니다.", age, age);
  return 0;
}
```

* 가장 흔히 쓰이는 서식문자
  * %c, %d, %f, %s : 문자, 숫자, 소수, 문자열
* 부호 없는 정수형 출력(unsigned)
  * %o, %u, %x, %X : 8진수, 10진수, 16진수
  * x와 X의 차이는 0x1a로 표현될지, 0x1A로 표현될지의 차이
* '부동소수점 표현 방식'에 의한 출력
  * %e, %E : e와 E의 차이는 역시 위와 같이 표현방식의 차이이다.
  <br/>
ex )
3.1245e+2 ➡ $$ 3.1245 \times 10^2 $$
2.45e-4 ➡ $$ 2.45 \times 10^{-4} $$


* 소수점에 따라 표현방식을 선택하는 문자
  * %g, %G : 소수점 이하 6자리보다 많으면 %e, %E로, 적으면 %f로 표현
* 필드 폭을 지정하여 출력하기
  * %8d : 필드 폭을 8칸 확보하고 오른쪽 정렬
  * %-8d : 필드 폭을 8칸 확보하고 왼쪽 정렬
  * %+8d : 필드 폭을 8칸 확보하고 오른쪽 정렬하면서 양수는 + 음수는 -를 붙여서 출력

## scanf

> scanf는 데이터를 입력받는 함수이다.
{:.note title="attention"}

* 데이터를 입력받는 형태를 지정할 수 있다. <br/>
ex ) "%d %o %x"

```c
#include <stdio.h>

int main(void){
  int i, j, k;
  printf("세개의 정수 입력 : ");
  scanf("%d %o %x", &i, &j &k);

  printf("입력에 대한 출력 : ");
  printf("%d %d %d \n", i, j, k);

  return 0;
}
// 세개의 정수 입력 : 10 10 10
// 입력에 대한 출력 : 10 8 16
```

* 주의사항
  1. 정밀도 생각
  2. 소수 6자리 이하의 실수 입력 시 %f 사용
  3. 소수 6자리 이상의 실수 입력 시 %e 사용
  4. 단 double형 변수를 사용하는 경우에는 서식문자 %le를 사용

### 예시

```c
#include <stdio.h>

int main(void){
  float f;
  double d;

  printf("두개의 실수 입력 : ");
  scanf("%f %e", &f, &d);
  // %e로 받아주면 아래의 결과처럼 이상한 결과가 나오게 된다.
  // %le로 사용해 제대로 받을 수 있도록 해야한다.

  printf("입력에 대한 출력 : ");
  printf("%f %e \n", f, d);

  return 0;
}
```

```
두개의 실수 입력 : 3.14 3.14156789
입력에 대한 출력 : 3.140000 -9.255960e+061
```
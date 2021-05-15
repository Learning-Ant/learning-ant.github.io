---
layout: post
title: 문자열 검색(카프-라빈 알고리즘)
description: >
  Karp-Rabin Algorithm
hide_description: false
sitemap: false
date: 2021-04-18 20:02:00 +0900
category: algorithm
tag: [string, hash]
---

# [String Search]문자열 검색(카프-라빈 알고리즘)

> 문자열 검색을 수행할 수 있는 여러 알고리즘이 이미 세상에 공개되어 있다. 오늘은 먼저 가장 단순하게 찾으려는 문자열 패턴과 본문을 하나씩 비교해 찾는 방법과 카프-라빈 알고리즘을 활용하는 방법에 대해 알아본다.
{:.note title="attention"}

## 단순한 검색

> 알고리즘을 배우지 않은 사람이 문자열을 검색하려했을 때 가장 먼저 생각나는 방법이 아마 이 방법일 것이다. 앞서 설명했 듯 이 방법은 단순하게 패턴의 처음부터 하나씩 비교해 일치하는지 판단하는 방법이다.
{:.note title="attention"}

![단순 검색](/assets/img/algorithm/string_search/bruteforce/bruteforce1.png)
{:.lead loading="lazy" align="center"}

* 본문의 가장 처음부터 순차적으로 패턴과의 일치여부를 알아본다. 일치하지 않으면 본문의 다음 순서의 문자와 패턴의 처음을 비교한다.

![단순 검색](/assets/img/algorithm/string_search/bruteforce/bruteforce2.png)
{:.lead loading="lazy" align="center"}

* 본문의 문자와 패턴의 첫 번째문자가 일치하면 다음 패턴의 문자를 비교하고 일치하지 않으면 역시 본문의 다음 문자로 넘어간다.

![단순 검색](/assets/img/algorithm/string_search/bruteforce/bruteforce3.png)
{:.lead loading="lazy" align="center"}

* 본문의 문자열과 패턴이 일치하면 일치하는 본문의 인덱스를 반환한다.

### 구현

#### BruteForce.h

```c
#ifndef BRUTEFORCE_H
#define BRUTEFORCE_H

int BruteForce(char* Text, int TextSize, int Start, char* Pattern, int PatternSize);

#endif
```

#### BruteForce.c

```c
#include "BruteForce.h"

int BruteForce(char* Text, int TextSize, int Start, char* Pattern, int PatternSize)
{
  int i = 0, j = 0;

  // 본문에서 찾기 시작하려는 인덱스부터 순회
  // TextSize - PatternSize
  // 패턴의 길이를 빼주지 않으면 본문의 길이를 넘어서까지 순회
  for( i = Start; i <= TextSize - PatternSize ; i++)
  {
    // 패턴의 첫 글자부터 현재 본문 인덱스
    for(j = 0; j < PatternSize; j++)
    {
      if(Text[i + j] ! = Pattern[j])
        break;
      // 문자열의 마지막엔 '\n'이 있음을 염두에 둔다.
      // 즉 패턴의 \n 이 전까지 일치하면 j가 PattenrSize보다 크거나 같은지 확인 후
      // 같다면 본문의 위치를 반환
      if(j >= PatternSize)
        return i;
    }
  }

  return -1;
}
```

#### Test_BruteForce.

```c
#include <stdio.h>
#include <string.h>
#include "BruteForce.h"

// 본문을 받아줄 버퍼 길이
#define MAX_BUFFER 512

int main(int argc, char** argv)
{
  char* FilePath;
  FILE* fp;

  char Text[MAX_BUFFER];
  char* Pattern;
  int PatternSize = 0;
  int Line = 0;

  if(argc < 3)
  {
    printf("Usage: %s <FilePath> <Pattern>\n", argv[0]);
    return 1;
  }

  FilePath = argv[1];
  Pattern = argv[2];

  PatternSize = strlen(Pattern);

  // 파일이 존재하지 않을 경우
  if((fp = fopen(FilePath, "r")) == NULL)
  {
    printf("Cannot open file : %s\n", FilePath);
    return 1;
  }

  // 파일을 한줄 씩 읽으며 모두 읽을 때까지 순회
  while(fgets(Text, MAX_BUFFER, fp) != NULL)
  {
    int Position = BruteForce(Text, strlen(Text), 0, Pattern, PatternSize);

    // 현재 받은 Text에서 패턴과 일치하면
    if(Position >= 0)
    {
      printf("line : %d, column:%d : %s", Line++, Position, Text);
    }
  }

  fclose(fp);

  return 0;
}
```

## 카프-라빈 알고리즘(Karp-Rabin Algorithm)

> 카프-라빈 알고리즘은 해시값을 활용한 알고리즘이다. 해시 함수는 다음의 식을 따른다.
{:.note title="attention"}

$$
\begin{alignat*}{1}
  H_{i} =& S[i] × 2^{(m-1)}+S[i+1] × 2^{(m-2)}+ \cdots + S[i+m-2] × 2^1 + S[i+m-1] × 2^0 \\
  S&: 문자열  \\
  S[i]&: 문자열 \space 내 \space i번째\space문자 \\
  m&: 문자열의 \space 길이
\end{alignat*}
$$

위 식을 한글로 표현하면 **문자열 S에서 i번째부터 m개의 문자열을 해시함수로 바꾼 값이 H[i]** 가 된다고 할 수 있다.

하지만 해당 식을 바로 적용하기엔 비교 문자열(패턴)이 길어질 수록 연산의 횟수가 많아지고, 본문의 문자열을 순회하면서 반복적으로 계산해야 하므로 그 효율이 앞서 말했던 BruteForce와 별 차이가 없다.
그러므로 위 식에서 약간의 변형을 적용해 좀 더 효율적인 알고리즘을 제시한다.

$$
\begin{alignat*}{5}
  if \quad i &= 0, m=4: \\
  H_0 &= S[0] × 2^3 + S[1] × 2^2 + S[2] × 2^1 + S[3] × 2^0 \\
  H_1 &= S[1] × 2^3 + S[2] × 2^2 + S[3] × 2^1 + S[4] × 2^0 \\
  \\
  H_1 &= S[1] × 2^3 + S[2] × 2^2 + S[3] × 2^1 + S[4] × 2^0 \\
  &= 2(S[1] × 2^2 + S[2] × 2^1 + S[3] × 2^0) + S[4] × 2^0 \\
  &= 2\{(S[0] × 2^3 + S[1] × 2^2 + S[2] × 2^1 + S[3] × 2^0) - S[0] × 2^3 \} + S[4] × 2^0 \\
  &= 2(H_0 - S[0] × 2^3) + S[4] × 2^0 \\
  \\
  \therefore H_i &= 2(H_{i-1} - S[i-1] × 2^{m-1}) + S[i+m-1]
\end{alignat*}
$$

위 식을 보면 전에 비교한 문자열의 해시 값을 재사용해 좀 더 빠르게 계산할 수 있도록 바뀐 것을 알 수 있다. 이렇게 새롭게 구성된 해시 함수를 사용하면 패턴의 길이에는 영향을 받지않고 연산의 횟수가 단지 본문의 길이에만 영향을 받게 된다.
다만, 최초의 값(H(0))은 구해주어야 한다는 점을 기억하자.

한 가지 걸리는 점은 해시값이 무한히 커질 수 있다는 점이다. 이는 예전 해시 테이블을 구성할 때처럼 일정값 이상으로 커지지 않도록 modular 연산을 통해 그 제한을 두면 된다.

$$
H_i = \begin{cases}
  (2^{m-1} \cdot S[i] + 2^{m-2} \cdot S[i+1] + \cdots + 2^0 \cdot S[i+m-1]) \mod q &\text{, } i=0 \\
  (2(H_{i-1}-2^{m-1} \cdot S[i-1])+S[i+m-1]) \mod q &\text{, } i>0
\end{cases}
$$

모듈러 연산으로 그 최대값을 제한한다.
{:.figcaption}

아래의 예시를 그림으로 한단계씩 짚어가며 알아본다.

> 본문 : ABCEFDAEFAS
> 패턴 : FDAEF

알고리즘을 진행하기에 앞서 인자로 받는 값 외에 본문과 패턴의 H(0) 값을 각각 알아야한다.

$$
\begin{align*}
  H_{A0} &= 2^4 \cdot \text{`A'} + 2^3 \cdot \text{`B'} + 2^2 \cdot \text{`C'} + 2^1 \cdot \text{`E'} + 2^0 \cdot \text{`F'}  \\
  &=2044\\
  H_{P0} &= 2^4 \cdot \text{`F'} + 2^3 \cdot \text{`D'} + 2^2 \cdot \text{`A'} + 2^1 \cdot \text{`E'} + 2^0 \cdot \text{`F'}\\
  &=2132
\end{align*}
$$

'A'의 ASCII Code 값은 65
{:figcaption}

![카프-라빈 알고리즘](/assets/img/algorithm/string_search/karp_rabin/karp-rabin1.png)
{:.lead loading="lazy" align="center"}

* 이제 패턴의 해시값은 더 이상 구할 필요없다. 본문의 해시 값을 패턴의 해시값과 비교하고 다르다면 다음 문자열로 이동하여 해시값을 구한다.
이 때 해시값은 i>0일 때 해시값을 구하는 함수로 구하면 된다.

![카프-라빈 알고리즘](/assets/img/algorithm/string_search/karp_rabin/karp-rabin2.png)
{:.lead loading="lazy" align="center"}

* 위와 같이 이전에 구했던 해시값을 이용해 구하고 일치하지 않으면 계속 이동한다.

![카프-라빈 알고리즘](/assets/img/algorithm/string_search/karp_rabin/karp-rabin3.png)
{:.lead loading="lazy" align="center"}

* 일치하는 곳이 나오면 이제 실제 문자열을 비교해 정확히 일치하는지 확인한다. 해시값은 일치하더라도 찾아낸 문자열이 실제로 패턴과 일치하는지는 아직 모르기 때문이다.

### 구현

#### KarpRabin.h

```c
#ifndef KARPRABIN_H
#define KARPRABIN_H

int KarpRabin(char* Text, int TextSize, int Start, char* Pattern, int PatternSize);

int Hash(char* String, int Size);
int ReHash(char* String, int Start, int Size, int HashPrev, int Coefficient);

#endif
```

#### KarpRabin.c

```c
#include "KarpRabin.h"
#include <stdio.h>
#include <math.h>

int KarpRabin(char* Text, int TextSize, int Start, char* Pattern, int PatternSize)
{
  int i = 0, j = 0;
  // 2^{m-1}
  int Coefficient = pow( 2.0, PatternSize - 1);

  int HashText = Hash(Text, PatternSize);
  int HashPattern = Hash(Pattern, PatternSize);

  for(i = Start; i <= TextSize - PatternSize; i++)
  {
    HashText = ReHash(Text, i, PatternSize, HashText, Coefficient);

    if(HashPattern == HashTexT)
    {
      for ( j = 0; j < PatternSize; j++)
      {
        if(Text[i + j] != Pattern[j])
          break;
      }

      if(j >= PatternSize)
        return;
    }
  }

  return -1;
}

int Hash(char* String, int Size)
{
  int i = 0;
  int HashValue = 0;

  for(i = 0; i < Size; i++)
  {
    HashValue += (String[i] * pow(2.0, Size - (1 + i)));
  }

  return HashValue;
}

int ReHash(char* String, int Start, int Size, int HashPrev, int Coefficient)
{
  if(Start == 0)
    return HashPrev;

  return String[Start + Size - 1] + ( (HashPrev - Coefficient * String [Start-1]) * 2);
}
```
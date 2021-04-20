---
layout: post
title: 문자열 검색(KMP 알고리즘)
description: >
  KMP Algorithm
hide_description: false
sitemap: false
date: 2021-04-20 19:24:00 +0900
category: algorithm
tag: [string]
---

# KMP 알고리즘(Knuth-Morris-Pratt Algorithm) 

> KMP 알고리즘은 비교할 필요가 없는 부분은 지나치는 알고리즘이다. 패턴과 본문을 한 차례 비교하고나면 다음 단계의 탐색에서 사용할 수 있는 정보가 남고, 이 정보를 이용해 불필요한 비교를 피하는 것이다.
{:.note title="attention"}

## 접두부, 접미부, 경계

> 접두부(Prefix) : 문자열의 앞부분  
> 접미부(Suffix) : 문자열의 뒷부분  
> 경계(Border) : 문자열에서 일치하는 접두부와 접미부 쌍

예를 들어 'ABCSDAB'라는 문자열이 있다고 할 때, 얻을 수 있는 접두부와 접미부들은 아래와 같다.

|접두부|접미부|
|:---|---:|
|||
|A|B|
|AB|AB|
|ABC|DAB|
|ABCS|SDAB|
|ABCSD|CSDAB|
|ABCSDA|BCSDAB|
|ABCSDAB|ABCSDAB|

위 표에서 접두부와 접미부가 일치할 경우는 빈 문자열일 때와 'AB'일 때이다. 이처럼 빈 문자열이거나 'AB'를 해당 문자열의 경계(Border)라고 한다.

![KMP 알고리즘](/assets/img/algorithm/string_search/kmp/kmp1.png)
{:lead loading="lazy" align="center"}

* 본문과 패턴을 비교한다.

![KMP 알고리즘](/assets/img/algorithm/string_search/kmp/kmp2.png)
{:lead loading="lazy" align="center"}

* 불일치한 지점을 제외한 그 이전의 패턴 문자열에서 경계를 찾는다. 불일치한 지점을 제외한다는 것을 기억한다.

![KMP 알고리즘](/assets/img/algorithm/string_search/kmp/kmp3.png)
{:lead loading="lazy" align="center"}

* 해당 경계를 기준으로 이동거리와 탐색 시작 지점을 계산한다.

### 경계 지점의 계산

> 앞의 그림 설명을 보면 한가지 의문이 들 수 있다.  
> "불일치한 지점이 나올 때마다 경계를 찾는 로직이 필요하지 않을까?"  
> 실제로 불일치한 지점이 나올때마다 새로 경계를 찾아야하니 상당히 불편하다. 이를 위해 우리는 알고리즘을 시작하기 전에 패턴의 문자열로 그 경계값들을 미리 찾아둔다.
{:.note title="attention"}

* 미리미리 계산해주어 불일치가 발생한 문자열의 위치마다 최대 경계의 너비를 계산해두고 이를 테이블로 저장해두면 불일치가 일어날 때마다 연산해 줄 필요 없이 테이블에서 해당 값을 참조만하여 이동 거리와 패턴 검색위치를 모두 빠르게 구할 수 있다.

![KMP 테이블](/assets/img/algorithm/string_search/kmp/kmp-table1.png)
{:.lead loading="lazy" align="center"}

* 첫번째 문자는 항상 일치 접두부가 아에 존재하지 않는다. 0이 아닌 이유는 이전 접두부가 존재하더라도 경계가 없을 경우가 있기 때문에 0이 아닌 -1을 기입한다.

![KMP 테이블](/assets/img/algorithm/string_search/kmp/kmp-table2.png)
{:.lead loading="lazy" align="center"}

* 2번째 문자에서 불일치가 발생했다고 생각해보자. 그럼 이 전의 문자열(일치 접두부)은 'B'가 된다. 하지만 문자가 하나뿐이기에 경계가 존재할 수 없다. 그렇기에 0을 기입한다.
* 3번째 문자에서 불일치가 발생한 경우는 이 전의 문자열(일치 접두부)이 'BA'이고 이 역시 경계까 존재하지 않으므로 0으로 기입한다.

![KMP 테이블](/assets/img/algorithm/string_search/kmp/kmp-table3.png)
{:.lead loading="lazy" align="center"}

* 4번째 문자에서 불일치가 발생한다면 일치 접두부는 'BAB'가 되고 이 때의 최대 경계는 'B'가 된다. 그러므로 테이블에는 1을 기입한다.

![KMP 테이블](/assets/img/algorithm/string_search/kmp/kmp-table4.png)
{:.lead loading="lazy" align="center"}

* 그렇게 모든 테이블의 값을 기입하면 위와 같은 테이블이 된다. 여기서 패턴 그 다음에도 테이블 값이 기입되어 있는데 이는 본문 내의 문자열에서 패턴과 일치하는 부분을 찾았지만 탐색을 종료하지 않고 계속 탐색하고자 할 때 사용하는 값이다.

그럼 위의 테이블은 어떻게 사용하게 될까?  
위에서 이동 거리를 계산할 때를 생각해보자. 이동 거리는 일치 접두부의 길이에서 경계의 길이만큼을 제한 값이었다. 즉 식으로 정리하면

> 이동 거리 = 일치 접두부의 길이 - 최대 경계너비

가 되고, 우리는 일치 접두부의 길이와 최대 경계너비를 모두 미리 작성해둔 테이블에서 알아낼 수 있다.

패턴의 검색 위치는 최대 경계너비의 값이 검색 위치의 인덱스가 될 것이다.

### 구현

#### KnuthMorrisPratt.h
```c
#ifndef KNUTHMORRISPRATT_H
#define KNUTHMORRISPRATT_H

#include <stdio.h>

int KnuthMorrisPratt(char* Text, int TextSize, int Start, char* Pattern, int PatternSize);

// 테이블 만들기
void Preprocess(char* Pattern, int PatternSize, int* Border);

#endif
```

#### KnuthMorrisPartt.c

```c
#include "KnuthMorrisPratt.h"
#include <stdlib.h>

void PrepProcess(char* Pattern, int PatternSize, int* Border)
{
    int i = 0;
    int j = -1;

    Border[0] = -1;

    while(i < PatternSize)
    {
        // 이 부분이 살짝 이해하기 힘들 수 있다.
        // 과정을 직접 적어보면 이해가 갈 것이다.
        while(j > -1 && Pattern[i] != Pattern[j])
            j = Border[j];
        i++;
        j++;

        Border[i] = j;
    }
}

int KnuthMorrisPratt(char* Text, int TextSize, int Start, char* Pattern, int PatternSize)
{
    int i = Start;
    int j = 0;
    int Position = -1;

    int* Border = (int*)calloc(PatternSize + 1, sizeof(int));

    Preprocess(Pattern, PatternSize, Border);

    while( i < TextSize)
    {
        // 불일치하면 j에 최대 경계너비 대입
        while(j >= 0 && Text[i] != Pattern[j])
            j = Border[j];

        i++;
        j++;

        if(j == PatternSize)
        {
            Position = i - j;
            break;
        }
    }

    free(Border);
    return Position;
}
```


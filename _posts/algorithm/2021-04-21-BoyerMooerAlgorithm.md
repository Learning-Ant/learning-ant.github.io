---
layout: post
title: 문자열 검색(보이어-무어 알고리즘)
description: >
  Boyer-Moore Algorithm
hide_description: false
sitemap: false
date: 2021-04-21 20:24:00 +0900
category: algorithm
tag: [string]
---

# 보이어-무어 알고리즘(Boyer-Moore Algorithm)

> 보이어-무어 알고리즘은 지금까지 포스팅했던 문자열 검색(문자열의 처음부터 탐색) 알고리즘과 달리 패턴의 꼬리부터 탐색하는 알고리즘이다. 비교구간의 이동은 왼쪽에서 오른쪽으로 동일하다.  
> 하지만 그 이동의 간격은 좀 다른 로직으로 구현된다. 먼저 아래의 그림을 통해 직관적으로 알아본다.
{:.note title="attention"}

![보이어-무어 알고리즘](/assets/img/algorithm/string_search/bm/bm.png)
{:lead loading="lazy" align="center"}

보이어-무어 알고리즘의 이동간격
{:.figcaption}

위처럼 불일치한 지점의 문자가 패턴안에 존재하지 않으면 패턴의 길이만큼 이동하게 된다.  
이런 <u>보이어-무어 알고리즘</u>에서 패턴의 이동은 아래 두 가지로 나뉜다.
1. 나쁜 문자 이동(Bad Character Shift)
2. 착한 접미부 이동(Good Suffix Shift)
이 두 가지를 차례차례 알아보도록 한다.

## 나쁜 문자 이동(Bad Character Shift)

> 이 이름의 의미는 나쁜 문자(불일치하는 본문의 문자)를 이동시킨다는 의미이다.
{:.note title="attention"}

이 이동방법의 로직은 아래의 순서로 구현된다.
1. 패턴에서 나쁜 문자(본문에서의 불일치 문자)를 찾는다.
2. 찾아낸 패턴의 나쁜 문자의 위치가 본문의 나쁜 문자 위치와 일치하게 패턴을 이동시킨다.

![나쁜 문자 이동](/assets/img/algorithm/string_search/bm/bad_char_shift1.png)
{:lead loading="lazy" align="center"}

* 패턴과 본문을 비교하고 불일치하는 문자(나쁜 문자)를 찾으면 그 문자를 패턴안에서 검색한다. 그 후 패턴에서 찾은 나쁜 문자의 위치와 본문에서의 나쁜 문자가 접할 수 있도록 패턴을 이동한다.

![나쁜 문자 이동](/assets/img/algorithm/string_search/bm/bad_char_shift2.png)
{:lead loading="lazy" align="center"}

* 이런 나쁜 문자 이동이 항상 가능한 것은 아니다. 위의 그림처럼 본문에서 불일치하는 나쁜 문자가 패턴에서 본문의 위치보다 앞에 있을 경우에 위치를 일치시키려면 한 단계 뒤로 가야하는 상황이 벌어진다.  
이럴 때는 '착한 접미부 이동'을 사용한다.

## 착한 접미부 이동(Good Suffix Shift)

> 보이어-무어 알고리즘은 패턴을 꼬리에서부터 비교하기 때문에 패턴에는 본문과 일치하는 접미부가 나타나게 된다. 이를 이용하여 이동하는 방식을 <u>착한 접미부 이동</u>이라 한다.
{:.note title="attention"}

착한 접미부 이동은 두 가지 경우가 나타날 수 있다.

1️⃣ 불일치가 일어났을 때 착한 접미부와 동일한 문자열이 패턴의 착한 접미부 왼쪽에 존재하는 경우
    
- 말로만 봤을 때는 와닿지가 않는다. 아래의 그림을 보며 이해해보도록 한다.
    
![착한 접미부 이동#1](/assets/img/algorithm/string_search/bm/good_suffix_shift1.png)
{:lead loading="lazy" align="center"}

2️⃣ 착한 접미부가 패턴 안에 존재하지는 않지만, 착한 접미부의 접미부가 패턴의 접두부와 일치하는 경우

- 이 역시 그림으로 좀 더 직관적으로 이해해본다.

![착한 접미부 이동#2-1](/assets/img/algorithm/string_search/bm/good_suffix_shift2-1.png)
{:lead loading="lazy" align="center"}

* 불일치 이후의 접미부와 패턴의 접두부가 일치하는 부분을 찾을 수 없다.

![착한 접미부 이동#2-2](/assets/img/algorithm/string_search/bm/good_suffix_shift2-2.png)
{:lead loading="lazy" align="center"}

* 그렇다면 해당 접미부의 접미부를 생각하고 그와 일치하는 패턴의 접두부를 찾는다. 그 후 두 부분이 겹칠 수 있도록 이동한다.

> 이 알고리즘을 구현하기 위해서 필요한 것이 있다. 이런 일치부분에 대한 정보들을 매번 비교할 때마다 수행할 수 없으니 미리 테이블을 작성하여 바로바로 이동거리를 알아낼 수 있도록 하는 것이다. KMP Algorithm처럼..
{:.note title="attention"}

## 보이어-무어 알고리즘의 전처리

### 나쁜 문자 이동 테이블

> 나쁜 문자 이동 테이블의 제작은 쉽다. 불일치한 시점에서의 본문 문자를 기억하고 패턴의 왼쪽에서부터 오른쪽으로 탐색해나가면 패턴 안에 존재하는 나쁜문자 중 가장 오른쪽에 있는 문자의 인덱스를 알아 낼 수 있기 때문이다.
{:.note title="attention"}

패턴을 탐색하면서 나쁜 문자와 일치할 때의 인덱스를 테이블에 저장한다.

* 구현

```c
void BuildBCT(char* Pattern, int PatternSize, int* BCT)
{
    int i;
    int j;

    for(i = 0; i < 128; i++)
    {
        BCT[i]=-1;
    }

    for(j = 0; j < PatternSize; j++)
        BCT[Pattern[j]] = j;
}
```

int형 배열 BCT는 총 128의 길이(ASCII Code)를 가지고 각 문자와 대응하는 배열의 인덱스에 해당 문자의 가장 오른쪽 인덱스를 저장한다.

### 착한 접미부 이동 테이블

> 앞서 설명했듯이 착한 접미부는 두 가지의 경우를 고려해서 테이블을 만들어야 한다. 테이블이 두 개가 필요할 것 같지만, 하나면 충분히 해결 할 수 있다.
{:.note title="attention"}

#### 작업 중.. 로직이 쉽게 이해 되지 않는다...
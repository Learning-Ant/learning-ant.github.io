---
layout: post
title: 동적 계획법
description: >
  Dynamic Programming
hide_description: false
sitemap: false
date: 2021-04-28 20:24:00 +0900
category: algorithm
tag : [dynamic]
---

# 동적 계획법(Dynamic Programming)

> 동적 계획법은 이미 한 번 푼 적 있는 문제를 저장해두었다가 풀어가며 최종적으로 구하고자하는 답을 구하는 과정이다. 문제를 풀기위한 테이블을 미리 작성해 두고 하나씩 채워가며 최종적으로 원하는 답을 구하는 것이라 할 수 있다.
{:.note title="attention"}

이런 동적 계획법은 풀 수 있는 문제의 범위가 한정 되어 있다. 어떤 문제를 동적 계획법으로 풀기 위해서는 그 문제가 '최적 부분 구조(Optimal Substructure)'를 갖추고 있어야 한다.
'최적 부분 구조'란 전체 문제의 최적해가 부분 문제의 최적해로부터 만들어지는 구조이다. 예를 들어, 부분 문제의 답 n개를 모두 알아야만 그 문제를 풀 수 있다면 그 문제는 최적 부분 구조를 갖추었다고 볼 수 있다.  
  
이런 동적 계획법의 알고리즘은 다음의 순서로 구현할 수 있다.

1. 문제를 부분 문제로 나눈다.
2. 가장 작은 부분 문제부터 해를 구하여 테이블에 저장한다.
3. 테이블에 저장되어 있는 부분 문제의 해를 이용해 점차적으로 상위 부분 문제의 최적해를 구한다.

## 피보나치 수열

> 피보나치 수열이 다시 나왔다. 이 수열은 여러가지 알고리즘을 가장 쉽게 이해할 수 있도록 해주는 수열이다. 이 수열을 이용해 다시 한 번 동적 계획법에 좀 더 쉽게 접근해보도록 하자.
{:.note title="attention"}

앞서 설명했듯이 동적 계획법으로 문제를 풀기위해서는 그 문제가 '최적 부분 구조'를 이루어야 한다고 했다. 피보나치 수열은 아래와 같은 점화식을 가지고 있다.

$$
F_{n} = F_{n-1} + F_{n-2}
$$

이런 점화식은 최적 부분 구조를 가지고 있다고 볼 수 있다. n번째 피보나치 수열을 알기 위해서는 n-1번, n-2번째의 피보나치 수를 알아야만 하기 때문이다.  
  
위에서 설명한 동적 계획법 구현 순서를 생각하며 생각해본다. 피보나치 수열에서 가장 처음의 값, 그 다음의 값은 주어진다.

$$
\begin{align*}
    F_{0} = 0 \\
    F_{1} = 1
\end{align*}
$$

이를 이용해 다음의 테이블을 완성할 수 있다.

|테이블 인덱스|저장된 값|
|:---|:---|
|[0]|0|
|[1]|1|
|[2]|1|
|[3]|2|
|[4]|3|
|[5]|5|
|[6]|8|
|[7]|13|
|[8]|21|
|[9]|34|
|[10]|55|
|...|...|
|[n]|F(n)|

위 테이블에서 3번째 행부터는 그 이전의 두 행의 값을 더해서 구한 값이다. 이를 코드로 구현하면 다음과 같다.

### 구현

```c
#include <stdio.h>
#include <stdlib.h>

typedef unsigned long ULONG;

ULONG Fibonacci(int N)
{
    int i;
    ULONG Result;
    ULONG* FibonacciTable;

    if(N == 0 || N == 1)
        return N;

    FibonacciTable = (ULONG*)malloc(sizeof(ULONG) * (N + 1))

    FibonacciTable[0] = 0;
    FibonacciTable[1] = 1;

    for(i = 2; i <= N; i++)
    {
        FibonacciTable[i] = FibonacciTable[i - 1] + FibonacciTable[i - 2];
    }

    Result = FibonacciTable[N];

    free(FibonacciTable);

    return Result;
}

int main(void)
{
    int N = 46;
    ULONG Result = Fibonacci(N);
    printf("%d번째 피보나치 수: %d", N, Result);
    return 0;
}

// 실행결과
46번째 피보나치 수: 1836311903
```

간단하게 동적 계획법에 대해 알아보았다. 사실 실제로 동적 계획법으로 구현한 피보나치 수열의 Big O는 $ O(n) $으로 분할 정복의 $ O( \log_{2} n) $보다 시간 복잡도가 좋지 않다. 하지만 가장 간단하게 구현하면서 동적 계획법의 개념을 쉽게 접할 수 있어 포스팅해보았다.
  
다음 포스팅으로는 이런 동적계획법을 이용해 LCS(Longest Common Subsequence, 최장 공통 부분 순서) 알고리즘에 대해 알아보도록 하겠다.
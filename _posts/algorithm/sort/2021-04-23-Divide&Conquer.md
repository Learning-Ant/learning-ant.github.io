---
layout: post
title: 분할 정복
description: >
  Divide and Conquer
hide_description: false
sitemap: false
date: 2021-04-23 19:24:00 +0900
category: algorithm
tag: [sort]
---

# [Divide&Conquer]분할 정복 알고리즘

> 분할 정복 알고리즘은 문제를 더 이상 나눌 수 없는 단위까지 나누고 나누어진 문제를 각각 풀어나가면서 전체 문제의 답을 얻는 알고리즘이다. 앞서 포스팅했던 퀵 정렬이 분할 정복 알고리즘의 한 예이다.
{:.note title="attention"}

이런 분할 정복의 알고리즘은 아래의 과정을 따르게된다.

1. 분할(Divide) : 문제가 분할 가능한 경우 여러 개의 하위 문제로 나눈다.
2. 정복(Conquer) : 더 이상 분할 할 수 없는 단위까지 나눈 후 각각의 문제를 풀어나간다.
3. 결합(Combine) : 2번 과정에서 각각 얻어낸 부분들을 취합한다.

이러한 과정을 거치는 분할 정복 알고리즘에서 가장 중요한 것은 '분할'이다. '분할'만 제대로 성공한다면 '정복'의 부분은 보다 쉽게 다가갈 수 있게 된다.  
이런 분할 정복 알고리즘은 보통 재귀 호출로써 구현이 된다. 알고리즘의 논리로 봐서는 상당히 효율적인 구성을 가지고 있지만, 재귀 호출을 사용하면서 발생하는 비용 때문에 그 효율성이 줄게 된다.

## 병합 정렬(Merge Sort)

> 병합 정렬은 앞서 알아봤던 [퀵 정렬](/algorithm/2021-04-01-QuickSort)과 비슷한 성능을 가진다. 이 알고리즘은 그 유명한 **존 폰 노이만**이 고안했다고 한다.
{:note title="attention"}

병합 정렬의 로직은 아래의 순서로 진행된다.

1. 정렬할 데이터 집합을 반으로 나눈다.
2. 나누어진 하위 데이터 집합의 크기가 2 이상이면 하위 데이터 집합들에 대해 계속 반복한다.
3. 원래 같은 집합에서 나뉘어 나온 하위 데이터 집합들 중 인접합 두 집합을 병합해 나간다. 병합 할 때는 데이터 집합의 원소는 크기 순서대로 정렬한다.
4. 나뉘어진 데이터 집합들이 다시 하나의 데이터 집합을 이룰 때까지 반복한다.

위 과정을 좀 더 직관적으로 알 수 있도록 아래 그림을 순서대로 따라가 본다.

![병합 정렬](/assets/img/algorithm/sort/merge_sort/merge_sort1.png)
{:.lead loading="lazy" align="center"}

* 위와 같은 데이터 집합이 있다고 가정하자. 이 데이터 집합을 각 데이터 집합의 길이가 2미만이 될 때까지 계속 분할 해준다. 분할 과정이 끝나면 다음과 같이 데이터들이 분할 된다.

![병합 정렬](/assets/img/algorithm/sort/merge_sort/merge_sort2.png)
{:.lead loading="lazy" align="center"}

* 위 그림처럼 분할된 데이터 집합들이 생겼다. 이제 이를 다시 하나의 데이터 집합으로 만들어가면서 각각의 데이터 집합들을 합칠 때 순서대로 정렬 해가면서 병합을 수행한다.

![병합 정렬](/assets/img/algorithm/sort/merge_sort/merge_sort3.png)
{:.lead loading="lazy" align="center"}

* 모든 병합이 완료되면 위 그림의 가장 상단의 데이터 집합처럼 정렬된 데이터 집합이 완성된다. 이러한 과정들을 보면 정작 '정렬'이 수행되는 과정이 빠져있다. 병합 정렬인 만큼 그 수행과정을 알아야 하니 다음 그림의 순서들로 그에 대해 알아본다.

![병합 시 정렬 수행](/assets/img/algorithm/sort/merge_sort/merge_sort4.png)
{:.lead loading="lazy" align="center"}

* 위와 같은 분할 된 데이터 집합이 있고, 그를 병합하기 위한 배열 C가 있다고 할 때 그 과정을 차근차근 짚어간다.

![병합 시 정렬 수행](/assets/img/algorithm/sort/merge_sort/merge_sort5.png)
{:.lead loading="lazy" align="center"}

* 가장 먼저 각 데이터 집합에서 첫번째요소들의 크기를 비교한다. 그 중 A 집합 요소가 더 작으므로 집합 C의 첫 요소로 삽입하고, 집합 A에서는 첫 요소를 삭제한다.

![병합 시 정렬 수행](/assets/img/algorithm/sort/merge_sort/merge_sort6.png)
{:.lead loading="lazy" align="center"}

* 그 후 집합 A의 두 번째 요소와 집합 B의 첫 번째 요소를 비교한다. 집합 B의 요소가 더 작으므로 이전 과정처럼 집합 C의 두 번째 요소로 삽입 후 집합 B의 첫 요소는 삭제한다.

![병합 시 정렬 수행](/assets/img/algorithm/sort/merge_sort/merge_sort7.png)
{:.lead loading="lazy" align="center"}

* 이번엔 집합 A의 두 번째 요소와 집합 B의 두 번째 요소를 비교한다. 집합 B의 요소가 더 작으므로 동일하게 집합 C의 세 번째 요소로 삽입 한 후 집합 B의 두 번째 요소는 삭제한다.

![병합 시 정렬 수행](/assets/img/algorithm/sort/merge_sort/merge_sort8.png)
{:.lead loading="lazy" align="center"}

* 앞의 과정들을 반복하면 크기 순서대로 정렬이 된 것을 그림을 통해 알 수 있다.

### 병합 정렬 알고리즘 구현

> 실제 병합 정렬 알고리즘을 구현하는 MergeSort() 함수는 크게 세 가지의 일을 하게 된다.  
> 1. 데이터 집합을 반으로 나눈다.  
> 2. 반으로 나눈 데이터 집합을 매개 변수로 삼아 재귀 호출을 실행한다.  
> 3. 둘로 나눈 데이터 집합을 다시 병합한다.
{:.note title="attention"}

위에서 병합 정렬의 수행 순서에 대해 설명할 때는 마치 메모리 상에 새로운 데이터 집합을 저장할 수 있는 공간을 선정하고 각각의 공간에 병합을 진행하며 정렬을 수행하는 것처럼 묘사했지만, 실제 코드에서는 물리적으로 메모리에 할당하지는 않는다.  
그저 어디서부터 어디까지가 나눠진 데이터 집합인지를 구분할 수 있도록 <u>시작, 중간, 마지막 인덱스 값</u>을 받아 함수를 구현한다.

#### MergeSort.c

```c
#include <stdio.h>
#include <stdlib.h>

void MergeSort(int DataSet[], int StartIndex, int EndIndex);
void Merge(int DataSet[], int StartIndex, int MiddleIndex, int EndIndex);

void MergeSort(int DataSet[], int StartIndex, int EndIndex);
{
    int MiddleIndex;

    if(EndIndex - StartIndex < 1)
        return;

    MiddleIndex = (StartIndex + EndIndeX) / 2;

    MergeSort(DataSet, StartIndex, MiddleIndex);
    MergeSort(DataSet, MiddleIndex + 1, EndIndex);

    Merge(DataSet, StartIndex, MiddleIndex, EndIndex);
}

void Merge(int DataSet[], int StartIndex, int MiddleIndex, int EndIndex);
{
    int i ;
    int LeftIndex = StartIndex;
    int RightIndex = MiddleIndex + 1;
    int DestIndex = 0;

    int* Destination = (int*)malloc(sizeof(int) * (EndIndex - StartIndex + 1));

    while(LeftIndex <= MiddleIndex && RightIndex <= EndIndex)
    {
        if(DataSet[LeftIndex] < DataSet[RightIndex])
        {
            Destination[DestIndex] = DataSet[LeftIndex];
            LeftIndex++;
        }
        else
        {
            Destination[DestIndex] = DataSet[RightIndex];
            RightIndex++;
        }
        DestIndex++;
    }

    while(LeftIndex <= MiddleIndex)
        Destination[DestIndex++] = DataSet[LeftIndex++];

    while(RightIndex <= EndIndex)
        Destination[DestIndex++] = DataSet[RightIndex++];

    DestIndex = 0;
    for(i = StartIndex; i <= EndIndex; i++)
    {
        DataSet[i] = Destination[DestIndex++];
    }
    free(Destination);
}

int main()
{
    int DataSet[] = {51, 687, 651, 15, 25, 4, 8, 321, 8, 84, 823, 701};
    int Length = sizeof(DataSet)/ sizeof(DataSet[0]);
    int i = 0;

    MergeSort(DataSet, 0, Length-1);

    for(i = 0; i < Length; i++)
    {
        printf("%d ", DataSet[i]);
    }

    printf("\n");

    return 0;
}

// 실행결과
```

## 거듭제곱

> 거듭제곱은 수행 시간이 오래 걸리는 연산이다. 이를 제곱의 특성을 이용해 분할 정복기법으로 구현이 가능하다.
{:.note title="attention"}

$$
C^{n} = \begin{cases}
    C^{n/2}C^{n/2} &\text{, n은 짝수} \\
    C^{(n-1)/2}C^{(n-1)/2}C &\text{, n은 홀수} 
\end{cases}
$$

어떤 수 C의 n번 제곱한 결과는 위와 같은 식처럼 두 경우로 나누어 생각 할 수 있다. 이를 이용해 문제를 더 이상 쪼갤 수 없는 단위까지 분할하여 하나씩 해결해 나가는 분할 정복 알고리즘으로 구현할 수 있다.

### 구현

#### Exponentiation.c

```c
#include <stdio.h>

typedef unsigned long long ULONG;

ULONG Power(int Base, int Exponent)
{
    if (Exponent == 1)
        return Base;
    else if (Base == 0)
        return 1;

    if (Exponenet % 2 == 0)
    {
        ULONG NewBase = Power(Base, Exponenet/2);
        return NewBase * NewBase;
    }
    else
    {
        ULONG NewBase = Power(Base, (Exponent - 1)/2);
        return NewBase * NewBase * Base;
    }
}

int main(void)
{
    int Base = 2;
    int Exponenet = 30;
    printf("%d ^ %d = %lu\n", Base, Exponenet, Power(Base, Exponenet));

    return 0;
}

// 실행결과

2 ^ 30 = 1073741824
```

## 피보나치 수

> 재귀적 호출로 구현할 수 있는 유명한 수열 중에는 피보나치 수라는 것이 있다.  
> $$ a_{n+2} = a_{n+1} + a_{n} $$  
> 위와 같은 점화식을 따르는 수열인데 이 역시 분할 정복 알고리즘으로 구현이 가능하다.
{:.note title="attention"}

위의 점화식을 토대로 함수를 작성해보면 아래와 같다.

$$
F_{n} = \begin{cases}
0 &\text{, n = 0} \\
1 &\text{, n = 1} \\
F_{n-1} + F_{n-2} &\text{, n > 1}
\end{cases}
$$

이 점화식을 가지고 함수를 구현하게 되면 아래처럼 작성할 수 있다.

```c
ULONG Fibonacci(int n)
{
    if (n == 0)
        return 0;
    if (n == 1)
        return 1;
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
```

이렇게 전전 피보나치 수와 전 피보나치 수를 재귀적으로 호출해 결국 n번째 피보나치 수를 알 수 있게 되는 것이다.  
하지만 이는 n이 커질수록 재귀호출이 2의 제곱수만큼 늘어나게 된다. 아래의 도표로 그 심각성을 느껴보자.

![피보나치 수](/assets/img/algorithm/divide_conquer/fibonacci/fibonacci-graph.png)
{:.lead loading="lazy" align="center"}

n이 커질 수록 재귀호출해야하는 횟수가 기하급수적으로 늘어난다.
{:.figcaption}

사실 위와 같은 재귀적 호출은 분할 정복이라 볼 수 없다. 위의 기하급수적으로 늘어나는 재귀호출을 개선하기 위해 분할 정복 알고리즘을 적용해본다.

### 피보나치 수열의 분할 정복

> 피보나치 수열은 행렬로의 표현이 가능하다. 피보나치 수열을 행렬문제로 바꾸어 행렬의 특성을 이용해 거듭 제곱과 비슷한 문제로 만들 수 있고, 피보나치의 기하급수적으로 늘어나는 재귀호출을 대폭 줄일 수 있게된다.
{:.note title="attention"}

가장 처음의 피보나치 수열을 행렬에 적용해본다.

$$
\begin{bmatrix}
    F_{2} & F_{1} \\
    F_{1} & F_{0}
\end{bmatrix} =
\begin{bmatrix}
    1 & 1 \\
    1 & 0
\end{bmatrix}
$$

만약 이 행렬을 제곱하게 되면 다음과 같이 된다.

$$
\begin{align*}
    \begin{bmatrix}
        F_{2} & F_{1} \\
        F_{1} & F_{0}
    \end{bmatrix}^{2} &=
    \begin{bmatrix}
        F_{2} & F_{1} \\
        F_{1} & F_{0}
    \end{bmatrix}
    \begin{bmatrix}
        1 & 1 \\
        1 & 0
    \end{bmatrix}=
    \begin{bmatrix}
        F_{2} + F_{1} & F_{2} \\
        F_{1} + F_{0} & F_{1}
    \end{bmatrix} \\ &=
    \begin{bmatrix}
        F_{3} & F_{2} \\
        F_{2} & F_{1}
    \end{bmatrix}
\end{align*}
$$

이를 일반화 시키면 아래와 같은 공식이 된다.

$$
\begin{bmatrix}
    F_{n+1} & F_{n} \\
    F_{n} & F_{n - 1}
\end{bmatrix} =
\begin{bmatrix}
    1 & 1 \\
    1 & 0
\end{bmatrix}^{n} =
\begin{bmatrix}
    1 & 1 \\
    1 & 0
\end{bmatrix}^{n-1}
\begin{bmatrix}
    1 & 1 \\
    1 & 0
\end{bmatrix}
$$

여기서 이제 행렬의 곱셈에 분할을 적용한다.

$$
\begin{bmatrix}
    F_{n+1} & F_{n} \\
    F_{n} & F_{n - 1}
\end{bmatrix} =
\begin{bmatrix}
    1 & 1 \\
    1 & 0
\end{bmatrix}^{n} =
\begin{bmatrix}
    1 & 1 \\
    1 & 0
\end{bmatrix}^{n/2}
\begin{bmatrix}
    1 & 1 \\
    1 & 0
\end{bmatrix}^{n/2}
$$

이제 바로 전에 배운 거듭제곱의 분할 정복 알고리즘 적용과 원리가 같아졌다. 이제 코드로 구현해본다.

### 구현

#### Fibonacci.c

```c
#include <stdio.h>

typedef unsigned long ULONG;

typedef struct tagMatrix2by2
{
    ULONG Data[2][2];
} Matrix2by2

Matrix2by2 MatrixMultiply(Matrix2by2 A, Matrix2by2 B)
{
    Matrix2by2 C;

    C.Data[0][0] = A.Data[0][0]*B.Data[0][0] + A.Data[0][1]*B.Data[1][0];
    C.Data[0][1] = A.Data[0][0]*B.Data[1][0] + A.Data[0][1]*B.Data[1][1];

    C.Data[1][0] = A.Data[1][0]*B.Data[0][0] + A.Data[1][1]*B.Data[1][0];
    C.Data[1][1] = A.Data[1][0]*B.Data[1][0] + A.Data[1][1]*B.Data[1][1];

    return C;
}

Matrix2by2 MatrixPower(Matrix2by2 A, int n)
{
    if(n > 1)
    {
        A = MatrixPower(A, n / 2);
        A = MatrixMultiply(A, A);

        if(n % 2 == 1) // n이 홀수 일 경우 한 번 더 곱해준다.
        {
            Matrix2by2 B;
            B.Data[0][0] = 1;
            B.Data[0][1] = 1;
            B.Data[1][0] = 1;
            B.Data[1][1] = 0;

            A = MatrixMultiply(A, B);
        }
    }

    return A;
}

ULONG Fibonacci(int N)
{
    matrix2by2 A;
    A.Data[0][0] = 1;
    A.Data[0][1] = 1;
    A.Data[1][0] = 1;
    A.Data[1][1] = 0;

    A = MatrixPower(A, N);

    return A.Data[0][1];
}

int main(void)
{
    int N = 46;
    ULONG Result = Fibonacci(N);

    printf("%d번째 피보나치 수 : %lu\n",N, Result);

    return 0;
}

// 실행결과
46번째 피보나치 수 : 1836311903
```
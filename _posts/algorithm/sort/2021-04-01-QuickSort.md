---
layout: post
title: Quick Sort
description: >
  정렬의 꽃, Quick Sort
hide_description: false
sitemap: false
date: 2021-04-01 19:05:00 +0900
category: algorithm
tag: [sort]
---

# [Sort]퀵 정렬

> 퀵 정렬은 `분할 정복(Divide and Conquer)`에 기반한 알고리즘이다. 분할 정복이란 전체를 일부로 나누어 일부분부터 차례로 정복하며 최종적으로는 전체를 정복하게 되는 알고리즘이다.
{:.note title="attention"}

## 분할 정복의 순서

> 분할정복은 아래와 같은 순서로 진행된다.
{:.note title="attention"}

1. 데이터 집합 내에서 **임의의 기준 요소를 선택** 하고, 기준 요소보다 작은 요소는 왼편에, 큰 값은 오른편에 위치시킨다.
2. 이렇게 나눠진 좌측, 우측을 각각 다시 임의의 기준으로 나눈 후 1번의 과정을 수행한다.
3. 위의 1, 2번 과정을 더 이상 나눌 수 없을 때까지 반복한다.

### 재귀호출을 이용한 구현

> 위 순서를 따라 구현하는 방법을 생각하는게 쉽지 않게 느껴진다. **기준요소**는 정해야하니 정한 후, 한 가지 아이디어를 추가한다. 기준과 비교하며 움직일 변수 두 개를 설정하고, 각각 배열의 처음 요소부터 조회하는 왼쪽 변수와 끝부터 조회하는 오른쪽 변수로 둔다. 아래 그림으로 좀 더 직관적으로 이해해보자.
{:.note title="attention"}

![퀵 정렬](/assets/img/algorithm/quick_sort.png)
{:.lead loading="lazy" align="center"}

퀵 정렬의 순서
{:.figcaption}

&nbsp;&nbsp;먼저 기준을 가장 앞의 요소로 설정하고 왼쪽 변수는 기준보다 큰 수일때 고정되며, 그 후 오른쪽 변수는 기준보다 작은 요소를 찾았을 때 고정된다. 그 후 두 수를 비교하고 왼쪽 변수가 크다면 위치를 변경한다.  
&nbsp;&nbsp;이런 과정들을 수행하다가 Left와 Right가 교차되는 시점에 기준과 해당 지점의 위치를 바꾼다. 이렇게 되면 왼쪽은 기준인 5보다 작은 수들만 존재하고, 오른쪽은 기준인 5보다 큰 수들만이 존재하게 된다.  
&nbsp;&nbsp;이렇게 나눠진 왼쪽과 오른쪽을 다시 각각 수행하면 결국 전체 배열은 정렬되게 되는 것이다.

### Quick Sort 구현

* QuickSort.c

```c
#include <stdio.h>

void Swap(int* A, int* B)
{
    int Temp = *A;
    *A = *B;
    *B = Temp;
}

int Partition(int DataSet[], int Left, int Right)
{
    int First = Left;
    int Pivot = DataSet[First];

    // 기준 다음요소를 가리킴
    ++Left;

    while(Left <= Right)
    {
        while(DataSet[Left] <= Pivot && Left < Right)
            ++Left;
        while(DataSet[Right] > Pivot && Left <= Right)
            --Right;

        if(Left < Right)
            Swap(&DataSet[Left], &DataSet[Right]);
        else
            break;
    }

    Swap(&DataSet[First], &DataSet[Right]);

    return Right;
}

void QuickSort(int DataSet[], int Left, int Right)
{
    if(Left < Right)
    {
        int Index = Partition(DataSet, Left, Right);

        QuickSort(DataSet, Left, Index - 1);
        QuickSort(DataSet, Index + 1, Right);
    }
}

int main(void)
{
    int DataSet[] = {5, 1, 8, 3, 11, 2, 9, 10, 4, 6, 7, 12};
    int Length = sizeof(DataSet)/sizeof(DataSet[0]);
    int i = 0;

    QuickSort(DataSet, 0 , Length - 1);

    for(i = 0; i < Length; i++)
        printf("%d ", DataSet[i]);
    
    printf("\n");

    return 0;
 }

 // 실행결과
 1 2 3 4 5 6 7 8 9 10 11 12
```

### 최선의 경우

> 퀵 정렬은 데이터 요소들이 이리저리 흩어져, Left와 Right가 계속 중앙으로 오게되어 집합이 1/2의 길이로 분할 되는 경우에 최고의 성능을 보여준다.  
> 그럴 경우 연산은 각 단계에서 n번 수행하게 되고, 단계의 수는 $ log_{2}n $의 값을 가진다.  
> 따라서 $ O(n·log_{2}n) $의 시간 복잡도를 가지게 된다.
{:.note title="attention"}


### 최악의 경우

> 데이터가 미리 정렬되어 있거나 역순으로 정렬되어 있는 경우엔 최악의 성능을 가진다. 데이터 집합의 데이터들이 미리 정렬되어 있을 경우 기준점이 가장 앞이므로 분할 비율이 1:(n-1)이 되며, 이런 과정이 n번 수행되게 된다.  
> 즉 각 단계별로 연산수가 1씩 줄어들면서 n번 수행되므로 결국 $ \displaystyle\sum_{i=1}^n i $의 값을 가지며 그 결과는 $ \frac {n(n-1)} {2} $이다.  
> 결국 앞서 배웠던 버블정렬이나 삽입정렬과 같은 연산횟수를 가지게 되는 것이다.
{:.note title="attention"}

## C 표준 라이브러리의 퀵 정렬 함수

### qsort() 함수

> C언어의 표준 라이브러리(stdlib.h)에는 퀵 정렬 알고리즘이 이미 구현되어 있다. 우리는 이를 사용해 직접 퀵 정렬을 사용할 수 있다. 함수의 원형은 아래와 같다.
{:.note title="attention"}

```c
void qsort(
    void *base,         // 데이터 집합 배열 주소
    size_t num,         // 데이터 요소의 개수
    size_t width,       // 한 데이터 요소의 크기
    int (__cdecl *compare) (const void*, const void*)
    // 비교 함수에 대한 포인터
)
```

&nbsp;&nbsp;위 함수 원형에서 마지막 매개변수는 비교를 수행한 결과를 반환하는 함수에 관한 포인터이다. 여기에 들어갈 함수의 리턴값을 조작해주면 순방향으로 정렬할 건지, 역순으로 정렬할 건지 선택할 수 있다.

```c
#include <stdio.h>
#include <stdlib.h>
int CompareScore(const void* _elem1, const void* _elem2)
{
    int* elem1 = (int*)_elem1;
    int* elem2 = (int*)_elem2;

    if(*elem1 < *elem2)
        return 1;
    else if(*elem1 > *elem2)
        return -1;
    else
        return 0;
}


int main()
{
    int DataSet[] = {6, 4, 2, 3, 1, 5};
    int Length = sizeof(DataSet)/sizeof(DataSet[0]);
    int i = 0;

    qsort((void*)DataSet, Length, sizeof(int), CompareScore);

    for (i = 0; i < Length; i++)
    {
        printf("%d ", DataSet[i]);
    }

    printf("\n");

    return 0;
}

// 실행결과
6 5 4 3 2 1
```

### Arrays.sort()

> java에도 이와 같은 배열 정렬을 패키지로 제공한다. `java.util.Arrays`에 있는 `sort()`함수가 이에 해당한다. 따로 함수를 만들어 주지 않고도 역순, 정순을 선택할 수 있어 위의 qsort()보다 좀 더 쉽게 사용이 가능하다. 다만 역순을 사용하려면 `Collections.reverseOrder()`나 `Comparator.reverseOrder()`를 인자로 넘겨주어야 한다. 이 때 배열은 Wrapper Class로 만들어 넘겨주어야 한다.
{:.note title="attention"}

```java
Integer[] arr = new Integer[] {6, 4, 2, 3, 1, 5};

Arrays.sort(arr, Collections.reverseOrder());

// 실행결과
6 5 4 3 2 1
```

### Python의 내장함수 sorted()

> python은 좀 더 쉽게 정렬이 가능하다. python에서는 내장함수로 `sorted()`를 제공하며, 이를 이용하면 List를 쉽게 정렬할 수 있다. 아마 보면 바로 이해가 될 것이다.
{:.note title="attention"}

```python
a = [6, 4, 2, 3, 1, 5];
b = sorted(arr, reverse=True);
a.sort();

print(a);
print(b);

## 실행결과
[6, 5, 4, 3, 2, 1]
[1, 2, 3, 4, 5, 6]
```
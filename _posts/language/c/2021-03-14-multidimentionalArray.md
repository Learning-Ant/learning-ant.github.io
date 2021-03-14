---
layout: post
title: 다차원 배열
description: >
  다차원 배열
hide_description: true
sitemap: false
date: 2021-03-14 21:02:00 +0900
category: language
tag: [c]
---

# 다차원 배열

## 다차원 배열

### 다차원 배열이란?

* 2차원 이상의 배열을 의미한다.
* 다차원 배열의 선언

|배열 선언의 예|n차원|
|:---:|:---:|
|`int arr[100]`|1차원 배열|
|`int arr[10][10]`|10×10, 2차원 배열|
|`int arr[5][5][5]`|5×5×5, 3차원 배열|

### 2차원 배열의 선언

> 배열에 대해서는 앞서 공부했으니 간단하게 선언방법과 구조를 알아보도록 한다.
{:.note title="attention"}

* 2차원적 메모리 구조를 구성

```c
int main(void)
{
    int arr[3][4];

    return 0;
}
```

![2차원배열](/assets/img/language/c/second_dimension.png)
{:.lead loading="lazy" align="center"}

2차원 배열
{:.figcaption}

### 2차원 배열 접근 방법

> 접근 방법 역시 그렇게 어렵지 않다. 가로와 세로의 구분만 잘 해준다면 말이다.
{:.note title="attention"}

```c
int main(void)
{
    int arr[3][3];
    arr[0][0] = 2;
    // 1번째 줄 1번째 요소
    arr[1][0] = 2;
    // 2번째 줄 1번째 요소
    arr[2][2] = 2;
    // 3번째 줄 3번째 요소
}
```

> 접근할 때 `배열`이라는 점만 기억하도록 하자. 요소의 인덱스는 0부터 시작한다.
{:.note}

### 다차원 배열의 실제 메모리 구성

* 1차원 배열과 동일하다. 접근 방법만 2차원적으로 해석할 뿐이다.
* 2차원적으로 이해하는 것이 좋은 습관이다.

![2차원배열](/assets/img/language/c/second_dimension_memory.png)
{:.lead loading="lazy" align="center"}

2차원 배열의 실제 메모리 구성
{:.figcaption}

&nbsp;&nbsp;그림에서 보듯이 실제로 메모리에 저장될 때는 메모리는 flat한 구조기 때문에 연속적인 주소로 저장되는 것을 알 수 있다. 그렇다고 굳이 다차원 배열을 억지로 1차원적으로 이해할 필요는 없다. 설계할 때는 해당 차원으로 생각을 하고 메모리에 저장될때는 저렇게 된다는 것만 알고 있으면 된다.

### 2차원 배열 선언과 동시에 초기화 하는법

* 행 단위로 모든 요소들을 초기화

    ```c
    int arr[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    ```

    ![2차원배열](/assets/img/language/c/array_init(1).png)
    {:.lead loading="lazy" align="center"}

    2차원 배열 초기화
    {:.figcaption}

* 행 단위로 일부 요소들만 초기화

    ```C
    int arr[3][3] = {
        {1},
        {4, 5},
        {7, 8, 9}
    };
    ```

    ![2차원배열](/assets/img/language/c/array_init(2).png)
    {:.lead loading="lazy" align="center"}

    2차원 배열 초기화
    {:.figcaption}

* 1차원 배열 형태의 초기화

    ```c
    int arr[3][3] = {1, 2, 3, 4, 5, 6, 7};
    ```

    ![2차원배열](/assets/img/language/c/array_init(3).png)
    {:.lead loading="lazy" align="center"}

    2차원 배열 초기화
    {:.figcaption}

### 초기화 리스트에 의한 배열 크기의 결정

* 1차원 배열의 예
    * `int arr[] = {1, 2, 3, 4, 5};`
    * 앞서 공부한 내용이다. 컴파일러에 의해 arr의 길이는 5가 된다.

* 2차원 배열의 예
    * `int arr[][] = {1, 2, 3, 4, 5, 6, 7, 8};`
    * `int arr[][4] = {1, 2, 3, 4, 5, 6, 7, 8};`
    * `int arr[][2] = {1, 2, 3, 4, 5, 6, 7, 8};`
    * 2차원 배열의 길이를 선언하지 않고 초기화할 때는 배열의 세로길이만 생략이 가능하다. 즉 첫 번째 선언은 error가 발생한다.

## 3차원, 그 이상의 배열

### 3차원 배열의 선언과 의미

> 선언은 앞서 배운 1, 2차원 배열과 비슷하다. 중괄호의 개수만 차이가 날 뿐이다.
{:.note title="attention"}

* 3차원적 메모리 구조를 의미한다.
* 개념만 이해하면 충분하며, 일반적으로 쓰일 일이 별로 없다.
* 4차원 이상의 배열은 4차원의 형태가 되는데 구조적인 이해가 쉽지 않다.
* 3차원 배열의 선언 : `int a[3][3][3];`

---

&nbsp;&nbsp;2차원 배열과 그 이상의 배열에 대해서 공부했다. 사실 1차원 배열과 그렇게 크게 다른점은 없고, 추가적으로 알아야 할 사항은 접근 방법과 실제로 메모리에 저장되는 형태가 어떤지에 대해서만 알면 될 것이다.
---
layout: post
title: 백트래킹
description: >
  Backtracking
hide_description: false
sitemap: false
date: 2021-05-11 22:24:00 +0900
category: algorithm
tag : [backtracking]
---

# 백트래킹

> 백트래킹은 해가 될 수 있는 경우들 중 특정 조건을 만족시키는 모든 해를 찾는 알고리즘이다. 즉, 해가 하나 이상 존재하는 경우에 쓰일 수 있는 알고리즘이다.
{:.note title="attention"}

백트래킹의 대표적인 예시가 '미로 찾기'이다. 하나의 출발점과 하나 이상의 탈출구가 있는 미로를 생각해보자.  
출발점으로부터 탈출구까지 가는 경로에는 분기점이 존재할 것이다. 이런 각 분기점에서 어느 방향으로 갈지 정하면서 탈출구(해)를 찾게 되는데 이런 과정들이 후보해 중 해를 찾아가는 과정이다. 여기서 각 분기점들은 앞의 포스팅에서 말했던 <u>'부분 문제'</u>라고 할 수 있고, 어느 방향으로 갈지 정하는 것이 <u>'부분해'</u>라고 할 수 있다. 일너 부분 문제를 맞닥뜨릴 때 어느 방향이 탈출구로 향하는 지는 그 경로의 끝까지 탐색해봐야만 알 수 있다. 또 어떤 분기점에서 어떤 방향으로 갈지 정한 후 경로를 진행하면서 다시 한 번 분기점을 만날 수 있다.  
이렇게 <u>해가 될 수 있는 가능성을 가진 부분해의 조합</u>을 두고 <u>'후보해'</u>라고 하는 것이다. 이러한 후보해를 가려내어 <u>탈출구까지 가는 특정 조건을 만족시키는 해</u>를 찾는 과정이 백트래킹 알고리즘인 것이다.  

이제 실제로 미로를 찾아가는 과정을 보면서 알고리즘을 살펴보자.

## 미로 찾기

먼저 미로의 탐색 규칙은 다음과 같다.

1. 분기점이 나오면 먼저 왼쪽 길부터 탐색을 시작한다.
2. 막다른 곳을 만나면 분기점으로 되돌아와 그 다음 분기점을 탐색한다.
3. 위의 과정을 반복하여 탈출구를 발견하거나 모든 경로를 다 탐색할 때까지 반복한다.

![미로](/assets/img/algorithm/backtracking/maze.png)
{:.lead loading="lazy" align="center"}

미로
{:.figcaption}

위와 같은 미로가 있다. 일단 이를 좀 더 보기 좋게 부분 문제들을 트리형태로 변경하여 그 과정을 살펴본다.

![길찾기](/assets/img/algorithm/backtracking/backtracking1.png)
{:.lead loading="lazy" align="center" width="500" height="500"}

분기점(부분 문제)의 트리형태
{:.figcaption}

가장 처음 만난 분기점에서 왼쪽 길인 1번길로 진행한다.

![길찾기](/assets/img/algorithm/backtracking/backtracking2.png)
{:.lead loading="lazy" align="center" width="500" height="500"}

분기점(부분 문제)의 트리형태
{:.figcaption}

길을 진행하다보면 분기점을 다시 만나게 되고 여기서 왼쪽 길인 3번으로 가게 된다면 막다른 길을 만나게 된다. 이제 다시 이전의 분기점으로 돌아와서 다음 갈래길로 들어간다.

![길찾기](/assets/img/algorithm/backtracking/backtracking3.png)
{:.lead loading="lazy" align="center" width="500" height="500"}

분기점(부분 문제)의 트리형태
{:.figcaption}

다음 분기점을 만나게 되면 역시 왼쪽길부터 탐색을 시작하고, 끝내 막다른 길을 만나게 된다. 그러므로 다시 그 이전의 갈래길로 돌아오게 된다.

![길찾기](/assets/img/algorithm/backtracking/backtracking4.png)
{:.lead loading="lazy" align="center" width="500" height="500"}

분기점(부분 문제)의 트리형태
{:.figcaption}

이제 오른쪽길로 진행하게 되면 최종적으로 탈출구를 찾게 된다.

![길찾기](/assets/img/algorithm/backtracking/backtracking5.png)
{:.lead loading="lazy" align="center" width="500" height="500"}

분기점(부분 문제)의 트리형태
{:.figcaption}

위의 과정들을 잘 따라오다보면 각 부분해들을 구하는 과정들이 반복된다. 자식노드로 이동하고 부분해를 구하고, 또 다시 자식노드로 이동하고 부분해를 구하고.. 이러한 과정들이 반복되는 모습이 마치 재귀적인 호출을 연상하게 한다.  
그렇다면 여기서 반환조건은 무엇일까? 막다른 길을 만났을 경우 그 이전 노드로 돌아와야하므로 '막다른 길을 만났을 때'가 그 반환조건이 되겠다.

## 구현

> 구현에 있어서 우리는 경로를 탐색할 때 주변을 탐색할 수 있도록 하는 알고리즘 역시 구현해야한다. 또한 미로를 저장할 구조체 역시 필요하다.
{:.note title="attention"}

### 자료구조 정의

#### 미로

```c
#define START 'S'
#define GOAL 'G'
#define WAY ' '
#define WALL '#'
#define MARKED '+'

typedef struct tagMazeInfo
{
    int ColumnSize;
    int RowSize;

    char** Data;
} MazeInfo;
```

#### 현재 위치

```c
typedef struct tagPosition
{
    int X,
    int Y
} Position;
```

### 알고리즘 구현

> 정리중..
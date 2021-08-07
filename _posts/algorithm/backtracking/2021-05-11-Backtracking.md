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

# [Backtracking]백트래킹

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
{:.lead loading="lazy" align="center" width="500px" height="500px"}

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

알고리즘은 다음과 같은 순서로 진행된다.

1. 시작점 S를 현재위치로 지정하고, 이동 방향을 위로 설정
2. 현재 위치에서 가려는 방향에 대해 이동 할 수 있는지를 확인하고, 벽과 지나온 길은 이동이 불가능
3. 이동 가능하다면 이동. 불가능하다면 방향을 바꿔 다시 판단하고 모든 방향으로 이동이 불가능하면 이전 위치로 돌아간다.
4. 출구를 찾거나 모든 경로를 탐색할 때까지 위의 과정을 반복한다.

#### MazeSolver.h

```c
#ifndef MAZESOLVER_H
#define MZAESOLVER_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_BUFFER 1024
#define INIT_VALUE -1

#define START 'S'
#define GOAL 'G'
#define WAY ' '
#define WALL '#'
#define MARKED '+'

enum DIRECTION { NORTH, SOUTH, EAST, WEST};
enum RESULT {FAIL, SUCCEED};

typedef struct tagPosition
{
    int X;
    int Y;
} Position;

typedef struct tagMazeInfo
{
    int ColumnSize;
    int RowSize;

    char** Data;
} MazeInfo;

int Solve(MazeInfo* Maze);
int MoveTo(MazeInfo* Maze, Position* Current, int Direction);
int GetNextStep(MazeInfo* Maze, Position* Current, int Direction, Position* Next);
int GetMaze(char* FilePath, MazeInfo* Maze);

#endif // MAZESOLVER_H
```

#### MazeSolver.c

```c
#include "MazeSolver.h"

int Solve(MazeInfo* Maze)
{
    int i = 0;
    int j = 0;
    int StartFound = FAIL;
    int Result = FAIL;

    Position Start;

    for(i = 0; i < Maze->RowSize; i++)
    {
        for(j = 0; j < Maze->ColumnSize; j++)
        {
            if(Maze->Data[i][j] == START)
            {
                Start.X = j;
                Start.Y = i;
                StartFound = SUCCEED;
                break;
            }
        }
    }

    if(StartFound == FAIL)
        return FAIL;

    if(MoveTo(Maze, &Start, NORTH))
        Result = SUCCEED;
    else if (MoveTo(Maze, &Start, SOUTH))
        Result = SUCCEED;
    else if (MoveTo(Maze, &Start, EAST))
        Result = SUCCEED;
    else if (MoveTo(Maze, &Start, WEST))
        Result = SUCCEED;

    Maze->Data[Start.Y][Start.X] = START;

    return Result;
}

int MoveTo(MazeInfo* Maze, Position* Current, int Direction)
{
    int i = 0;

    int Dirs[] = {NORTH, SOUTH, WEST, EAST};

    Position Next;

    if(Maze->Data[Current->Y][Current->X] == GOAL)
        return SUCCEED;

    Maze->Data[Current->Y][Current->X] = MARKED;

    for(i = 0; i < 4; i++)
    {
        if(GetNextStep(Maze, Current, Dirs[i], &Next) == FAIL)
            continue;
        if(MoveTo(Maze, &Next, NORTH) == SUCCEED)
            return SUCCEED;
    }

    Maze->Data[Current->Y][Current->X] = WAY;

    return FAIL;
}

int GetNextStep(MazeInfo* Maze, Position* Current, int Direction, Position* Next)
{
    switch(Direction)
    {
    case NORTH:
        Next->X = Current->X;
        Next->Y = Current->Y - 1;

        if(Next->Y == -1) return FAIL;

        break;

    case SOUTH:
        Next->X = Current->X;
        Next->Y = Current->Y + 1;

        if(Next->Y == Maze->RowSize) return FAIL;

        break;

    case WEST:
        Next->X = Current->X - 1;
        Next->Y = Current->Y;

        if(Next->X == -1) return FAIL;

        break;

    case EAST:
        Next->X = Current->X + 1;
        Next->Y = Current->Y;

        if(Next->X == Maze->ColumnSize) return FAIL;

        break;
    }

    if(Maze->Data[Next->Y][Next->X] == WALL) return FAIL;
    if(Maze->Data[Next->Y][Next->X] == MARKED) return FAIL;

    return SUCCEED;
}

int GetMaze(char* FilePath, MazeInfo* Maze)
{
    int i = 0;
    int j = 0;
    int RowSize = 0;
    int ColumnSize = INIT_VALUE;

    FILE* fp;
    char buffer[MAX_BUFFER];

    if((fp = fopen(FilePath, "r")) == NULL)
    {
        printf("Cannot open file:%s\n", FilePath);
        return FAIL;
    }

    while(fgets(buffer, MAX_BUFFER, fp) != NULL)
    {
        RowSize++;

        if(ColumnSize == INIT_VALUE)
        {
            ColumnSize = strlen(buffer) - 1;
        }
        else if (ColumnSize != strlen(buffer) - 1)
        {
            printf("Maze data in file:%s is not valid. %d\n", FilePath, strlen(buffer));
            fclose(fp);
            return FAIL;
        }
    }

    Maze->RowSize = RowSize;
    Maze->ColumnSize = ColumnSize;
    Maze->Data = (char**)malloc(sizeof(char*) * RowSize);

    for(i = 0; i < RowSize; i++)
        Maze->Data[i] = (char*)malloc(sizeof(char) * ColumnSize);

    rewind(fp);

    for(i = 0; i < RowSize; i++)
    {
        fgets(buffer, MAX_BUFFER, fp);

        for(j = 0; j < ColumnSize; j++)
        {
            Maze->Data[i][j] = buffer[j];
        }
    }

    fclose(fp);
    return SUCCEED;
}
```

#### TestMazeSolver.c
```c
#include <stdio.h>
#include "MazeSolver.h"

int main(int argc, char* argv[])
{
    int i = 0;
    int j = 0;

    MazeInfo Maze;

    if(argc < 2)
    {
        printf("Usage: MazeSolver <MazeFile>\n");

        return 0;
    }

    if(GetMaze(argv[1], &Maze) == FAIL)
        return 0;

    if(Solve(&Maze) == FAIL)
        return 0;

    for(i = 0; i < Maze.RowSize; i++)
    {
        for(j = 0; j < Maze.ColumnSize; j++)
        {
            printf("%c", Maze.Data[i][j]);
        }
        printf("\n");
    }

    return 0;
}

// 실행결과
#G##############
#++++++++++++++#
#### #########+#
#    ###   ++++#
# ## ### ##+####
# ## ###  #+####
# #########++++#
#      # #####+#
# ###### #####+#
# #   #   S++#+#
### # ######+#+#
# # #       +#+#
# # ########+#+#
# ##########+#+#
#           +++#
################
```
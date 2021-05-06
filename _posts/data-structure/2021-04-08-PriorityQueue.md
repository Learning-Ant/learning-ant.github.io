---
layout: post
title: 우선순위 큐와 힙
description: >
  Priority Queue & Heap
hide_description: false
sitemap: false
date: 2021-04-09 19:31:00 +0900
category: data-structure
tag: [queue]
---

# 우선순위 큐와 힙

## 우선순위 큐

> 우선순위 큐는 큐라는 자료구조에 <u>우선순위</u> 속성이 추가된 것이다. 기존의 큐는 그저 삽입된 순서대로 제거되는 자료구조였지만, 우선순위 큐는 우선순위가 높은 요소부터 빠져나오게 됩니다.
{:.note title="attention"}

### 우선순위 큐의 삽입연산

> 우선순위 큐는 요소들의 우선순위를 기준으로 오름차순으로 연결된다. 여기서는 우선순위의 값이 작을수록 우선순위가 높은 것으로 구현해본다.
{:.note title="attention"}

* 예를들어, 기존의 큐에 우선순위가 40의 값을 가지는 노드를 삽입한다고 했을 때, 우선순위 큐가 아니라면 그저 가장 후단에 연결하면 된다. 하지만 우선순위 큐일 경우에는 우선순위 크기를 비교하고 적당한 자리를 찾아 연결해야 한다.

![우선순위 큐의 삽입](/assets/img/algorithm/priority_queue_enqueue.png)
{:.lead loading="lazy" align="center"}

우선순위 큐에서의 삽입
{:.figcaption}

&nbsp;&nbsp;리스트의 방식으로 우선순위 큐가 구현된다면 위의 그림과 같이 순회하면서 우선순위의 크기를 고려하고 적절한 자리를 찾아갈 것이다. 얼핏 보기에 상당히 비효율적으로 보인다.
&nbsp;&nbsp;이를 해결하기 위한 자료구조가 '[힙(Heap)](#힙heap)'이라는 것이다. 이는 제거 연산까지 알아본 후에 자세히 다뤄보도록 한다.

### 우선순위 큐의 제거 연산

> 우선순위 큐의 제거연산은 일반적인 큐의 제거와 동일하다. 그럴 수 밖에 없는 것이 삽입부터 우선순위의 크기에 따라 정렬되어 있으니, 우선순위가 가장 높은 값을 가지는 노드는 가장 전단에 있을 것이다. 그러므로 우선순위 큐의 제거연산 역시 가장 전단의 노드를 반환해주면 된다.
{:.note title="attention"}

![우선순위 큐의 제거](/assets/img/algorithm/priority_queue_dequeue.png)
{:.lead loading="lazy" align="center"}

우선순위 큐에서의 제거
{:.figcaption}

## 힙(Heap)

> 힙은 메모리 구조를 공부할 때 배우는 메모리 공간 상의 Heap과는 철자 발음 모두 동일하지만 서로 다른 것이다.
> 자료구조에서의 힙은 순서 속성을 만족하는 완전 이진 트리이다. 힙에서 순서 속성은 모든 노드가 해당 부모 노드보다 커야한다는 규칙이다.
> 즉, 힙에서 가장 작은 데이터를 가지는 노드는 루트이다.
{:.note title="attention"}

### 힙에서의 삽입

> 힙의 삽입 연산은 추가와 비교, 교환으로 이루어진다.
> 1. 힙의 최고 깊이, 가장 오른쪽에 노드를 삽입한다. 당연하게도 이진 트리는 유지해야한다.
> 2. 삽입한 노드와 부모 노드의 데이터를 비교 후, 삽입한 노드의 데이터가 더 크다면 힙의 순서 속성과 이진 트리 구조 모두 만족하므로 삽입연산이 종료된다.
> 3. 삽입한 노드의 데이터가 더 작다면 부모 노드와 자리를 교체한다. 바꾼 후 다시 2번 단계를 실행한다.
{:.note title="attention"}

* 힙에서의 삽입을 아래 그림으로 그 과정을 알아본다.

![힙에서의 노드 삽입](/assets/img/algorithm/heap_insert.png)
{:.lead loading="lazy" align="center"}

힙에서의 노드 삽입
{:.figcaption}


### 최소값 삭제

> 최소값의 삭제는 힙의 구조 특성 상 루트 노드를 삭제해 주면 된다. 다만, 그 후처리가 필요하다.
> 1. 루트 노드를 삭제하고, 최고 깊이&최우측 노드를 루트노드로 옮긴다. 
> 2. 옮긴 노드(A)를 양쪽 자식과 비교한 후, 더 작은 데이터를 가진 노드와 교체한다.
> 3. A가 리프 노드가 되거나, 양쪽 자식보다 작은 데이터를 가지는 경우가 된다면 연산을 종료한다. 더 작은 데이터를 가진 자식이 있다면 2번을 수행한다.

![힙에서의 최소값 삭제](/assets/img/algorithm/heap_delete_min.png)
{:.lead loading="lazy" align="center"}

최소값 삭제
{:.figcaption}

## 힙의 구현

> 그림에서도 보이듯 힙의 구조를 트리로써 표현했다. 예전 [포스팅](/data-structure/2021-03-30-Tree(Binary))에서 이진 트리를 구현할 때는 링크드 리스트를 기반으로 두었었다. 하지만 링크드 리스트 기반의 구현은 힙의 가장 마지막노드(최고 깊이, 최 우측노드)를 찾는 효율적인 방법을 찾기가 쉽지 않다.
> 그렇기에 여기서는 배열기반으로 구현하고 인덱스를 참고해 트리의 노드에 접근한다.
{:.note title="attention"}

* 배열 기반의 이진 트리 구현 방법
  * 깊이 0의 노드는 배열의 0번 요소에 저장(루트노드)
  * 깊이 1의 노드(2개)는 배열의 1~2번 요소에 저장
  * 깊이 2의 노드(4개)는 배열의 3~6번 요소에 저장
  * 깊이 n의 노드($2^{n}$개)는 배열의 $2^{n}-1$ ~ $2^{n+1}-2$번 요소에 저장

그림으로 그려 확인해본다.

![배열기반의 이진트리](/assets/img/algorithm/array_binary_tree.png)
{:.lead loading="lazy" align="center"}

배열기반의 이진트리 구현
{:.figcaption}

&nbsp;&nbsp;n으로 일반화 시켰을 때의 연결되는 인덱스 번호들을 통해 부모 자식 관계를 가지는 노드들을 계산할 수 있다. 예를 들어 어떤 노드의 인덱스를 알고 있으면 그 인덱스를 통해 바로 왼쪽 자식 노드, 오른쪽 자식 노드, 부모 노드 각각 일반화된 계산식으로 접근할 수 있다는 것이다. 그 계산식은 아래와 같다.

* k번 인덱스에 위치한 노드의 양쪽 자식 노드들의 인덱스
  * 왼쪽 자식 노드   : 2k + 1
  * 오른쪽 자식 노드 : 2k + 2
* k번 인덱스에 위치한 노드의 부모 노드가 위치한 인덱스 : (k-1)÷2

&nbsp;&nbsp;위의 일반화된 식을 통해 힙 자료구조와 연산들을 구현해본다.

### 자료구조 선언

```c
typedef int ElementType;

typedef struct tagHeapNode
{
  ElementType Data;
} Node;

typedef struct tagHeap
{
  Node* Nodes;
  int Capacity;
  int UsedSize;
} Heap;
```

### 삽입 구현

* Insert() 구현

```c
void Insert(Heap* H, ElementType NewData)
{
  int CurrnetPosition = H->UsedSize;
  int ParentPosition = GetParent(CurrentPosition);

  // UsedSize와 Capacity가 같아지면 UsedSize 두 배로 늘림
  if(H->UsedSize == H->Capacity)
  {
    H->Capacity *= 2;
    H->Nodes = (HeapNode*)realloc(H->Nodes, sizeof(HeapNode) * H->Capacity);

    H->Nodes[CurrentPosition].Data = NewData;

    // 후처리
    while(CurrentPosition > 0 &&
          H->Nodes[CurrentPosition].Data < H->Nodes[ParentPosition].Data)
    {
      SwapNodes(H, CurrentPosition, ParentPosition);

      CurrentPosition = ParentPosition;
      ParentPosition = GetParent(CurrentPosition);
    }

    H->UsedSize++;
  }
}
```

### 최소값 삭제 구현

* DeleteMin() 구현

```c
void DeleteMin(Heap* H, Node* Root)
{
  int ParentPosition = 0;
  int LeftPosition = 0;
  int RightPosition = 0;

  // Root 메모리에 실제 Root노드 복사
  memcpy(Root, &H->Nodes[0], sizeof(Node));
  // 실제 Root노드에는 0 저장
  memset(&H->Nodes[0], 0, sizeof(Node));

  // Root노드를 삭제했으니 Size를 줄이고
  // 최고깊이, 최우측 노드를 Root 노드로 스왑
  H->UsedSize--;
  SwapNodes(H, 0, H->UsedSize);

  // 후처리 시작은 Root 노드부터
  LeftPosition = GetLeftChild(0);
  RightPosition = LeftPosition + 1;

  while(1)
  {
    int SelectedChild = 0;

    // 왼쪽자식의 인덱스가 Size보다 크거나 같으면 루프종료
    if(LeftPosition >= H->UsedSize)
      break;
    
    // 우측자식의 인덱스가 Size보다 크거나 같으면 
    if(RightPosition >= H->UsedSize)
    {
      SelectedChild = LeftPosition;
    }
    else
    {
      if(H->Nodes[LeftPosition].Data > H->Nodes[RightPosition].Data)
        SelectedChild = RightPosition;
      else
        SelectedChild = LeftPosition;
    }
    // 부모(최초에 마지막이었던 노드)노드의 데이터가 더 크면
    if(H->Nodes[SelectedChild].Data < H->Nodes[ParentPosition].Data)
    {
      // 스왑 후 Parent 인덱스를 바꾼 노드의 인덱스로 변경
      SwapNodes(H, ParentPosition, SelectedChild);
      ParentPosition = SelectedChild;
    }
    else
      break;

    LeftPosition = GetLeftChild(ParentPosition);
    RightPosition = LeftPosition + 1;
  }

  // 삭제 후 Size가 용량의 절반에 미치지 못하면
  if(H->UsedSize < (H->Capacity / 2))
  {
    // 용량을 절반으로 줄인다.
    H->Capacity /= 2;
    H->Nodes = (Node*)realloc(H->Nodes,sizeof(Node)* H->Capacity);
  }
}
```

## 모듈화

### Heap.h

```c
#ifndef HEAP_H
#define HEAP_H

#include <stdio.h>
#include <memory.h>
#include <stdlib.h>

typedef int ElementType;

typedef struct tagHeapNode
{
  ElementType Data;
} Node;

typedef struct tagHeap
{
  Node* Nodes;
  int Capacity;
  int UsedSize;
} Heap;

Heap* Create(int InitialSize);
void Destroy(Heap* H);
void Insert(Heap*H, ElementType NewData);
void DeleteMin(Heap* H, Node* Root);
int GetParent(int Index);
int GetLeftChild(int Index);
void SwapNodes(Heap* H, int Index1, int Index2);
void PrintNodes(Heap* H);

#endif
```

### Heap.c

```c
#include "Heap.h"

Heap* Create(int InitialSize)
{
  Heap* NewHeap = (Heap*)malloc(sizeof(Heap));
  NewHeap->Capacity = InitialSize;
  NewHeap->UsedSize = 0;
  NewHeap->Nodes = (Node*)malloc(sizeof(Node) * NewHeap->Capacity);

  printf("size : %d\n", sizeof(Node));

  return NewHeap;
}

void Destroy(Heap* H)
{
  free(H->Nodes);
  free(H);
}

void Insert(Heap* H, ElementType NewData)
{
  int CurrentPosition = H->UsedSize;
  int ParentPosition = GetParent(CurrentPosition);

  if(H->UsedSize == H->capacity)
  {
    H->Capacity *= 2;
    H->Nodes = (Node*)realloc(H->Nodes, sizeof(Node) * H->Capacity);
  }

  H->Nodes[CurrentPosition].Data = NewData;

  while(CurrentPosition > 0 &&
        H->Nodes[CurrentPosition].Data < H->Nodes[ParentPosition].Data)
  {
    SwapNodes(H, CurrentPosition, ParentPosition);

    CurrentPosition = ParentPosition;
    ParentPosition = GetParent(CurrentPosition);
  }

  H->UsedSize++;
}

void SwapNodes(Heap* H, int Index1, int Index2)
{
  int CopySize = sizeof(Node);
  Node* Temp = (Node*)malloc(CopySize);

  memcpy(Temp, &H->Nodes[Index1], CopySize);
  memcpy(&H->Nodes[Index1], &H->Nodes[Index2], CopySize);
  memcpy(&H->Nodes[Index2], Temp, CopySize);

  free(Temp);
}

void DeleteMin(Heap* H, Node* Root);
{
  int ParentPosition = 0;
  int LeftPosition = 0;
  int RightPosition = 0;

  memcpy(Root, &H->Nodes[0], sizeof(Node));
  memset(&H->Nodes[0], 0, sizeof(Node));

  H->UsedSize--;
  SwapNodes(H, 0, H->UsedSize);
  
  LeftPosition = GetLeftChild(0);
  RightPosition = LeftPosition + 1;

  while(1)
  {
    int SelectedChild = 0;

    if(LeftPosition >= H->UsedSize)
      break;

    if(RightPosition >= H->UsedSize)
    {
      SelectedChild = LeftPosition;
    }
    else
    {
      if(H->Nodes[LeftPosition].Data > H->Nodes[RightPosition].Data)
        SelectedChild = RightPosition;
      else
        SelectedChild = LeftPosition;
    }

    if(H->Nodes[SelectedChild].Data < H->Nodes[ParentPosition].Data)
    {
      SwapNodes(H, ParentPosition, SelectedChild);
      ParentPosition = SelectedChild;
    }
    else
      break;

    LeftPosition = GetLeftChild(ParentPosition)
    RightPosition = LeftPosition + 1;
  }

  if(H->UsedSize < (H->Capacity / 2))
  {
    H->Capacity /= 2;
    H->Nodes = (Node*)realloc(H->Nodes, sizeof(Node) * H->Capacity);
  }
}

int GetParent(int Index)
{
  return (int) ((Index - 1 ) / 2);
}

int GetLeftChild(int Index)
{
  return (2 * Index) + 1;
}

void PrintNodes(Heap* H)
{
  int i = 0;
  for(i = 0; i < H->UsedSize; i++)
  {
    printf("%d ", H->Nodes[i].Data);
  }
  printf("\n");
}
```

### Test_Heap.c

```c
#include "Heap.h"

int main(void)
{
  Heap* H = Create(3);
  Node MinNode;

  Insert(H, 5);
  Insert(H, 65);
  Insert(H, 16);
  Insert(H, 9);
  Insert(H, 84);
  Insert(H, 164);
  Insert(H, 19);
  Insert(H, 23);
  Insert(H, 92);
  Insert(H, 48);
  PrintNodes(H);

  DeleteMin(H, &MinNode);
  PrintNodes(H);

  DeleteMin(H, &MinNode);
  PrintNodes(H);

  DeleteMin(H, &MinNode);
  PrintNodes(H);

  DeleteMin(H, &MinNode);
  PrintNodes(H);

  DeleteMin(H, &MinNode);
  PrintNodes(H);

  DeleteMin(H, &MinNode);
  PrintNodes(H);

  return 0;
}

// 실행결과
5 9 16 23 48 164 19 65 92 84
9 23 16 65 48 164 19 84 92
16 23 19 65 48 164 92 84
19 23 84 65 48 164 92
23 48 84 65 92 164
48 65 84 164 92
65 92 84 164
```

## 힙을 이용한 우선순위 큐의 구현

> 이제 힙이라는 자료구조를 알았으니 이를 이용해 우선순위 큐에 대해서 구현해보자.
> 구현 할 때 기존에 알던 큐의 구조체에 조금의 변경점이 있다. 우선순위 큐라는 말 답게 구조체에 우선순위를 저장할 수 있는 멤버를 선언하고, 각 노드의 자료형을 저장하는 타입으로 void*(void 포인터)를 선언한다. void 포인터로 선언하는 것은 여러 타입을 저장할 수 있도록 하기위함이다.
{:.note title="attention"}

### PriorityQueue.h

```c
#ifndef PRIORITYQUEUE_H
#define PRIORITYQUEUE_H

#include <stdio.h>
#include <memory.h>
#include <stdlib.h>
#include <stdbool.h>

typedef int PriorityType;

typedef struct tagPQNode
{
  PriorityType Priority;
  void* Data;
} Node;

typedef struct tagPriorityQueue
{
  Node* Nodes;
  int Capacity;
  int UsedSize;
} PriorityQueue;

PriorityQueue* Create(int InitialSize);
void Destroy(PriorityQueue* PQ);
void Enqueue(PriorityQueue* PQ, Node NewDate);
void Dequeue(PriorityQueue* PQ, Node* Root);
int GetParent(int Index);
int GetLeftChild(int Index);
void SwapNodes(PriorityQueue* PQ, int Index1, int Index2);
bool IsEmpty(PriorityQueue* PQ);

#endif
```

### PriorityQueue.c

```c

#include "PriorityQueue.h"

PriorityQueue* Create(int InitialSize)
{
  PriorityQueue* NewPQ = (PriorityQueue*)malloc(sizeof(PriorityQueue));
  NewPQ->Capacity = InitialSize;
  NewPQ->UsedSize = 0;
  NewPQ->Nodes = (Node*)malloc(sizeof(Node) * NewPQ->Capacity);

  return NewPQ;
}

void Destroy(PriorityQueue* PQ)
{
  free(PQ->Nodes);
  free(PQ);
}

void Enqueue(PriorityQueue* PQ, Node NewNode)
{
  int CurrentPosition = PQ->UsedSize;
  int ParentPosition = GetParent(CurrentPosition);

  if(PQ->UsedSize == PQ->Capacity)
  {
    if(PQ->Capacity == 0)
      PQ->Capacity = 1;

    PQ->Capacity *= 2;
    PQ->Nodes = (Node*)realloc(PQ->Nodes,sizeof(Node) * PQ->Capacity);
  }

  PQ->Nodes[CurrentPosition] = NewNode;

  while(CurrentPosition > 0 &&
        PQ->Nodes[CurrentPosition].Priority < PQ->Nodes[ParentPosition].Priority)
  {
    SwapNodes(PQ, CurrentPosition, ParentPosition);

    CurrentPosition = ParentPosition;
    ParentPosition = GetParent(CurrentPosition);
  }

  PQ->UsedSize++;
}

void SwapNodes(PriorityQueue* PQ, int Index1, int Index2)
{
  int CopySize = sizeof(Node);
  Node* Temp = (Node*)malloc(CopySize);

  memcpy(Temp, &PQ->Nodes[Index1], CopySize);
  memcpy(&PQ->Nodes[Index1], &PQ->Nodes[Index2], CopySize);
  memcpy(&PQ->Nodes[Index2], Temp, CopySize);

  free(Temp);
}

void Dequeue(PriorityQueue* PQ, Node* Root)
{
  int ParentPosition = 0;
  int LeftPosition = 0;
  int RightPosition = 0;

  memcpy(Root, &PQ->Nodes[0], sizeof(Node));
  memset(&PQ->Nodes[0], 0, sizeof(Node));

  PQ->UsedSize--;
  SwapNodes(PQ, 0, PQ->UsedSize);

  LeftPosition = GetLeftChild(0);
  RightPosition = LeftPosition + 1;

  while(1)
  {
    int SelectedChild = 0;

    if(LeftPosition >= PQ->UsedSize)
      break;

    if(RightPosition >= PQ->UsedSize)
    {
      SelectedChild = LeftPosition;
    }
    else
    {
      if(PQ->Nodes[LeftPosition].Priority > PQ->Nodes[RightPosition].Priority)
        SelectedChild = RightPosition;
      else
        SelectedChild = LeftPosition;
    }

    if(PQ->Nodes[SelectedChild].Priority < PQ->Nodes[ParentPosition].Priority)
    {
      SwapNodes(PQ, ParentPosition, SelectedChild);
      ParentPosition = SelectedChild;
    }
    else
      break;

    LeftPosition = GetLeftChild(ParentPosition);
    RightPosition = LeftPosition + 1;
  }

  if(PQ->UsedSize < (PQ->Capacity / 2))
  {
    PQ->Capacity /= 2;
    PQ->Nodes = (Node*)realloc(PQ->Nodes, sizeof(Node) * PQ->Capacity);
  }
}

int GetParent(int Index)
{
  return (int)((Index - 1) / 2);
}

int GetLeftChild(int Index)
{
  return (2 * Index) + 1;
}

bool IsEmpty(PriorityQueue* PQ)
{
  return (PQ->UsedSize == 0);
}
```

### Test_PriorityQueue.c

```c
#include "PriorityQueue.h"

void PrintNode(Node* Node)
{
  printf("작업 : %s (우선순위 : %d)\n", Node->Data, Node->Priority);
}

int main(void)
{
  PriorityQueue* PQ = Create(3);
  Node Popped;

  Node Nodes[8] =
  {
    {1, (void*)"프로그래밍 언어공부"},
    {9, (void*)"청소"},
    {3, (void*)"OOP 공부"},
    {18, (void*)"밥먹기"},
    {5, (void*)"책상정리"},
    {2, (void*)"자료구조&알고리즘"},
    {14, (void*)"양치"},
    {7, (void*)"휴대폰충전"},
  };

  Enqueue(PQ, Nodes[0]);
  Enqueue(PQ, Nodes[1]);
  Enqueue(PQ, Nodes[2]);
  Enqueue(PQ, Nodes[3]);
  Enqueue(PQ, Nodes[4]);
  Enqueue(PQ, Nodes[5]);
  Enqueue(PQ, Nodes[6]);
  Enqueue(PQ, Nodes[7]);

  printf("남은 작업 수 : %d\n", PQ->UsedSize);

  while(!IsEmpty(PQ))
  {
    Dequeue(PQ, &Popped);
    PrintNode(&Popped);
  }

  return 0;
}

// 실행결과
남은 작업 수 : 8
작업 : 프로그래밍 언어공부 (우선순위 : 1)
작업 : 자료구조&알고리즘 (우선순위 : 2)
작업 : OOP 공부 (우선순위 : 3)
작업 : 책상정리 (우선순위 : 5)
작업 : 휴대폰충전 (우선순위 : 7)
작업 : 청소 (우선순위 : 9)
작업 : 양치 (우선순위 : 14)
작업 : 밥먹기 (우선순위 : 18)
```


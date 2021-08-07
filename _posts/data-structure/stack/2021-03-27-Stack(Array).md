---
layout: post
title: Array Stack
description: >
  배열형 스택
hide_description: true
sitemap: false
date: 2021-03-27 22:16:00 +0900
category: data-structure
tag: [stack,c]
---

# [Stack]배열로 구현하는 스택

> 게임을 해본사람이라면 `스택`이라는 말이 익숙하다. 게임에서는 버프나 디버프를 `쌓는` 의미로 많이 쓰인다. 자료구조의 스택도 그 의미와 비슷하다. 노드들을 `쌓아서` 구현하는 자료구조를 스택이라고 한다. 쌓는 구조이기 때문에 가장 먼저 들어간 노드는 가장 마지막에 나올 수 있다.  
> 이런 특성을 보고 흔히 `FILO(First In Last Out)`라고 한다. 여담으로 후에 배울 Queue(큐)는 `FIFO(First In First Out)`의 특성을 가진다.
{:.note title="attention"}

## Stack Implemented as an Array

> 스택을 구현하는 방법에 대해서 두 가지 방법을 사용할 예정이다. `배열`의 이용하는 것, 다음으로는 `Linked List`를 이용하는 방법을 포스팅하겠다. 먼저 배열로 구현하는 스택을 알아보자.
{:.note title="attention"}

### 스택과 스택의 노드 표현

> Linked List와 달리 스택의 노드 구조체는 Data만 저장하면 되기때문에 간단하다.
{:.note title="attention"}

* Node 구조체 구현

```c
typedef int ElementType;
typedef struct tagNode
{
  ElementType Data;
} Node;
```

> 배열기반 Stack의 구조체는 다음 세가지 필드(멤버변수)를 가져야한다.
> 1. 용량
> 2. 최상위 노드 위치
> 3. 노드 배열

* Stack 구조체 구현

```c
typedef struct tagArrayStack
{
  int Capacity; // 용량
  int Top;      // 최상위 노드의 위치
  Node* Nodes;  // 노드 배열
} ArrayStack;
```

&nbsp;&nbsp;여기서 Node의 포인터인 Nodes는 배열이다. 포인터를 배열로써 사용할 수 있는 C언어의 특성으로 가능한 것이다.

## 스택의 기본연산 구현하기

> 스택의 구현에서 필수적인 것은 아래 두가지 연산이다.
> 1. 삽입 : 최상위 노드 위에 새로운 노드를 얹음
> 2. 삭제 : 최상위 노드 소멸

### 스택의 생성과 소멸

* CreateStack() 구현

```c
void AS_CreateStack(ARrayStack** Stack, int Capacity)
{
  // 스택을 Heap에 할당
  (*Stack) = (ArrayStack*)malloc(sizeof(ArrayStack));

  // 인자로 받은 Capacity만큼 노드배열 공간 할당
  (*Stack)->Nodes = (Node*)malloc(sizeof(Node) * Capacity);

  // 나머지 필드 초기화
  (*Stack)->Capacity = Capacity;
  (*Stack)->Top = 0;
}
```

&nbsp;&nbsp;배열이 처음 선언될 때처럼 ArrayStack도 그 크기를 먼저 가지고 시작한다. 이 크기에 대한 정보가 Capacity에 저장되며, 노드를 Stack에 추가할 때마다 Top이 1씩 증가한다.

* DestroyStack() 구현

```c
void AS_DestroyStack(ArrayStack* Stack)
{
  // 노드를 Heap에서 소멸
  free(Stack->Nodes);
  // 스택을 Heap에서 소멸
  free(Stack);
}
```

### 삽입(Push) 연산

> Stack의 필수 연산인 삽입과 삭제연산은 간단히 구현할 수 있다. 
{:.note title="attention"}

* Push() 구현

```c
void AS_Push(ArrayStack* Stack, ElementType Data)
{
  int Position = Stack->Top;

  Stack->Nodes[Position].Data = Data;
  Stack->Top++;
}
```

### 제거(Pop) 연산

> 제거연산에서 중요한 점은 제거 후에 최상위 노드의 데이터를 호출자에게 반환해야 한다는 것이다.
{:.note title="attention"}

* Pop() 구현

```c
ElementType AS_Pop(ArrayStack* Stack)
{
  int Position = --(Stack-> Top);

  return Stack->Nodes[Position].Data;
}
```

## 모듈화

### ArrayStack.h

```c
#ifndef ARRAYSTACK_H
#define ARRAYSTACK_H

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef int ElementType;

typedef struct tagNode
{
  ElementType Data;
} Node;

typedef struct tagArrayStack
{
  int Capacity;
  int Top;
  Node* Nodes;
} ArrayStack;

void AS_CreateStack(ArrayStack** Stack, int Capacity);
void AS_DestroyStack(ArrayStack* Stack);
void AS_Push(ArrayStack* Stack, ElementType Data);
ElementType AS_Pop(ArrayStack* Stack);
ElementType AS_Top(ArrayStack* Stack);
int AS_Getsize(ArrayStack* Stack);
bool AS_IsEmpty(ArrayStack* Stack);
bool AS_IsFull(ArrayStack* Stack);

#endif
```

### ArrayStack.c

```c
#include "ArrayStack.h"

void AS_CreateStack(ArrayStack** Stack, int Capacity)
{
  // 스택을 Heap에 할당
  (*Stack) = (ArrayStack*)malloc(sizeof(ArrayStack));

  // 인자로 받은 Capacity만큼 노드배열 공간 할당
  (*Stack)->Nodes = (Node*)malloc(sizeof(Node) * Capacity);

  // 나머지 필드 초기화
  (*Stack)->Capacity = Capacity;
  (*Stack)->Top = 0;
}

void AS_DestroyStack(ArrayStack* Stack)
{
  // 노드를 Heap에서 소멸
  free(Stack->Nodes);
  // 스택을 Heap에서 소멸
  free(Stack);
}

void AS_Push(ArrayStack* Stack, ElementType Data)
{
  if(AS_IsFull(Stack))
  {
    printf("Capacity 초과");
    return;
  }
  int Position = Stack->Top;

  Stack->Nodes[Position].Data = Data;
  Stack->Top++;
}

ElementType AS_Pop(ArrayStack* Stack)
{
  if(AS_IsEmpty(Stack))
  {
    printf("Empty Stack");
    return -1;
  }
  int Position = --(Stack-> Top);

  return Stack->Nodes[Position].Data;
}

ElementType AS_Top(ArrayStack* Stack)
{
  int Position = Stack->Top -1;

  return Stack->Nodes[Position].Data;
}

int AS_GetSize(ArrayStack* Stack)
{
  return Stack->Top;
}

bool AS_IsEmpty(ArrayStack* Stack)
{
  return (Stack->Top == 0);
}

bool AS_IsFull(ArrayStack* Stack)
{
  return (Stack->Top == Stack->Capacity);
}
```

### Test_ArrayStack.c

```c
#include "ArrayStack.h"

int main(void)
{
  int i = 0;
  ArrayStack* Stack = NULL;

  AS_CreateStack(&Stack, 10);

  AS_Push(Stack, 3);
  AS_Push(Stack, 37);
  AS_Push(Stack, 11);
  AS_Push(Stack, 12);

  printf("Capacity: %d, Size: %d, Top: %d\n\n", Stack->Capacity, AS_GetSize(Stack), AS_Top(Stack));

  for(i = 0; i < 4; i++)
  {
    if(AS_IsEmpty(Stack))
    {
      break;
    }

    printf("Popped: %d, ", AS_Pop(Stack));

    if (! AS_IsEmpty(Stack))
    {
      printf("Current Top: %d\n", AS_Top(Stack));
    }
    else
    {
      printf("Stack Is Empty.\n");
    }
  }

  AS_DestroyStack(Stack);

  return 0;
}

// 실행결과
Capacity: 10, Size: 4, Top: 12

Popped: 12, Current Top: 11
Popped: 11, Current Top: 37
Popped: 37, Current Top: 3
Popped: 3, Stack Is Empty.
```

---

> 배열기반으로 구현한 Stack의 특징은 Stack을 생성할 때 용량을 정해야한다는 것이다. 또한, 배열이기에 Index를 통한 접근도 가능하다. 여기서 추가적으로 생각해볼 것은 Stack구조체에서 Top의 멤버변수 초기화값을 가장 처음에는 -1로 선언하면 어떨까 하는 것이다.  
> Stack의 Node가 실제로는 배열로써 구현되어있으니 Index로 좀 더 직관적으로 배열에 접근하려면 최초의 Top을 -1로 초기화하여 Size의 값이 아닌 최상위 노드의 Index값으로 여겨질수 있도록할 수 있을 것이다.
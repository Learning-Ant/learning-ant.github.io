---
layout: post
title: Circulation Queue
description: >
  순환 큐
hide_description: true
sitemap: false
date: 2021-03-29 00:12:00 +0900
category: data-structure
tag: [queue],c]
---

# 큐(Queue)

> 큐(Queue)는 스택과 달리 데이터가 들어온 순서대로 내보내는 `FIFO(First In First Out)`의 특성을 가지고 있다. 쉽게 말해 **대기행렬** 이라고 할 수 있다.  
> 메모리 구조에서 우리는 `버퍼`의 개념을 배우는 데, 큐와 유사하다.
{:.note title="attention"}

### 큐의 주요 기능

> Stack에서는 노드의 삽입과 제거가 최상단 노드 한쪽에서만 이루어진데 반해, 큐는 삽입(Enqueue)은 후단, 제거(Dequeue)는 전단에서 수행된다.  
> 따라서 제거 후에는 전단 다음에 있던 노드가 전단이 되고, 삽입은 노드가 후단 뒤에 추가 된다.
{:.note title="attention"}

* 전단 : 큐의 가장 앞 요소
* 후단 : 큐의 가장 마지막 요소

## Circulation Queue

> 순환 큐는 원하는 용량보다 +1만큼 큰 크기를 가지고, 노드의 삽입과 제거가 일어나면서 전단과 후단이 연산마다 이동하게 되어 큐의 용량만큼 노드가 가득 찼을 때 후단이 전단의 인덱스보다 1작은 값을 가지는 형태이다.  
> 인위적으로 크기를 1 늘려 가득찬 상태와 빈 상태를 구별하는 것이다.
{:.note title="attention"}

### Circular Queue에서 Empty Queue와 Full Queue의 구별

> 앞선 설명에서 Circular Queue는 원하는 크기에서 1만큼 더 큰 크기를 할당하고 비어있는 큐와 가득 찬 큐를 비교한다고 했다. 그림으로 간단히 알아보자.
{:.note title="attention"}

![Empty Queue](/assets/img/data-structure/circular_queue.png)
{:.lead loading="lazy" align="center"}

Empty Queue
{:.figcaption}

* 위 처럼 최초 생성된 큐는 전단과 후단이 동일하다. 여기서 노드를 삽입하면 아래 그림과 같이 후단이 하나씩 증가하게된다.

![Enqueue](/assets/img/data-structure/enqueue_queue.png)
{:.lead loading="lazy" align="center"}

Enqueue
{:.figcaption}

* 이렇게 하나씩 증가시켜 가다보면 후단이 전단보다 1보다 작은 위치에 오는 순간이 오는데 이 때가 큐가 가득찬 상황이다. 아래 그림을 참고하자.

![Full Queue](/assets/img/data-structure/full_queue.png)
{:.lead loading="lazy" align="center"}

Full Queue
{:.figcaption}

### 순환 큐 구현

> 그림을 기억하면서 큐를 구현 해보도록 하자.
{:.note title="attention"}

* Node 구조체 구현
    * 앞서 배웠던 배열기반 Stack의 Node와 동일하다.

```c
typedef int ElementType;

typedef struct tagNode
{
    ElementType Data;
} Node;
```

* Circular Queue 구조체 구현
    * Queue 구조체 구현에서 주의할 점은 원하는 용량보다 +1 만큼 더 큰 노드 배열을 구현해야 한다는 점이다.

```c
typedef struct tagCircularQueue
{
    int Capacity;   // 용량
    int Front;      // 전단 인덱스
    int Rear;       // 후단 인덱스
    Node* Nodes;    // 노드 배열
} CircularQueue;
```

### 순환 큐의 생성/소멸

* CreateQueue() 구현

```c
void CQ_CreateQueue(CircularQueue** Queue, int Capacity)
{
    // Heap에 Queue 할당
    (*Queue) = (CircularQueue*)malloc(sizeof(CircularQueue));

    // 인자로 받은 Capacity+1만큼 Heap에 노드 할당
    (*Queue)->Nodes = (Node*)malloc(sizeof(Node) * (Capacity + 1));

    (*Queue)->Capacity = Capacity;
    (*Queue)->Front = 0;
    (*Queue)->Rear = 0;
}
```

* DestroyQueue() 구현

```c
void CQ_DestroyQueue(CircularQueue* Queue)
{
    free(Queue->Nodes);
    free(Queue);
}
```

### 삽입(Enqueue) 연산

> 앞의 설명에서 삽입(Enqueue)을 실행하면 후단의 인덱스가 하나씩 증가한다고 했다. 한가지 주의할 점은 "순환" 큐 이므로 후단이 용량보다 커질 경우 처음으로 초기화 해주는 과정이 필요하다.
{:.note title="attention"}

```c
void CQ_Enqueue(CircularQueue* Queue, ElementType Data)
{
    int Position = 0;

    // 후단이 용량과 같을 경우 0으로 초기화
    if (Queue->Rear == Queue->Capacity)
    {
        Position = Queue->Rear;
        Queue->Rear = 0;
    }
    else
    {
        Position = Queue->Rear++;
    }

    Queue->Nodes[Position].Data -> Data;
}
```

### 제거(Dequeue) 연산

> 제거할때는 Stack의 Pop처럼 제거된 데이터를 반환해준다. 제거연산에서는 전단(Front)를 다뤄줘야한다는 것을 잊지말자. 물론 전단의 값이 용량이 되었을 때 0으로 초기화 한다는 것 역시 잊으면 안된다.
{:.note title="attention"}

```c
ElementType CQ_Dequeue(CircularQueue* Queue)
{
    int Position = Queue->Front;

    if(Queue->Front == Queue->Capacity)
    {
        Queue->Front = 0;
    }
    else
    {
        Queue->Front++;
    }

    return Queue->Nodes[Position].Data;
}
```

> 보다보면 한가의 의아한점이 있을 수 있다. 용량과 인덱스는 우리가 알기론 차이가 있다는 것이다. 용량이 7이라면 마지막 인덱스는 6이된다. 하지만 여기서는 그것을 고려하지 않고 용량과 같으면 바로 0으로 초기화한다.  
> 이는 용량보다 1만큼 큰 공간을 할당했기 때문이다. 실제로 삽입이나 제거 연산을 수행 한 후에 전단과 후단은 마지막 공간을 가리키고 있는 상태 일 것이다. 그 공간을 가리키고 있을 때 초기화해주어야 Empty Queue와 Full Queue를 구별해 줄 수 있는 것이다.
{:.note title="참고"}

### 공백과 포화상태 확인

> 공백과 포화상태를 구별하기 위해 일부러 필요한 용량보다 더 큰 공간을 할당했다. 이를 이용해 공백상태오 포화상태를 판별해주는 함수를 구현해본다.
{:.note title="attention"}

* IsEmpty() 구현

```c
bool CQ_IsEmpty(CircularQueue* Queue)
{
    return (Queue->Front == Queue->Rear);
}
```

* IsFull() 구현

```c
bool CQ_IsFull(CircularQueue* Queue)
{
    if(Queue->Front < Queue->Rear)
        return (Queue->Rear - Queue->Front) == Queue->Capacity;
    else
        return (Queue->Rear + 1) == Queue->Front;
}
```

## 모듈화

### CircularQueue.h

```c

#ifndef CIRCULAR_QUEUE_H
#define CIRCULAR_QUEUE_H

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef int ElementType;

typedef struct tagNode
{
    ElementType Data;
} Node;

typedef struct tagCircularQueue
{
    int Capacity;
    int Front;
    int Rear;
    Node* Nodes;
} CircularQueue;

void CQ_CreateQueue(CircularQueue** Queue, int Capacity);
void CQ_DestroyQueue(CircularQueue* Queue);
void CQ_Enqueue(CircularQueue* Queue, ElementType Data);
ElementType CQ_Dequeue(CircularQueue* Queue);
int CQ_GetSize(CircularQueue* Queue);
bool CQ_IsEmpty(CircularQueue* Queue);
bool CQ_IsFull(CircularQueue* Queue);

#endif
```

### CircularQueue.c

```c

#include "CircularQueue.h"

void CQ_CreateQueue(CircularQueue** Queue, int Capacity)
{
    (*Queue) = (CircularQueue*)malloc(sizeof(CircularQueue));
    (*Queue)->Nodes = (Node*)malloc(sizeof(Node) * (Capacity + 1));
    (*Queue)->Capacity = Capacity;
    (*Queue)->Front = 0;
    (*Queue)->Rear = 0;
}

void CQ_DestroyQueue(CircularQueue* Queue)
{
    free(Queue->Nodes);
    free(Queue);
}

void CQ_Enqueue(CircularQueue* Queue, ElementType Data)
{
    int Position = 0;
    if(Queue->Rear == Queue->Capacity)
    {
        Position = Queue->Rear;
        Queue->Rear = 0;
    }
    else
    {
        Position = Queue->Rear++;
    }
    Queue->Nodes[Position].Data = Data;
}

ElementType CQ_Dequeue(CircularQueue* Queue)
{
    int Position = Queue->Front;

    if(Queue->Front == Queue->Capacity)
    {
        Queue->Front = 0;
    }
    else
    {
        Queue->Front++;
    }

    return Queue->Nodes[Position].Data;
}

int CQ_GetSize(CircularQueue* Queue)
{
    int size = Queue->Rear - Queue->Front;
    return size >= 0 ? size : Queue->Capacity + size + 1;
}

bool CQ_IsEmpty(CircularQueue* Queue)
{
    return (Queue->Front == Queue->Rear);
}

bool CQ_IsFull(CircularQueue* Queue)
{
    if(Queue->Front < Queue->Rear)
        return (Queue->Rear - Queue->Front) == Queue->Capacity;
    else
        return (Queue->Rear + 1) == Queue->Front;
}
```


### Test_CircularQueue.c

```c
#include "CircularQueue.h"

int main(void)
{
    int i;
    CircularQueue* Queue;

    CQ_CreateQueue(&Queue, 5);

    for(i = 0; i < Queue->Capacity; i++)
    {
        CQ_Enqueue(Queue, i);
    }

    printf("Front : %d, Rear : %d\n", Queue->Front, Queue->Rear);

    printf("Capacity: %d, Size: %d\n\n", Queue->Capacity, CQ_GetSize(Queue));

    if(CQ_IsFull(Queue))
        printf("Queue is Full\n\n");
    else
        printf("Queue is not Full\n\n");

    for(i = 0; i < 3; i++)
    {
        printf("Dequeue: %d, ", CQ_Dequeue(Queue));
        printf("Front:%d, Rear:%d\n", Queue->Front, Queue->Rear);
    }

    if(CQ_IsFull(Queue))
        printf("Queue is Full\n\n");
    else
        printf("Queue is not Full\n\n");

    printf("Size : %d\n", CQ_GetSize(Queue));

    for(i = 0; i < 3; i++)
    {
        CQ_Enqueue(Queue, i);
    }

    if(CQ_IsFull(Queue))
        printf("Queue is Full\n\n");
    else
        printf("Queue is not Full\n\n");

    while(!CQ_IsEmpty(Queue))
    {
        printf("Dequeue: %d, ", CQ_Dequeue(Queue));
        printf("Front:%d, Rear:%d\n", Queue->Front, Queue->Rear);
    }

    printf("Size : %d\n", CQ_GetSize(Queue));

    if(CQ_IsEmpty(Queue))
    {
        printf("Queue is Empty");
    }

    CQ_DestroyQueue(Queue);

    return 0;
}

// 실행결과
Front : 0, Rear : 5
Capacity: 5, Size: 5

Queue is Full

Dequeue: 0, Front:1, Rear:5
Dequeue: 1, Front:2, Rear:5
Dequeue: 2, Front:3, Rear:5
Queue is not Full

Size : 2
Queue is Full

Dequeue: 3, Front:4, Rear:2
Dequeue: 4, Front:5, Rear:2
Dequeue: 0, Front:0, Rear:2
Dequeue: 1, Front:1, Rear:2
Dequeue: 2, Front:2, Rear:2
Size : 0
Queue is Empty
```
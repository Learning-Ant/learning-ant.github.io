---
layout: post
title: LinkedList Queue
description: >
  링크드 큐
hide_description: true
sitemap: false
date: 2021-03-29 00:12:00 +0900
category: data-structure
tag: [queue,c]
---

# [Queue]링크드 큐

## 순환 큐 vs 링크드 큐

> 그 동안 구현했던 Linked List를 생각하면 가장 큰 장점으로는 한계 용량이 제한적이지 않다는 것이다. 이 특징은 링크드 큐 역시 적용된다. 그렇기에 순환 큐에 반해, 링크드 큐는 현재 가득 차 있는지 아닌지를 확인 할 필요가 없다.  
> 또한, 아래 그림을 보듯 전단을 Pop하는 Dequeue 연산과 후단에 노드를 추가하는 Enqueue 연산이 정말 간단하다.
{:.note title="attention"}

* Linked Queue의 Enqueue

    ![Linked-Enqueue](/assets/img/data-structure/linked_enqueue.png)
    {:.lead loading="lazy" align="center"}

    Linked Queue의 Enqueue
    {:.figcaption}

* Linked Queue의 Dequeue

    ![Linked-Enqueue](/assets/img/data-structure/linked_dequeue.png)
    {:.lead loading="lazy" align="center"}

    Linked Queue의 Dequeue
    {:.figcaption}

&nbsp;&nbsp;연산이 쉽고 용량의 제한이 없다는 큰 장점을 가진 링크드 큐이지만, 그렇다고 순환 큐에 비해 성능이 무조건적으로 좋다고는 볼 수 없다. 링크드 큐는 노드를 생성할 때마다 `malloc()`를 호출해야하지만 순환 큐는 이미 큐를 생성할 때 그 용량을 산정하여 배열로써 구현해두기 때문에 성능은 순환 큐가 좋다고 할 수 있다.  
&nbsp;&nbsp;그렇기에 큐의 `크기가 예측가능하고 고성능이 필요한 버퍼`와 같은 사례는 링크드 큐보다는 순환큐가 더 적절하다.

### 링크드 큐와 노드 구현

* 노드 구조체

```c
typedef struct tagNode
{
    char* Data;
    struct tagNode* NextNode;
} Node
```

* 큐 구조체

```c
typedef struct tagLinkedQueue
{
    Node* Front;
    Node* Rear;
    int Count;
} LinkedQueue;
```

### 큐의 생성과 소멸

* CreateQueue() 구현

```c
void LQ_CreateQueue(LinkedQueue** Queue)
{
    (*Queue) = (LinkedQueue*)malloc(sizeof(LinkedQueue));
    (*Queue)-> Front = NULL;
    (*Queue)-> Rear = NULL;
    (*Queue)-> Count = 0;
}
```

* DestroyQueue() 구현

> 큐 내부에 저장되어 있는 노드들부터 모두 꺼내어 소멸시켜준 후 Queue를 소멸시킨다.
{:.note title="attention"}

```c
void LQ_DestroyQueue(LinkedQueue* Queue)
{
    while(!LQ_IsEmpty(Queue))
    {
        Node* Popped = LQ_Dequeue(&Queue);
        LQ_DestroyNode(Popped);
    }
    free(Queue);
}
```

### 삽입(Enqueue) 연산

> 삽입은 간단하게 후단 노드의 NextNode로 입력받은 노드를 연결해 주면 끝이다.
{:.note title="attention"}

```c
void LQ_Enqueue(LinkedQueue* Queue, Node* NewNode)
{
    if(Queue->Front == NULL)
    {
        Queue->Front = NewNode;
        Queue->Rear = NewNode;
        Queue->Count++;
    }
    else
    {
        Queue->Rear->NextNode = NewNode;
        Queue->Rear = NewNode;
        Count++;
    }
}
```

### 제거(Dequeue) 연산

> 제거 또한 전단을 반환해주고 전단을 제거한 노드의 NextNode로 바꿔준다.
{:.note title="attention"}

```c
Node* LQ_Dequeue(LinkedQueue* Queue)
{
    Node* Front = Queue->Front;

    if(Queue->Front->NextNode == NULL)
    {
        Queue->Front = NULL:
        Queue->Rear = NULL:
    }
    else
    {
        Queue->Front = Queue-> Front->NextNode;
    }

    Queue->Count--;

    return Front;
}
```

## 모듈화

### LinkedQueue.h

```c
#ifndef LINKED_QUEUE_H
#define LINKED_QUEUE_H

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct tagNode
{
    char* Data;
    struct tagNode* NextNode;
} Node;

typedef struct tagLinkedQueue
{
    Node* Front;
    Node* Rear;
    int Count;
} LinkedQueue;

void LQ_CreateQueue(LinkedQueue** Queue);
void LQ_DestroyQueue(LinkedQueue* Queue);

Node* LQ_CreateNode(char* NewData);
void LQ_DestroyNode(Node* _Node);

void LQ_Enqueue(LinkedQueue* Queue, Node* NewNode);
Node* LQ_Dequeue(LinkedQueue* Queue);

bool LQ_IsEmpty(LinkedQueue* Queue);

#endif
```

### LinkedQueue.c

```c
#include "LinkedQueue.h"

void LQ_CreateQueue(LinkedQueue** Queue)
{
    (*Queue) = (LinkedQueue*)malloc(sizeof(LinkedQueue));
    (*Queue)->Front = NULL;
    (*Queue)->Rear = NULL;
    (*Queue)->Count = 0;
}

void LQ_DestroyQueue(LinkedQueue* Queue)
{
    while(!LQ_IsEmpty(Queue))
    {
        Node* Popped = LQ_Dequeue(Queue);
        LQ_DestroyNode(Popped);
    }

    free(Queue);
}

Node* LQ_CreateNode(char* NewData)
{
    Node* NewNode = (Node*)malloc(sizeof(Node));
    NewNode->Data = (char*)malloc(strlen(NewData) + 1);

    strcpy(NewNode->Data, NewData);

    NewNode->NextNode = NULL;

    return NewNode;
}

void LQ_DestroyNode(Node* _Node)
{
    free(_Node->Data);
    free(_Node);
}

void LQ_Enqueue(LinkedQueue* Queue, Node* NewNode)
{
    if(Queue->Front == NULL)
    {
        Queue->Front = NewNode;
        Queue->Rear = NewNode;
        Queue->Count++;
    }
    else
    {
        Queue->Rear->NextNode = NewNode;
        Queue->Rear = NewNode;
        Queue->Count++;
    }
}

Node* LQ_Dequeue(LinkedQueue* Queue)
{
    Node* Front = Queue->Front;

    if(Queue->Front->NextNode == NULL)
    {
        Queue->Front = NULL;
        Queue->Rear = NULL;
    }
    else
    {
        Queue->Front = Queue->Front->NextNode;
    }

    Queue->Count--;

    return Front;
}

bool LQ_IsEmpty(LinkedQueue* Queue)
{
    return Queue->Front == NULL;
}
```

### Test_LinkedQueue.c

```c
#include "LinkedQueue.h"

int main(void)
{
    Node* Popped;
    LinkedQueue* Queue;
    int i;

    LQ_CreateQueue(&Queue);

    LQ_Enqueue(Queue, LQ_CreateNode("abc"));
    LQ_Enqueue(Queue, LQ_CreateNode("def"));
    LQ_Enqueue(Queue, LQ_CreateNode("ghi"));
    LQ_Enqueue(Queue, LQ_CreateNode("jkl"));
    LQ_Enqueue(Queue, LQ_CreateNode("mno"));

    printf("Queue Size : %d\n", Queue->Count);

    while(!LQ_IsEmpty(Queue))
    {
        Popped = LQ_Dequeue(Queue);

        printf("Dequeue: %s \n", Popped->Data);

        LQ_DestroyNode(Popped);
    }

    LQ_DestroyQueue(Queue);

    return 0;
}

// 실행결과
Queue Size : 5
Dequeue: abc
Dequeue: def
Dequeue: ghi
Dequeue: jkl
Dequeue: mno
```

---

> `큐(Queue)`에서 중요한 것은 `FIFO(First In First Out)`와 `Enqueue(삽입)&Dequeue(제거)` 연산이다. 각 자료구조에서는 필수로 구현되어야 할 구조체의 구성과 연산이 있고, 각 연산이 돌아가는 로직이 정해져있다. 그에 맞춰서 구현해야 비로소 해당 자료구조를 구현했다고 할 수 있는 것이다. 각각의 자료구조를 떠올려보고 어떤 구조를 가져야하는지, 어떤 연산을 가져야 하는지, 필수적으로 구현되어야 할 연산의 로직을 생각해보자. 바로 기억이 나지 않는다면 다시 공부하여 바로바로 생각날 수 있도록 해야겠다.  
> 이로써 `큐(Queue)`라는 자료구조도 끝이 났다. 다음 포스팅부터는 Tree구조에 대해서 알아보도록 하겠다.

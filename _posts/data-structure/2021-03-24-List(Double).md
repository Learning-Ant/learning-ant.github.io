---
layout: post
title: Double
description: >
  더블 링크드 리스트
hide_description: true
sitemap: false
date: 2021-03-24 21:16:00 +0900
category: data-structure
tag: [List,c]
---

# [List]더블 링크드 리스트(Double Linked List)

> `Double Linked List`는 이중으로 연결된 리스트라는 의미이다. 이중으로 연결되어있다는 말의 의미는 한 노드에 다음 노드를 가리키는 포인터만 있는 것이 아닌
> 현재 노드의 이전노드를 가리키는 포인터도 포함되어 있다는 것이다.
{:.note title="attention"}

## Double Linked List

### Node

> 바로 위에서 설명했 듯 일단 노드의 구조를 변경해야 한다. 이전 노드를 가리키는 포인터를 추가한다.
{:.note title="attention"}

```c
typedef struct tagNode
{
    int Data;
    // 노드에 들어가는 데이터
    struct Node * PrevNode;
    // 이전 노드를 가리키는 포인터
    struct Node * NextNode;
    // 다음 노드를 가리키는 포인터
} Node;
```

&nbsp;&nbsp;이전 노드를 가리키는 포인터가 추가됨으로써 이제 단방향 탐색이 아닌 양방향 탐색이 가능해졌다.
헤드에서 테일로만 갈 수 있는 것이 아닌 그 반대 방향으로도 탐색의 진행이 가능해졌다.

### Double Linked List의 주요연산

> Double Linked List의 주요 연산은 Linked List와 크게 다를 바가 없다. 단지 이전 노드를 처리하기 위한 구현이 추가 될 뿐이다.
{:.note title="attention"}

1. 노드 생성/소멸
2. 노드 추가
3. 노드 탐색
4. 노드 삭제
5. 노드 삽입

### 노드의 생성/소멸

> 노드 생성에서 PrevNode에 Null 을 대입하여 초기화하는 부분만 추가하면 끝이다.
{:.note title="attention"}

* CreateNode()와 DestroyNode()구현

```c
typedef int ElementType;
typedef struct tagNode
{
    int Data;
    // 노드에 들어가는 데이터
    struct Node * PrevNode;
    // 이전 노드를 가리키는 포인터
    struct Node * NextNode;
    // 다음 노드를 가리키는 포인터
} Node;

// 노드 생성
Node* DLL_CreateNode(ElementType NewData)
{
    Node* NewNode = (Node*)malloc(sizeof(Node));
    
    NewNode->Data = NewData;
    NewNode->NextNode = NULL;
    NewNode->PrevNode = NULL;
    // 이전 노드는 아직 무엇인지 모르지 Null 포인터로 초기화
    
    return NewNode;
}

// 노드 소멸
// Linked List와 다른 점이 없다. 그저 소멸만 해주면 된다.
void DLL_DestroyNode(Node* Node)
{
    free(Node);
    // 인자로 받은 Node를 소멸
}
```

### 노드 추가

> 노드의 추가 역시 PrevNode를 지정해주는 한 줄의 코드만 추가해주면 된다.
{:.note title="attention"}

* AppendNode() 구현

```c
void DLL_AppendNode(Node** Head, Node* NewNode)
{
    // 헤드 노드가 NULL이면(없으면), 새로운 노드가 Head가 된다.
    if ( (*Head) == NULL )
    {
        *Head = NewNode;
    }
    else
    {
        // Head부터 Tail을 찾아간다.
        Node* Tail = (*Head)
        while ( Tail->NextNode != NULL )
        {
            Tail = Tail->NextNode
        }
        Tail->NextNode = NewNode;
        NewNode->PrevNode = Tail;
    }
}
```

### 노드 탐색, 개수

> 노드의 탐색과 Counting은 Single Linked List와 달라지는 부분 없이 동일하다.
{:.note title="attention"}

* GetNodeAt()과 GetNodeCount()의 구현

```c
// 노드 탐색
Node* DLL_GetNodeAt(Node* Head, int Location)
{
    Node* Current = Head;
    while(Current != NULL && (--Location) >=0)
    {
        Current = Current->NextNode;
    }
    return Current;
}
// 노드 Counting
int DLL_GetNodeCount(Node* Head)
{
    unsigned int Count = 0;
    Node* Current = Head;
    while(Current != NULL)
    {
        Count++;
        Current = Current->NextNode;
    }
    return Count;
}
```

### 노드 삭제

> Double Linked List에서의 노드 삭제는 Single Linked List보다 다소 복잡하다. 노드마다 연결해줘야할 Link가 늘어났기 때문인데,
> 이 때문에 삭제할 노드의 양쪽 포인터 두개, 이전 노드의 NextNode 포인터, 이후 노드의 PrevNode 포인터, 모두 4개의 포인터를 다뤄야 한다.
{:.note title="attention"}

![노드삭제](/assets/img/data-structure/list_remove_node.png)
{:.lead loading="lazy" align="center"}

> Double Linked List에서의 Node 삭제
{:.figcaption}

* RemoveNode() 구현

```c
void DLL_RemoveNode(Node** Head, Node* Remove)
{
    if(*Head == Remove)
    {
        *Head = Remove->NextNode;
        if(*Head != NULL)
            (*Head)->PrevNode = NULL;
        
        Remove->PrevNode = NULL;
        Remove->NextNode = NULL;
    }
    else
    {
        Remove->PrevNode->NextNode = Remove->NextNode;

        if ( Remove->NextNode != NULL)
            Remove->NextNode->PrevNode = Remove->PrevNode;
        
        Remove->PrevNode = NULL;
        Remove->NextNode = NULL;
        // free(Remove);
    }
}
```

### 노드 삽입

> 노드의 삭제는 생각보다 쉽지 않았다. 삽입은 그보단 쉬우니 아래 예시를 보도록 하자.
{.note title="attention"}

![노드삽입](/assets/img/data-structure/list_append_node.png)
{:.lead loading="lazy" align="center"}

> Double Linked List에서의 Node 삽입
{:.figcaption}

* InsertAfter() 구현

```c
void DLL_InsertAfter(Node* Current, Node* NewNode)
{
    NewNode->NextNode = Current->NextNode;
    NewNode->PrevNode = Current;

    if(Current->NextNode != NULL)
    {
        Current->NextNode->PrevNode = NewNode;
    }
    Current->NextNode = NewNode;
}
```

## 모들화

### DoubleLinkedList.h

```c
#ifndef DOUBLE_LINKEDLIST_H
#define DOUBLE_LINKEDLIST_H

#include <stdio.h>
#include <stdlib.h>

typedef int ElementType;

typedef struct tagNode
{
    ElementType Data;
    struct tagNode* PrevNode;
    struct tagNode* NextNode;
} Node;

// 함수 원형 선언
Node* DLL_CreateNode( ElementType NewData );
void DLL_DestroyNode( Node* Node );
void DLL_AppendNode( Node** Head, Node* NewNode );
void DLL_InsertAfter( Node* Current, Node* NewNode);
void DLL_RemoveNode( Node** Head, Node* Remove);
Node* DLL_GetNodeAt( Node* Head, int Location);
int DLL_GetNodeCount( Node* Head );

#endif
```

### DoubleLinkedList.c

```c
#include "DoubleLinkedList.h"

// 노드 생성
Node* DLL_CreateNode( ElementType NewData )
{
    Node* NewNode = (Node*)malloc(sizeof(Node));

    NewNode->Data = NewData;
    NewNode->PrevNode = NULL;
    NewNode->NextNode = NULL;

    return NewNode;
}

// 노드 소멸
void DLL_DestroyNode(Node* Node)
{
    free(Node);
    // 인자로 받은 Node를 소멸
}

// 노드 추가
void DLL_AppendNode(Node** Head, Node* NewNode)
{
    // 헤드 노드가 NULL이면(없으면), 새로운 노드가 Head가 된다.
    if ( (*Head) == NULL )
    {
        *Head = NewNode;
    }
    else
    {
        // Head부터 Tail을 찾아간다.
        Node* Tail = (*Head)
        while ( Tail->NextNode != NULL )
        {
            Tail = Tail->NextNode
        }
        Tail->NextNode = NewNode;
        NewNode->PrevNode = Tail;
    }
}

// 노드 삽입
void DLL_InsertAfter(Node* Current, Node* NewNode)
{
    NewNode->NextNode = Current->NextNode;
    NewNode->PrevNode = Current;

    if(Current->NextNode != NULL)
    {
        Current->NextNode->PrevNode = NewNode;
    }
    Current->NextNode = NewNode;
}

// 노드 제거
void DLL_RemoveNode(Node** Head, Node* Remove)
{
    if(*Head == Remove)
    {
        *Head = Remove->NextNode;
        if(*Head != NULL)
            (*Head)->PrevNode = NULL;
        
        Remove->PrevNode = NULL;
        Remove->NextNode = NULL;
    }
    else
    {
        Remove->PrevNode->NextNode = Remove->NextNode;

        if ( Remove->NextNode != NULL)
            Remove->NextNode->PrevNode = Remove->PrevNode;
        
        Remove->PrevNode = NULL;
        Remove->NextNode = NULL;
        // free(Remove);
    }
}

// 노드 탐색
Node* DLL_GetNodeAt(Node* Head, int Location)
{
    Node* Current = Head;
    while(Current != NULL && (--Location) >=0)
    {
        Current = Current->NextNode;
    }
    return Current;
}
// 노드 Counting
int DLL_GetNodeCount(Node* Head)
{
    unsigned int Count = 0;
    Node* Current = Head;
    while(Current != NULL)
    {
        Count++;
        Current = Current->NextNode;
    }
    return Count;
}
```

### Test_DoubleLinkedList.c

```c
#include "DoubleLinkedList.h"

int main(void)
{
    int i = 0;
    int Count = 0;
    Node* List = NULL;
    Node* NewNode = NULL;
    Node* Current = NULL;

    // 노드 추가
    for (i = 0; i < 5; i++)
    {
        NewNode = DLL_CreateNode(i);
        DLL_AppendNode(&List, NewNode);
    }

    // 리스트 출력
    Count = DLL_GetNodeCount(List);
    Current = DLL_GetNodeAt(List, 0);
    for(i = 0; i < Count; i++)
    {
        printf("List[%d] : %d\n", i, Current->Data);
        Current = Current.NextNode;
    }

    // 노드 삽입
    Current = DLL_GetNodeAt(List, 2);
    NewNode = DLL_CreateNode(1000);
    DLL_InsertAfter(Current, NewNode);

    // 리스트 출력
    Count = DLL_GetNodeCount(List);
    Current = DLL_GetNodeAt(List, 0);
    for(i = 0; i < Count; i++)
    {
        printf("List[%d] : %d\n", i, Current->Data);
        Current = Current.NextNode;
    }

    // 노드 제거
    for(i = 0; i < Count; i++)
    {
        Current = DLL_GetNodeAt(List, 0);

        if(Current != NULL)
        {
            DLL_RemoveNode(&List, Current);
            DLL_DestroyNode(Current);
        }
    }
    return 0;
}

// 실행결과
List[0] : 0
List[1] : 1
List[2] : 2
List[3] : 3
List[4] : 4
List[0] : 0
List[1] : 1
List[2] : 2
List[3] : 1000
List[4] : 3
List[5] : 4
```

---

> Double Linked List 역시 개선할 여지는 남아있다. 일단 먼저 양방향 탐색이 가능하지만 아직 역시 단방향으로만 탐색을 진행하고 있다. 역순으로 프린트하는 함수를 만든다거나, 어떤 Node를 인수로 받고 그 이전의 Node를 탐색하는 함수 역시 가능할 것이다.  
> 다음 포스팅으로는 환형 링크드 리스트에 대해 작성해볼까 한다. 환형이라는 말처럼 마지막 노드인 Tail이 Head와 연결되어 있는 형태이다. 다음 포스팅에서 좀 더 개선하여 탐색 함수를 제외하고 구조체의 구조를 바꿔 바로 Node의 개수를 알 수 있도록 구성해보겠다.
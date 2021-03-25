---
layout: post
title: Double&Circular
description: >
  더블 링크드 리스트와 환형 링크드 리스트
hide_description: true
sitemap: false
date: 2021-03-24 21:16:00 +0900
category: data-structure
tag: [List,c]
---

# 더블 링크드 리스트와 환형 링크드 리스트

> `Double Linked List`는 이중으로 연결된 리스트라는 의미이다. 이중으로 연결되어있다는 말의 의미는 한 노드에 다음 노드를 가리키는 포인터만 있는 것이 아닌
> 현재 노드의 이전노드를 가리키는 포인터도 포함되어 있다는 것이다.
> `Circular Linked List`는 환형으로 연결된 리스트라는 의미로, 헤드와 테일이 연결된 리스트이다.
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


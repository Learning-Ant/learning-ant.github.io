---
layout: post
title: Linked List Stack
description: >
  리스트형 스택
hide_description: true
sitemap: false
date: 2021-03-28 19:16:00 +0900
category: data-structure
tag: [stack,c]
---

# 링크드 리스트로 구현하는 스택(Stack)

> LinkedList로도 스택을 구현할 수 있는데, 배열로 구현했을 때는 용량의 제한을 둬야했지만 List는 그 제한이 사라진다.
{:.note title="attention"}

## Stack Implemented as a Linked List

> 배열로 구현할 때와는 달리 인덱스로 노드에 접근할 수 없다. 다만, Linked List 노드의 특성상 다음 노드의 위치 정보를 포함하고 있으므로 이를 통해 인접 노드로 접근한다.
{:.note title="attention"}

### 스택&노드 구현

* Node 구조체 구현

```c
typedef struct tagNode
{
    char* Data;
    struct tagNode NextNode;
} Node;
```

* Stack 구조체 구현
    * 배열 기반의 Stack에서는 최상위 노드를 알기 위해 `Top`이라는 멤버변수를 포함하고 있었지만, Linked List에서는 Head와 Tail을 멤버변수로 가진다.

```c
typedef struct tagLinkedListStack
{
    Node* List;
    Node* Top;
} LinkedListStack;
```

## 스택의 기본 연산 구현

### 스택의 생성과 소멸

* CreateStack() 구현

```c
void LLS_CreateStack(LinkedListStack** Stack)
{
    (*Stack) = (LinkedListStack*)malloc(sizeof(LinkedListStack));
    (*Stack)->List = NULL;
    (*Stack)->Top = NULL;
}
```

* DestroyStack() 구현

> 배열기반 Stack과 다른점은 각 노드들을 하나씩 꺼내어 소멸시켜주는 과정이 필요하다는 점이다.

```c
void LLS_DestroyStack(LinkedListStack** Stack)
{
    while (!LLS_IsEmpty(Stack))
    {
        Node* Popped = LLS_Pop(Stack);
        LLS_DestroyNode(Popped);
    }

    free(Stack);
}
```

### 스택 노드의 생성과 소멸

> 구현하려는 스택의 노드들이 char형 포인터, 즉 문자열을 저장하는 과정이므로 노드의 생성이 좀 더 복잡해진다. 문자열을 저장할 공간도 Heap에 할당해 주어야 하므로 Data도 `malloc()`로 할당해준다.
{:.note title="attention"}

* CreateNode() 구현

```c
Node* LLS_CreateNode(char* NewNode)
{
    Node* NewNode = (Node*)malloc(sizeof(Node));
    NewNode->Data = (char*)malloc(strlen(NewData) + 1);

    // 인자를 Heap에 할당한 공간에 복사
    strcpy(NewNode->Data, NewData);

    NewNode->NextNode = NULL;

    return NewNode;
}
```

* DestroyNode() 구현

```c
void LLS_DestroyNode(Node* _Node)
{
    free(_Node->Data);
    free(_Node);
}
```

### 삽입(Push) 구현

> 기본적으로 개념은 배열기반 스택과 비슷하다. 최상위 노드를 찾아 그 다음노드로 추가해 준 후 Stack구조체의 Top필드에 등록하면 된다.
{:.note title="attention"}

```c
void LLS_Push(LinkedListStack* Stack, Node* NewNode)
{
    if(Stack->List == NULL)
    {
        Stack->List = NewNode;
    }
    else
    {
        // 최상위 노드를 찾은 후 NewNode 연결
        Node* OldTop = Stack->List;
        while(OldTop->NextNode != NULL)
        {
            OldTop = OldTop->NextNode;
        }

        OldTop->NextNode = NewNode;
    }
    Stack->Top = NewNode;
}
```

### 삭제(Pop) 구현

> LinkedList Stack에서 Pop 연산은 아래 4단계를 수행한다.
> 1. 현재 최상위 노드의 주소를 다른 포인터에 복사한다.
> 2. 새로운 최상위 노드를 찾는다.
> 3. LinkedListStack 구조체의 Top 필드에 새로운 최상위 노드 주소를 등록한다.
> 4. ①에서 포인터에 저장해둔 옛 최상위 노드의 주소를 반환한다.

```c
Node* LLS_Pop(LinkedListStack* Stack)
{
    // 최상위 노드 복사
    Node* TopNode = Stack->Top;

    // Stack에 노드가 하나(혹은 0) 뿐일 경우
    if(Stack->List == Stack->Top)
    {
        Stack->List = NULL;
        Stack->Top = NULL;
    }
    else
    {
        // 새로운 최상위 노드를 스택의 Top필드로 등록
        Node* CurrentTop = Stack->List;
        // 다음노드가 Top노드 일 경우 루프탈출
        while(CurrentTop != NULL && CurrentTop->NextNode != Stack->Top)
        {
            CurrentTop = CurrentTop->NextNode;
        }

        Stack->Top = CurrentTop;
        CurrentTop->NextNode = NULL;
    }

    return TopNode;
}
```



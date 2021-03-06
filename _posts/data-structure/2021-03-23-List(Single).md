---
layout: post
title: Linked List
description: >
  링크드 리스트의 구현
hide_description: true
sitemap: false
date: 2021-03-23 23:16:00 +0900
category: data-structure
tag: [List,c]
---

# [List]싱글 링크드 리스트(Single Linked List)

> 리스트 중의 하나인 링크드 리스트는 해석하자면 `연결해서 만드는 리스트`라는 의미가 된다. 그럼 어떤 것을 연결한 것일까?  
> 리스트의 각 요소는 노드(Node)라고 부른다. 노드는 우리말로 `마디`라는 의미이다. 이 노드를 연결한 것이 바로 `Linked List`이다.
{:.note title="attention"}

## Single Linked List

### Node

> C 언어에서는 각각의 노드를 `구조체`로 구현한다. 이 `구조체 노드`는 아래와 같이 구현이 가능하다.

```c
typedef struct tagNode
{
    int Data;
    // 노드에 들어가는 데이터
    struct Node * NextNode;
    // 다음 노드를 가리키는 포인터
} Node;
```

&nbsp;&nbsp;아는 사람은 알테지만 Linked List는 Index로 접근이 불가능하다. 대신 다음 노드를 가리키는 포인터를 가짐으로써 다음 노드가 무엇인지 알 수 있다.
이 포인터로 리스트의 노드 추가, 탐색, 삭제, 삽입 등이 가능한 것이다. 당연히 Index가 없으니 배열과 같은 Indexing이 불가능하다.

### Linked List의 주요연산

> 기본적으로 링크드 리스트를 구축하고 링크드 리스트에 있는 자료를 사용하기 위해 필요한 연산은 다음 다섯가지이다.
{:.note title="attention"}

1. 노드 생성/소멸
2. 노드 추가
3. 노드 탐색
4. 노드 삭제
5. 노드 삽입

### 노드의 생성/소멸

> C언어를 배웠다면 프로그램이 구동될 때 어떤 메모리들이 있는지 어느정도는 알고 있을 것이다. 크게 정적 메모리인 `데이터 영역`이 있고, Stack 영역이라 불리는 `자동 메모리(Automatic Memory)`, Heap이라 불리는 `자유 저장소(Free Store)`가 있다.  
> 데이터 영역은 Life Span이 프로그램 종료까지인 전역변수(Global Variable), 정적변수(Static Variable)가 저장되고, 자동메모리에는 지역변수, 자유 저장소는 동적 할당이 가능한 공간이다.  
> 그렇다면 노드는 어떤 메모리에 저장해야 할까?
{:.note title="attention"}

* 먼저 Stack에 저장하는 경우를 코드로 살펴보자.

```c
typedef struct tagNode
{
    int Data;
    // 노드에 들어가는 데이터
    struct Node * NextNode;
    // 다음 노드를 가리키는 포인터
} Node;

Node* createNode(int newData)
{
    Node newNode;
    // 지역변수이므로 자동메모리에 할당
    newNode.Data = newData;
    newNode.NextNode = NULL;

    return &newNode;
    // 노드가 새로 생성된 주소값을 반환하지만
    // 지역변수는 scope에 의해 함수가 종료되는 순간 사라진다.
}
// 이 때 새로운 노드 포인터를 선언하고
// 함수를 이용해 초기화하면 과연 어떻게 될까?
Node* newNode = createNode(120);
// 함수는 주소값을 반환하겠지만 해당 주소값에는 아무 데이터도 없을 것이다.
```

&nbsp;&nbsp;위의 예시로 우리는 Node를 어디에 할당해야할지 명확하게 알 수 있다. 노드는 `자유 저장소`, 즉 `Heap` 영역에 저장해야한다.
그 Heap영역에 할당하기 위해 필요한 것이 `malloc()와 free()`이다. 아래의 코드를 살펴보자.

```c
typedef int ElementType;
typedef struct tagNode
{
    int Data;
    // 노드에 들어가는 데이터
    struct Node * NextNode;
    // 다음 노드를 가리키는 포인터
} Node;

// 노드 생성
Node* SLL_CreateNode(ElementType NewData)
{
    Node* NewNode = (Node*)malloc(sizeof(Node));
    // Heap 영역에 할당하고 Node형 포인터로 casting

    NewNode->Data = NewData;
    // Data로 인자값을 전달
    NewNode->NextNode = NULL;
    // 다음 노드는 아직 무엇인지 모르니 Null 포인터로 초기화

    return NewNode;
    // 만든 Node(포인터)를 반환
}

// 노드 소멸
void SLL_DestroyNode(Node* Node)
{
    free(Node);
    // 인자로 받은 Node를 소멸
}
```

### 노드 추가

> 노드의 추가는 삽입과 달리 리스트의 가장 마지막 노드인 Tail 뒤에 새로운 노드를 연결하는 것을 의미한다.  
> 즉, 리스트의 Head부터 시작해 Tail을 찾고 Tail의 멤버변수인 `Node* NextNode`에 인자로 전달된 새로운 노드를 대입하면 된다.
{:.note title="attention"}

* AppendNode() 구현

```c
void SLL_AppendNode(Node** Head, Node* NewNode)
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
    }
}
```

&nbsp;&nbsp;구현은 되었고 이제 이를 어떻게 사용해야할까? 아래 예제로 살펴본다.

```c
Node* List = NULL;
Node* NewNode = NULL;

NewNode = SSL_CreateNode(11);
SLL_AppendNode( &List, NewNode );

NewNode = SSL_CreateNode(22);
SLL_AppendNode( &List, NewNode);
```

> 첫 번째 매개변수로 전달해주는 것이 List의 주소값임을 유의하자.  
> 여기서 SSL_AppendNode()함수에 첫 인자의 타입이 `포인터의 포인터(Node**)`인 이유가 의아할 수 있다.  
> 그 이유는 List는 일단 가장 첫번째 노드인 Head를 가리키는 포인터이다. 따라서 처음에는 노드가 없는 상태인 `NULL`의 상태인 것.  
> 그렇다면 List에 Head를 추가하려면 그 List를 가리키는 포인터를 받아 List에 Head Node를 가리키는 포인터를 추가해야한다.  
> 따라서, SSL_AppendNode()에서 List를 받는 인자는 포인터의 포인터가 되어야한다.
{:note title="attention"}

### 노드 탐색

> 탐색 연산은 Linked List가 가지고 있는 약점 중의 하나이다. 배열은 인덱스로 접근이 가능해 원하는 요소를 바로 취할 수 있게 하지만
> Linked List는 헤드부터 시작해 하나씩 차근차근 노드의 수를 세어나가야만 원하는 요소에 접근할 수 있다.
{:.note title="attention"}

* GetNodeAt() 구현

```c
Node* SLL_GetNodeAt(Node* Head, int Location)
{
    Node* Current = Head;

    while ( Current != NULL && (--Location) >= 0)
    {
        Current = Current->NextNode;
    }

    return Current;
}
```

&nbsp;&nbsp;코드를 봐서는 그렇게 어렵진 않다. 원하는 위치값을 인자로 전달해주고, 하나씩 감소시켜가며 해당 위치를 찾아가는 로직이다.
사용은 간단하지만 상당히 비효율적인 로직이다. 이는 Linked List의 어쩔 수 없는 약점이다.

### 노드 삭제

> 임의의 노드를 삭제하는 과정은 원하는 노드를 탐색하고, 해당 노드의 다음 노드를 이전 노드의 NextNode 포인터에 연결하는 과정을 거치면 된다.
{:.note title="attention"}

* RemoveNode() 구현

```c
void SLL_RemoveNode(Node** Head, Node* Remove)
{
    // Head가 삭제하려는 노드일 경우
    // Head를 다음 노드로 변경
    if (*Head == Remove)
    {
        *Head = Remove->NextNode;
    }
    else
    {
        Node* Current = *Head;
        // Current의 NextNode가 Remove와 같을 때까지 반복
        while(Current != NULL && Current->NextNode != Remove)
        {
            Current = Current->NextNode;
        }

        // Current가 NULL이 아니면 Current의 다음 노드를 삭제하려는 노드의 다음 노드로 변경
        if(Current != NULL)
        {
            Current->NextNode = Remove->NextNode;
        }
    }
}
```

&nbsp;&nbsp;RemoveNode()에서는 실제로 Heap공간에 할당되어 있던 Node를 소멸시키진 않는다.
이는 자칫 메모리 누수로 이어질 수 있다. 따라서 실제로 사용할 때는 List에서 삭제 후 바로 소멸함수를 사용해 노드를 메모리에서 소멸시켜주는 것이 좋다.

* 예시

```c
Node* List = NULL;
Node* MyNode = NULL;

// Node 추가
SLL_AppendNode( &List, SLL_CreateNode(110));
SLL_AppendNode( &List, SLL_CreateNode(111));
SLL_AppendNode( &List, SLL_CreateNode(112));

// 삭제할 노드를 탐색하고, Console에 출력
MyNode = SLL_GetNodeAt(List, 1);
printf("%d\n", MyNode->Data);

// List에서 노드제거
SLL_RemoveNode( &List, MyNode);

// 메모리에서 제거한 노드 소멸
SLL_DestroyNode(MyNode);

// 실행결과
111
```

### 노드 삽입

> 노드 삽입은 인자 두개를 받는다. 첫 인자로 삽입위치를 알려주는 노드 타입 포인터, 두번째 인자로 삽입할 노드를 받는다.
{:.note title="attention"}

* InsertAfter() 구현

```c
void SLL_InsertAfter(Node* Current, Node* NewNode)
{
    NewNode->NextNode = Current->NextNode;
    Current->NextNode = NewNode;
}
```

&nbsp;&nbsp;먼저 새로 삽입된 노드의 다음 노드로 현재 노드와 연결된 다음 노드를 대입하고,
그 후 현재 노드의 다음 노드를 새로 삽입된 노드로 대입하는 과정이다. 주의 할 점은 이런 대입 순서를 바꾸게 되면 제대로 동작하지 않는다는 것이다.
만일 현재 노드의 다음 노드를 교체하는 작업부터 하게 된다면 **새로 삽입된 노드의 다음 노드에 대입할 다음 노드를 찾을 수가 없다.**

### 노드 Counting

> List가 가지는 Node의 수를 알기 위해서는 Head부터 Tail까지 한 번씩 순회하면서 카운팅해야한다.
{:.note title="attention"}

* GetNodeCount() 구현

```c
int SLL_GetNodeCount(Node* Head)
{
    unsigned int Count = 0;
    Node* Current = Head;

    while(Current != NULL)
    {
        Current = Current->NextNode;
        Count++;
    }

    return Count;
}
```

&nbsp;&nbsp;여기서 while의 조건문인 `Current != NULL`에서 `Current->NextNode != NULL`이 아닌 이유는 List에 있는 Node가 Head뿐일 때를 생각해보면 바로 알 수 있다.
List에 Node가 Head뿐일 경우 Head의 NextNode는 NULL이며, 이로 인해 while문은 실행되지 않고 바로 Count를 return하게 된다.  
그렇게 되면 Count는 0을 return하게 되므로 반례가 된다.

## 모듈화

### LinkedList.h

```c
#ifndef LINKEDLIST_H
#define LINKEDLIST_H

#include <stdio.h>
#include <stdlib.h>

typedef int ElementType;

typedef struct tagNode
{
    ElementType Data;
    struct tagNode* NextNode;
} Node;

// 원형선언
Node* SLL_CreateNode(ElementType NewData);
void SLL_DestroyNode(Node* Node);
void SLL_AppendNode(Node** Head, Node* NewNode);
void SLL_InsertAfter(Node* Current, Node* NewNode);
void SLL_InsertNewHead(Node** Head, Node* NewHead);
void SLL_RemoveNode(Node** Head, Node* Remove);
Node* SLL_GetNodeAt(Node* Head, int Location);
int SLL_GetNodeCount(Node* Head);

#endif
```

### LinkedList.c

```c
#include "LinkedList.h"

// 노드 생성
Node* SLL_CreateNode(ElementType NewData)
{
    Node* NewNode = (Node*)malloc(sizeof(Node));

    NewNode->Data = NewData;
    NewNode->NextNode = NULL;

    return NewNode;
}

// 노드 소멸
void SLL_DestroyNode(Node* Node)
{
    free(Node);
}

// 노드 추가
void SLL_AppendNode(Node** Head, Node* NewNode)
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
    }
}

// 노드 삽입
void SLL_InsertAfter(Node* Current, Node* NewNode)
{
    NewNode->NextNode = Current->NextNode;
    Current->NextNode = NewNode;
}

void SLL_InsertNewHead(Node** Head, Node* NewHead)
{
    if(*Head == NULL)
    {
        *Head = NewHead;
    }
    else
    {
        NewHead->NextNode = *Head;
        *Head = NewHead;
    }
}

// 노드 제거
void SLL_RemoveNode(Node** Head, Node* Remove)
{
    // Head가 삭제하려는 노드일 경우
    // Head를 다음 노드로 변경
    if (*Head == Remove)
    {
        *Head = Remove->NextNode;
    }
    else
    {
        Node* Current = *Head;
        // Current의 NextNode가 Remove와 같을 때까지 반복
        while(Current != NULL && Current->NextNode != Remove)
        {
            Current = Current->NextNode;
        }

        // Current가 NULL이 아니면 Current의 다음 노드를 삭제하려는 노드의 다음 노드로 변경
        if(Current != NULL)
        {
            Current->NextNode = Remove->NextNode;
        }
    }
}

// 노드 탐색
Node* SLL_GetNodeAt(Node* Head, int Location)
{
    Node* Current = Head;

    while ( Current != NULL && (--Location) >= 0)
    {
        Current = Current->NextNode;
    }

    return Current;
}

// 노드 Counting
int SLL_GetNodeCount(Node* Head)
{
    unsigned int Count = 0;
    Node* Current = Head;

    while(Current != NULL)
    {
        Current = Current->NextNode;
        Count++;
    }

    return Count;
}
```

### Test_LinkedList.c

```c
#include "LinkedList.h"

int main(void)
{
    int i = 0;
    int Count = 0;
    Node* List = NULL;
    Node* Current = NULL;
    Node* NewNode = NULL;

    // 리스트 추가
    for ( i = 0; i < 5; i++)
    {
        NewNode = SLL_CreateNode(i);
        SLL_AppendNode(&List, NewNode);
    }

    // InsertHead
    NewNode = SLL_CreateNode(-1);
    SLL_InsertNewHead(&List, NewNode);

    NewNode = SLL_CreateNode(-2);
    SLL_InsertNewHead(&List, NewNode);

    // 리스트 출력
    Count = SLL_GetNodeCount(List);
    for (i = 0; i < Count; i++)
    {
        Current = SLL_GetNodeAt(List, i);
        printf("List[%d] : %d\n", i, Current->Data);
    }

    // 3번째 노드 뒤에 새 노드 삽입
    printf("\nInsert 1000 After [2]...\n\n");

    Current = SLL_GetNodeAt(List, 2);
    NewNode = SLL_CreateNode(1000);

    SLL_InsertAfter(Current, NewNode);

    // 출력
    Count = SLL_GetNodeCount(List);
    for (i = 0; i < Count; i++)
    {
        Current = SLL_GetNodeAt(List, i);
        printf("List[%d] : %d\n", i, Current->Data);
    }

    // 모든 노드 제거
    printf("\nDestroy List...\n\n");

    for (i = 0; i < Count; i++)
    {
        Current = SLL_GetNodeAt(List, 0);

        if (Current != NULL)
        {
            SLL_RemoveNode(&List, Current);
            SLL_DestroyNode(Current);
        }
    }

    return 0;
}

// 실행결과
List[0] : -2
List[1] : -1
List[2] : 0
List[3] : 1
List[4] : 2
List[5] : 3
List[6] : 4

Insert 1000 After [2]...

List[0] : -2
List[1] : -1
List[2] : 0
List[3] : 1000
List[4] : 1
List[5] : 2
List[6] : 3
List[7] : 4

Destroy List...
```

---

> Linked List에 대해서 알아보고 실제로 C언어로 구현하는 것 까지 알아보았다. 이후에는 한 방향으로만 연결되어있는 LinkedList가 아닌
> 양방향, 환형으로 연결된 List의 구현까지 포스팅 할 예정이다.  
> 사실 위의 Single Linked List도 개선의 여지가 있는 것 같다. 예를들자면 Node의 개수를 알아보기위해서는 무조건 Head부터 Tail까지 순회해야한 다는 것,
> List에서 Node를 제거할 때 바로 메모리에서 소멸시키는 것, 따로 출력하는 함수를 만들어 사용하는 것 등이 있을 수 있다.  
> 이에 대해서는 나중에 따로 포스팅 해보려 한다.
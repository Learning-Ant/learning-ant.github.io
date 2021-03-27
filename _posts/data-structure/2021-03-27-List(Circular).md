---
layout: post
title: Circular Linked List
description: >
  환형 링크드 리스트
hide_description: true
sitemap: false
date: 2021-03-27 13:16:00 +0900
category: data-structure
tag: [List,c]
---

# 환형 링크드 리스트(Circular Linked List)

> `Circular Linked List`는 환형으로 연결된 리스트라는 의미로, 헤드와 테일이 연결된 리스트이다.
{:.note title="attention"}

## Circular Linked List

### Node 구조체의 변경

> 우리는 앞서 간단하게 어떤 노드는 데이터 하나와 다음 노드에 대한 정보만 가지고 있거나, 이전 노드의 정보까지 가지고 있었다.  
> 이는 노드의 개수를 Counting할 때 Head부터 Tail까지 한 번 탐색을 해야하는 비효율성을 가지고 있었다. 이 포스팅에서 이에 대한 개선방향을 제시하고 구현해보려한다.
{:.note title="attention"}

```c
typedef int ElementType;
typedef struct tagNode
{
    ElementType Data;
    struct tagNode* PrevNode;
    struct tagNode* NextNode;
} Node;
typedef struct circularLinkedList
{
    Node* Head;
    int count;
} List;
```

&nbsp;&nbsp;기존에는 Node만으로 구조체를 구성했지만 따로 List구조를 정의하고 그 안에 멤버변수로 Head노드와 노드의 개수를 저장할 count 멤버변수를 선언했다.

### 리스트에 노드 추가

> 앞에서는 노드를 생성한 후 기존에 존재하던 노드에 연결하여 List로 보이도록 했었다. 이번에는 실제로 List를 구현하고 노드를 바로 생성하여 List 구조체에 추가하는 방법으로 진행해보려 한다.
{:.note title="attention"}

```c
void CLL_AppendNode(List* list, ElementType NewData)
{
    Node* NewNode = (Node*)malloc(sizeof(Node));
    NewNode->Data = NewData;

    if(list->Head == NULL)
    {
        list->Head = NewNode;
        // 환형 링크드 리스트는 Head와 Tail이 연결되어있다.
        list->Head->NextNode = list->Head;
        list->Head->PrevNode = list->Head;

        list->count++;
    }
    else
    {
        // Tail Node는 Head의 이전 노드이다.
        Node* Tail = list->Head->PrevNode;
        // 새로운 노드와 Head, Tail 연결
        Tail->NextNode = NewNode;
        NewNode->NextNode = list->Head;
        list->Head->PrevNode = NewNode;
        NewNode->PrevNode = Tail;

        list->count++;
    }
}
```

&nbsp;&nbsp;리스트에 노드를 추가하는 과정에서 Node가 새로 추가 되었으니 list의 멤버변수인 count의 값을 하나 올려준다. 여기서 특이한 점은 환형으로 이루어져 있다보니 Head의 이전 노드가 Tail이라는 점이고, 그렇기 때문에 list에 Head만 있을 경우 Head가 Head이자 Tail이 된다. 추가적으로 Tail뒤에 Node를 추가해 줄 때는 추가된 노드의 다음 노드는 Head인 것, 이전 노드는 Tail인 것을 명심해야한다.

### 리스트에 노드 삽입과 제거

> 노드의 삽입은 Double Linked List와 별반 차이가 없을 것이다. 다만 list의 count변수가 있으므로 삽입 시에 이를 +1 해주어야 한다는 점만 명심하면 된다.  
> 다만 제거에서는 이번엔 바로 메모리 할당을 소멸시키는 방법으로 구현할 것이다.
{:.note title="attention"}

* InsertAfter() 구현

```c
void CLL_InsertAfter(List* list, ElementType NewData, int Location)
{
    if(Location == list->count)
    {
        CLL_AppendNode(list, NewData);
    }
    else
    {
        Node* NewNode = (Node*)malloc(sizeof(Node));
        NewNode->Data = NewData;

        Node* Current = list->Head;
        if(Location < 0)
        {
            while((++Location) <= 0)
                Current = Current->PrevNode;
        }
        else
        {
            while((--Location) >= 0)
                Current = Current->NextNode;
        }
        
        Current->NextNode->PrevNode = NewNode;
        NewNode->NextNode = Current->NextNode;
        Current->NextNode = NewNode;
        NewNode->PrevNode = Current;
        list->count++;
    }
}
```

&nbsp;&nbsp;환형의 특성을 이용해 원하는 위치가 음수일 경우도 고려하여 음수일 경우엔 역방향으로 탐색하고, 양수일 경우엔 정방향으로 탐색하여 새로운 노드를 추가한다. 또한, Location이 현재 노드의 개수와 같을경우는 Tail뒤에 추가하는 것이므로 미리 만들어둔 `CLL_AppendNode()`함수를 호출하여 추가했다.

* RemoveNode() 구현

```c
void CLL_RemoveNode(List* list, Node* Remove)
{
    if(list->Head == Remove)
    {
        Node* Tail = list->Head->PrevNode;
        Tail->NextNode = Remove->NextNode;
        Remove->NextNode->PrevNode = Tail;

        list->Head = Remove->NextNode;

        free(Remove);
        list->count--;
    }
    else
    {
        Remove->PrevNode->NextNode = Remove->NextNode;
        Remove->NextNode->PrevNode = Remove->PrevNode;

        free(Remove);
        list->count--;
    }
}
```

&nbsp;&nbsp;list에서 노드를 삭제하자마자 메모리 할당 역시 소멸시켜주었다. RemoveNode()함수에서 받는 인자가 Node* 인데 삭제할 Node*를 반환하는 탐색 함수를 만들어 주어 삭제할 수 있도록 한다.

### 노드 탐색

* GetNodeAt() 구현

```c
Node* CLL_GetNodeAt(List* list, int Location)
{
    Node* Current = list->Head;

    if(Location < 0)
    {
        while((++Location) <= 0)
            Current = Current->PrevNode;
    }
    else
    {
        while((--Location) >= 0)
            Current = Current->NextNode;
    }
    return Current;
}
```

### list 출력

* PrintList() 구현

```c
void PrintList(List* list)
{
    int i;
    if(list->count == 0)
    {
        printf("Node가 없습니다");
    }
    else
    {
        Node* Current = list->Head;
        for(i = 0; i < list->count; i++)
        {
            printf("List[%d] : %d\n", i, Current->Data);
            Current = Current->NextNode;
        }
    }
}
```

## 모듈화

### CircularLinkedList.h

```c
#ifndef CIRCULAR_LINKEDLIST_H
#define CIRCULAR_LINKEDLIST_H

#include <stdio.h>
#include <stdlib.h>

typedef int ElementType;
typedef struct tagNode
{
    ElementType Data;
    struct tagNode* PrevNode;
    struct tagNode* NextNode;
} Node;
typedef struct circularLinkedList
{
    Node* Head;
    int count;
} List;

// 함수 원형 선언
List* CLL_CreateList();
void CLL_AppendNode(List* list, ElementType NewData);
void CLL_InsertAfter(List* list, ElementType NewData, int Location);
void CLL_RemoveNode(List* list, Node* Remove);
Node* CLL_GetNodeAt(List* list, int Location);
void PrintList(List* list);

#endif
```

### CircularLinkedList.c

```c
#include "CircularLinkedList.h"

List* CLL_CreateList()
{
    List* list = (List*)malloc(sizeof(List));
    list->Head = NULL;
    list->count = 0;
    return list;
}

// 노드 추가
void CLL_AppendNode(List* list, ElementType NewData)
{
    Node* NewNode = (Node*)malloc(sizeof(Node));
    NewNode->Data = NewData;

    if(list->Head == NULL)
    {
        list->Head = NewNode;
        // 환형 링크드 리스트는 Head와 Tail이 연결되어있다.
        list->Head->NextNode = list->Head;
        list->Head->PrevNode = list->Head;

        list->count++;
    }
    else
    {
        // Tail Node는 Head의 이전 노드이다.
        Node* Tail = list->Head->PrevNode;
        // 새로운 노드와 Head, Tail 연결
        Tail->NextNode = NewNode;
        NewNode->NextNode = list->Head;
        list->Head->PrevNode = NewNode;
        NewNode->PrevNode = Tail;

        list->count++;
    }
}

// 노드 삽입
void CLL_InsertAfter(List* list, ElementType NewData, int Location)
{
    if(Location == list->count)
    {
        CLL_AppendNode(list, NewData);
    }
    else
    {
        Node* NewNode = (Node*)malloc(sizeof(Node));
        NewNode->Data = NewData;

        Node* Current = list->Head;
        if(Location < 0)
        {
            while((++Location) <= 0)
                Current = Current->PrevNode;
        }
        else
        {
            while((--Location) >= 0)
                Current = Current->NextNode;
        }

        Current->NextNode->PrevNode = NewNode;
        NewNode->NextNode = Current->NextNode;
        Current->NextNode = NewNode;
        NewNode->PrevNode = Current;
        list->count++;
    }
}

// 노드 삭제
void CLL_RemoveNode(List* list, Node* Remove)
{
    if(list->Head == Remove)
    {
        Node* Tail = list->Head->PrevNode;
        Tail->NextNode = Remove->NextNode;
        Remove->NextNode->PrevNode = Tail;

        list->Head = Remove->NextNode;

        free(Remove);
        list->count--;
    }
    else
    {
        Remove->PrevNode->NextNode = Remove->NextNode;
        Remove->NextNode->PrevNode = Remove->PrevNode;

        free(Remove);
        list->count--;
    }
}

// 노드 탐색
Node* CLL_GetNodeAt(List* list, int Location)
{
    Node* Current = list->Head;

    if(Location < 0)
    {
        while((++Location) <= 0)
            Current = Current->PrevNode;
    }
    else
    {
        while((--Location) >= 0)
            Current = Current->NextNode;
    }
    return Current;
}

// list 출력
void PrintList(List* list)
{
    int i;
    if(list->count == 0)
    {
        printf("Node가 없습니다");
    }
    else
    {
        Node* Current = list->Head;
        for(i = 0; i < list->count; i++)
        {
            printf("List[%d] : %d\n", i, Current->Data);
            Current = Current->NextNode;
        }
    }
}
```

### Test_CircularLinkedList.c

```c
#include "CircularLinkedList.h"

int main(void)
{
    int i;
    List* list = CLL_CreateList();
    for(i = 0; i < 5; i++)
    {
        CLL_AppendNode(list, i);
    }

    PrintList(list);
    printf("---------\n");

    CLL_InsertAfter(list, 6, list->count);
    CLL_InsertAfter(list, 1000, 2);
    CLL_InsertAfter(list, 8, list->count);

    PrintList(list);
    printf("---------\n");

    Node* Remove = CLL_GetNodeAt(list, 3);

    CLL_RemoveNode(list, Remove);

    PrintList(list);
    printf("---------\n");


    // 순환
    Node* Current = list->Head;
    for(i = 0; i<list->count*2; i++)
    {
        printf("List[%d] : %d\n", i, Current->Data);
        Current = Current->NextNode;
    }
    printf("---------\n");

    Current = CLL_GetNodeAt(list, -1);
    printf("List[-1] = %d\n", Current->Data);
    Current = CLL_GetNodeAt(list, -2);
    printf("List[-2] = %d\n", Current->Data);
    Current = CLL_GetNodeAt(list, -3);
    printf("List[-3] = %d\n", Current->Data);
    printf("---------\n");

    printf("list count : %d\n", list->count);

    return 0;
}



// 실행결과
List[0] : 0
List[1] : 1
List[2] : 2
List[3] : 3
List[4] : 4
---------
List[0] : 0
List[1] : 1
List[2] : 2
List[3] : 1000
List[4] : 3
List[5] : 4
List[6] : 6
List[7] : 8
---------
List[0] : 0
List[1] : 1
List[2] : 2
List[3] : 3
List[4] : 4
List[5] : 6
List[6] : 8
---------
List[0] : 0
List[1] : 1
List[2] : 2
List[3] : 3
List[4] : 4
List[5] : 6
List[6] : 8
List[7] : 0
List[8] : 1
List[9] : 2
List[10] : 3
List[11] : 4
List[12] : 6
List[13] : 8
---------
List[-1] = 8
List[-2] = 6
List[-3] = 4
---------
list count : 7
```

&nbsp;&nbsp;실행결과를 보면 의도대로 모두 잘 구현되었음을 알 수 있다. 음수 인덱싱도 가능하고, 순환 역시 이상없이 동작한다.

---

> 이렇게 List의 구현을 모두 해보았다. 구현하면 할 수록 개선의 여지가 보인다. 예를들면, 출력하는 함수인 PrintList()에 옵션 매개변수를 받아 출력하는 방향을 정한다던지, 가진 Data가 무엇인지 검색하는 함수 등등 후에 시간이 허락하면 추가적으로 만들어 보는 것도 나쁘지 않을 것 같다.


---
layout: post
title: 이진 탐색 트리
description: >
  Binary Search Tree
hide_description: false
sitemap: false
date: 2021-04-06 21:43:00 +0900
category: algorithm
tag: [search]
---

# 이진 탐색 트리(Binary Search Tree)

> 앞서 이진 탐색에 대해서 포스팅했었다. 오늘 포스팅할 내용은 **이진 탐색을 위한 트리**에 대한 것이다. 이진 탐색에 대한 내용을 소개하고, 실제로 구현해본 후 그 결과가 어떻게 나오는지 알아본다.
{:.note title="attention"}

## 이진 탐색 트리의 구현

> 왜 굳이 트리로 구현해야할까? 이진 탐색은 배열일 때만 사용할 수 있다. 데이터 집합의 크기가 얼마인지 알아야하고, 그 중앙에 있는 값의 위치를 바로 알아야하기 때문에 배열에 최적화 되어 있다.
> 그렇다면 이진 탐색 트리는 어떤 식으로 구성되어있을지 생각해보자. 아마 `이진`이라는 단어에서 자식노드는 최대 2개인 것은 눈치 챘을 것이다.
> 여기에 추가적인 룰이 하나 있는데 그것이 <u>"왼쪽 자식 노드는 자신보다 작고, 오른쪽 자식 노드는 자신보다 크다."</u>는 것이다.
{:.note title="attention"}

### 이진 탐색 트리의 기본 연산

> 당연히 가장 기본적으로 필요한 연산은 **탐색** 일 것이다. 그렇기에 먼저 탐색연산을 수행하는 함수부터 구현한다.  
> 또한, 위의 법칙을 만족하는 이진 탐색트리를 완성하기 위해서는 기존의 알아봤던 트리 자료구조의 삽입과 삭제 연산에서 추가적인 로직이 필요하다.  
> 이는 탐색연산부터 구현한 뒤 구현해보도록 한다.
{:.note title="attention"}

* SearchNode() 구현
    * 구현에 앞서 이진탐색트리의 법칙인 "왼쪽 자식은 자신보다 작고, 오른쪽 자식은 자신보다 크다"는 것을 상기하자.

```c
Node* SearchNode(Node* Tree, ElementType Target)
{
    if(Tree == NULL)
        return NULL;
    // 목표값과 현재 노드의 값을 비교하고, 작으면 왼쪽으로, 크면 오른쪽으로 이동한다.
    if(Tree->Data == Target)
        return Tree;
    else if (Tree->Data > Target)
        return SearchNode(Tree->Left, Target);
    else
        return SearchNode(Tree->Right, Target);
}
```

* InsertNode() 구현
    * 법칙을 지키기위해 비교연산을 수행해 자리를 찾아가야한다.

```c
void InsertNode(Node** Tree, Node* Child)
{
    if( (*Tree)->Data < Child->Data)
    {
        if( (*Tree)->Right == NULL)
            (*Tree)->Right = Child;
        else
            InsertNode(&(*Tree)->Right, Child);
    }
    else if ( (*Tree)->Data > Child->Data)
    {
        if( (*Tree)->Left == NULL)
            (*Tree)->Left = Child;
        else
            InsertNode(&(*Tree)->Left, Child);
    }
}
```

* RemoveNode()
    * 노드를 삭제하는 기능을 구현하는 것은 복잡하다. 먼저 세 가지 경우를 생각해보자.
        1. 삭제할 노드가 리프(잎) 노드인 경우(자식 노드를 가지지 않는 경우)
        2. 삭제할 노드가 하나의 자식 노드만 가지는 경우
        3. 삭제할 노드가 양쪽 자식 노드 모두를 가지는 경우

1️⃣ 삭제할 노드가 리프(잎) 노드인 경우(자식 노드를 가지지 않는 경우)

    > 이 경우는 기존의 트리처럼 삭제해주면 된다. 자식이 없으므로 새로 연결해 줄 노드가 없다.

2️⃣ 삭제할 노드가 하나의 자식 노드만 가지는 경우

    > 이 경우는 일단 삭제될 노드의 자식을 삭제될 노드의 부모한테 연결하면 된다.  
    > 삭제될 노드가 부모의 오른쪽이라면 부모노드의 오른쪽 노드로 연결하고, 왼쪽이라면 왼쪽 노드로 연결하면 간단히 구현이 된다.

    ![insertnode](/assets/img/algorithm/binary_search_tree.png)
    {:.lead loading="lazy" align="center"}

    간단하게 구현이 가능하다.
    {:.figcaption}

3️⃣ 삭제할 노드가 양쪽 자식 노드 모두를 가지는 경우

    > 이 경우가 가장 복잡하다.  
    > 일단 삭제될 노드(노드 A)를 찾고, 그 오른쪽 트리에서 가장 작은 값을 가지고 있는 노드(노드 B)를 찾는다.  
    > 노드 B를 노드 A의 위치에 넣어준다.  
    > 여기서 조금 생각을 해봐야한다. 우리는 이미 앞에서 하나인 경우와 둘인 경우의 구현이 끝난 것이다.  
    > 이제 이 함수들을 이용해 재귀적 호출이 필요하다.  
    > 노드 B 역시 자식이 없을 수도, 하나일 수도, 두 개일 수도 있기 때문이다.
    > 먼저 그림으로 보고 실제 구현 코드를 살펴보자.

    ![insertnode](/assets/img/algorithm/binary_search_tree2.png)
    {:.lead loading="lazy" align="center"}

    그림에는 노드 B의 자식이 하나뿐이지만 코드상으로는 재귀적으로 삭제함수를 호출함으로써 모든 경우에 적용될 수 있도록 한다.
    {:.figcaption}
    
* 구현

```c
Node* RemoveNode(Node* Tree, Node* Parent, ElementType Target)
{
    Node* Removed = NULL;

    if(Tree == NULL)
        return NULL;

    if(Tree->Data > Target)
        Removed = RemoveNode(Tree->Left, Tree, Target);
    else if (Tree->Data < Target)
        Removed = RemoveNode(Tree->Right, Tree, Target);
    else // 목표값 발견
    {
        Removed = Tree;

        // 잎 노드 인 경우
        if(Tree->Left == NULL && Tree->Right == NULL)
        {
            if(Parent->Left == Tree)
                Parent->Left = NULL;
            else
                Parent->Right = NULL;
        }
        else
        {
            // 두개의 자식노드를 가지는 경우
            if(Tree->Left != NULL && Tree->Right != NULL)
            {
                // 오른쪽 트리에서 최소값을 가지는 노드 탐색
                // 그 후 데이터값 변경
                Node* MinNode = SearchMinNode(Tree->Right);
                Removed = RemoveNode(Tree, NULL, MinNode->Data);
                Tree->Data = MinNode->Data;
            }
            else    // 하나의 자식노드를 가지는 경우
            {
                Node* Temp = NULL;
                if(Tree->Left != NULL)
                    Temp = Tree->Left;
                else
                    Temp = Tree->Right;

                if(Parent->Left == Tree)
                    Parent->Left = Temp;
                else
                    Parent->Right = Temp;
            }
        }
    }
    return Removed;
}
```

## 모듈화

### BinarySearchTree.h

```c
#ifndef BINARY_SEARCH_TREE_H
#define BINARY_SEARCH_TREE_H

#include <stdio.h>
#include <stdlib.h>

typedef int ElementType;

typedef struct tagNode{
    struct tagNode* Left;
    struct tagNode* Right;

    ElementType Data;
} Node;

Node* CreateNode(ElementType NewData);
void DestroyNode(Node* Node);
void DestroyTree(Node* Tree);
Node* SearchNode(Node* Tree, ElementType Target);
Node* SearchMinNode(Node* Tree);
void InsertNode(Node* Tree, Node* Child);
Node* RemoveNode(Node* Tree, Node* Parent, ElementType Target);
void InorderPrintTree(Node* Node);

#endif
```

### BinarySearchTree.c

```c

#include "BinarySearchTree.h"
Node* CreateNode(ElementType NewData)
{
    Node* NewNode = (Node*)malloc(sizeof(Node));
    NewNode->Left = NULL;
    NewNode->Right = NULL;
    NewNode->Data = NewData;

    return NewNode;
}

void DestroyNode(Node* Node)
{
    free(Node);
}

void DestroyTree(Node* Tree)
{
    if(Tree->Right != NULL)
        DestroyTree(Tree->Right);

    if(Tree->Left != NULL)
        DestroyTree(Tree->Left);

    Tree->Left = NULL;
    Tree->Right = NULL;

    DestroyNode(Tree);
}

Node* SearchNode(Node* Tree, ElementType Target)
{
    if(Tree == NULL)
        return NULL;

    if(Tree->Data == Target)
        return Tree;
    else if(Tree->Data > Target)
        return SearchNode(Tree->Left, Target);
    else
        return SearchNode(Tree->Right, Target);
}

Node* SearchMinNode(Node* Tree)
{
    if(Tree == NULL)
        return NULL;

    if(Tree->Left == NULL)
        return Tree;
    else
        return SearchMinNode(Tree->Left);
}

void InsertNode(Node* Tree, Node* Child)
{
    if(Tree->Data < Child->Data)
    {
        if(Tree->Right == NULL)
            Tree->Right = Child;
        else
            InsertNode(Tree->Right, Child);
    }
    else if(Tree->Data > Child->Data)
    {
        if(Tree->Left == NULL)
            Tree->Left = Child;
        else
            InsertNode(Tree->Left, Child);
    }
}

Node* RemoveNode(Node* Tree, Node* Parent, ElementType Target)
{
    Node* Removed = NULL;

    if(Tree == NULL)
        return NULL;

    if(Tree->Data > Target)
        Removed = RemoveNode(Tree->Left, Tree, Target);
    else if(Tree->Data < Target)
        Removed = RemoveNode(Tree->Right, Tree, Target);
    else
    {
        Removed = Tree;

        if(Tree->Left == NULL && Tree->Right == NULL)
        {
            if(Parent->Left == Tree)
                Parent->Left = NULL;
            else
                Parent->Right = NULL;
        }
        else
        {
            if(Tree->Left != NULL && Tree->Right != NULL)
            {
                Node* MinNode = SearchMinNode(Tree->Right);
                MinNode = RemoveNode(Tree, NULL, MinNode->Data);
                Tree->Data = MinNode->Data;
            }
            else
            {
                Node* Temp = NULL;
                if(Tree->Left != NULL)
                    Temp = Tree->Left;
                else
                    Temp = Tree->Right;

                if(Parent->Left == Tree)
                    Parent->Left = Temp;
                else
                    Parent->Right = Temp;
            }
        }
    }
    return Removed;
}

void InorderPrintTree(Node* Node)
{
    if(Node == NULL)
        return;

    InorderPrintTree(Node->Left);

    printf("%d ", Node->Data);

    InorderPrintTree(Node->Right);
}
```

### Test_BinarySearchTree.c

```c
#include "BinarySearchTree.h"

int main(void)
{
    Node* Tree = CreateNode(123);
    Node* Node = NULL;

    InsertNode(Tree, CreateNode(22));
    InsertNode(Tree, CreateNode(9128));
    InsertNode(Tree, CreateNode(34));
    InsertNode(Tree, CreateNode(47));
    InsertNode(Tree, CreateNode(678));
    InsertNode(Tree, CreateNode(54));
    InsertNode(Tree, CreateNode(234));
    InsertNode(Tree, CreateNode(76));
    InsertNode(Tree, CreateNode(562));
    InsertNode(Tree, CreateNode(1));

    InorderPrintTree(Tree);
    printf("\n");

    Node = RemoveNode(Tree, NULL, 234);
    DestroyNode(Node);

    InorderPrintTree(Tree);
    printf("\n");

    InsertNode(Tree,CreateNode(982));
    InorderPrintTree(Tree);
    printf("\n");

    DestroyTree(Tree);
    return 0;
}

// 실행결과
1 22 34 47 54 76 123 234 562 678 9128
1 22 34 47 54 76 123 562 678 9128
1 22 34 47 54 76 123 562 678 982 9128
```

---

> 이진탐색트리에 대해 포스팅했다.  
> 하지만 이 이진탐색트리에는 가지가 한쪽으로만 쭉 뻗을 수 있는 치명적인 결점이 있다. 실제로 트리를 생성하고 순차적으로 작은 값을 가지는 노드를 생성하여 추가하게되면 왼쪽으로만 쭉 뻗어 결과적으로 탐색의 효율을 떨어뜨리게 된다.  
> 다음 포스팅에서 이를 보완한 레드 블랙 트리에 대해서 알아보도록 하겠다.
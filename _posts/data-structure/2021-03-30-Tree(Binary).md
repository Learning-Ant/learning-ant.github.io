---
layout: post
title: Binary Tree
description: >
  이진 트리
hide_description: true
sitemap: false
date: 2021-03-30 21:34:00 +0900
category: data-structure
tag: [tree,c]
---

# 이진 트리

> `이진 트리(Binary Tree)`란 자식 노드를 최대 2개까지만 가질 수 있는 트리이다. 일반 트리보다는 실제 데이터를 다루기에는 적절하지 않은 형태를 가지고 있지만, 이런 이진트리를 기반으로 하는 알고리즘들이 많이 개발되어있다.  
Ex> 수식 이진 트리, 이진 탐색 트리
{:.note title="attention"}

## 이진 트리의 여러 형태

### 포화 이진 트리

> 모든 노드들이 2개의 자식 노드들을 가지고 있고, 그 마지막 리프트리들이 모두 같은 깊이에 존재하는 트리
{:.note title="attention"}

![포화 이진 트리](/assets/img/data-structure/full_binary_tree.png)
{:.lead loading="lazy" align="center"}

포화 이진 트리
{:.figcaption}

### 완전 이진 트리

> 포화 이진 트리를 이루기 전 단계들의 트리를 `완전 이진 트리`라고 한다.
{:.note title="attention"}

![완전 이진 트리](/assets/img/data-structure/complete_binary_tree.png)
{:.lead loading="lazy" align="center"}

완전 이진 트리
{:.figcaption}

> 다음 트리는 중간에 리프노드가 하나 누락되어있다. 이런 트리는 완전 이진 트리가 아니다.

![이진 트리](/assets/img/data-structure/binary_tree.png)
{:.lead loading="lazy" align="center"}

중간에 노드가 빠져있다면 완전 이진 트리가 될 수 없다.
{:.figcaption}

## 이진 트리의 순회

> 이진 트리를 순회하는 몇 가지 규칙이 있다. 이진 트리 내부를 돌아다니며 효율적인 방법으로 원하는 데이터에 접근할 수 있는 방법을 제공한다.  
> 그 방법에 따라 세 가지로 나뉜다. 
> 1. 전위 순회(Preorder Traversal)
> 2. 중위 순회(Inorder Traversal)
> 3. 후위 순회(Postorder Traversal)
{:.note title="attention"}

### 전위 순회

> 루트 노드부터 잎 노드까지 아래 방향으로 방문하는 순회방법이다.
{:.note title="attention"}

* 루트부터 시작해 왼쪽 하위트리 -> 오른쪽 하위트리 순으로 방문하는 방식이다.

![전위 순회](/assets/img/data-structure/preorder_traversal.png)
{:.lead loading="lazy" align="center"}

전위 순회의 순서
{:.figcaption}

### 중위 순회

> 왼쪽 하위, 루트, 오른쪽 하위 트리 순으로 방문하는 방법이다. 이 방법의 대표적인 사례는 수식 트리(Expression Tree)이다.
{:.note title="attention"}

![중위 순회](/assets/img/data-structure/inorder_traversal.png)
{:.lead loading="lazy" align="center"}

중위 순회의 순서
{:.figcaption}

### 후위 순회

> 왼쪽 하위트리, 오른쪽 하위트리, 루트 순으로 방문하는 방법이다.

![후위 순회](/assets/img/data-structure/postorder_traversal.png)
{:.lead loading="lazy" align="center"}

후위 순회의 순서
{:.figcaption}

## 이진 트리의 구현

### 노드 구조체 구현

> 
{:note title="attention"}

* 노드 구조체 구현

```c
typedef char ElementType;

typedef struct tagSBTNode
{
  struct tagSBTNode* Left;
  struct tagSBTNode* Right;

  ElementType Data;
} SBTNode;
```

### 노드의 생성과 소멸

* CreateNode() 구현

```c
SBTNode* SBT_CreateNode(ElementType NewData)
{
  SBTNode* NewNode = (SBTNode*)malloc(sizeof(SBTNode));
  NewNode->Left = NULL;
  NewNode->Right = NULL;
  NewNode->Data = NewData;

  return NewNode;
}
```

* DestroyNode() 구현

```c
void SBT_DestroyNode(SBTNode* Node)
{
  free(Node);
}
```

### 이진 트리의 출력

> 앞서 알아본 순회방법 별로 출력 함수를 구현해본다.  
> `printf`함수의 순서를 유심히 보도록 하자.
{:.note title="attention"}

* 전위 순회를 응용한 출력

```c
void SBT_PreorderPrintTree(SBTNode* Node)
{
  if(Node == NULL)
    return;
  
  // 루트노드
  printf(" %c", Node->Data);

  // 왼쪽 하위 트리
  SBT_PreorderPrintTree(Node->Left);

  // 오른쪽 하위 트리
  SBT_PreorderPrintTree(Node->Right);
}
```

* 중위 순회를 응용한 출력

```c
void SBT_InorderPrintTree(SBTNode* Node)
{
  if(Node == NULL)
    return;
  
  // 왼쪽 하위 트리
  SBT_InorderPrintTree(Node->Left);

  // 루트노드
  printf(" %c", Node->Data);

  // 오른쪽 하위 트리
  SBT_InorderPrintTree(Node->Right);
}
```

* 후위 순회를 응용한 출력

```c
void SBT_PostorderPrintTree(SBTNode* Node)
{
  if(Node == NULL)
    return;

  // 왼쪽 하위 트리
  SBT_PostorderPrintTree(Node->Left);

  // 오른쪽 하위 트리
  SBT_PostorderPrintTree(Node->Right);

  // 루트노드
  printf(" %c", Node->Data);
}
```

### 트리의 소멸

> 트리의 소멸은 루트나 가지부터 소멸할 시 리프노드들의 위치를 알 수 없어지므로 리프노드부터 차례대로 소멸해야한다. 그러므로 가장 말단의 노드부터 순회하는 `후위 순회`방법을 응용해 소멸시켜준다.
{:.note title="attention"}

```c
void SBT_DestroyTree(SBTNode* Root)
{
  if(Root == NULL)
    return;

  SBT_DestroyTree(Root->Left);
  SBT_DestroyTree(Root->Right);
  SBT_DestroyNode(Root);
}
```

## 모듈화

### BinaryTree.h

```c
#ifndef BINARY_TREE_H
#define BINARY_TREE_H

#include <stdio.h>
#include <stdlib.h>

typedef char ElementType;
typedef struct tagSBTNode
{
  struct tagSBTNode* Left;
  struct tagSBTNode* Right;

  ElementType Data;
} SBTNode;

SBTNode* SBT_CreateNode(ElementType NewData);
void SBT_DestroyNode(SBTNode* Node);
void SBT_DestroyTree(SBTNode* Root);

void SBT_PreorderPrintTree(SBTNode* Node);
void SBT_InorderPrintTree(SBTNode* Node);
void SBT_PostorderPrintTree(SBTNode* Node);

#endif
```

### BinaryTree.c

```c
#include "BinaryTree.h"

SBTNode* SBT_CreateNode(ElementType NewData)
{
  SBTNode* NewNode = (SBTNode*)malloc(sizeof(SBTNode));
  NewNode->Left = NULL;
  NewNode->Right = NULL;
  NewNode->Data = NewData;

  return NewNode;
}

void SBT_DestroyNode(SBTNode* Node)
{
  free(Node);
}

void SBT_DestroyTree(SBTNode* Root)
{
  if(Root == NULL)
    return;

  SBT_DestroyTree(Root->Left);
  SBT_DestroyTree(Root->Right);
  SBT_DestroyNode(Root);
}

void SBT_PreorderPrintTree(SBTNode* Node)
{
  if(Node == NULL)
    return;

  printf(" %c", Node->Data);

  SBT_PreorderPrintTree(Node->Left);
  SBT_PreorderPrintTree(Node->Right);
}

void SBT_InorderPrintTree(SBTNode* Node)
{
  if(Node == NULL)
    return;

  SBT_InorderPrintTree(Node->Left);

  printf(" %c", Node->Data);

  SBT_InorderPrintTree(Node->Right);
}

void SBT_PostorderPrintTree(SBTNode* Node)
{
  if(Node == NULL)
    return;

    SBT_PostorderPrintTree(Node->Left);
    SBT_PostorderPrintTree(Node->Right);
    printf(" %c", Node->Data);
}
```

### Test_BinaryTree.c
```c
#include "BinaryTree.h"

int main(void)
{
  SBTNode* A = SBT_CreateNode('A');
  SBTNode* B = SBT_CreateNode('B');
  SBTNode* C = SBT_CreateNode('C');
  SBTNode* D = SBT_CreateNode('D');
  SBTNode* E = SBT_CreateNode('E');
  SBTNode* F = SBT_CreateNode('F');
  SBTNode* G = SBT_CreateNode('G');

  A->Left = B;
  B->Left = C;
  B->Right = D;

  A->Right = E;
  E->Left = F;
  E->Right = G;

  printf("전위순회\n");
  SBT_PreorderPrintTree(A);
  printf("\n\n");

  printf("중위순회\n");
  SBT_InorderPrintTree(A);
  printf("\n\n");

  printf("후위순회\n");
  SBT_PostorderPrintTree(A);
  printf("\n\n");

  SBT_DestroyTree(A);

  return 0;
}

// 실행결과
전위순회
 A B C D E F G

중위순회
 C B D A F E G

후위순회
 C D B F G E A
```
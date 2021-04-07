---
layout: post
title: 레드 블랙 트리
description: >
  Red Black Tree
hide_description: false
sitemap: false
date: 2021-04-07 18:43:00 +0900
category: algorithm
tag: [search]
---

# 레드 블랙 트리(Red Black Tree)

> 이전 포스팅에서 마지막에 이진탐색트리의 치명적인 결점에 대해 언급했다. 이를 보완해 시간복잡도를 logn으로 바인드 할 수 있도록 한 Tree 구조가 있다. 몇 가지 제한사항을 두고 Tree를 구성할 수 있게 함으로써 기형적인 구조가 되어 시간복잡도에 영향이 가지 않도록 한 것이다.
{:.note title="attention"}

## 레드 블랙 트리의 Rule

1. 모든 노드는 빨간색 아니면 검은색이다.
2. 루트 노드는 검은색이다.
3. 잎 노드는 검은색이다.
4. 빨간 노드의 자식들은 모두 검은색이다. 하지만 검은색 노드의 자식이 빨간색일 필요는 없다.
5. 루트 노드에서 모든 잎 노드 사이에 있는 검은색 노드의 수는 모두 동일하다.

&nbsp;&nbsp;기본적인 룰을 적어 봤지만 솔직히 글만 읽어서는 감이 오지 않는다. 레드블랙트리의 연산을 하나하나씩 파헤쳐가면서 그림과 함께 이해해보자.

## 레드 블랙 트리의 기본 연산

> 이진 탐색트리에서 구조가 무너지는 이유는 삽입과 삭제에 있다. 여기에 레드 블랙트리의 Rule을 적용해 삽입과 삭제의 로직을 조금씩 바꿔준다. 정확히는 삽입과 삭제 연산에서 그 후의 후처리를 Rule에 맞게 변경해 주는 것이다.
{:.note title="attention"}

### 회전

* 본격적으로 연산에 대해 들어가기 전에 <u>회전</u>이라는 개념을 알아본다.
* 회전에는 회전의 방향에 따라 우회전과 좌회전이 있다.
* 우회전 : 왼쪽 자식과 부모의 위치를 교환하는 것
* 좌회전 : 오른쪽 자식과 부모의 위치를 교환하는 것  
<br/>
1️⃣ 우회전

![우회전](/assets/img/algorithm/right_rotation.png)
{:.lead loading="lazy" align="center"}

왼쪽의 자식노드와 그 부모의 자리가 바뀐다.
{:.figcaption}

그림에서 보다시피 단순히 자리 교체만 일어난 것은 아니다. 자리교체만 했다면 이진 탐색 트리의 Rule인 <u>**`왼쪽노드는 자신보다 작고 오른쪽노드는 자신보다 크다`**</u>는 법칙에 위배된다. 따라서 그 후처리로 다음을 실행해 주어야한다.

1. 왼쪽 자식 노드의 오른쪽 자식 노드를 부모 노드의 왼쪽 자식으로 연결
    -> 이는 왼쪽 자식노드의 자식들은 그 부모보다 작은 데이터를 가지기 때문이다.
2. 그 후 자리를 교체해준다.

2️⃣ 좌회전

![좌회전](/assets/img/algorithm/left_rotation.png)
{:.lead loading="lazy" align="center"}

오른쪽의 자식노드와 그 부모의 자리가 바뀐다.
{:.figcaption}

좌회전 역시 우회전과 같은 이유로 후처리를 해주어야 한다. 글로 봤을때는 왼쪽노드와 자리교체를 하는데 우회전이라하여 살짝 이해하기가 쉽지 않지만 이처럼 그림에 화살표를 그려보면 보다 쉽게 이해할 수 있다.

* 회전 구현

```c
typedef struct tagNode
{
    struct tagNode* Parent;
    struct tagNode* Parent;
    struct tagNode* Parent;

    enum { RED, BLACK} Color;

    ElementType Data;
} Node;
// Nil은 아무 데이터도 가지고 있지 않고 리프노드인 검은색 더미 노드
void RotateRight(Node** Root, Node* Parent)
{
    Node* LeftChild = Parent->Left;
    
    // 왼쪽 자식노드의 오른쪽 자식노드를
    // 부모의 왼쪽 자식노드로 연결
    Parent->Left = LeftChild->Right;

    if(LeftChild->Right != Nil)
        LeftChild->Right->Parent = Parent;
    
    LeftChild->Parent = Parent->Parent;

    if(Parent->Parent == NULL)
        (*Root) = LeftChild;
    else
    {
        // Parent노드가 할아버지노드의 왼쪽이었으면 왼쪽에,
        // 오른쪽이었으면 오른쪽에 LeftChild를 연결한다.
        if(Parent == Parent->Parent->Left)
            Parent->Parent->Left = LeftChild;
        else
            Parent->Parent->Right = LeftChild;
    }
    LeftChild->Right = Parent;
    Parent->Parent = LeftChild;
}
``` 

### 레드 블랙 트리의 노드 삽입

> 노드의 삽입하기까지의 과정은 이진탐색트리와 그렇게 다를바가 없다. 하지만 중요한 것은 삽입한 후에 레드 블랙 트리의 규칙이 잘 지켜졌는지 확인하고, 적절한 후처리를 실시한다.
{:.note title="attention"}

* InsertNode() 구현

```c
void InsertNode(Node** Tree, Node* NewNode)
{
    // 노드삽입 수행
    InsertNodeHelper(Tree, NewNode);

    // 삽입한 노드 초기화(Nil은 검은색 리프 더미 노드)
    NewNode->Color = RED;
    NewNode->Left = Nil;
    NewNode->Right = Nil;

    // 레드 블랙 규칙 바로잡기
    RebuildAfterInsert(Tree, NewNode);
}
```

이제 여기서 후처리에 대해 진행해보도록 하자. 위의 코드에서는 RebuildAfterInsert()가 수행하는 로직이 후처리이다.

먼저 다시 규칙을 상기해보면
1. 모든 노드는 빨간색 아니면 검은색이다.
2. 루트 노드는 검은색이다.
3. 잎 노드는 검은색이다.
4. 빨간 노드의 자식들은 모두 검은색이다. 하지만 검은색 노드의 자식이 빨간색일 필요는 없다.
5. 루트 노드에서 모든 잎 노드 사이에 있는 검은색 노드의 수는 모두 동일하다.

여기서 1번은 무조건 만족한다.  
2번은 뒤처리가 간단하다.  
3번은 Nil노드로 이미 삽입할 때 만족한 조건이다.
삽입한 노드가 빨간색이고, 삽입될 때 그 자식들의 노드가 모두 검은색이므로 5번 역시 만족한다.  
<br/>
이제 따져봐야 할 조건은 하나만 남는다. 
4번인 <u>**빨간 노드의 자식들은 모두 검은색이다.**</u>이다. 이 조건에 위배된다는 것은 곧 삽입한 노드가 빨간색이니 삽입된 자리의 부모 역시 빨간 노드라는 의미이다.
<br/>
여기서는 이제 3가지 경우가 나뉘어 진다.

1. 삼촌(부모의 형제) 노드가 빨간색일 경우
2. 삼촌 노드가 검은색이고, 삽입된 노드가 부모 노드의 오른쪽 자식인 경우
3. 삼촌 노드가 검은색이고, 삽입된 노드가 부모 노드의 왼쪽 자식인 경우

1️⃣ 삼촌 노드가 빨간 노드인 경우

> 이 경우는 삽입된 노드의 부모노드와 삼촌 노드를 검은색으로 바꾸고, 할아버지 노드를 빨간색으로 바꿔준다.
{:.note title="attention"}

![RBT case1](/assets/img/algorithm/rbt_case1.png)
{:.lead loading="lazy" align="center"}

삼촌 노드가 빨간 노드인 경우
{:.figcaption}

다만, 위 그림을 보면 할아버지 노드의 부모노드 역시 빨간 노드이기에 또 위반이 된다. 즉, 이런 후속처리가 재귀적으로 일어나야 한다는 것이다. 할아버지 노드를 삽입된 노드로 취급하고, 그 삼촌노드를 확인한 후 Rebuild를 실행하는 것이다.

2️⃣ 삼촌 노드가 검은색이고, 삽입된 노드가 부모 노드의 오른쪽 자식인 경우

> 부모 노드를 왼쪽으로 회전시켜 이 상황을 세 번째의 경우로 문제를 넘겨준다. 그림을 보면 어떻게 세번째 경우로 넘어가는 건지 이해가 쉽다.
{:.note title="attention"}


![RBT case2](/assets/img/algorithm/rbt_case2.png)
{:.lead loading="lazy" align="center"}

삼촌 노드가 검은 노드이고, 오른쪽으로 삽입된 경우(네모로 표시된 노드가 삽입된 노드)
{:.figcaption}

3️⃣ 삼촌 노드가 검은색이고, 삽입된 노드가 부모 노드의 왼쪽 자식인 경우

> 부모 노드를 검은색, 할아버지 노드를 빨간색으로 칠한 다음 할아버지 노드를 오른쪽으로 회전시킨다.
{:.note title="attention"}

![RBT case3](/assets/img/algorithm/rbt_case3.png)
{:.lead loading="lazy" align="center"}

삼촌 노드가 검은 노드이고, 왼쪽으로 삽입된 경우(네모로 표시된 노드가 삽입된 노드)
{:.figcaption}

* RebuildAfterInsert() 구현

```c
void RevuildAfterInsert(Node** Root, Node* X)
{
    while(X != (*Root) && X->Parent->Color == RED)
    {
        // 부모가 할아버지노드의 왼쪽 노드인 경우
        if(X->Parent == X->Parent->Parent->Left)
        {
            // 삼촌노드 찾기
            Node* Uncle = X->Parent->Parent->Right;
            if(Uncle->Color == RED)
            {
                // 부모 노드와 삼촌노드는 검은색으로
                X->Parent->Color = BLACK;
                Uncle->Color = BLACK;
                // 할아버지 노드는 빨간색으로
                X->Parent->Parent->Color = RED;

                // 이제 X를 할아버지 노드로 바꿔 loop를 돌 수 있도록 한다.
                X = X->Parent->Parent;
            }
            else
            {
                // 삼촌이 검은색이고, X가 오른쪽 자식일 경우
                // 부모기준으로 좌회전해주어 왼쪽자식일 경우로 넘긴다.
                if(X == X->Parent->Right)
                {
                    X = X->Parent;
                    RotateLeft(Root, X);
                }
                
                // 왼쪽자식일 경우는 무조건 실행되어야 한다.
                // 부모는 검은색, 할아버지는 빨간색으로 바꿔준다.
                // 그 후 할아버지 노드를 기준으로 우회전해준다.
                X->Parent->Color = BLACK;
                X->Parent->Parent->Color = RED;
                RotateRight(Root, X->Parent->Parent);
            }
        }
        else
        {
            // 삼촌노드 찾기
            Node* Uncle = X->Parent->Parent->Right;
            if(Uncle->Color == RED)
            {
                // 부모 노드와 삼촌노드는 검은색으로
                X->Parent->Color = BLACK;
                Uncle->Color = BLACK;
                // 할아버지 노드는 빨간색으로
                X->Parent->Parent->Color = RED;

                X = X->Parent->Parent;
            }
            else
            {
                // 삼촌이 검은색이고, X가 오른쪽 자식일 경우
                // 부모기준으로 우회전해주어 왼쪽자식일 경우로 넘긴다.
                if(X == X->Parent->Right)
                {
                    X = X->Parent;
                    RotateRight(Root, X);
                }
                
                // 왼쪽자식일 경우는 무조건 실행되어야 한다.
                // 부모는 검은색, 할아버지는 빨간색으로 바꿔준다.
                // 그 후 할아버지 노드를 기준으로 좌회전해준다.
                X->Parent->Color = BLACK;
                X->Parent->Parent->Color = RED;
                RotateLeft(Root, X->Parent->Parent);
            }
        }
    }
    // 루트노드는 검은색이다.
    (*Root)->Color = BLACK;
}
```

## 레드 블랙 트리의 노드 삭제

작성중
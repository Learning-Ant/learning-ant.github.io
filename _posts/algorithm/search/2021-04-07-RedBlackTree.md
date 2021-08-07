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

# [Red Black Tree]레드 블랙 트리

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

> 레드 블랙 트리에서 노드의 삭제는 삽입보다 더 복잡하다. 삽입을 구현하기전에 먼저 규칙들 중 생각할 필요 없는 조건과 고려해야하는 조건을 구분해서 삭제 시 일어나는 경우의 수를 생각해보도록 한다.
{:.note title="attention"}

1. 모든 노드는 빨간색 아니면 검은색이다.
2. 루트 노드는 검은색이다.
3. 잎 노드는 검은색이다.
4. 빨간 노드의 자식들은 모두 검은색이다. 하지만 검은색 노드의 자식이 빨간색일 필요는 없다.
5. 루트 노드에서 모든 잎 노드 사이에 있는 검은색 노드의 수는 모두 동일하다.

먼저 <u>삭제할 노드가 레드 노드일 경우</u>를 생각해보면, <u>삭제하더라도 모든 조건에서 위배되지 않는다.</u> 레드 노드 부모나 자식은 무조건 블랙 노드일 것이고, 이 블랙 노드를 삭제된 레드 노드의 부모에 연결하더라도 블랙 노드가 연속으로 나오기때문에 위배되지 않는다. 5번 조건 역시 중간에 삭제된 노드가 레드노드이므로 영향이 없다.

그렇다면 <u>삭제할 노드가 블랙 노드일 경우</u>를 생각해보자. 일단 5번조건부터 위배가 된다. 트리 중간에 있던 블랙 노드가 삭제되면 그 아래에 있던 블랙 노드들은 다른 경로에 있는 블랙 노드의 수와 일치하지 않게된다.
<u>또한 삭제한 블랙 노드의 부모와 그의 자식 노드가 모두 레드인 경우</u>에는 그 둘을 연결할 시 레드노드가 연속적으로 나오게 되므로 4번 법칙에 위배되게 된다. 즉, 삭제할 노드가 블랙 노드일 경우에 그 부모와 자식이 모드 레드 노드라면 <u>4, 5번 법칙에 위배</u>된다.
이를 보완하기 위한 방법을 아래 그림으로 한번 살펴보자.

![삭제 CASE1](/assets/img/algorithm/delete_case1.png)
{:.lead loading="lazy" align="center"}

삭제할 노드가 블랙 노드이고, 그 부모와 자식이 모두 레드 노드인 경우
{:.figcaption"}

그렇다면 <u>삭제할 노드의 부모는 레드 노드, 자식은 블랙 노드</u>라면 어떻게 될까? 일단 4번 법칙에는 위배되지 않지만 <u>5번 법칙인 루트-잎 경로의 블랙 노드 숫자가 다른 경로 들과 일치하지 않아 법칙이 깨지게 된다.</u> 그 해결 방법을 아래 그림을 통해 이해해보자.

![삭제 CASE2](/assets/img/algorithm/delete_case2.png)
{:.lead loading="lazy" align="center"}

삭제할 노드가 블랙 노드이고, 그 부모는 레드노드, 자식은 블랙 노드인 경우
{:.figcaption"}

여기서 블랙 노드 옆에 네모난 모양의 표시가 있는 노드를 **이중블랙**라고 임의 가정 해본다. 임시적으로 5번규칙을 만족하게 하도록 하기 위한 가정이며, <u>이렇게 가정하여 5번법칙 위반을 1번법칙(**모든 노드는 레드 아니면 블랙이다.**)을 위반토록해 문제를 좀 더 쉽게 해결하기 위함이다.</u> 이렇게 1번 법칙을 위반하게 되면 아래 4가지 경우를 생각해 해결하면 된다.

1. 이중블랙 노드의 형제가 레드인 경우
2. 이중블랙 노드의 형제가 블랙이고
    2-1. 형제의 양쪽 자식이 모두 블랙인 경우
    2-2. 형제의 왼쪽 자식은 빨간색, 오른쪽 자식은 검은색인 경우
    2-3. 형제의 오른쪽 자식이 빨간색인 경우

1️⃣ 이중블랙 노드의 형제가 레드인 경우

    > 이중블랙 노드의 형제가 레드일 경우엔 먼저 한다.형제를 블랙, 부모를 레드로 변경한다. 그 후 부모를 기준으로 좌회전을 실시하면 이중 블랙 노드의 형제가 블랙노드로 바뀌면서 다음에 설명할 경우들로 치환된다.
    {:.note title="attention"}

    ![삭제 CASE3](/assets/img/algorithm/delete_case3.png)
    {:.lead loading="lazy" align="center"}

    이중 블랙 노드의 형제가 레드인 경우
    {:.figcaption"}

2️⃣ 이중블랙 노드의 형제가 블랙이고 형제의 양쪽 자식이 모두 블랙인 경우

    > 이증 블랙 노드의 형제 노드만 레드로 변경한 후, 이중 블랙 노드가 가지고 있던 두 개의 블랙 중 하나를 부모 노드에게 넘겨주면 된다. 그럼 이중블랙이었던 노드는 블랙노드가 되고 부모가 블랙 노드였을 경우 이중블랙, 레드 노드였을 경우 블랙노드가 된다. 부모가 이중블랙노드가 된다면 부모가 이중블랙인 것으로 생각해 그 형제를 따져보고 해결하면 된다. 기존의 이중블랙이었던 노드의 입장에서는 신경쓸 일이 아닌 것이다.
    > 여기서 중요한 점은 이중블랙 노드가 가지고 있던 블랙 중 하나를 넘긴다는 것이 자식노드 중 블랙 노드를 넘긴다는 의미가 아니라는 점이다.
    {:.note title="attention"}

    ![삭제 CASE4](/assets/img/algorithm/delete_case4.png)
    {:.lead loading="lazy" align="center"}

    이중블랙 노드의 형제가 블랙이고 형제의 양쪽 자식이 모두 블랙인 경우
    {:.figcaption"}

3️⃣ 이중블랙 노드의 형제가 블랙이고 형제의 왼쪽 자식은 빨간색, 오른쪽 자식은 검은색인 경우

    > 형제 노드를 레드로 변경하고, 왼쪽 자식을 블랙으로 변경한 후 형제 노드를 기준으로 우회전을 수행한다. 이렇게 수행하게 되면 이 문제는 형제가 블랙이고, 오른쪽 자식이 레드인 경우로 넘어가게 된다.
    > 그림으로 좀 더 직관적으로 보도록 하자.
    {:.note title="attention"}

    ![삭제 CASE5](/assets/img/algorithm/delete_case5.png)
    {:.lead loading="lazy" align="center"}

    이중블랙 노드의 형제가 블랙이고 형제의 왼쪽 자식은 빨간색, 오른쪽 자식은 검은색인 경우
    {:.figcaption"}

4️⃣ 이중블랙 노드의 형제가 블랙이고 형제의 오른쪽 자식이 빨간색인 경우

    > 가장 먼저 이중블랙 노드의 부모 노드가 가지고 있는 색을 형제 노드에 칠한다. 그 후 부모 노드와 형제 노드의 오른쪽 자식 노드를 블랙으로 변경하고, 부모 노드를 기준으로 좌회전한다.
    > 남아있는 이중 블랙 노드의 블랙 하나는 루트노드로 보내준다.
    > 이렇게 되면 1번 법칙도 만족하게 된다.
    {:.note title="attention"}

    ![삭제 CASE6](/assets/img/algorithm/delete_case6.png)
    {:.lead loading="lazy" align="center"}

    이중블랙 노드의 형제가 블랙이고 형제의 오른쪽 자식이 빨간색인 경우
    {:.figcaption"}

* RebuildAfterRemove() 구현

> 이제 위와 같은 경우들을 염두에 두고 RebuildAfterRemove()함수를 구현해보도록 한다. 
> 실제로 구현할 때 위에서 가정한 이중블랙이 코드에 적용되는 사항은 없다.
{:.note title="attention"}

```c
// RCNode는 그 구조체 상 이중블랙으로 인한 수정은 없지만
// 이중블랙 상태인 노드를 가리키는 노드이다.
// 삭제된 노드의 자식일 경우 이중 블랙 노드가 되기 때문에
// Removed Childe Node를 줄여 표현했다.
void RebuildAfterRemove(Node** Root, Node* RCNode)
{
    Node* Sibling = NULL;

    while(RCNode->Parent != NULL && RCNode->Color == BLACK)
    {
        // 이중블랙이 왼쪽 노드일 경우
        if(RCNode == RCNode->Parent->Left)
        {
            Sibling = RCNode->Parent->Right;

            // 이중 블랙의 형제가 레드인 경우
            if(Sibling->Color == RED)
            {
                // 형제를 블랙으로, 부모를 레드로 변경
                Sibling->Color = BLACK;
                RCNode->Parent->Color = RED;
                // 부모를 기준으로 좌회전
                RotateLeft(Root, RCNode->Parent);
            }
            else    // 이중 블랙의 형제가 블랙이고
            {
                // 양쪽 자식이 모두 검은색인 경우
                if(Sibling->Left->Color == BLACK &&
                   Sibling->Right->Color == BLACK) 
                {
                    Sibling->Color = RED;
                    RCNode = RCNode->Parent;
                }
                else
                {
                    // 왼쪽 자식이 빨간색인 경우
                    if(Sibling->Left->Color == RED)
                    {
                        // 형제의 왼쪽 자식을 블랙으로,
                        // 형제를 레드로 변경
                        Sibling->Left->Color = BLACK;
                        Sibling->Color = RED;

                        // 형제를 기준으로 우회전
                        RotateRight(Root, Sibling);
                        Sibling = RCNode->Parent->Right;
                    }

                    // 오른쪽 자식이 빨간색인 경우
                    // 형제의 색을 부모의 색으로 변경
                    Sibling->Color = RCNode->Parent->Color;
                    // 부모와 형제의 오른쪽자식의 색을 블랙으로 변경
                    RCNode->Parent->Color = BLACK;
                    Sibling->Right->Color = BLACK;
                    // 부모를 기준으로 좌회전
                    RotateLeft(Root, RCNode->Parent);
                    // 이중블랙을 루트로 보낸다.
                    RCNode = (*Root);
                }
            }
        }
        else
        {
            // 위의 경우는 삭제할 노드가 부모가 왼쪽 자식일 경우이고,
            // 이 경우는 삭제할 노드가 부모의 오른쪽 자식일 경우이다.
            // 위의 코드를 우회전 좌회전만 바꿔 넣으면 된다.
        }
    }
    RCNode->Color = BLACK;
}
```

> 이제 이를 RemoveNode()함수에서 삭제한 노드가 검은색일 때만 호출하면 된다.

* RemoveNode() 구현

```c
Node* RemoveNode(Node** Root, ElementType Data)
{
    Node* Removed = NULL;
    Node* RCNode = NULL;
    Node* Target = SearchNode( (*Root), Data);

    if(Target == NULL)
        return NULL;
    
    if(Target->Left == Nil || Target->Right == Nil)
    {
        Removed = Target;
    }
    else
    {
        Removed = SearchMinNode(Target->Right);
        Target->Data = Removed->Data;
    }

    if(Removed->Left != Nil)
        RCNode = Removed->Left;
    else
        RCNode = Removed->Right;

    RCNode->Parent = Removed->Parent;

    if(Removed->Parent == NULL)
        (*Root) = RCNode;
    else
    {
        if(Removed == Removed->Parent->Left)
            Removed->Parent->Left = RCNode;
        else
            Removed->Parent->Right = RCNode;
    }

    if(Removed->Color == BLACK)
        RevuildAfterRemove(Root, RCNode);

    return Removed;
}
```
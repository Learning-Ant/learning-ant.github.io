---
layout: post
title: 그래프 순회
description: >
  Search of Graph
hide_description: false
sitemap: false
date: 2021-04-13 20:02:00 +0900
category: algorithm
tag: [graph]
---

# 그래프의 순회

> 그래프에서는 그 구조 상 특정 데이터를 찾는 알고리즘이나 모든 정점들을 순회하는 것도 쉽지 않다. 이번 포스트에서는 그래프를 순회하는 데 있어서 가장 기초적인 알고리즘인 DFS(Depth First Search), BFS(Breadth First Search)를 알아본다.
{:.note title="attention"}

## 깊이 우선 탐색

> 깊이 우선이라는 말 그대로 가장 깊은 정점을 찾을 때까지 들어갔다가 인접한 정점이 없는 정점을 찾으면 뒤로 돌아와 다른 경로로 뻗은 정점을 타고 다시 가장 깊은 곳 까지 탐색하는 알고리즘이다.
{:.note title="attention"}

DFS 알고리즘의 순서는 다음과 같다.

1. 시작 정점을 찾은 후 이 정점을 'Visited'로 표시한다.
2. 해당 정점과 인접한 정점 중에 아직 방문하지 않은 곳을 선택하고 이를 시작 정점으로 삼아 다시 깊이 우선 탐색을 실시한다.(1번 실시)
3. 정점에 더 이상 'NotVisited'인 인접 정점이 없으면 이전 정점으로 돌아가 2번을 실시한다.
4. 이전 정점으로 돌아가도 더 이상 방문할 인접 정점이 없다면 그래프의 모든 정점을 방문했다는 의미이므로 탐색을 종료한다.

이제 위의 과정을 그림으로 표현해가며 알아보자.

![DFS](/assets/img/algorithm/dfs1.png)
{:.lead loading="lazy" align="center"}

* 시작 정점을 1번 정점으로 잡는다.

![DFS](/assets/img/algorithm/dfs2.png)
{:.lead loading="lazy" align="center"}

* 시작 정점의 인접 정점인 2번 정점으로 이동하고, Visited로 전환한다.

![DFS](/assets/img/algorithm/dfs3.png)
{:.lead loading="lazy" align="center"}

* 마찬가지로 그 다음 인접 정점인 4번 정점으로 이동하고, 역시 Visited로 전환한다.

![DFS](/assets/img/algorithm/dfs4.png)
{:.lead loading="lazy" align="center"}

* 이를 더 이상 인접 정점이 없는 7번 정점에 도달할 때까지 반복한다.
이제 더 이상 인접 정점이 없으니 NotVisited인 인접 정점이 남아 있는 정점까지 되돌아간다.

![DFS](/assets/img/algorithm/dfs5.png)
{:.lead loading="lazy" align="center"}

* 1번 정점까지 돌아간 후 NotVisited 인접 정점인 3번 정점으로 이동 후 Visited로 표시한다.

![DFS](/assets/img/algorithm/dfs6.png)
{:.lead loading="lazy" align="center"}

* 이를 최종 정점이 나올때 까지 반복하면, 6번 정점을 마지막으로 모든 정점 순회가 완료된다.

### DFS 구현

```c
void DFS(Vertex* V)
{
    Edge* E = NULL;
    
    printf("%d ", V->Data);

    // 방문한 정점에 Visited라고 표시
    V->Visited = Visited;

    E = V->AdjacencyList;

    // 현재 정점의 모든 인접 정점에 대해 DFS()를 호출한다.
    while(E != NULL)
    {
        // 
        if(E->Target != NULL && E->Target->Visited == NotVisited)
            DFS(E->Target);

        E = E->Next;
    }
}
```

## 너비 우선 탐색

> 너비 우선탐색은 꼼꼼하게 좌우를 둘러보는 알고리즘이다. 우선 시작 정점을 기준으로 깊이가 1인 모든 정점들을 방문한 후 깊이가 2인 모든 정점을 방문한다. 이런 식으로 깊이를 한단계씩 높여가며 모든 정점들을 방문할 때 까지 탐색하는 것이다.
{:.note title="attention"}

BFS의 알고리즘은 다음 순서대로 진행된다.

1. 시작 정점을 Visited로 변경하고 큐에 삽입(Enqueue)한다.
2. 큐로부터 정점을 제거(Dequeue)한 후 제거한 정점에 인접한 정점 중 아직 방문하지 않은 곳을 Visited로 변경하고 큐에 삽입한다.
3. 이 큐가 비게 되면 탐색이 끝난 것이다. 큐가 빌 때까지 2번을 반복한다.

![BFS](/assets/img/algorithm/bfs1.png)
{:.lead loading="lazy" align="center"}

* 먼저 시작 정점인 1번 정점을 Visited로 변경하고 삽입한다.

![BFS](/assets/img/algorithm/bfs2.png)
{:.lead loading="lazy" align="center"}

* 1번 정점을 제거하면서 연결된 인접 정점들을 Visited로 변경하고 큐에 삽입한다. 따라서 2, 3번 정점이 삽입되고 Visited로 바뀐다.

![BFS](/assets/img/algorithm/bfs3.png)
{:.lead loading="lazy" align="center"}

* 그 다음 2번 정점을 제거하면서 2번 정점에 인접한 정점들을 Visited로 변경하고 큐에 삽입한다. 큐에는 4, 5번 정점이 삽입된다.

![BFS](/assets/img/algorithm/bfs4.png)
{:.lead loading="lazy" align="center"}

* 마찬가지로 3번 정점을 제거하면서 같은 과정을 수행한다.

![BFS](/assets/img/algorithm/bfs5.png)
{:.lead loading="lazy" align="center"}

* 이렇게 4번 정점까지 반복하면 큐에는 5, 6, 7 정점이 남는다. 하지만 5번 정점을 제거하고 Not Visited인 인접 정점을 찾아 삽입하려해도 그런 정점이 없으므로 큐에서 5번 정점을 제거하는 작업만 수행된다.
결국엔 큐에는 아무것도 남지 않게 되고, 모든 정점들은 방문하게 된다.

### BFS 구현

```c
void BFS(Vertex* V, LinkedQueue* Queue)
{
    Edge* E = NULL;

    printf("%d ", V->Data);

    V->Visited = Visited;

    Enqueue(&Queue, CreateNode(V));
    
    // Q가 빌 때까지 반복
    while(!IsEmpty(Queue))
    {
        // Dequeue로 Pop된 노드 저장
        Node* Popped = Dequeue(&Queue);
        
        V = Popped->Data;
        E = V->AdjacencyList;

        // 인접 정점들 순회
        while(E != NULL)
        {
            V = E->Target;
            if(V != NULL && V->Visited == NotVisited)
            {
                printf("%d ", V->Data);
                V->Visited = Visited;
                Enqueue(&Queue, CreateNode(V));
            }

            E = E->Next;
        }
    }
}
```

## 모듈화

> BFS를 구현하기 위해 Queue가 필요하다. 해당 자료구조는 이전에 포스팅했던 Queue의 구현을 사용한다.
> 한가지 주의할 점은 DFS에서 사용되는 Queue Node들의 Data 타입인 ElementType을 Vertex*로 변경해야 한다는 것이다.
{:.note title="attention"}

### GraphTraversal.h

```c
#ifndef GRAPH_TRAVERSAL_H
#define GRAPH_TRAVERSAL_H

#include "Graph.h"
#include "LinkedQueue.h"

void DFS(Vertex* V);
void BFS(Vertex* V, LinkedQueue* Queue);

#endif
```

### GraphTraversal.c

```c
#include "GraphTraversal.h"

void DFS(Vertex* V)
{
    Edge* E = NULL;

    printf("%d ", V->Data);

    V->Visited = Visited;

    E = V->AdjacencyList;

    while(E != NULL)
    {
        if(E->Target != NULL && E->Target->Visited == NotVisied)
            DFS(E->Target);

        E = E->Next;
    }
}

void BFS(Vertext* V, LinkedQueue* Queue)
{
    Edge* E = NULL;
    
    printf("%d ", V->Data);
    V->Visited = Visited;

    Enqueue(&Queue, CreateNode(V));

    while(!IsEmpty(Queue))
    {
        Node* Popped = Dequeue(&Queue);
        V = Popped->Data;
        E = V->AdjacencyList;

        while(E != NULL)
        {
            V = E->Target;

            if(V != NULL && V->Visited == NotVisited)
            {
                printf("%d ", V->Data);
                V->Visited = Visited;
                Enqueue(&Queue, CreateNode(V));
            }

            E = E->Next;
        }
    }
}
```

### Test_GraphTraversal.c

```c
#include "Graph.h"
#include "GraphTraversal.h"

int main(void)
{
    int Mode = 0;
    Graph* graph = CreateGraph();

    Vertex* v1 = CreateVertex(1);
    Vertex* v2 = CreateVertex(2);
    Vertex* v3 = CreateVertex(3);
    Vertex* v4 = CreateVertex(4);
    Vertex* v5 = CreateVertex(5);
    Vertex* v6 = CreateVertex(6);
    Vertex* v7 = CreateVertex(7);

    AddVertex(graph, v1);
    AddVertex(graph, v2);
    AddVertex(graph, v3);
    AddVertex(graph, v4);
    AddVertex(graph, v5);
    AddVertex(graph, v6);
    AddVertex(graph, v7);

    AddEdge(v1, CreateEdge(v1, v2, 0));
    AddEdge(v1, CreateEdge(v1, v3, 0));
    AddEdge(v1, CreateEdge(v1, v4, 0));

    AddEdge(v2, CreateEdge(v2, v4, 0));
    AddEdge(v2, CreateEdge(v2, v5, 0));

    AddEdge(v3, CreateEdge(v3, v6, 0));

    AddEdge(v4, CreateEdge(v4, v5, 0));
    AddEdge(v4, CreateEdge(v4, v6, 0));
    AddEdge(v4, CreateEdge(v4, v7, 0));

    AddEdge(v5, CreateEdge(v5, v7, 0));

    printf("Enter Traversal Mode(0:DFS, 1:BFS) : ");
    scanf("%d", &Mode);

    if(Mode == 0)
        DFS(graph->Vertices);
    else
    {
        LinkedQueue* Queue = CreateQueue();

        BFS(V1, Queue);
        DestroyQueue(Queue);
    }

    DestroyGraph(graph);

    return 0;
}

// 실행결과
> GraphTraversal
Enter Traversal Mode(0:DFS, 1:BFS) : 0
1 2 4 5 7 3 6
> GraphTraversal
Enter Traversal Mode(0:DFS, 1:BFS) : 0
1 2 3 4 5 6 7
```
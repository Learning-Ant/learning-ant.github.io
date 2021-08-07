---
layout: post
title: 최단 경로 탐색
description: >
  Shortest Route Search
hide_description: false
sitemap: false
date: 2021-04-16 18:02:00 +0900
category: algorithm
tag: [search, graph]
---

# [Dijkstra Algorithm]최단 경로 탐색

> 어떤 한 정점에서 다른 정점으로 이동할 때 가중치의 합이 최소가 되는 경로를 찾아내야 할 때 사용하는 알고리즘에 대해 알아본다.
{:.note title="attention"}

## 다익스트라 알고리즘

> 프림 알고리즘은 단순하게 연결된 간선의 길이를 이용해 어떤 간선을 먼저 연결할지를 판단하는 알고리즘이라면 다익스트라 알고리즘은 이어지는 '경로의 길이'를 계산하고 간선을 연결한다.
> 다익스트라 알고리즘은 사이클이 없는 방향성 그래프에서만 사용할 수 있다.
{:.note title="attention"}

* 다익스트라 알고리즘
    1. 각 정점 위에 시작점으로부터 자신에게 이르는 경로의 길이를 저장할 곳을 준비하고 모든 정점 위에 있는 경로의 길이를 무한대로 초기화한다.
    2. 시작 정점의 경로 길이를 0으로 초기화(정점 A에서 A로 가는 길이는 0)한 후 최단 경로에 추가한다.
    3. 최단 경로에 추가된 정점에서 인접 정점들로 가는 경로 길이를 갱신한 후 각각 최단 경로로 추가한다.
    4. 만약 추가하려는 인접 정점이 이미 최단 경로 안에 존재한다면 갱신 전 경로 길이와 새로운 경로 길이를 비교해 더 작은 경로를 추가한다.
    5. 모든 정점이 최단 경로에 소속될 때 까지 3, 4번을 반복한다.

위 알고리즘을 그림으로 그려가며 이해해본다.

![다익스트라 알고리즘](/assets/img/algorithm/dijkstra/dijkstra1.png)
{:.lead loading="lazy" align="center"}

* 먼저 시작 정점으로 정점 B를 택하고 각 정점까지의 경로를 무한대로 설정한다. 시작 정점은 자신까지의 경로 길이이므로 0으로 둔다.

![다익스트라 알고리즘](/assets/img/algorithm/dijkstra/dijkstra2.png)
{:.lead loading="lazy" align="center"}

* 시작 정점에서 인접 정점으로 가는 경로를 탐색하고 각 경로의 길이와 현재 길이(무한대)를 비교한 후 저 작은 수로 초기화한다.

![다익스트라 알고리즘](/assets/img/algorithm/dijkstra/dijkstra3.png)
{:.lead loading="lazy" align="center"}

* 정점 A를 선택하고 그에 인접한 정점 E로 가는 경로의 길이를 확인 후 B→A→E 경로로 이동하므로 그 두 경로의 합을 경로 길이에 입력한다.

![다익스트라 알고리즘](/assets/img/algorithm/dijkstra/dijkstra4.png)
{:.lead loading="lazy" align="center"}

* 다음 정점 C를 선택하고 C와 인접한 경로들을 탐색한다. D로 가는 경로는 B→C→D의 경로를 따르므로 각 경로의 길이를 더한 244를 입력한다.
* 다른 인접 정점으로의 경로들 역시 같이 진행한다.
* 다만 B→C→F의 경우 경로의 길이가 303이고 B→F의 길이는 151이므로 B→F의 경로를 유지한다.

![다익스트라 알고리즘](/assets/img/algorithm/dijkstra/dijkstra5.png)
{:.lead loading="lazy" align="center"}

* 그 후 정점 F를 살펴본다. 여기서 최단 경로의 변경이 발생한다. B→A→E의 경우 267의 경로길이를 가지고, B→F→E의 경우 218의 경로길이를 가지므로 267보다 더 짧은 경로를 가지게 되어 최단 경로를 B→F→E로 선택한 후 218의 길이를 입력한다.
* 마찬가지로 H정점으로의 경로 길이 역시 비교 후 더 짧은 경로의 길이를 입력한다.

![다익스트라 알고리즘](/assets/img/algorithm/dijkstra/dijkstra6.png)
{:.lead loading="lazy" align="center"}

* 마지막으로 정점 E를 선택하면 G와 연결되어 있으니 기존에 연결된 경로인 B→F→G경로와 B→A→E→G경로의 길이들을 비교하면 기존의 연결되어 있는 경로가 더 짧으므로 변경없이 그대로 둔다.

![다익스트라 알고리즘](/assets/img/algorithm/dijkstra/dijkstra7.png)
{:.lead loading="lazy" align="center"}

* 다익스트라 알고리즘을 진행하고 나온 최단 경로 그래프의 모습이다.

### 구현

#### ShortestPath.h

```c
#ifndef SHORTESTPATH_H
#define SHORTESTPATH_H

#include "Graph.h"
#include "PriorityQueue.h"

#define MAX_WEIGHT 999999

void Dijkstra(Graph* G, Vertex* StartVertex, Graph* MST);

#endif
```

#### ShortestPath.c

```c
#include "ShortestPath.h"

void Dijkstra(Graph* G, Vertex* StartVertex, Graph* ShortestPath)
{
    int i = 0;
    
    PQNode StartNode = {0, StartVertex};
    PriorityQueue* PQ = PQ_Create(10);

    Vertex* CurrentVertex = NULL;
    Edge* CurrentEdge = NULL;

    // 가중치 배열
    int* Weights = (int*)malloc(sizeof(int) * G->VertexCount);

    Vertex** ShortestPathVertices = (Vertex**) malloc(sizeof(Vertex*) * G->VertexCount);

    Vertex** Fringes = (Vertex**) malloc(sizeof(Vertex*) * G->VertexCount);
    Vertex** Precedences = (Vertex**) malloc(sizeof(Vertex*) * G->VertexCount);

    CurrentVertex = G->Vertices;
    // 모든 정점을 무한대(MAX_WEIGHT)로 초기화 후 추가
    while(CurrentVertex != NULL)
    {
        Vertex* NewVertex = CreateVertex(CurrentVertex->Data);
        AddVertex(ShortestPath, NewVertex);

        Fringes[i] = NULL;
        Precedences[i] = NULL;
        ShortestPathVertices[i] = NewVertex;
        Weights[i] = MAX_WEIGHT;
        CurrentVertex = CurrentVertex->Next;
        i++;
    }

    // 시작 정점을 PriorityQueue에 추가
    PQ_Enqueue(PQ, StartNode);

    // 시작 정점 0으로 초기화
    Weights[StartVertex->Index] = 0;

    // PQ를 하나씩 제거(Dequeue)하면서 모두 제거될 때까지 순환
    // PQ이므로 제거되는 순서는 우선순위가 높은 Vertex(가중치가 적은 Vertex)부터 제거 된다.
    while(!PQ_IsEmpty(PQ))
    {
        PQNode Popped;

        PQ_Dequeue(PQ, &Popped);
        CurrentVertex = (Vertex*)Popped.Data;

        Fringes[CurrentVertex->Index] = CurrentVertex;

        CurrentEdge = CurrentVertex->AdjacencyList;
        // 인접 정점 탐색
        while(CurrentEdge != NULL)
        {
            Vertex* TargetVertex = CurrentEdge->Target;

            if(Fringes[TargetVertex->Index] == NUll &&
               Weights[CurrnetVertex->Index] + CurrentEdge->Weight < Weights[TargetVertex->Index])
               // 현재 정점까지의 가중치 + 현재 정점에서 인접 정점까지의 가중치가
               // 현재 저장되어 있는 가중치(지금까지 최단 길이였던 값)보다 작다면
            {
                PQNode NewNode = {CurrnetEdge->Weight, TargetVertex};
                PQ_Enqueue(PQ, NewNode);

                Precedences[TargetVertex->Index] = CurrentEdge->From;
                Weights[TargetVertex->Index] = Weights[CurrnetVertex->Index] + CurrnetEdge->Weight;
            }

            CurrentEdge = CurrentEdge->Next;
        }
    }

    for(i = 0; i < G->VertexCount; i++)
    {
        int FromIndex, ToIndex;

        if(Precedences[i] == NULL)
            continue;

        FromIndex = Precedences[i]->Index;
        ToIndex = i;

        AddEdge(ShortestPathVertices[FromIndex], CreateEdge(ShortestPathVertices[FromIndex], ShortestPathVertices[ToIndex], Weights[i]));
    }

    free(Frindes);
    free(Precedences);
    free(ShortestPathVertices);
    free(Weights);

    PQ_Destroy(PQ);
}
```
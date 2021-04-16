---
layout: post
title: 최단 경로 탐색
description: >
  Shortest Route Search
hide_description: false
sitemap: false
date: 2021-04-16 18:02:00 +0900
category: algorithm
tag: [graph]
---

# 최단 경로 탐색

> 어떤 한 정점에서 다른 정점으로 이동할 때 가중치의 합이 최소가 되는 경로를 찾아내야 할 때 사용하는 알고리즘에 대해 알아본다.
{:.note title="attention"}

## 다익스트라 알고리즘(Dijkstra Algorithm)

> 프림 알고리즘은 단순하게 연결된 간선의 길이를 이용해 어떤 간선을 먼저 연결할지를 판단하는 알고리즘이라면 다익스트라 알고리즘은 이어지는 '경로의 길이'를 계산하고 간선을 연결한다.
> 다익스트라 알고리즘은 사이클이 없는 방향성 그래프에서만 사용할 수 있다.
{:.note title="attention"}

* 다익스트라 알고리즘
    1. 각 정점 위에 시작점으로부터 자신에게 이르는 경로의 길이를 저장할 곳을 준비하고 모든 정점 위에 있는 경로의 길이를 무한대로 초기화한다.
    2. 시작 정점의 경로 길이를 0으로 초기화(정점 A에서 A로 가는 길이는 0)한 후 최단 경로에 추가한다.
    3. 최단 경로에 추가된 정점에서 인접 정점들로 가는 경로 길이를 갱신한 후 각각 최단 경로로 추가한다.
    4. 만약 추가하려는 인접 정점이 이미 최단 경로 안에 존재한다면 갱신 전 경로 길이와 새로운 경로 길이를 비교해 더 작은 경로를 추가한다.
    5. 모든 정점이 최단 경로에 소속될 때 까지 3, 4번을 반복한다.

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

    Vertext** Fringes = (Vertex**) malloc(sizeof(Vertex*) * G->VertexCount);
    Vertex** Precedences = (Vertex**) malloc(sizeof(Vertext*) * G->VertexCount);

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

    PQ_Enqueue(PQ, StartNode);

    // 시작 정점 0으로 초기화
    Weights[StartVertex->Index] = 0;

    while(!PQ_IsEmpty(PQ))
    {
        PQNode Popped;

        PQ_Dequeue(PQ, &Popped);
        CurrentVertex = (Vertex*)Popped.Data;

        Fringes[CurrentVertex->Index] = CurrentVertex;

        CurrentEdge = CurrentVertex->AdjacencyList;
        while(CurrentEdge != NULL)
        {
            Vertex* TargetVertex = CurrentEdge->Target;

            if(Fringes[TargetVertex->Index] == NUll &&
               Weights[CurrnetVertex->Index] + CurrentEdge->Weight < Weights[TargetVertex->Index])
            {
                PQNode NewNdoe = {CurrnetEdge->Weight, TargetVertex};
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
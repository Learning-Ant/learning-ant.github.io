---
layout: post
title: 최소 신장 트리
description: >
  Minimum Spanning Tree
hide_description: false
sitemap: false
date: 2021-04-14 16:02:00 +0900
category: algorithm
tag: [graph]
---

# 최소 신장 트리(Minimum Spanning Tree)

> 모든 정점들이 연결되어 있는 상태에서 사이클을 형성하는 간선을 제거하면 트리 구조를 가지게 된다. 이 때 각 간선들에 가중치를 부여하고 각 간선들이 가지고 있는 가중치의 합이 최소가 될 때의 간선만 남겨두고, 나머지를 없앤다면 그래프가 트리구조와 같이 변한다. 이런 모습을 가지는 트리를 <u>최소 신장 트리</u>라고 한다.
> 이런 최소 신장 트리를 만들어내는 알고리즘에 대해서 알아본다.
{:.note title="attention"}

![프림 알고리즘](/assets/img/algorithm/mst_prim.png)
{:.lead loading="lazy" align="center"}

## 프림 알고리즘

> 최소 신장 트리를 만드는 알고리즘의 하나인 프림 알고리즘은 로버트 프림(Robert C. Prim)이 고안해 발명자의 이름을 따 명명되었다. 
{:.note title="attention"}

프림 알고리즘은 다음과 같다.

1. 그래프와 최소 신장 트리를 준비한다.(트리는 노드가 하나도 없는 상태)
2. 그래프에서 임의의 정점을 시작 정점으로하여 최소 신장 트리의 루트 노드로 삽입한다.
3. 최소 신장 트리에 삽입된 정점들과 해당 정점들의 모든 인접 정점 사이에 있는 간선의 가중치를 알아본다. 간선 중 가장 가중치가 작은 것을 골라 이 간선에 연결되어 있는 인접 정점을 최소 신장 트리에 삽입한다. 이 때 주의할 점은 삽입되는 정점은 트리에 삽입되어 있는 기존 노드들과 사이클을 형성해선 안된다.
4. 3의 과정을 반복하며 최소 신장 트리가 그래프의 모든 정점을 연결하게 되면 알고리즘을 종료한다.

위 알고리즘을 그림으로 하나씩 실행해본다.

![프림 알고리즘](/assets/img/algorithm/mst_prim1.png)
{:.lead loading="lazy" align="center"}

* 먼저 시작 정점으로 B를 택하고 트리에 삽입한다. 정점 B에 연결되어 있는 간선은 3개이다. 이 중 가장 가중치가 작은 간선을 선택한다.

![프림 알고리즘](/assets/img/algorithm/mst_prim2.png)
{:.lead loading="lazy" align="center"}

* 해당 간선과 연결된 정점 A를 삽입한다. 그 후 이제 A, B와 연결된 각 간선 중 가장 작은 134의 가중치를 가지는 간선을 선택한다.

![프림 알고리즘](/assets/img/algorithm/mst_prim3.png)
{:.lead loading="lazy" align="center"}

* 정점 C를 삽입하고 그 다음 가장 작은 가중치인 110을 선택한다.

![프림 알고리즘](/assets/img/algorithm/mst_prim4.png)
{:.lead loading="lazy" align="center"}

* 정점 D를 삽입한다. 그 후 151의 가중치를 가지는 간선을 선택한다.

![프림 알고리즘](/assets/img/algorithm/mst_prim5.png)
{:.lead loading="lazy" align="center"}

* 정점 F를 삽입하고, E로 가는 간선은 A-E보다 F-E가 더 작은 가중치를 가지므로 기존에 243이 아닌 67을 연결된 간선으로 택한다. 역시 기존 C-H의 간선(221)보다 F-C의 간선(159)이 가중치가 더 작으므로 선택간선을 교체한다.

![프림 알고리즘](/assets/img/algorithm/mst_prim6.png)
{:.lead loading="lazy" align="center"}

* 정점 E를 삽입한다.

![프림 알고리즘](/assets/img/algorithm/mst_prim7.png)
{:.lead loading="lazy" align="center"}

* 정점 G를 삽입한다.

![프림 알고리즘](/assets/img/algorithm/mst_prim8.png)
{:.lead loading="lazy" align="center"}

* 마지막으로 정점 H를 삽입하면 모든 정점에 대한 최소 신장 트리가 완성된다.

### 구현

```c
void Prim(Graph* G, Vertex* StartVertex, Graph* MST)
{
    int i = 0;

    PQNode StartNode = {0, StartVertex};
    PriorityQueue* PQ = PQ_Create(10);

    Vertex* CurrentVertex = NULL;
    Edge* CurrentEdge = NULL;

    int* Weights = (int*)malloc(sizeof(int) * G->VertexCount);
    
    Vertex** MSTVertices = (Vertex**) malloc(sizeof(Vertex*) * G->VertexCount);

    Vertex** Fringes = (vertex**) malloc(sizeof(Vertex*) * G->VertexCount);

    Vertex** Precedences = (Vertex**) malloc(iszeof(Vertex*) * G->VertexCount);

    CurrentVertex = G->Vertices;
    while(CurrentVertex != NULL)
    {
        Vertex* NewVertex = CreateVertex(CurrentVertex->Data);
        AddVertex(&MST, NewVertex);

        Fringes[i] = NULL;
        Precedences[i] = NULL;
        MSTVertices[i] = NewVertex;
        Weights[i] = MAX_WEIGHT;
        CurrentVertex = CurrentVertex->Nex;
        i++;
    }

    PQ_Enqueue(PQ, StartNode);

    Weights[StartVertex->Index] = 0;

    while(! PQ_IsEmpty(PQ))
    {
        PQNode Popped;

        PQ_Dequeue(PQ, &Popped);
        CurrentVertex = (Vertex*)Popped.Data;

        Fringes[CurrentVertex->Index] = CurrentVertex;

        CurrentEdge = CurrentVertex->AdjacencyList;
        while(CurrentEdge != NULL)
        {
            Vertex* TargetVertex = CurrentEdge->Target;

            if(Fringes[TargetVertex->Index] == NULL &&
                CurrentEdege->Weight < Weights[TargetVertex->Index])
            {
                PQNode NewNode = {CurrentEdge->Weight, TargetVertex};
                PQ_Enqueue(PQ, NewNode);

                Precedences[TargetVertex->Index] = CurrentEdge->From;
                Weights[TargetVertex->Index] = CurrentEdge->Weight;
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

        AddEdge(MSTVertices[FromIndex], CreateEdge(MSTVertices[FromIndex], MSTVertices[ToIndex], Weight[i]));

        AddEdge(MSTVertices[ToIndex], CreateEdge(MSTVertices[ToIndex], MSTVertices[FromIndex], Weights[i]));
    }

    free(Fringes);
    free(Precedences);
    free(MSTVertices);
    free(Weights);

    PQ_Destroy(PQ);
}
```
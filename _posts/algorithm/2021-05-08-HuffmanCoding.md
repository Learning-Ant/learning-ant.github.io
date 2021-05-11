---
layout: post
title: 허프만 코딩
description: >
  Huffman Coding
hide_description: false
sitemap: false
date: 2021-05-08 23:24:00 +0900
category: algorithm
tag : [greedy]
---

# 허프만 코딩(Huffman Coding)

> 허프만 코딩은 탐욕 알고리즘을 사용해 설계된 압축 알고리즘이다. 보통 우리가 접하게되는 mp3나 jpeg의 포맷들이 이 허프만 코딩을 이용하는 압축 데이터 포맷 중 하나이다. 이 허프만 코딩을 이해하려면 먼저 "고정 길이 코드"와 "접두어 코드"에 대해 이해해야 한다.
{:.note title="attention"}

## 고정 길이 코드와 접두어 코드

### 고정 길이 코드

> 고정 길이 코드는 모든 코드의 길이가 똑같은 코드 체계를 말한다.
{:.note title="attention"}

모든 코드의 길이가 같다는 것은 어떤 데이터를 표현하는 데 필요한 데이터 값의 길이가 동일하다는 의미이다. 이런 고정 길이 코드의 대표적인 예시가 ASCII Code이다.  
ASCII Code는 모든 코드의 길이가 8bit로 일정하다.  
이런 고정 길이 코드의 장점은 사용 용이성에 있다. ASCII Code로 어떤 문자열을 표현하고 싶다면 8bit 길이의 데이터를 계속이어 붙이면 되고, 이 데이터의 각 요소를 알고 싶다면 8bit씩 쪼갠 후에 매핑하면 쉽게 어떤 문자열인지 알 수 있기 때문이다.  

'01100010011000100110000101100001'를 해석하는 과정을 통해 좀 더 쉽게 이해해보도록 하자.  
먼저, 위의 데이터를 8bit씩 쪼갠다. 그러면 아래와 같이 쪼갤 수 있다.  

|ASCII(이진수)|01100010|01100010|01100001|01100001|
|:---|:---|:---|:---|:---|

이제 이를 십진수로 표현하면 각각 98 98 97 97이 된다.

|ASCII(이진수)|01100010|01100010|01100001|01100001|
|:---|:---|:---|:---|:---|
|ASCII(십진수)|98|98|97|97|

각 숫자에 연결되는 ASCII 기호를 매칭하면 아래표와 같다.

|ASCII(이진수)|01100010|01100010|01100001|01100001|
|:---|:---|:---|:---|:---|
|ASCII(십진수)|98|98|97|97|
|ASCII 기호|b|b|a|a|

이렇게 '01100010011000100110000101100001'을 해석하면 'bbaa'라는 문자열이 나오게 되는 것이다. 이처럼 고정 길이 코드는 사용하기에 간편하다.

### 접두어 코드

> 접두어 코드는 가변 길이 코드의 한 종류이다.
{:.note title="attention"}

위에서 알아본 고정 길이 코드와 다르게 가변 길이 코드는 각 코드의 데이터 길이가 다른 것을 의미한다. 이런 가변 길이 코드는 비록 해석(데이터 처리)는 번거롭지만 고정적인 길이를 가질 필요가 없기 때문에 저장 공간의 절약이 가능해진다.  

이런 가변 길이 코드 중 접두어 코드라는 것이 있는데, 이는 각 코드의 데이터 값이 다른 코드의 접두어가 되지 않는 코드를 뜻한다.  
여기서 약간 오해의 소지가 있는 것이 얼핏 '접두어 코드'라는 명칭때문에 접두어로 사용가능한 코드들을 모아 둔 것일거란 느낌이 들 수 있다. 사실 이 코드는 '무접두어 코드'가 좀 더 직관적으로 의미를 전달해 줄 수 있는 단어이다. 다만 '접두어 코드'라고 더 많이 불릴 뿐 '무접두어 코드'라고 기억해두는 것이 좋을 수도 있다.  

예를 들어 {"0", "1", "0010", "111"}과 같은 코드가 있다고하면 "0"이라는 코드를 접두어로 가지는 코드가 "0010"이 있고, "1"이라는 코드를 접두어로 가지는 "111"이라는 코드가 있으므로 이는 접두어 코드가 될 수 없다.  
반면, {"00", "011", "111", "010"}과 같은 코드는 각 코드를 접두어로 가지는 코드가 존재하지 않으므로 접두어 코드라 할 수 있다.  

각각 a, b, c, d를 위의 코드({"00", "011", "111", "010"})와 매칭시켜 코드를 만들었다고 하자.

$$
\begin{align*}
&a = 00 \\
&b = 011 \\
&c = 111 \\
&d = 010
\end{align*}
$$

이렇게 매칭 되었다고 할 때 위의 bbaa를 표현하기 위해 우리는 '0110110000'이라고 표현할 수 있게 된다. 이렇게되면 32bit를 사용하던 bbaa라는 문자열이 단 10bit만으로 표현이 가능해진다.  
이런 원리로 데이터의 압축이 가능하게 되는 것이다.

## 허프만 코딩

### 허프만 트리 만들기

> 허프만 코딩은 허프만 트리를 만들면서 구현이 가능해진다. 이 허프만 트리는 ['이진 트리'](/data-structure/2021-03-30-Tree(Binary))를 기반으로 만들어진다.  
> 한가지 더 기억해야 할 것은 '기호의 빈도'이다. 많이 나오는 기호의 데이터 길이를 짧게해야 압축률이 더욱 높아지기 때문에 기호의 빈도는 중요하다.
{:note title="attention"}

이진 트리로 허프만 트리를 만들면 이는 접두어 코드를 표현하는 데 활용된다. 여기서 만들어지는 허프만 트리는 왼쪽 자식의 값은 0, 오른쪽 자식의 값은 1을 가지게 된다. 루트 노드부터 리프 노드까지 그 값들을 읽어가고, 그 읽어낸 값은 한 코드와 매칭되게 된다.  
즉, 각 리프 노드에는 매칭되는 기호가 있게 된다. 

![허프만 트리](/assets/img/algorithm/huffman/huffman_tree.png)
{:.lead loading="lazy" align="center"}

허프만 트리의 모습
{:.figcaption}

제시했던 접두어 코드로 허프만 트리를 만든 모습이다. 이런 식으로 트리를 만들면서 문자열에서 기호의 빈도에 따라 코드를 짧게 만들 수 있도록 하려면 어떻게 해야할까?  

그러기 위해선 일단 주어진 데이터에서 어떤 기호가 얼마나 나오는지를 알아야만 한다. 한가지 문자열을 예시를 풀어가면서 어떤식으로 트리를 만들어가야 하는지 살펴보도록 하자.  

'badsaebasd'라는 문자열이 있다고 하자. 이 문자열에서 각 기호들의 빈도 수는 다음과 같다.

![허프만 트리 만들기](/assets/img/algorithm/huffman/huffman_tree1.png)
{:.lead loading="lazy" align="center"}

각 문자의 빈도 수
{:.figcaption}

앞선 [포스팅](/algorithm/2021-05-06-Greedy)에서 언급했던 탐욕 알고리즘의 순서를 기억해보자.

1. 해 선택
2. 실행 가능성 검사
3. 해 검사

![허프만 트리 만들기](/assets/img/algorithm/huffman/huffman_tree2.png)
{:.lead loading="lazy" align="center"}

빈도 수가 가장 적은 노드 두 개(e, s) 연결
{:.figcaption}

먼저, 해 선택부터 수행해보도록 한다. 선택 기준은 현 시점에서 빈도가 가장 적은 순서이다. 여기서 가장 빈도가 적은 노드 두 개는 e와 s가 되겠다. 이 두 노드를 선택하고 이 두 노드를 자식으로 가지는 노드를 만들어 연결한다. 이 부모노드의 빈도 수는 자식 노드의 빈도 수의 합으로 결정된다.

![허프만 트리 만들기](/assets/img/algorithm/huffman/huffman_tree3.png)
{:.lead loading="lazy" align="center"}

다음으로 빈도 수가 적은 두 노드(b, d) 연결
{:.figcaption}

그 후 나머지 노드와 새로 만들어진 부모 노드 중 빈도수가 가장 적은 노드 두 개를 선택한다. 여기서는 새로 만들어진 부모 노드의 빈도수는 3이므로 빈도 수가 가장 적은 노드 두 개는 b, d가 된다. 이 두 노드로 또 다시 새로운 부모 노드를 만들고 이 두 노드를 자식으로 연결해 준다.

![허프만 트리 만들기](/assets/img/algorithm/huffman/huffman_tree4.png)
{:.lead loading="lazy" align="center"}

그 다음 두 노드로 a와 e, s의 부모 노드를 연결
{:.figcaption}

이제 다시 가장 빈도수가 적은 노드 두 개를 선택하면 3을 가지는 a와 e와 s를 자식으로 가지는 부모 노드가 선택된다. 이 두 노드를 연결하면 부모 노드는 6의 빈도수를 가지게 된다.

![허프만 트리 만들기](/assets/img/algorithm/huffman/huffman_tree5.png)
{:.lead loading="lazy" align="center"}

그 다음 적은 빈도수를 가지는 부모 노드들을 연결
{:.figcaption}

최종적으로 4와 6의 빈도 수를 가지는 두 부모 노드를 연결해 루트 노드를 만들면 허프만 트리가 완성 된다.

### 데이터 압축

> 이제 만든 허프만 트리를 이용해 예제로 제시된 문자열 'badsaebasd'를 압축해보도록 하자.
{:.note title="attention"}

허프만 트리로 제시된 코드들을 접두어 코드로 변환시키면 아래와 같이 나온다.

|b|a|s|a|e|b|a|s|d|
:---|:---|:---|:---|:---|:---|:---|:---|:---
|00|10|111|10|110|00|10|111|01|

이 데이터를 나열하면 001011110110001011101로 총 21bit가 된다. 기존의 ASCII Code로 기록하면 8 * 9 = 72bit에 비해 비약적인 압축률을 보여준다.

### 데이터 압축해제

> 데이터가 압축되었으면 압축을 해제하는 DeCode도 역시 가능해야한다. 압축만 가능하고 해제가 불가능하다면 그저 쓸모없는 이진코드의 나열이 되기 때문이다.
{:.note title="attention"}

접두어 코드들은 모두 허프만 트리의 리프 노드에 매칭되는 기호가 존재한다. 이 특성을 생각하고 다음과 같은 로직을 수행하도록 구현하면 데이터의 Decoding이 가능해진다.

아래의 과정을 통해 Decoding을 수행한다.

1. 압축을 위해 만들었던 허프만 트리와 압축 해제된 데이터를 담을 버퍼를 준비한다. 압축된 데이터 값을 읽으면서 허프만 트리의 루트 노드부터 리프 노드까지 순회한다.
2. 압축 데이터에 아직 읽지 않은 부분이 남아있으면 한 비트씩 계속 읽어 나간다.
3. 읽은 비트가 0이면 왼쪽 노드로, 1이면 오른쪽 노드로 이동한다. 현재 노드가 리프 노드이면 저장된 기호를 버퍼에 추가하고, 다시 루트 노드로 이동해 2번 과정을 수행한다.

압축한 데이터인 '001011110110001011101'와 허프만 트리, 압축 해제 버퍼를 준비한다.

![허프만 코드 Decode](/assets/img/algorithm/huffman/huffman_decode1.png)
{:.lead loading="lazy" align="center"}

허프만 코드 압축 해제
{:.figcaption}

첫 비트를 읽으면 0이다. 이에 따라 루트 노드에서 왼쪽 자식 노드로 이동하면 현재 노드는 리프 노드가 아니므로 다음 비트를 순차적으로 읽는다.

![허프만 코드 Decode](/assets/img/algorithm/huffman/huffman_decode2.png)
{:.lead loading="lazy" align="center"}

허프만 코드 압축 해제
{:.figcaption}

그렇게 다음 비트를 읽으면 다시 0이므로 현재 노드의 왼쪽 자식 노드로 이동한다. 그렇게 되면 현재 노드는 리프 노드가 되고, 거기에 저장되어 있는 기호는 b이므로 압축 해제 버퍼에 b를 저장한다. 그 후 루트 노드로 다시 돌아간다.

![허프만 코드 Decode](/assets/img/algorithm/huffman/huffman_decode3.png)
{:.lead loading="lazy" align="center"}

허프만 코드 압축 해제
{:.figcaption}

이제 다시 다음 비트를 읽으면 1이므로 루트 노드에서 오른쪽 자식 노드로 이동하고 현재 노드는 리프 노드가 아니므로 다시 다음 비트를 읽는다.

![허프만 코드 Decode](/assets/img/algorithm/huffman/huffman_decode4.png)
{:.lead loading="lazy" align="center"}

허프만 코드 압축 해제
{:.figcaption}

다음 비트는 0이므로 왼쪽 자식 노드로 이동하고 리프 노드인지 확인한다. 리프 노드임이 확인되면 그 노드에 저장된 기호를 입력 버퍼에 저장하고 다시 루트 노드로 이동한다.

![허프만 코드 Decode](/assets/img/algorithm/huffman/huffman_decode5.png)
{:.lead loading="lazy" align="center"}

허프만 코드 압축 해제
{:.figcaption}

위와 같은 과정을 남은 비트가 없을 때까지 반복하게 되면 Decode가 끝난 후 압축 해제 버퍼에 있는 문자열이 압축하기 전의 문자열과 같음을 알 수 있다.

## 구현

### Huffman.h

```c
#ifndef HUFFMAN_H
#define HUFFMAN_H

#include <stdio.h>
#include <stdlib.h>
#include "PriorityQueue.h"

#define MAX_CHAR 256
#define MAX_BIT 8

typedef unsigned int UINT;
typedef unsigned char UCHAR;

typedef struct TagSymbolInfo
{
  UCHAR Symbol;
  int Frequency;
} SymbolInfo;

typedef struct TagHuffmanNode
{
  SymbolInfo Data;
  struct TagHuffmanNode* Left;
  struct TagHuffmanNode* Right;
} HuffmanNode;

typedef struct TagBitBuffer
{
  UCHAR* Buffer;
  UINT Size;
} BitBuffer;

typedef struct TagHuffmanCode
{
  UCHAR Code[MAX_BIT];
  int Size;
} HuffmanCode;

HuffmanNode* Huffman_CreateNode(SymbolInfo NewData);
void Huffman_DestroyNode(HuffmanNode* Node);
void Huffman_DestroyTree(HuffmanNode* Node);
void Huffman_AddBit(BitBuffer* Buffer, char value);
void Huffman_Encode(HuffmanNode** Tree, UCHAR* Source, BitBuffer* CodeTable[MAX_CHAR]);
void Huffman_Decode(HuffmanNode* Tree, BitBuffer* Encoded, UCHAR* Decoded);
void Huffman_BuildPrefixTree(HuffmanNode** Tree, SymbolInfo SymbolInfoTable[MAX_CHAR]);
void Huffman_BuildCodeTable(HuffmanNode* Tree, HuffmanCode CodeTable[MAX_CHAR], UCHAR Code[MAX_BIT], int Size);
void Huffman_PrintBinary(BitBuffer* Buffer);

#endif
```

### Huffman.c

```c
#incdlue "Huffman.h"

HuffmanNode* Huffman_CreateNode(SymbolInfo NewData)
{
  HuffmanNode* NewNode = (HuffmanNode*)malloc(sizeof(HuffmanNode));
  NewNode->Left;
  NewNode->Right;
  NewNode->Data = NewData;

  return NewNode;
}

void Huffman_DestroyNode(HuffmanNode* Node)
{
  free(Node);
}

void Huffman_DestroyTree(HuffmanNode* Node)
{
  if(Node == NULL)
    return;

  Huffman_DestroyTree(Node->Left);
  Huffman_DestroyTree(Node->Right);
  Huffman_DestroyNode(Node);
}

void Huffman_AddBit(BitBuffer* Buffer, char value)
{
  UCHAR Mask = 0x80;

  if(Buffer->Size % 8 == 0)
  {
    Buffer->Buffer = realloc(Buffer->Buffer, sizeof(UCHAR) * (Buffer->Size / 8) + 1);
    Buffer->Buffer[Buffer->Size / 8] = 0x00;
  }

  Mask >>= Buffer->Size % 8;

  if(Bit == 1)
    Buffer->Buffer[Buffer->Size / 8] |= Mask;
  else
    Buffer->Buffer[Buffer->Size / 8] &= ~Mask;
  
  Buffer->Size++;
}

void Huffman_Encode(HuffmanNode** Tree, UCHAR* Source, BitBuffer* CodeTable[MAX_CHAR])
{
  if(Tree == NULL)
    return;

  if(Tree->Left != NULL)
  {
    Code[Size] = 0;
    Huffman_BuildCodeTable(Tree->Left, CodeTable, Code, Size + 1);
  }

  if(Tree->Right != NULL)
  {
    Code[Size] = 1;
    Huffman_BuildCodeTable(Tree->Right, CodeTable, Code, Size + 1);
  }

  if(Tree->Left == NULL && Tree->Right == NULL)
  {
    int i;
    for (i = 0; i<Size; i++)
      CodeTable[Tree->Data,Symbol].Code[i] = Code[i];

    CodeTable[Tree->Data.Symbol].Size = Size;
  }
}

void Huffman_Decode(HuffmanNode* Tree, BitBuffer* Encoded, UCHAR* Decoded)
{
  int i = 0;
  PQNode Result;
  PriorityQueue* PQ = PQ_Create(0);

  for(i = 0; i < MAX_CHAR; i++)
  {
    if(SymbolInfoTable[i].Frequency > 0)
    {
      HuffmanNode* BitNode = Huffman_CreateNode(SymbolInfoTable[i]);
      PQNode NewNode;
      NewNode.Priority = SymbolInfoTable[i].Frequency;
      NewNode.Data = BitNode;
      PQ_Enqueue(PQ, NewNode);
    }
  }

  while(PQ->UsedSize > 1)
  {
    SymbolInfo NewData = {0, 0};
    HuffmanNode* BitNode = Huffman_CreateNode(NewData);
    HuffmanNode* Left;
    HuffmanNode* Right;

    PQNode QLeft;
    PQNode QRight;
    PQNode NewNode;

    PQ_Dequeue(PQ, &QLeft);
    PQ_Dequeue(PQ, &QRight);

    Left = (HuffmanNode*)QLeft.Data;
    Right = (HuffmanNode*)QRight.Data;

    BitNode->Data.Symbol = 0;
    BitNode->Data.Frequency = Left->Data.Frequency + Right->Data.Frequency;

    BitNode->Left = Left;
    BitNode->Right = Right;

    NewNode.Priority = BitNode->Data.Frequency;
    NewNode.Data = BitNode;

    PQ_Enqueue(PQ, NewNode);
  }

  PQ_Dequeue(PQ, &Result);
  *Tree = (HuffmanNode*)Result.Data;
}

void Huffman_BuildPrefixTree(HuffmanNode** Tree, SymbolInfo SymbolInfoTable[MAX_CHAR])
{
  int i = 0, j = 0;
  SymbolInfo SymbolInfoTable[MAX_CHAR];
  UCHAR Temporary[MAX_BIT];

  for(i = 0; i < MAX_CHAR; i++)
  {
    SymbolInfoTable[i].Symbol = i;
    SymbolInfoTable[i].Frequency = 0;
  }

  i = 0;
  while(Source[i] != '\0')
  {
    SymbolInfoTable[Source[i++]].Frequency++;
  }

  Huffman_BuildPrefixTree(Tree, SymbolInfoTable);
  
  Huffman_BuildCodeTable(*Tree, CodeTable, Temporary, 0);

  i = 0;
  while(Source[i] != '\n')
  {
    int BitCount = CodeTable[Source[i]].Size;
    for(j = 0; j < BitCount; j++)
      Huffman_Huffman_AddBit(Encoded, CodeTable[Source[i]].Code[j]);

    i++;
  }
}

void Huffman_BuildCodeTable(HuffmanNode* Tree, HuffmanCode CodeTable[MAX_CHAR], UCHAR Code[MAX_BIT], int Size)
{
  int i;
  int Index = 0;
  HuffmanNode* Current = Tree;

  for(i = 0; i <= Encoded->Size; i++)
  {
    UCHAR Mask = 0x80; // 1000 0000
    
    if(Current->Left == NULL && Current->Right == NULL)
    {
      Decoded[Index++] = Current->Data.Symbol;
      Current = Tree;
    }

    Mask >>= i % 8;

    if((Encoded->Buffer[i / 8] & Mask) != Mask)
      Current = Current->Left;
    else
      Current = Current->Right;
  }

  Decoded[Index] = '\0';
}

void Huffman_PrintBinary(BitBuffer* Buffer)
{
  int i;

  for(i = 0; i < Buffer->Size; i++)
  {
    UCHAR Mask = 0x80;
    Mask >>= i % 8;

    printf("%d", (Buffer->Buffer[i / 8] & Mask) == Mask);
  }
}
```

### TestHuffman.c

```c
#include "Huffman.h"
#include <string.h>

int main(voie)
{
  char* Source = "Lolem Ipsum";
  char* Decoded = "";

  HuffmanNode* Tree = NULL;
  BitBuffer Encoded = {NULL, 0};
  HuffmanCode CodeTable[MAX_CHAR];

  memset(&CodeTable, 0, sizeof(HuffmanCode) * MAX_CHAR);

  Huffman_Encode(&Tree, Source, &Encoded, CodeTable);

  printf("Original Size:%d Encoded Size:%d\n", (strlen(Source) + 1) * sizeof(char) * 8, Encoded.Size);

  Decoded = (char*)malloc(sizeof(char) * (strlen(Source) + 1));
  Huffman_Decode(Tree, &Encoded, Decoded);

  printf("Original : %s\n", Source);
  printf("Encoded : ");

  Huffman_PrintBinary(&Encoded);

  printf("\n");

  printf("Decoded : %s\n", Decoded);

  Huffman_DestroyTree(Tree);
  free(Decoded);

  return 0;
}

// 실행결과

...
```
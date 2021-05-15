---
layout: post
title: 해시 테이블
description: >
  Hash Table
hide_description: false
sitemap: false
date: 2021-04-10 13:29:00 +0900
category: algorithm
tag: [hash]
---

# [Hash]해시 테이블

> 해시의 정의
  : <u>입력받은 데이터를 토대로 새로운 값을 만드는 것</u>을 [해시(Hash)]()라고 한다.
{:.note title="attention"}

데이터를 입력받고 그 데이터로 새로운 값을 만들어 <u>그 값을 주소값으로 사용해 테이블을 만든 것</u>이 [해시 테이블(Hash Table)]()이다.

## 공간을 활용해 시간을 절약한다.

> 배열의 장점이 무엇일까? 아무래도 인덱스를 통한 데이터로의 빠른 접근이지 않을까? 해시 테이블 역시 입력받은 값을 토대로 만든 해시값을 데이터의 주소로 활용한 것이므로 같은 값을 검색하면 매칭되는 주소값으로 빠른 접근이 가능하다.
{:.note title="attention"}

## 해시 함수

> 이런 해시값을 만드는 알고리즘은 다양하다. 해시값을 만드는 기능(로직, 알고리즘)을 가진 함수를 해시함수라고 한다.
{:.note title="attention"}

* 해시 함수를 만드는 알고리즘은 다양한 형태가 있다. 물론 자신만의 해시 함수도 충분히 만들 수 있을 것이다. 이제 그 알고리즘 중에 몇가지를 소개해보겠다.

### 나눗셈법

> 해시 함수 알고리즘 중에서도 가장 간단한 알고리즘으로, 모듈러 연산을 통해 반환값을 어떤 특정한 수로 나눠 그 나머지를 해시값으로 사용하는 것이다.
{:.note title="attention"}

* 모듈러 연산을 통해 n으로 나눈 나머지들을 구하면 그 해시값은 0 ~ n-1의 값을 가지게 된다. 이는 배열과 매칭하기가 아주 좋다. n의 크기를 가지는 배열 역시 인덱스 값을 0 ~ n-1을 가지기 때문이다. 이를 구현하면 아래와 같다.

    ```c
    int Hash(int Input, int TableSize)
    {
        return Input % TableSize;
    }
    ```

* 일반적으로 이런 나눗셈법으로 만든 해시테이블의 크기는 [2의 제곱수와 거리가 먼 소수]()로 선정한다.

|앞|뒤|소수|
|:---:|:---:|:---:|
|2^5|2^6|53|
|2^6|2^7|97|
|2^7|2^8|193|
|2^8|2^9|389|
|2^9|2^10|769|
|2^10|2^11|1543|
|2^11|2^12|3079|
|2^12|2^13|6151|
|2^13|2^14|12289|
|2^14|2^15|24593|
|…|…|…|

* 구현

    * 구현을 위해 노드의 구조체를 만들면 그 멤버변수로 주소값을 저장할 Key와 데이터를 저장할 Value를 가져야 한다.

    ```c
    typedef int KeyType;
    typedef int ValueType;

    typedef struct tagNode
    {
        KeyType Key;
        ValueType Value;
    } Node;
    ```

    * HashTable.h

    ```c
    #ifndef HASH_TABLE_H
    #define HASH_TABLE_H

    #include <stdio.h>
    #include <stdlib.h>

    typedef int KeyType;
    typedef int ValueType;

    typedef struct tagNode
    {
        KeyType Key;
        ValueType Value;
    } Node;

    typedef struct tagHashTable
    {
        int TableSize;
        Node* Table;
    } HashTable;

    HashTable* CreateHashTable(int TableSize);
    void Set(HashTable* HT, KeyType Key, ValueType Value);
    ValueType Get(HashTable* HT, KeyType Key);
    void DestroyHashTable(HashTable* HT);
    int Hash(KeyType Key, int TableSize);

    #endif
    ```

    * HashTable.c

    ```c
    #include "HashTable.h"

    HashTable* CreateHashTable(int TableSize)
    {
        HashTable* HT = (HashTable*)malloc(sizeof(HashTable));
        HT->TableSize = TableSize;
        HT->Table = (Node*)malloc(sizeof(Node) * TableSize);

        return HT;
    }

    void Set(HashTable* HT, KeyType Key, ValueType Value)
    {
        int Address = Hash(Key, HT->TableSize);

        HT->Table[Address].Key = Key;
        HT->Table[Address].Value = Value;
    }

    ValueType Get(HashTable* HT, KeyType Key)
    {
        int Address = Hash(Key, HT->TableSize);
        
        return HT->Talbe[Address].Value;
    }

    void DestroyHashTable(HashTable* HT)
    {
        free(HT->Table);
        free(HT);
    }

    int Hash(KeyType Key, int TableSize)
    {
        return Key % TableSize;
    }
    ```

    * Test_HashTable.c

    ```c
    #include "HashTable.h"

    int main(void)
    {
        HashTable* HT = CreateHashTable(193);

        Set(HT, 815, 3578);
        Set(HT, 5, 578);
        Set(HT, 9872, 78);
        Set(HT, 84984, 8);

        printf("Key : %d, Value : %d\n", 815, Get(HT,815));
        printf("Key : %d, Value : %d\n", 5, Get(HT,5));
        printf("Key : %d, Value : %d\n", 9872, Get(HT,9872));
        printf("Key : %d, Value : %d\n", 84984, Get(HT,84984));

        DestroyHashTable(HT);

        return 0;
    }

    // 실행결과
    Key : 815, Value : 3578
    Key : 5, Value : 578
    Key : 9872, Value : 78
    Key : 84984, Value : 8
    ```

### 자릿수 접기

> 사실 나눗셈법에는 치명적인 약점이 있다. 다른 데이터값을 입력했을 때 같은 해시값이 나오는 [충돌(Collision)]()이 발생하기 쉽다는 것이다. 또한, 테이블 내의 일부 지역에 데이터들이 모이는 [클러스터링]()도 발생할 가능성이 높다. 이를 조금 보완한 것이 <u>자릿수 접기</u>이다.
> 자릿수 접기란 예를 들어 `8789`라는 숫자가 있으면 각 자리의 숫자를 더해 `8 + 7 + 8 + 9 = 32`를 만들어 해시값으로 사용하는 것이다. 꼭 숫자가 아니라 문자도 가능하다. 문자는 아스키코드와 대응시킬 수 있으므로 각 문자를 아스키코드로 변경하여 그 합을 해시값으로 사용할 수 있다.(물론 한글은 아스키코드에 포함되지 않으므로 유니코드를 사용해야 할 것이다.)
{:.note title="attention"}

* 문자열 자릿수접기

    > 위에서 설명했 듯 영어 문자열을 받아 해시값으로 변경하는 함수를 만들어 본다.

    ```c
    int Hash(char* Key, int KeyLength, int TableSize)
    {
        int i = 0;
        int HashValue = 0;

        for(i = 0; i < KeyLength; i++)
            HashValue += Key[i];

        return HashValue % TableSize;
    }
    ```

* 아스키코드에서 문자들을 나타내는 코드값은 0 ~ 127까지 존재한다. 만약 해시테이블의 크기가 12345이고 문자열키의 최대 길이가 10자리라 본다면 127 × 10 = 1270이므로 0 ~ 1270의 공간만을 사용하게 될 것이다. 즉 1271 ~ 12345 사이의 해시값들은 모두 사용되지 않는 상황이 된다.
* 또한, 아스키 코드로 10자리를 만들었을 때 조합할 수 있는 가지 수는 127의 10승(1,091,533,853,073,393,531,649 = 10해 9153경 3853조 733억 9353만 1649)가지가 되는데 그에 비해 사용할 수 있는 공간의 수는 12345밖에 되지 않는다. 12345개의 공간에 넣기엔 너무나 많은 경우의 수를 가지고 있다. 더군다나 그 모든 공간을 쓰지도 못하므로 1270개의 공간에 127의 10승을 넣어야한다. 일단 공간이라도 모두 써야한다. 이를 위해 비트 연산자를 활용한다.
* 일단 12345를 2진수로 변환하면 11000000111001으로 총 14개의 비트로 이루어져있다. 반면, 해시값으로 반환되는 수 중 최대값인 1270은 10011110110으로 11비트만으로 이루어져있다. 즉 3개의 비트는 전혀 사용되지 않는다는 것이다. 따라서 비트 연산자 (<<, >>, &, | 등)를 활용해 모든 공간을 활용할 수 있도록 하는 것이다.

```c
int Hash(KeyType Key, int KeyLength, int TableSize)
{
    int i = 0;
    int HashValue = 0;

    for(i = 0; i < KeyLength; i++)
        HashValue = (HashValue << 3 + Key[i])

    return HashValue % TableSize;
}
```

### 해시의 한계 : 충돌

> 위에서처럼 구현하더라도 조합의 수는 엄청나게 많은데 반해 그 공간은 제한적이다. 이로 인해 해시값의 중복, 즉 충돌은 일어날 수 밖에 없는데 어떤 해시 알고리즘이라도 이 충돌은 발생 할 수 밖에 없다.
> 하지만 이 충돌을 어쩔수 없다하여 그대로 놔둘수도 없는 노릇, 이를 해결하기 위한 여러 방법들을 다음 절에서 설명한다.
{:.note title="attention"}

## 충돌 해결

> 충돌의 해결 방법에는 크게 두가지가 있다.
> 1. 개방 해싱(Open Hashing) : 해시 테이블 주소 바깥에 새로운 공간을 할당해 해결
> 2. 폐쇄 해싱(Closed Hashing) : 해시 테이블 공간 안에서 문제를 해결
{:.note title="attention"}

### 체이닝(Chaining)

> 개방 해싱기법 중 하나인 체이닝이다.(체이닝은 오픈 해싱 기법인 동시에 폐쇄 주소법이기도 하다.) 체이닝이란 같은 해시값을 가지는 두 데이터가 발생해 충돌이 발생하면 각 데이터를 해당 주소에 있는 링크드 리스트에 삽입하여 문제를 해결하는 것이다. 사슬처럼 엮는다는 의미에서 체이닝이란 이름을 가진다고 한다.
{:.note title="attention"}

![체이닝의 모습](/assets/img/algorithm/chaining.png)
{:.lead loading="lazy" align="center"}

체이닝의 모습
{:.figcaption}

* 위 그림과 같은 모습으로 구현하기 위해서는 각 배열의 요소는 List로 구성되어야 한다. 그를 위한 구조체는 아래와 같다.

```c
typedef char* KeyType;
typedef char* ValueType;

typedef struct tagNode
{
    KeyType Key;
    ValueType Value;

    struct tagNode* Next;
} Node;

typedef Node* List;

typedef struct tagHashTable
{
    int TableSize;
    List* Table
} HashTable;
```

#### 체이닝 해시 테이블 탐색

> 체이닝은 충돌이 났을 시 테이블을 구성하는 방법에 대한 개념이다. 그러니 탐색 연산은 이를 염두에 두고 로직을 구성해야한다.
> 1. 탐색하려는 데이터를 해싱해 링크드 리스트가 저장되어 있는 주소를 찾는다.
> 2. 이 주소를 이용해 테이블에 저장되어 있는 리스트에 대한 포인터를 생성한다.
> 3. 이제 리스트를 순회하면서 목표값이 저장되어 있는지 비교 후 일치하면 해당 노드의 주소를 반환한다.
{:.note title="attention"}

* Get() 구현

```c
ValueType Get(HashTable* HT, KeyType Key)
{
    // 키 값을 해싱하여 주소를 찾음
    int Address = Hash(Key, strlen(Key), HT->TableSize);

    // 주소로 저장된 리스트를 생성
    List TheList = HT->Table[Address];
    List Target = NULL;

    if(TheList == NULL)
        return NULL;

    while(1)
    {
        // 일치하면 Target에 해당 노드 저장
        if(strcmp(TheList->Key, Key) == 0)
        {
            Target = TheList;
            break;
        }

        // 일치하지 않는다면 연결된 다음 노드 탐색
        if(TheList->Next == NULL)
            return NULL;
        else
            TheList = TheList->Next;
    }

    return Target->Value;
}
```

#### 체이닝 해시 테이블 삽입

> 체이닝 해시 테이블의 삽입은 탐색과 비슷한 원리이다. 해당 키값을 토대로 해시값을 생성하고 그 값에 매칭되는 테이블의 자리를 확인한다.
> 리스트가 있으면 <u>헤드 노드의 앞</u>에 삽입한다. 헤드 노드 앞에 삽입하는 이유는 테일 노드 뒤에 삽입하게 된다면 리스트가 길어지면 길어질 수록 삽입연산이 일어날 때마다 조회해야 하는 노드가 많아지기 때문이다. 헤드 노드 앞에 바로 삽입하게 되면 테일 노드를 찾아갈 필요 없기 때문에 리스트가 길어지더라도 부담이 없다.
> 물론 리스트가 없으면 바로 삽입하면 된다.
{:.note title="attention"}

```c
void Set(HashTable* HT, KeyType Key, ValueType Value)
{
    int Address = Hash(Key, strlen(Key), HT->TableSize);
    Node* NewNode = CreateNode(Key, Value);

    if(HT->Table[address] == NULL)
    {
        HT->Table[Address] = NewNode;
    }
    else
    {
        List L = HT->Table[Addres];
        NewNode->Next = L;
        HT->Table[Address] = NewNode;

        printf("Collision occured : Key(%s), Address(%d)\n",Key, Address");
    }
}
```

#### 모듈화

* Chaining.h

    ```c
    #ifndef CHAINING_H
    #define CHAINING_H

    #include <stdio.h> 
    #include <stdlib.h>
    #include <string.h>
    #include <memory.h>

    typedef char* KeyType;
    typedef char* ValueType;

    typedef struct tagNode
    {
        KeyType Key;
        ValueType Value;

        struct tagNode* Next;
    } Node;

    typedef Node* List;

    typedef struct tagHashTable
    {
        int TableSize;
        List* Table;
    } HashTable;

    HashTable* CreateHashTable(int TableSize);
    void DestroyHashTable(HashTable* HT);

    Node* CreateNode(KeyType Key, ValueType Value);
    void DestroyNode(Node* TheNode);

    void Set(HashTable* HT, KeyType Key, ValueType Value);
    ValueType Get(HashTable* HT, KeyType Key);
    int Hash(KeyType Key, int KeyLength, int TableSize);

    #endif
    ```

* Chaining.c

    ```c
    #include "Chaining.h"

    HashTable* CreateHashTable(int TableSize)
    {
        HashTable* HT = (HashTable*)malloc(sizeof(HashTable));
        HT->Table = (List*)malloc(sizeof(List) * TableSize);

        memset(HT->Table, 0, sizeof(List) * TableSize);

        HT->TableSize = TableSize;

        return HT;
    }

    Node* CreateNode(KeyType Key, ValueType Value)
    {
        Node* NewNode = (Node*)malloc(sizeof(Node));
        NewNode->Key = (char*)malloc(sizeof(char) * (strlen(Key) + 1));
        strcpy(NewNode->Key, Key);

        NewNode->Value = (char*)malloc(sizeof(char) * (strlen(Value) + 1));
        strcpy(NewNode->Value, Value);
        NewNode->Next = NULL;

        return NewNode;
    }

    void DestroyNode(Node* TheNode)
    {
        free(TheNode->Key);
        free(TheNode->Value);
        free(TheNode);
    }

    void Set(HashTable* HT, KeyType Key, ValueType Value)
    {
        int Address = Hash(Key, strlen(Key), HT->TableSize);
        Node* NewNode = CreateNode(Key, Value);

        if(HT->Table[Address] == NULL)
        {
            HT->Table[Address] = NewNode;
        }
        else
        {
            List L = HT->Table[Address];
            NewNode->Next = L;
            HT->Table[Address] = NewNode;

            printf("Collision occured : Key(%s), Address(%d)\n", Key, Address);
        }
    }

    ValueType Get(HashTable* HT, KeyType Key)
    {
        int Address = Hash(Key, strlen(Key), HT->TableSize);

        List TheList = HT->Table[Address];
        List Target = NULL;

        if(TheList == NULL)
            return NULL;

        while(1)
        {
            if(strcmp(TheList->Key, Key) == 0)
            {
                Target = TheList;
                break;
            }

            if(TheList->Next == NULL)
                return NULL;
            else
                TheList = TheList->Next;
        }
        return Target->Value;
    }

    void DestroyList(List L)
    {
        if(L == NULL)
            return;
        if(L->Next != NULL)
            DestroyList(L->Next);

        DestroyNode(L);
    }

    void DestroyHashTable(HashTable* HT)
    {
        int i = 0;
        for(i = 0; i<HT->TableSize; i++)
        {
            List L = HT->Table[i];

            DestroyList(L);
        }

        free(HT->Table);
        free(HT);
    }

    int Hash(KeyType Key, int KeyLength, int TableSize)
    {
        int i = 0;
        int HashValue = 0;

        for(i = 0; i < KeyLength; i++)
        {
            HashValue = (HashValue << 3) + Key[i];
        }

        return HashValue % TableSize;
    }

    ```

* Test_Chaining.c

    ```c
    #include "Chaining.h"

    int main(void)
    {
        HashTable* HT = CreateHashTable(12345);

        Set(HT, "NAVER", "Naver");
        Set(HT, "KAKAO", "Kakao");
        Set(HT, "RHL", "Red Hat Linux");
        Set(HT, "APAC", "Apache Org");
        Set(HT, "IBM", "IBM");
        Set(HT, "GOOGLE", "Google");
        Set(HT, "APPLE", "Apple");
        Set(HT, "SAMSUNG", "Samsung");
        Set(HT, "RS", "LG");
        Set(HT, "SK", "SK");

        printf("\n");
        printf("%d\n", Hash("NAVER", strlen("NAVER"), 12345));
        printf("%d\n", Hash("KAKAO", strlen("KAKAO"), 12345));
        printf("%d\n", Hash("RHL", strlen("RHL"), 12345));
        printf("%d\n", Hash("APAC", strlen("APAC"), 12345));
        printf("%d\n", Hash("IBM", strlen("IBM"), 12345));
        printf("%d\n", Hash("APPLE", strlen("APPLE"), 12345));
        printf("%d\n", Hash("SAMSUNG", strlen("SAMSUNG"), 12345));
        printf("%d\n", Hash("RS", strlen("RS"), 12345));
        printf("%d\n", Hash("SK", strlen("SK"), 12345));

        printf("Key:%s, Value:%s\n", "NAVER", Get(HT,"NAVER"));
        printf("Key:%s, Value:%s\n", "KAKAO", Get(HT,"KAKAO"));
        printf("Key:%s, Value:%s\n", "RHL", Get(HT,"RHL"));
        printf("Key:%s, Value:%s\n", "APAC", Get(HT,"APAC"));
        printf("Key:%s, Value:%s\n", "IBM", Get(HT,"IBM"));
        printf("Key:%s, Value:%s\n", "GOOGLE", Get(HT,"GOOGLE"));
        printf("Key:%s, Value:%s\n", "APPLE", Get(HT,"APPLE"));
        printf("Key:%s, Value:%s\n", "SAMSUNG", Get(HT,"SAMSUNG"));
        printf("Key:%s, Value:%s\n", "RS", Get(HT,"RS"));
        printf("Key:%s, Value:%s\n", "SK", Get(HT,"SK"));

        DestroyHashTable(HT);

        return 0;
    }

    // 실행결과

    Collision occured : Key(SK), Address(739)

    901
    219
    5900
    1952
    5277
    4372
    6315
    739
    739
    Key:NAVER, Value:Naver
    Key:KAKAO, Value:Kakao
    Key:RHL, Value:Red Hat Linux
    Key:APAC, Value:Apache Org
    Key:IBM, Value:IBM
    Key:GOOGLE, Value:Google
    Key:APPLE, Value:Apple
    Key:SAMSUNG, Value:Samsung
    Key:RS, Value:LG
    Key:SK, Value:SK
    ```

### 개방 주소법

> 앞서 알아봤던 체이닝은 해시 함수에 의해 얻어진 주소만을 사용해 해시 테이블을 구성하는 알고리즘이다.
> 개방 주소법은 충돌이 일어날 때 해시 함수에 의해 얻어진 주소가 아니더라도 얼마든지 다른 주소를 사용할 수 있도록 허용하는 충돌 해결 알고리즘이다. 
> 충돌이 일어나면 해시 테이블 내의 새로운 주소를 탐사하여 충돌된 데이터를 입력하는 방식으로 동작한다. 즉, 개방 주소법은 탐사가 중요하다.
{:.note title="attention"}

#### 선형 탐사(Linear Probing)

> 선형 탐사는 말 그대로 해시 함수로부터 얻어낸 주소로 충돌이 발생할 경우 현재 주소에서 고정폭만큼 이동하여 비어있으면 데이터를 저장하는 방식이다.
{:.note title="attention"}

![선형탐사](/assets/img/algorithm/linear_probing.png)
{:.lead loading="lazy" align="center"}

선형탐사
{:.figcaption}

* 그림을 보면 해시 테이블에 삽입된 데이터들이 모이게 되는 클러스터(Cluster) 현상이 발생한다는 것을 알 수 있다. 이를 다소 개선한 것이 다음의 제곱 탐사이다.

#### 제곱 탐사(Quadratic Probing)

> 제곱 탐사는 선형 탐사가 이동하는 방식과 비슷하지만 이동 간격이 충돌횟수의 제곱만큼 늘어난다는 것만 다르다. 간단히 말해 첫번째 충돌은 1의 제곱인 1만큼 이동, 이동한 주소에도 데이터가 저장되어 있다면 이제 2의 제곱인 4만큼 이동하는 방식이다.
{:.note title="attention"}

* 하지만 제곱 탐사 역시 클러스터에 자유롭지 못하다. 같은 주소값을 가지는 데이터들이 삽입된다면 순차적으로 늘어나는 값의 제곱수는 동일하기 때문에 어짜피 고정폭만큼씩 이동하게 되어 클러스터가 발생한다.
이제 이런 충돌 시 이동간격의 규칙성을 없애는 탐사 방법을 알아보자.

#### 이중 해싱(Double Hashing)

> 이중 해싱이란 이동 폭을 정하는 방식을 또 다른 해싱 함수를 사용하는 것으로 정하는 것이다.
{:.note title="attention"}

* 먼저 코드부터 살펴보자.

    ```c
    int Hash(int Key)
    {
        return Key % 13;
    }

    int Hash2(int Key)
    {
        return (Key % 7) + 6;
    }
    ```

    해당 코드로 동작하는 원리를 그림으로 알아본다.

    ![이중 해싱](/assets/img/algorithm/double_hashing.png)
    {:.lead loading="lazy" align="center"}

    이중 해싱
    {:.figcaption}

#### 재해싱(Rehashing)

> 재해싱은 해시 테이블의 여유 공간이 적어질 경우 나타나는 성능 저하를 해결하기 위한 알고리즘이다. 해시 테이블의 크기를 늘리고 모든 데이터를 다시 해싱하여 배치하는 것이다.
{:.note title="attention"}

#### 모듈화

* OpenAddressing.h

```c
#ifndef OPEN_ADDRESSING_H
#define OPEN_ADDRESSING_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef char* KeyType;
typedef char* ValueType;

// 해시 테이블 요소가 비었는지를 나타내는 enum
enum ElementStatus
{
    EMPTY = 0,
    OCCUPIED = 1
};

typedef struct tagElementType
{
    KeyType Key;
    ValueType Value;

    enum ElementStatus Status;
} ElementType;

typedef struct tagHashTable
{
    int OccupiedCount;
    int TableSize;

    ElementType* Table;
} HashTable;

HashTable* CreateHashTable(int TableSize);
void DestroyHashTable(HashTable* HT);
void ClearElement(ElementType* Element);

void Set(HashTable** HT, KeyType Key, ValueType Value);
ValueType Get(HashTable* HT, KeyType Key);
int Hash(KeyType Key, int KeyLength, int TableSize);
int Hash2(KeyType Key, int KeyLength, int TableSize);

void Rehash(HashTable** HT);

#endif
```

* OpenAddressing.c

```c
#include "OpenAddressing.h"

HashTable* CreateHashTable(int TableSize)
{
    HashTable* HT = (HashTable*)malloc(sizeof(HashTable));
    HT->Table = (ElementType*)malloc(sizeof(ElementType) * TableSize);

    memset(HT->Table, 0, sizeof(ElementType) * TableSize);

    HT->TableSize = TableSize;
    HT->OccupiedCount = 0;

    return HT;
}

void Set(HashTable** HT, KeyType Key, ValueType Value)
{
    int KeyLen, Address, StepSize;
    double Usage;

    Usage = (double)(*HT)->OccupiedCount / (*HT)->TableSize;

    if(Usage > 0.5)
    {
        Rehash(HT);
    }

    KeyLen = strlen(Key);
    Address = Hash(Key, KeyLen, (*HT)->TableSize);
    StepSize = Hash2(Key, KeyLen, (*HT)->TableSize);

    while((*HT)->Table[Address].Status != EMPTY &&
           strcmp((*HT)->Table[Address].Key, Key) != 0)
    {
        printf("Collision occured! : Key(%s), Address(%d), StepSize(%d)\n", Key, Address, StepSize);
        Address = (Address + StepSize) % (*HT)->TableSize;
    }

    (*HT)->Table[Address].Key = (char*)malloc(sizeof(char) * (KeyLen + 1));
    strcpy((*HT)->Table[Address].Key, Key);

    (*HT)->Table[Address].Value = (char*)malloc(sizeof(char) * (strlen(Value) + 1));

    strcpy((*HT)->Table[Address].Value, Value);

    (*HT)->Table[Address].Status = OCCUPIED;

    (*HT)->OccupiedCount++;

    printf("Key(%s) entered at address(%d)\n", Key, Address);
}

ValueType Get(HashTable* HT, KeyType Key)
{
    int KeyLen = strlen(Key);

    int Address = Hash(Key, KeyLen, HT->TableSize);
    int StepSize = Hash2(Key, KeyLen, HT->TableSize);

    while(HT->Table[Address].Status != EMPTY &&
          strcmp(HT->Table[Address].Key, Key) != 0)
    {
        if(HT->Table[Address].Status == EMPTY)
            return NULL;

        Address = (Address + StepSize) % HT->TableSize;
    }

    return HT->Table[Address].Value;
}

void ClearElement(ElementType* Element)
{
    if(Element->Status == EMPTY)
        return;

    free(Element->Key);
    free(Element->Value);
}

void DestroyHashTable(HashTable* HT)
{
    int i = 0;
    for (i = 0; i < HT->TableSize; i++)
    {
        ClearElement(&(HT->Table[i]));
    }

    free(HT->Table);
    free(HT);
}

int Hash(KeyType Key, int KeyLength, int TableSize)
{
    int i = 0;
    int HashValue = 0;
    for(i = 0; i < KeyLength; i++)
        HashValue = (HashValue << 3) + Key[i];

    HashValue = HashValue % TableSize;

    return HashValue;
}

int Hash2(KeyType Key, int KeyLength, int TableSize)
{
    int i = 0;
    int HashValue = 0;

    for(i = 0; i < KeyLength; i++)
        HashValue = (HashValue << 2) + Key[i];

    HashValue = HashValue % (TableSize - 6);

    return HashValue + 6;
}

void Rehash(HashTable** HT)
{
    int i = 0;
    ElementType* OldTable = (*HT)->Table;

    HashTable* NewHT = CreateHashTable((*HT)->TableSize * 2);

    printf("Rehashing...(New HT Size : %d)\n", NewHT->TableSize);

    for(i = 0; i < (*HT)->TableSize; i++)
    {
        if(OldTable[i].Status == OCCUPIED)
            Set(&NewHT, OldTable[i].Key, OldTable[i].Value);
    }

    DestroyHashTable((*HT));

    (*HT) = NewHT;
}
```

* Test_OpenAddressing.c

```c
#include "OpenAddressing.h"

int main(void)
{
    HashTable* HT = CreateHashTable(17);

    Set(&HT, "NAVER", "Naver");
    Set(&HT, "KAKAO", "Kakao");
    Set(&HT, "RHL", "Red Hat Linux");
    Set(&HT, "APAC", "Apache Org");
    Set(&HT, "IBM", "IBM");
    Set(&HT, "GOOGLE", "Google");
    Set(&HT, "APPLE", "Apple");
    Set(&HT, "SAMSUNG", "Samsung");
    Set(&HT, "RS", "LG");
    Set(&HT, "SK", "SK");

    printf("\n");
    printf("Key:%s, Value:%s\n", "NAVER", Get(HT,"NAVER"));
    printf("Key:%s, Value:%s\n", "KAKAO", Get(HT,"KAKAO"));
    printf("Key:%s, Value:%s\n", "RHL", Get(HT,"RHL"));
    printf("Key:%s, Value:%s\n", "APAC", Get(HT,"APAC"));
    printf("Key:%s, Value:%s\n", "IBM", Get(HT,"IBM"));
    printf("Key:%s, Value:%s\n", "GOOGLE", Get(HT,"GOOGLE"));
    printf("Key:%s, Value:%s\n", "APPLE", Get(HT,"APPLE"));
    printf("Key:%s, Value:%s\n", "SAMSUNG", Get(HT,"SAMSUNG"));
    printf("Key:%s, Value:%s\n", "RS", Get(HT,"RS"));
    printf("Key:%s, Value:%s\n", "SK", Get(HT,"SK"));

    DestroyHashTable(HT);

    return 0;
}

// 실행결과
Key(NAVER) entered at address(2)
Key(KAKAO) entered at address(14)
Key(RHL) entered at address(1)
Key(APAC) entered at address(6)
Key(IBM) entered at address(7)
Collision occured! : Key(GOOGLE), Address(6), StepSize(15)
Key(GOOGLE) entered at address(4)
Key(APPLE) entered at address(10)
Collision occured! : Key(SAMSUNG), Address(1), StepSize(11)
Key(SAMSUNG) entered at address(12)
Key(RS) entered at address(8)
Rehashing...(New HT Size : 34)
Key(RHL) entered at address(18)
Key(NAVER) entered at address(2)
Key(GOOGLE) entered at address(23)
Collision occured! : Key(APAC), Address(23), StepSize(33)
Key(APAC) entered at address(22)
Key(IBM) entered at address(7)
Key(RS) entered at address(25)
Key(APPLE) entered at address(27)
Key(SAMSUNG) entered at address(1)
Key(KAKAO) entered at address(31)
Collision occured! : Key(SK), Address(25), StepSize(21)
Key(SK) entered at address(12)

Key:NAVER, Value:Naver
Key:KAKAO, Value:Kakao
Key:RHL, Value:Red Hat Linux
Key:APAC, Value:Apache Org
Key:IBM, Value:IBM
Key:GOOGLE, Value:Google
Key:APPLE, Value:Apple
Key:SAMSUNG, Value:Samsung
Key:RS, Value:LG
Key:SK, Value:SK
```
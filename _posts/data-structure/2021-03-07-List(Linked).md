---
layout: post
title: List(3)-LinkedList
description: >
  LinkedList
hide_description: false
sitemap: false
category: data-structure
tag: [List]
---

# [List]List(3)-LinkedList


### Data-Structure

> Data-Structure의 대상은 Memory
> RAM == Random Access Memory

### LinkedList의 구조

- node(vertext) : 마디, 교점, (정점, 꼭지점)
  - C : 구조체 , OOP : 객체
  - Data Field : 실제 Data Value
  - Link Field : 해당 node의 다음 node가 무엇인지에 대한 정보

- Head : 첫 번째 node가 무엇인지에 대한 정보

[VisualGo](https://visualgo,net) : Data-Structure가 어떻게 동작하는지 시각화하여 보여주는 사이트

### Insert

LinkedList 가장 앞에 데이터 추가
{:.note}

``` java
Node temp = new Node(input)
// 삽입할 새로운 노드 생성
temp.next = head
// 생성된 node의 다음 node 정보를 현재의 head(첫 node의 정보)
head = temp
// head의 정보를 새로 생성한 노드로 변경
```

LinkedList 중간에 데이터 추가
{:.note}

``` java
Node temp1 = head
// 변수 temp1에 가장 첫 node를 저장
while(--k!=0){
  temp1 = temp1.next
}
// k는 원하는 index
// --k -> 실행되기 전에 -1하고 실행
// 해당 loop문으로 temp1은 한단계씩 우리가 원하는 자리의 직전 node로 접근한다.
// 원하는 index 이전의 node를 탐색하는 과정
// 새로운 node의 이전 node가 될 node
Node temp2 = temp1.next
// Insert를 원하는 index에 있는 node
// 새로운 node의 다음 node가 될 node
Node newNode = new Node(input)
// Insert할 node 생성
temp1.next = newNode
// 이전 node 연결
newNode.next = temp2
// 다음 node 연결
```
위의 코드는 유사코드로 실제 코드와는 다름
{:.figcation}

### Remove

LinkedList  중간 데이터 삭제
{:.note}

``` java
Node cur = head
while(--k!=0){
  cur = cur.next
}
Node toBeDeleted = cur.next
// 이 과정이 수행되지 않으면 다음 과정을 수행 할 수 없다.
// 즉 삭제한 후 Link가 끊기게 되므로 연결을 다시 지정해 준 후
// 삭제해주어야 한다.
cur.next = cur.next.next
// 삭제할 node의 다음 node를 삭제 이전의 node의 next로 지정
toBeDeleted.remove();
```

### Array List vs Linked List

* Array List
  - Array List는 Memory상에 데이터(Element)들이 연속적으로 배치되어있음
  - Index로 빠른 접근이 가능
  - 데이터 추가/삭제 시 재배치가 필요하기 때문에 그 과정이 느리다.

* Linked List
  - Linked List는 Memory상에 데이터(Element)들'끼리' 연결되어 있음
  - Head부터 시작해 Link를 타고 조회해야하므로 상대적으로 느림
  - 데이터 추가/삭제 시 재배치의 필요없이 Link Field만 변경해주면 되기때문에 빠르다.
  - List의 크기가 한정되어 있지 않음

|    구분     | 추가/삭제 | 인덱스 조회 |
| :---------: | :-------: | :---------: |
| Array List  |   느림    |    빠름     |
| Linked List |   빠름    |    느림     |
---
layout: page
title: 개요
description: >
  자료구조의 시작
hide_description: false
sitemap: false
---

# 자료구조 개요

### Data Structure

- Efficient Access and Modification
  자료구조는 서비스나 어플리케이션에서 필요한 데이터를 메모리에 어떻게 구조적으로 잘 정리해서 담아두고 관리하고 최종적으로는 가장 효율적인 방식으로 필요한 데이터에 빠르게 접근하고 필요한 **수정 삽입 삭제**할 수 있도록 도와준다.

> 서비스에서 Client에게 데이터를 제공하거나 application에서 사용자에게 필요한 데이터를 보여 주거나 수정 할 때 효율적으로 일을 처리하기 위해서는 기능에 적합한 알맞는 자료구조를 쓰는 것이 정말 중요하다.
> 어떤 자료구조를 쓰냐에 따라 사용자가 원하는 기능을 수행하는데 0.2초가 걸릴 수도, 2초가 걸릴수도 있기 때문

### Key Point

|      Key       | Content                 |
| :------------: | :---------------------- |
|    `Order`     | Data들의 순서 보장 여부 |
|    `Unique`    | 중복데이터 가능 여부    |
|    `Search`    | 검색의 효율성           |
| `Modification` | 수정의 효율성           |

### 자료구조의 종류

![Kind-of-Data-structure](/assets/img/data-structure/data-structure-kindof.PNG)
{:.lead loading="lazy" align="center"}

- 선형구조

  > 크게 리스트, 스택, 큐로 나눌 수 있다.

  1. **리스트**
     - Linked List
     - Double Linked List
     - Circular Linked List
     - Array List
  2. **스택**
     - FILO(First In, Last Out)
  3. **큐**
     - FIFO(First In, First Out)

- 비선형구조
  > 트리, 그래프 등으로 나눌 수 있다.
  1. **트리**
     - 일반 트리
     - 이진 트리
     - B 트리
  2. **그래프**
  3. **Set**
     - 집합의 개념. 자료들의 중복이 없음.
  4. **Map**
     - Key와 Value를 Paring하여 저장하는 구조.

---
layout: post
title: Bubble Sort
description: >
  Bubble Sort
hide_description: false
sitemap: false
date: 2021-03-10 23:05:00 +0900
category: algorithm
tag: [sort]
---

# 버블 정렬(Bubble Sort)

### 다음의 숫자들을 오름차순으로 정렬하는 프로그램 만들기

#### 1 10 5 8 7 6 4 3 2 9

---

### 옆에 있는 값과 비교해서 더 작은 값을 앞으로 보내기

```
1 10 5 8 7 6 4 3 2 9

1 10 5 8 7 6 4 3 2 9

1 5 10 8 7 6 4 3 2 9

1 5 8 10 7 6 4 3 2 9

1 5 8 7 10 6 4 3 2 9

...

1 2 3 4 5 6 7 8 9 10
```

> 위와 같이 계속적으로 과정을 수행하게 되면 가장 큰 값이 가장 오른쪽으로 가게 되는 양상을 띄게 된다.
> 인접한 두 개의 값만을 비교하고 두 값의 위치만 바꾸는 과정을 계속적으로 하는 과정이라 직관적으로 봐도 효율이 떨어지는 알고리즘이라는 것을 알 수 있다.

```c

#include <stdio.h>

int main(void){
  int i, j, temp;
  int array[10] = {1, 10, 5, 8, 7, 6, 4, 3, 2, 9};
  // 스와핑을 위한 변수 temp
  for (i = 0; i < 10; i++){
    for(j = 0; j < 9 - i; j++){
      if(array[j] > array[j + 1]){
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  // 출력
  for(i = 0; i < 10; i ++){
    printf("%d ", array[i]);
  }

  return 0;
}

```

### Bubble Sort의 시간복잡도

&nbsp;&nbsp;단순히 반복적으로 인접한 두 개의 숫자를 비교하여 좀 더 작은 값을 앞으로 보내는 과정을 수행한다. 이 과정에서 각 싸이클마다 가장 큰 값이 맨 뒤로 보내지게 된다. 그리고 해당 사이클(첫 번째 for문)에서 정해진 가장 큰 값의 위치는 고정되게 되며, 이로써 시간 복잡도는 앞서 공부했던 Selection Sort와 동일하게 된다.

<center>
$$ O(N^2) $$
</center>
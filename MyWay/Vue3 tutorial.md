# Vue3 tutorial 

참고사이트 : [바로가기](https://vuejs.org/tutorial/#step-1)



### 1. Getting Started ( Declarative Rendering )

* Limitations of `reactive()`
  1. it only works for object types (objects, arrays, and [collection types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) such as `Map` and `Set`).
  2. **Cannot replace entire object** : 끊어짐 발생
  3. **Not destructure-friendly** : 분해가 안됨
* `script setup`
  * ref (recomm)

```vue
<script setup>
import { ref, reactive } from 'vue'

const message = ref("Hello Vue, i'm Kingdong")
const counter = reactive({
  count : 0,
})
</script>

<template>
  <h1>{{ message }}</h1>
  <h3>
    {{ counter.count }} // 이렇게 사용합니다.
  </h3>
</template>
```



### 2. Attribute Bindings

* we use the `v-bind` directive

> In Vue, mustaches are only used for text interpolation. 
>
> To bind an attribute to a dynamic value, we use the `v-bind` directive

```vue
<script setup>
import { ref } from 'vue'

const titleClass = ref('title')
</script>

<template>
  <h1 :class="titleClass">Make me red</h1>
</template>

<style>
.title {
  color: red;
}
</style>
```



### 3. Event Listeners

* We can listen to DOM events using the `v-on` directive

> the function, we can update the component state by mutating refs.

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">count is: {{ count }}</button>
</template>
```



### 4. Form Bindings

* Using `v-bind` and `v-on` together, we can create two-way bindings on form input element

* `v-model`

  * ```vue
    <input :value="text" @input="onInput">
    ```

  * prior ver

  * ```vue
    <script setup>
    import { ref } from 'vue'
    
    const text = ref('')
    
    function onInput(e) {
      text.value = e.target.value
    }
    </script>
    
    <template>
      <input :value="text" @input="onInput" placeholder="Type here">
      <p>{{ text }}</p>
    </template>
    ```

  * v-model 적용

  * ```vue
    <script setup>
    import { ref } from 'vue'
    
    const text = ref('')
    </script>
    
    <template>
      <input v-model="text" placeholder="Type here">
      <p>{{ text }}</p>
    </template>
    ```

    

### 5. Conditional Rendering

* We can use the `v-if` directive to conditionally render an element

```vue
<script setup>
import { ref } from 'vue'

const awesome = ref(true)

function toggle() {
  awesome.value = !awesome.value
}
</script>

<template>
  <button @click="toggle">toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
</template>
```



### 6. List Rendering

* We can use the `v-for` directive to render a list of elements based on a source array
* `:key=""`

```vue
<script setup>
import { ref } from 'vue'

// give each todo a unique id
let id = 0

const newTodo = ref('')
const todos = ref([
  { id: id++, text: 'Learn HTML' },
  { id: id++, text: 'Learn JavaScript' },
  { id: id++, text: 'Learn Vue' }
])

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value })
  newTodo.value = ''
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>Add Todo</button>    
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>
```



### 7. Computed Property

* Introducing [`computed()`](https://vuejs.org/guide/essentials/computed.html). We can create a computed ref that computes its `.value` based on other reactive data sources
* 진짜 중요 ! => computed, function 은 차이가 있어! 차이를 표시해 놓는게 좋다.
* computed는 기존 값을 계산해서 **새로운** 객체나 값을 만들어서 사용하는 것.
* function은 기존 값을 **바꾸는** 작업. (action)

```vue
<script setup>
import { ref, computed } from 'vue'

let id = 0

const newTodo = ref('')
const hideCompleted = ref(false)
const todos = ref([
  { id: id++, text: 'Learn HTML', done: true },
  { id: id++, text: 'Learn JavaScript', done: true },
  { id: id++, text: 'Learn Vue', done: false }
])

// todos를 바꾸지 않고 (기존의 data) 계산해서 새롭게 쓰려는 것.
const filteredTodos = computed(() => {
  if (hideCompleted.value === true) {
    return todos.value.filter((t) => !t.done)
  }
  return todos.value
  
})

// 기존의 data를 바꾸고 렌더링 하는 것.
function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value, done: false })
  newTodo.value = ''
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>
```



### 8. Lifecycle and Template Refs

![Component lifecycle diagram](https://vuejs.org/assets/lifecycle.16e4c08e.png)

```vue
<script setup>
import { ref, onMounted,  } from 'vue'

const pElementRef = ref("hello")
// onMounted 는 마운트 되고 나서 하므로 이 영역이 실행이 마지막에 된다. 이후 update로
onMounted(() => {
  pElementRef.value.textContent = 'mounted! 이게 더 늦는다는 얘긴가?'
})
</script>

<template>
  <p ref="pElementRef">hello</p>
</template>
```



### 9. Watchers

* `watch()` can directly watch a ref, and the callback gets fired whenever `count`'s value changes. 

* ```vue
  <script setup>
  import { ref, watch } from 'vue'
  
  const todoId = ref(1)
  const todoData = ref(null)
  
  async function fetchData() {
    todoData.value = null
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    todoData.value = await res.json()
  }
  
  fetchData()
  
  watch(todoId, fetchData)
  </script>
  
  <template>
    <p>Todo id: {{ todoId }}</p>
    <button @click="todoId++">Fetch next todo</button>
    <p v-if="!todoData">Loading...</p>
    <pre v-else>{{ todoData }}</pre>
  </template>
  ```



### 10. Components

* Real Vue applications are typically created with nested components.

* ```vue
  <!-- ParentComp.vue -->
  
  <script setup>
  import ChildComp from './ChildComp.vue'
  </script>
  
  <template>
    <ChildComp />
  </template>
  ```

* ```vue
  <!-- ChildComp.vue -->
  
  <template>
    <h2>A Child Component!</h2>
  </template>
  ```



### 11. Props

* Note `defineProps()` is a compile-time macro

* Once declared, the `msg` prop can be used in the child component's template

  ```vue
  <!-- ParentComp.vue -->
  
  <script setup>
  import { ref } from 'vue'
  import ChildComp from './ChildComp.vue'
  
  const greeting = ref('Hello from parent')
  </script>
  
  <template>
    <ChildComp :msg="greeting"/>
  </template>
  ```

* ```vue
  <!-- ChildComp.vue -->
  
  <script setup>
  import { ref } from 'vue'
  const props = defineProps({
    msg: String
  })
  </script>
  <template>
    <p>{{msg}}</p>
  </template>
  ```

* 

### 12. Emits

* The first argument to `emit()` is the event name. Any additional arguments are passed on to the event listener.

* The parent can listen to child-emitted events using `v-on`

* ```vue
  <!-- ParentComp.vue -->
  
  <script setup>
  import { ref } from 'vue'
  import ChildComp from './ChildComp.vue'
  
  const childMsg = ref('No child msg yet')
  </script>
  
  <template>
    <ChildComp @response="(msg) => childMsg = msg" />
    <p>{{ childMsg }}</p>
  </template>
  ```

* ```vue
  <!-- ChildComp.vue -->
  
  <script setup>
  const emit = defineEmits(['response'])
  
  emit('response', 'hello from child')
  </script>
  
  <template>
    <h2>Child component</h2>
  </template>
  ```



### 13. Slots

* In the child component, it can render the slot content from the parent using the `<slot>` element as outlet

  ```vue
  <!-- ParentComp.vue -->
  
  <script setup>
  import { ref } from 'vue'
  import ChildComp from './ChildComp.vue'
  
  const msg = ref('from parent')
  </script>
  
  <template>
    <ChildComp>하위 slot 영역 모두가 {{ msg }}</ChildComp>
  </template>
  ```



* ```vue
  <!-- ChildComp.vue -->
  
  <template>
    <h1>
      여기는 child
    </h1>
    <slot>Fallback content</slot> // 여기가 Parent
    <h1>
      여기도 child
    </h1>
  </template>
  ```

* 
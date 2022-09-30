<template>
  <div class="todolist-panel">
    <NewTodo></NewTodo>
    <todolist title="TO-DO"></todolist>
    <todolist title="DONE"></todolist>
</div>
</template>

<script>
import NewTodo from '../../components/NewToDo'
import todolist from '../../components/TodoList'

export default {
  components: {
    NewTodo,
    todolist
  }
}
</script>

<style lang="scss" scoped>
.todolist-panel {
  padding-top: 48px;
}
</style>

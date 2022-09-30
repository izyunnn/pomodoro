<template>
  <div class="newTodo">
    <input type="text" placeholder="ADD A NEW MISSION…"  v-model="todo" @keyup.enter="onAddToDo">
    <a @click="onAddToDo">+</a>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'NewToDo',
  components: {},
  setup () {
    const todo = ref('')
    const store = useStore()
    function onAddToDo () {
      if (!this.todo) return
      const dateTime = Date.now()
      const timestamp = Math.floor(dateTime / 1000)
      store.commit('AddToDo', { title: this.todo, id: timestamp, finish: false })
      this.todo = ''
    }
    return { onAddToDo, todo }
  }
}
</script>
<style scoped lang="scss">
.newTodo {
  color: #00A7FF;
  height: 56px;
  width: 445px;
  background-color:#FFFFFF 0% 0% no-repeat padding-box;
  position: relative;
  opacity: 1;
  input {
    // padding: 0px;
    border: none;
    padding-left: 16px;
    padding-right: 40px;
    width: 100%;
    height: 100%;
    font-size: 16px;
    color:#00A7FF;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #00A7FF;
      font-size: 16px;
      font-weight: bold;
      font-style: italic;
      letter-spacing: 1px;
    }
  }
  a {
    color: #00A7FF;
    position: absolute;
    right: 16px;
    top: 16px;
    width: 24px;
    height: 24px;
    font-size: 24px;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
  }
  &.break {
    input {
      color:#ff4384;
      &::placeholder {
        color: #ff4384;
      }
    }
    a{
      color:#ff4384;
    }
  }
}
</style>

<template>
  <div class="todo-list-block">
    <div class="title-bar">
      {{title}}
      <i class="material-icons title-bar-arrow" :class="closed?'close':''" @click="toggleLsit">arrow_drop_down</i>
    </div>
    <ul class="todo-list" :class="closed?'close':''">
      <li class="todo" v-for="todo in todolist" :key="todo.id">
        <input type="checkbox" :id="todo.id" class="checkbox" @change="CompleteMission($event,todo)" :checked="todo.finish"/>
        <label :for="todo.id"></label>
        <span class="content" :class="todo.finish?'done':''" >{{todo.title}}</span>
        <i class="material-icons doItNow" @click="DoItNow(todo)">play_circle_outline</i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      closed: false
    }
  },
  methods: {
    toggleLsit () {
      this.closed = !this.closed
    },
    CompleteMission (event, todo) {
      const index = this.$store.state.todolist.indexOf(todo)
      const checked = event.target.checked
      this.$store.commit('CompleteMission', { index, checked })
    },
    DoItNow (todo) {
      this.$store.commit('ChangeToDoNow', todo)
    }
  },
  computed: {
    todolist () {
      const list = this.$store.state.todolist
      return list.filter(todo => todo.finish === (this.title === 'DONE'))
    }
  }
}
</script>

<style lang="scss" scoped>
.title-bar {
  width: 445px;
  height: 44px;
  background-color: rgba(grey, 0.2);
  color: white;
  font-size: 24px;
  font-weight: bold;
  padding: 8px 16px;
  position: relative;
}

.title-bar-arrow {
  font-size: 24px;
  position: absolute;
  right: 16px;
  transition: 0.5s;
  cursor: pointer;
  &.close {
    transform: rotate(180deg);
  }
}
.todo-list-block {
  margin-top: 48px;
  width: 445px;
}

.todo-list {
  list-style: none;
  padding: 0px;
  transition: 0.5s;
  height: 180px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
  &.close {
    height: 0px;
    overflow: hidden;
  }
  .todo {
    width: 100%;
    height: 32px;
    position: relative;
    margin-bottom: 9px;
    border-bottom: 1px solid rgba(white, 0.2);
          line-height: 24px;

    .content {
      display: inline-block;
      position: absolute;
      left: 28px;
      top: 3px;
      height: 24px;
      font-size: 16px;
      color: white;
      line-height: 24px;
      font-weight: bold;
      &.done{
        text-decoration:line-through;
      }
    }
    .doItNow{
      font-size: 24px;
      float: right;
      color: white;
      margin-top: 3px;
      transition: 0.3s;
      &:hover{
        cursor:pointer;
        color:#ff4384;
        }
    }
    .checkbox {
      display: none;
    }
    label {
      display: inline-block;
      width: 24px;
      height: 24px;
      border: 1px solid rgba(white, 0);
      border-radius: 50%;
      position: relative;
      vertical-align: middle;
      opacity: 1;
    }

    label::before {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
      cursor: pointer;
      position: absolute;
      content: "";
      opacity: 1;
      transition: 0.5s;
      vertical-align: middle;
    }

    label::after {
      transition: opacity 0.5s ease;
      transition-delay: 0.25s;
      cursor: pointer;
      position: absolute;
      content: "";
      opacity: 1;
    }

    .checkbox:checked + label::before {
      // animation:ani2 .5s ;
      border: 2px solid white;
      //transform: scale(2, 2);
      opacity: 1;
    }

    .checkbox:checked + label::after {
      border: 2px solid white;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
      width: 12px;
      height: 6px;
      top: 50%;
      margin-top: -6px;
      left: 50%;
      margin-left: -5px;
      opacity: 1;
    }
  }
}
</style>

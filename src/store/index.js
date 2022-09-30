import { createStore } from 'vuex'
export default createStore({
  namespaced: true,
  state: {
    mode: 'work',
    timer: null,
    modeTime: {
      work: 300,
      break: 60
    },
    audio: null,
    todoNowID: 1,
    todolist: [
      { id: 1, title: 'THE FIRST THING TO DO TODAY', finish: false },
      { id: 2, title: 'THE SECOND THING TO DO TODAY', finish: false },
      { id: 3, title: 'THE THIRD THING TO DO TODAY', finish: false },
      { id: 4, title: 'THE FORTH THING TO DO TODAY', finish: false },
      { id: 5, title: 'THE FIX THING TO DO TODAY', finish: false },
      { id: 6, title: 'THE SIX THING TO DO TODAY', finish: false }
    ]
  },
  getters: {
    DisplayTime (state) {
      const time = state.mode === 'work' ? state.modeTime.work : state.modeTime.break
      const min = Math.floor(time / 60)
      const sec = time % 60
      return `${min < 10 ? 0 : ''}${min}:${sec < 10 ? 0 : ''}${sec}`
    },
    ToDoNow (state) {
      const ToDoNow = state.todolist.filter(todo => todo.id === state.todoNowID)
      return ToDoNow[0]
    },
    otherTodo (state) {
      let otherTodo = state.todolist.filter(
        todo => todo.id !== state.todoNowID && todo.finish !== true
      )
      otherTodo = otherTodo.slice(0, 4)
      return otherTodo
    }
  },
  mutations: {
    AddToDo (state, newTodo) {
      state.todolist.push(newTodo)
    },
    CompleteMission (state, { index, checked }) {
      state.todolist[index].finish = checked
    },
    StartTimer (state) {
      state.timer = setInterval(() => state.modeTime[state.mode]--, 1000)
    },
    StopTimer (state) {
      clearInterval(state.timer)
      state.timer = null
    },
    ChangeToDoNow (state, todoNow) {
      state.todoNowID = todoNow.id
      clearInterval(state.timer)
      state.timer = null
      state.modeTime.work = 300
      state.modeTime.break = 60
      state.mode = 'work'
    },
    ResetTimer (state) {
      state.modeTime.work = 300
      state.modeTime.break = 60
    },
    ChangeMode (state) {
      const mode = state.mode === 'work' ? 'break' : 'work'
      state.mode = mode
    }
  }
})

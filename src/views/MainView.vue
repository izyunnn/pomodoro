<template>
  <div class="main" :class="this.$store.state.mode === 'work' ? '':'break'">
    <div class="left">
      <div class="mainSideBar">
        <router-link to="/ToDoList" class="active">
          <i class="SideBarButton material-icons">list</i>
          TO-DO LIST
        </router-link>
        <router-link to="/Analytics">
          <i class="SideBarButton material-icons">assessment</i>
          ANALYTICS
        </router-link>
        <router-link to="/RingtoneList">
          <i class="SideBarButton material-icons">library_music</i>
          RINGTONES
        </router-link>
      </div>
      <div class="clock">
        <div class="button">
          <svg v-if="this.$store.state.mode === 'work'" class="timer" :value="Percent" :options="{radius: 54,circleWidth: 10,pathColors: ['', '#00A7FF']}"></svg>
          <svg v-else key="12123" class="timer" :value="Percent" :options="{radius: 54,circleWidth: 10,pathColors: ['', '#00a7ff']}"></svg>
          <i class="material-icons play-btn" @click="startCounter">
            {{timer === null ? "play_circle_filled" : "pause_circle_filled"}}
          </i>
        </div>
        <div class="display-time">{{DisplayTime}}</div>
        <div class="todo-now">{{ToDoNow.title}}</div>
      </div>
    </div>
    <div class="right">
      <router-link to="/" class="back-btn">
        <i class="material-icons">close</i>
      </router-link>
      <div class="logo">POMODORO</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'MainView',
  components: {},
  setup () {
    const store = useStore()
    const DisplayTime = computed(() => store.getters.DisplayTime)
    const ToDoNow = computed(() => store.getters.ToDoNow)
    const timer = computed(() => store.state.timer)
    function startCounter () {
      if (timer.value === null) {
        store.commit('StartTimer')
      } else {
        store.commit('StopTimer')
      }
    }
    return { startCounter, DisplayTime, ToDoNow, timer }
  },
  computed: {
    Percent () {
      const base = this.$store.state.mode === 'work' ? 300 : 60
      const percent = 100 - (this.$store.state.modeTime[this.$store.state.mode] / base) * 100
      if (percent === 100) {
        this.$store.commit('StopTimer')
        this.$store.commit('ResetTimer')
        this.$store.commit('ChangeMode')
        const ToDoNow = this.$store.getters.ToDoNow
        const index = this.$store.state.todolist.indexOf(ToDoNow)
        this.$store.commit('CompleteMission', { index, checked: true })
      }
      return percent
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #003164;
  &.break {
    .router-link-exact-active {
      color: #00a7ff;
    }
    .clock {
      .button {
        &::before {
          border: #00a7ff 2px solid;
        }
      }
      .play-btn {
        color: #00a7ff;
      }

      .display-time {
        color: #00a7ff;
      }
    }
  }
}
.left {
  position: relative;
  width: 43.75%;
  height: 100%;
  .mainSideBar {
    position: relative;
    font-size: 36px;
    left: 85px;
    top: 48px;
    font-weight: bold;
  }
  i {
    font-size: 36px;
  }
  a {
    line-height: 36px;
    font-size: 36px;
    height: 36px;
    display: block;
    text-decoration: none;
    margin-bottom: 42px;
    color: rgba(#ffffff, 0.2);
    letter-spacing: 1px;
  }
  .router-link-exact-active {
    color: #00A7FF;
  }
  .clock {
    width: 350px;
    height: 350px;
    background-color: #E5F3FF;
    border-radius: 50%;
    position: absolute;
    transform: translateY(50%);
    bottom: 0px;
    left: 85px;
    .timer {
      position: absolute;
      height: 110px;
      width: 110px;
      left: 4px;
      top: 4px;
    }
  }
  .button {
    position: absolute;
    width: 116px;
    height: 116px;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    border-radius: 50%;
    background-color: #003164;
    box-sizing: border-box;
    &::before {
      content: " ";
      width: 104px;
      height: 104px;
      position: absolute;
      border: #00A7FF 2px solid;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translateY(-50%) translateX(-50%);
    }
    .play-btn {
      color: #00A7FF;
      font-size: 110px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      &::before {
        content: "";
        position: absolute;
        background-color: #fff;
        width: 50%;
        height: 50%;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
        z-index: -1;
      }
      &:hover{
        cursor: pointer;
      }
    }
  }
  .display-time {
    position: absolute;
    left: 50%;
    top: 57px;
    transform: translateX(-50%);
    font-size: 64px;
    color: #00A7FF;
    font-weight: bold;
  }
  .todo-now {
    position: absolute;
    left: 50%;
    top: 132px;
    width: 232px;
    text-align: center;
    transform: translateX(-50%);
    font-size: 16px;
    font-weight: bold;
    color: #003164;
  }
}
.right {
  position: relative;
  width: 56.25%;
  height: 100%;
  .back-btn {
    position: absolute;
    right: 85px;
    top: 48px;
    width: 48px;
    height: 48px;
    color: white;
    i {
      font-size: 48px;
    }
  }
  .logo {
        position: absolute;
        bottom: 48px;
        color: white;
        left: 90%;
        writing-mode: vertical-lr;
        font-size: 30px;
        font-weight: bold;
        line-height: 36px;
        width: 100%;
        letter-spacing: 1px;
      }
}
</style>

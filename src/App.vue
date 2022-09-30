<template>
  <div id="app">
    <transition name="fade" mode="out-in">
    </transition>
    <router-view />
  </div>
</template>

<style lang="scss">
@import 'material-icons/iconfont/material-icons.css';
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
* {
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
}
#app {
  height: 100%;
  min-width: 1280px;
  min-height: 721px;
  overflow: hidden;
  background-color: #003164;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

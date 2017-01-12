<template>
  <div id="app">
    <BarMenu></BarMenu>
    <Stories></Stories>
  </div>
</template>

<script>
import BarMenu from './components/BarMenu'
import Stories from './components/Stories'
/* import $ from 'jquery' */
export default {
  name: 'app',
  components: {
    BarMenu,
    Stories
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>

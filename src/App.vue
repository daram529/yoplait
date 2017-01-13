<template>
  <div id="app">
    <BarMenu></BarMenu>
    <main class="ui container" id="content">
      <Stories></Stories>
    </main>
    <StoriesTest></StoriesTest>
  </div>
</template>

<script>
import $ from 'jquery'
import BarMenu from './components/BarMenu'
import Stories from './components/Stories'
import ScrapBook from './components/ScrapBook'
import StoriesTest from './components/StoriesTest'
export default {
  name: 'app',
  components: {
    BarMenu,
    Stories,
    ScrapBook,
    StoriesTest
  },
  mounted: function () {
    $('.ui.sticky')
    .sticky({
      context: '#app'
    })
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

#content {
  padding-top:50px;
  width:80%;
}

body {
  flex: 1 0 auto;
  display: flex;
  height: 100%;
  background-color: #f2f2f2;
  flex-direction: column;
}
</style>

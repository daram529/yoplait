<template>
  <div id="app">
    <BarMenu></BarMenu>
    <Grandline></Grandline>
    <!--<div class="ui grid huge inverted menu">
      <a class="one wide column item">
        Home(Logo)
      </a>
      <div class="eleven wide column item">
        <div class="ui fluid left icon input">
          <input type="text" placeholder="Search...">
          <i class="search icon"></i>
        </div>
      </div>
      <a class="two wide column item">
        여행 글 쓰러 가기
      </a>
      <div class="two wide column right item">
          <div class="ui simple dropdown">
            Dropdown
            <i class="dropdown icon"></i>
            <div class="menu">
              <div class="item">Choice 1</div>
              <div class="item">Choice 2</div>
              <div class="item">Choice 3</div>
            </div>
        </div>
      </div>
    </div>-->
     <!--<hello></hello> -->
  </div>
</template>

<script>
import BarMenu from './components/BarMenu'
import Grandline from './components/Grandline'
/* import $ from 'jquery' */
export default {
  name: 'app',
  components: {
    BarMenu,
    Grandline
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

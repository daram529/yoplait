<template>
  <div id="app">
    <div class="ui grid sidebar visible top menu">
      <div class="one wide column item">
        Logo Here
      </div>
      <div class="fourteen wide column right item">
        <!--<div class="ui container">-->
          <div class="ui fluid icon input">
            <input placeholder = "Search" type="text">
            <i class="search icon"></i>
          </div>
        <!--</div>-->
      </div>
      <div class="one wide column item">
        <div class="ui button">
          Sign in
        </div>
      </div>
    </div>
    <div class="ui container">
      <div class="ui segment" id="main">
        <div class="ui right dividing rail">
          <div class="ui sticky segment" id="sticker" v-on:dragover.prevent v-on:drop="onDrop">
            Right Rail Content
          </div>
        </div>
        <div draggable="true" @dragstart="onDragStart">Drag me!</div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Hello from './components/Hello'
// import $ from 'jquery'
export default {
  name: 'app',
  components: {
    Hello
  },
  mounted: function () {
    console.log($('ui.sticky'))
    console.log($(this.$el).find('#sticker'))
    // $(this.$el).find('#sticker')
    $('.ui.sticky').sticky({
      context: '#main'
    })
  },
  methods: {
    onDrop: function (ev) {
      console.log(ev.target)
    },
    onDragStart: function (ev) {
      ev.dataTransfer.setData("text", ev.target.id)
    }
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
  margin-top: 60px;
}
</style>

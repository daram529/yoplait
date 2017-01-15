<template>
    <div class="storycard" v-on:mouseover="onMouseOver" v-on:mouseleave="onMouseLeave">
        <div class="ui fluid card">
            <div class="content">
              <div>
              <h3 class = "title">
                {{story.storyTitle}}
              </h3>
              </div>
              <div>
              <h5 class = "time">
                {{story.storyDate}}
              </h5>
              </div>
              
              <!--여기에 제목이랑 날짜 필요-->
            </div>
            <div class="ui blurring dimmable small centered image">
              <div class="ui inverted dimmer">
                <div class="content">
                </div>
              </div>
              <img class="ui image" :id="'imageDimmer' + index" :src="story.storyPhoto">
            </div>
            <div class="content" style="border:none;">
              <ol>
                <li v-for="chapter in story.chapterList">
                  {{chapter}}
                </li>
              </ol>
            </div>
            <div class="extra content">
              <div class="name">
                {{story.storyName}}
              </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'storycard',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onMouseOver: function () {
      $('#imageDimmer'+this.index).stop().animate({opacity:0.5},100)
    },
    onMouseLeave: function () {
      $('#imageDimmer'+this.index).stop().animate({opacity:1}, 100)
    }
  },
  props: ['story', 'index']
}
</script>

<style scoped>
.ui.card:hover {
  border: 1px solid #283593;
  cursor: pointer;
}

.ui .content{
  padding:10px;
  text-align: left;
}

.title{
  margin:0px;
}

.time {
  color:gray;
  margin:0px;
}

ol {
  float:left;
  text-align: left;
  margin:0px;
  padding-left: 16px;
}
</style>
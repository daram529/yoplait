<template>
  <div class="ui raised card" draggable="true" v-on:dragstart="onDS" v-on:mouseover="onMouseOver" v-on:mouseleave="onMouseLeave">
    <!--<div class="ui text container">-->
      <div class="content">
        <h2 class="ui header chapterlocation" href="#" v-on:click="onClick">{{chapter.chapterLocation}}</h2>
      </div>
    <div class="ui center aligned content"> 
      {{chapter.chapterDescription}} 
    </div>
    <div class="ui extra content">
      <div class="ui segment" :class="{stacked: chapter.chapterPhotoList.length > 1}">
        <div class="ui dimmable medium image">
        <div class="ui image inverted dimmer" :id="'imageDimmer'+index">
          <div class="content">
            <div class="center">
              <div class="ui left floated icon button" v-on:click="onLeftClick"><i class="angle left icon"/></div>
              <div class="ui right floated icon button" v-on:click="onRightClick"><i class="angle right icon"/></div>
            </div>
          </div>
        </div>
        <img :src="chapter.chapterPhotoList[curImageIdx]">
      </div>
    </div>
    <ChapterDetail :chapter="chapter" :index="index"></ChapterDetail>
  </div>
</template>

<script>
// import $ from 'jquery'
/* eslint-disable */
import ChapterDetail from './ChapterDetail'
export default {
  name: 'chaptercard',
  props: ['chapter', 'index', 'onDragStart'],
  components: {
    ChapterDetail
  },
  methods: {
    onClick: function () {
      $('#modal'+this.index).modal('show')
    },
    onDS: function (ev) {
      console.log(ev.target)
      ev.dataTransfer.setData('text/plain', ev.target.id)
      this.onDragStart(this.chapter)
      console.log(ev.dataTransfer)
    },
    onLeftClick: function () {
      this.imageIndex -= 1
    },
    onRightClick: function () {
      this.imageIndex += 1
    },
    onMouseOver: function () {
      $('#imageDimmer'+this.index).dimmer('show')
    },
    onMouseLeave: function () {
      $('#imageDimmer'+this.index).dimmer('hide')
    }
  },
  data: function () {
    return {imageIndex: 0}
  },
  computed: {
    curImageIdx: function () {
      return (this.imageIndex % this.chapter.chapterPhotoList.length)
    }
  },
  /* eslint-disable */
  mounted: function () {
    $('#card'+this.index).on('hover', function () {
      $('#imageDimmer'+this.index).dimmer({
        on: 'hover'
      })
    })

  }
}
</script>


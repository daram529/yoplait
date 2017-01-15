<template>
  <div class="chaptercard">
    <!--fluid-->
    <div class="ui raised card" draggable="true" v-on:dragstart="onDS" v-on:mouseover="onMouseOver" v-on:mouseleave="onMouseLeave">
      <ChapterDetail :chapter="chapter" :index="index" :content-visible="contentVisible"></ChapterDetail>
      <div class="content" id="titleContent">
        <h3 class="ui header chapterlocation" href="#" v-on:click="onClick">{{chapter.chapterLocation}}</h2>
      </div>
      <div v-if="contentVisible" class="ui center aligned container"> 
        {{chapter.chapterDescription}} 
      </div>
      <div v-if="contentVisible" class="ui extra content">
        <div class="ui segment">
          <div class="ui dimmable small centered image">
            <div class="ui image inverted dimmer" :id="'imageDimmer'+index">
              <div class="content">
                <div class="center">
                  <div class="ui left floated icon button" v-on:click="onLeftClick"><i class="angle left icon"/></div>
                  <div class="ui right floated icon button" v-on:click="onRightClick"><i class="angle right icon"/></div>
                </div>
              </div>
            </div>
            <img :src="this.chapter.chapterPhotoList[curImageIdx]">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
/* eslint-disable */
import ChapterDetail from './ChapterDetail'
export default {
  name: 'chaptercard',
  props: ['chapter', 'index', 'onDragStart', 'contentVisible'],
  components: {
    ChapterDetail
  },
  methods: {
    onClick: function () {
      $('#modal'+ (this.contentVisible ? '' : 'scrap') + this.index).modal('show')
    },
    onDS: function (ev) {
      console.log(ev)
      ev.dataTransfer.dropEffect = 'copy'
      ev.dataTransfer.effectAllowed = 'copy'
      ev.dataTransfer.setData('text/plain', ev.target.id)
      this.onDragStart(this.index)
      console.log(ev.dataTransfer)
    },
    onLeftClick: function () {
      // console.log(this.curImageIndex)
      // this.imageIndex -= 1
      console.log(this)
      this.imageIndex = (this.imageIndex - 1 + this.chapter.chapterPhotoList.length) % this.chapter.chapterPhotoList.length
    },
    onRightClick: function () {
      // this.imageIndex += 1
      this.imageIndex = (this.imageIndex + 1) % this.chapter.chapterPhotoList.length
    },
    onMouseOver: function () {
      if(this.contentVisible){
        $('#imageDimmer'+this.index).dimmer('show')
      }
    },
    onMouseLeave: function () {
      if(this.contentVisible){
        $('#imageDimmer'+this.index).dimmer('hide')
      }
    }
  },
  data: function () {
    return {imageIndex: 0}
  },
  computed: {
    curImageIdx: function () {
      return ((this.imageIndex + this.chapter.chapterPhotoList.length) % this.chapter.chapterPhotoList.length)
    }
  },
  /* eslint-disable */
  mounted: function () {
    // $('#card'+this.index).on('hover', function () {
    //   $('#imageDimmer'+this.index).dimmer({
    //     on: 'hover'
    //   })
    // })

  }
}
</script>

<style>
.dotted_line{
  content:"";
  top: 0;
  bottom: 0;
  left: 50%;
  border-left: 2px dotted black;
}
</style>


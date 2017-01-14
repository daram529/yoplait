<template>
  <div class="ui fluid raised card" v-on:mouseover="onMouseOver" v-on:mouseleave="onMouseLeave">
    <ChapterAddDetail :chapter="chapter" :index="index" :save-new-chapter="saveNewChapter"></ChapterAddDetail>
    <div class="content">
      <h2 class="ui header chapterlocation" >{{newChapter.chapterLocation}}</h2>
      <button class="ui basic icon button" v-on:click="onClick"><i class="edit icon"/></button>
    </div>
    <div class="ui center aligned container"> 
      {{newChapter.chapterDescription}} 
    </div>
    <div class="ui extra content">
      <div class="ui segment" :class="{stacked: newChapter.chapterPhotoList.length > 1}">
        <div class="ui dimmable image">
        <div class="ui image inverted dimmer" :id="'imageDimmer'+index">
          <div class="content">
            <div class="center">
              <div class="ui left floated icon button" v-on:click="onLeftClick"><i class="angle left icon"/></div>
              <div class="ui right floated icon button" v-on:click="onRightClick"><i class="angle right icon"/></div>
            </div>
          </div>
        </div>
        <img :src="this.newChapter.chapterPhotoList[curImageIdx]">
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ChapterAddDetail from './ChapterAddDetail'
export default {
  name: 'chapteraddcard',
  props: ['chapter', 'index', 'modifyChapter'],
  components: {
    ChapterAddDetail
  },
  methods: {
    onClick: function () {
      $('#addModal'+ this.index).modal('show')
    },
    onLeftClick: function () {
      console.log(this)
      this.imageIndex = (this.imageIndex - 1 + this.newChapter.chapterPhotoList.length) % this.newChapter.chapterPhotoList.length
    },
    onRightClick: function () {
      this.imageIndex = (this.imageIndex + 1) % this.newChapter.chapterPhotoList.length
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
    },
    saveNewChapter: function (chapter) {
      this.newChapter = chapter
      this.modifyChapter(this.newChapter, this.index)
    }
  },
  data: function () {
    return {
      newChapter: this.chapter,
      imageIndex: 0
    }
  },
  computed: {
    curImageIdx: function () {
      return ((this.imageIndex + this.chapter.chapterPhotoList.length) % this.chapter.chapterPhotoList.length)
    }
  },
  /* eslint-disable */
  mounted: function () {

  }
}
</script>


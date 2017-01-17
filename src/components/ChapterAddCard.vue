<template>
  <div class="chapteraddcard">
    <div class="ui fluid raised card" v-on:mouseover="onMouseOver" v-on:mouseleave="onMouseLeave">
      <ChapterAddDetail :date="date" :storageRef="storageRef" :chapter="chapter" :index="index" @saveNewChapter="onSaveNewChapter"></ChapterAddDetail>
      <div class="content" style="padding-left:5px; padding-right:5px;" v-on:click="onClick">
        <h3 class="ui header chapterlocation">{{newChapter.chapterLocation}}</h3>
      </div>
      <div class="content" style="border:0; padding-top:0;" v-on:click="onClick">
        <button class="ui basic icon button" v-on:click="onClick"><i class="edit icon"/></button>
      </div>
      <div class="ui center aligned container" v-if="chapter.chapterTip!=''" v-on:click="onClick" id="temp">
        <i class="idea icon"/>
        {{newChapter.chapterTip}}
      </div>
      <div class="ui extra content">
        <div class="ui segment">
          <div class="ui dimmable medium image">
            <div class="ui image inverted dimmer" :id="'imageDimmer'+newChapter.chapterKey">
              <div class="content">
                <div class="center">
                  <div class="ui left floated icon button" v-on:click="onLeftClick"><i class="angle left icon"/></div>
                  <div class="ui right floated icon button" v-on:click="onRightClick"><i class="angle right icon"/></div>
                </div>
              </div>
            </div>
          <img v-if="this.newChapter.chapterPhotoList" :src="this.newChapter.chapterPhotoList[curImageIdx]">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ChapterAddDetail from './ChapterAddDetail'
export default {
  name: 'chapteraddcard',
  props: ['chapter', 'index', 'date', 'modifyChapter', 'storageRef'],
  components: {
    ChapterAddDetail
  },
  methods: {
    onClick: function () {
      $('#addModal'+this.newChapter.chapterKey).modal('show')
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
        $('#imageDimmer'+this.newChapter.chapterKey).dimmer('show')
      }
    },
    onMouseLeave: function () {
      if(this.contentVisible){
        $('#imageDimmer'+this.newChapter.chapterKey).dimmer('hide')
      }
    },
    onSaveNewChapter: function (chapter) {
      this.newChapter = chapter
      console.log(this.newChapter)
      this.$emit('modifyChapter', this.newChapter, this.index, this.date)
    }
  },
  data: function () {
    return {
      newChapter: {
        chapterKey: this.chapter.chapterKey,
        chapterLocation: this.chapter.chapterLocation,
        chapterPhotoList: [],
        chapterDescription: '',
        chapterTip: ''
      },
      imageIndex: 0
    }
  },
  computed: {
    curImageIdx: function () {
      return ((this.imageIndex + this.newChapter.chapterPhotoList.length) % this.newChapter.chapterPhotoList.length)
    }
  },
  /* eslint-disable */
  mounted: function () {

  }
}
</script>

<style>
#temp {
  /*-o-text-overflow: ellipsis;    Opera 
  text-overflow:    ellipsis;    IE, Safari (WebKit) */
  overflow:hidden;              /* don't show excess chars */
  /*white-space:nowrap;            force single line */
  width: 77%;                 /* fixed width */
  line-height:1.2em;
  max-height: 2.4em;
  font-size:12px;
}
</style>

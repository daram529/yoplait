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
      <div class="ui center aligned container" v-on:click="onClick"> 
        {{newChapter.chapterDescription}}
      </div>
      <div class="ui center aligned container" v-on:click="onClick"> 
        {{newChapter.chapterTip}} 
      </div>
      <div class="ui extra content">
        <div class="ui segment">
          <div class="ui dimmable medium image">
            <div class="ui image inverted dimmer" :id="'imageDimmerd'+date+'i'+index">
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
      $('#addModald'+ this.date + 'i' + this.index).modal('show')
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
        $('#imageDimmerd'+this.date+'i'+this.index).dimmer('show')
      }
    },
    onMouseLeave: function () {
      if(this.contentVisible){
        $('#imageDimmerd'+this.date+'i'+this.index).dimmer('hide')
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


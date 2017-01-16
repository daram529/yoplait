<template>
  <div class="chaptercard">
    <!--fluid-->
    <div class="ui raised card" draggable="true" v-on:dragstart="onDS" v-on:mouseover="onMouseOver" v-on:mouseleave="onMouseLeave">
      <ChapterDetail :chapter="chapter" :index="index" :date="date" :content-visible="contentVisible"></ChapterDetail>
      <div class="content" id="titleContent" v-on:click="onClick">
        <h3 class="ui header chapterlocation" href="#">{{chapter.chapterLocation}}</h2>
      </div>
      <div v-if="contentVisible" class="ui center aligned container" v-on:click="onClick" id="temp"> 
        {{chapter.chapterTip}}
      </div>
      <div v-if="contentVisible" class="ui content" style="border:none;">
        <div class="ui dimmable small centered image" :id="'imageDimmer'+'i'+index+'d'+date">
          <div class="ui image inverted dimmer">
            <div class="content">
              <div class="center">
                <i class="left floated black large angle left icon" v-if="chapter.chapterPhotoList.length>1" v-on:click="onLeftClick"/>
                <i class="right floated black large angle right icon"  v-if="chapter.chapterPhotoList.length>1" v-on:click="onRightClick"/>
              </div>
            </div>
          </div>
          <img v-if="this.chapter.chapterPhotoList" :src="this.chapter.chapterPhotoList[curImageIdx]">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ChapterDetail from './ChapterDetail'
export default {
  name: 'chaptercard',
  props: ['chapter', 'index', 'date', 'onDragStart', 'contentVisible'],
  components: {
    ChapterDetail
  },
  methods: {
    onClick: function () {
      $('#modal'+ (this.contentVisible ? '' : 'scrap') + 'i' + this.index + 'd'+ this.date).modal('show')
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
        // $('#imageDimmer'+'i'+this.index+'d'+this.date).stop().animate({opacity:0.5},100)
        $('#imageDimmer'+'i'+this.index+'d'+this.date).dimmer('show')
      }
    },
    onMouseLeave: function () {
      if(this.contentVisible){
        // $('#imageDimmer'+'i'+this.index+'d'+this.date).stop().animate({opacity:1}, 100)
        $('#imageDimmer'+'i'+this.index+'d'+this.date).dimmer('hide')
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
    $('#imageDimmer'+'i'+this.index+'d'+this.date).dimmer({
      opacity: 0.4
    })
  }
}
</script>

<style>
.ui.card:hover {
  /*border: 1px solid #C5CAE9;*/
  cursor: pointer;
}

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

.dotted_line{
  content:"";
  top: 0;
  bottom: 0;
  left: 50%;
  border-left: 2px dotted black;
}
</style>


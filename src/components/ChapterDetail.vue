<template>
  <div class="ui modal" :id= "'modal' + (contentVisible ? '' : 'scrap') + 'i' + index + 'd' + date">
    <!--<i class="close icon"></i>-->
    <div class="header">
      Details
    </div>
    <div class="ui center aligned image content" id="image_content">
      <div class="ui medium images">
        <Button id="button" v-if="chapter.chapterPhotoList && chapter.chapterPhotoList.length >2" class="ui left floated icon huge button" @click="onLeftClick"><i class="angle left icon"/></Button>
        <img v-for="(imgSrc, idx) in chapter.chapterPhotoList" v-show="(idx == curImageIdx) || (idx == nextImageIdx)" class="ui image" :src="imgSrc">
        <!--<img v-if="chapter.chapterPhotoList" class="ui image" :src="chapter.chapterPhotoList[curImageIdx]">
        <img v-if="chapter.chapterPhotoList && chapter.chapterPhotoList.length >= 2" class="ui image" :src="chapter.chapterPhotoList[nextImageIdx]">-->
        <Button id="button" v-if="chapter.chapterPhotoList && chapter.chapterPhotoList.length >2" class="ui right floated icon huge button" @click="onRightClick"><i class="angle right icon"/></Button>
      </div>
    </div>
    <div class="content">
      <div class="description">
        <div class="ui header">{{chapter.chapterLocation}}</div>
        <p>{{chapter.chapterDescription}}</p>
      </div>
    </div>
    <div class="ui divider"></div>
    <div class="content">
      <h4 class="ui header">Tips!</h4>
      <div class="tips">
        <p>{{chapter.chapterTip}}</p>
      </div>
    </div>
    <div class="actions">
      <div class="ui positive right labeled icon button">
        OK
        <i class="checkmark icon"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'chapterdetail',
  props: ['chapter', 'index', 'contentVisible', 'date'],
  data: function () {
    return {imageIndex: 0}
  },
  computed: {
    curImageIdx: function () {
      return ((this.imageIndex + this.chapter.chapterPhotoList.length) % this.chapter.chapterPhotoList.length)
    },
    nextImageIdx: function () {
      return ((this.imageIndex + 1 + this.chapter.chapterPhotoList.length) % this.chapter.chapterPhotoList.length)
    }
  },
  methods: {
    onLeftClick: function () {
      this.imageIndex -= 1
    },
    onRightClick: function () {
      this.imageIndex += 1
    }
  },
  /* eslint-disable */
  mounted: function () {
    if(this.contentVisible){
      $('#imageDimmer'+this.index).dimmer({
        on: 'hover'
      })
    }
  }
}
</script>

<style>
#button {
  margin-top:80px;
}

#image_content {
  width:90%;
  margin:auto;
}

</style>

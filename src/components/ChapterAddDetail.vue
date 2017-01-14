<template>
  <div class="ui modal" :id="'addModal' + index">
    <div class="header">
      Details
    </div>
    <div class="image content">
      <div class="ui medium images">
        <img v-for="imgsrc in chapter.chapterPhotoList" class="ui image" :src=imgsrc>
      </div>
    </div>
    <div class="content">
      <div class="description">
        <div class="ui header"><input v-model="newChapter.chapterLocation" type="text"></input></div>
        <textarea v-model="newChapter.chapterDescription"></textarea>
        <textarea v-model="newChapter.chapterTips" :placeholder="this.chapter.chapterTip"></textarea>
      </div>
    </div>
    <div class="actions">
      <div class="ui green right labeled icon button" v-on:click="onOKClick">
        OK
        <i class="checkmark icon"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'chapteradddetail',
  props: ['chapter', 'index', 'saveNewChapter'],
  data: function () {
    return {
      newChapter: {
        chapterLocation: this.chapter.chapterLocation,
        chapterDescription: '',
        chapterTip: '',
        chapterPhotoList: []
      }
    }
  },
  computed: {
    curImageIdx: function () {
      return (this.imageIndex % this.chapter.chapterPhotoList.length)
    }
  },
  methods: {
    onLeftClick: function () {
      this.imageIndex -= 1
    },
    onRightClick: function () {
      this.imageIndex += 1
    },
    /* eslint-disable */
    onOKClick: function () {
      this.saveNewChapter(this.newChapter)
      $('#addModal' + this.index).modal('hide')
    }
  },
  /* eslint-disable */
  mounted: function () {

  }
}
</script>

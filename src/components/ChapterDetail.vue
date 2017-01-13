<template>
  <div class="ui modal" :id= "'modal' + index">
    <!--<i class="close icon"></i>-->
    <div class="header">
      Details
    </div>
    <div class="image content">
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
      <div class="description">
        <div class="ui header">{{chapter.chapterLocation}}</div>
        <p>{{chapter.chapterDescription}}</p>
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
  props: ['chapter', 'index'],
  data: function () {
    return {imageIndex: 0}
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
    }
  },
  /* eslint-disable */
  mounted: function () {
    $('#imageDimmer'+this.index).dimmer({
      on: 'hover'
    })
  }
}
</script>

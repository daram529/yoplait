<template>
  <div class="ui modal" :id="'addModal' + index">
    <div class="header">
      Details
    </div>
    <div class="image content">
      <div class="ui medium images">
        <img v-for="imgsrc in newChapter.chapterPhotoList" class="ui image" :src="imgsrc">
      </div>
    </div>
    <div class="content">
      <div class="description">
        <div class="ui header"><input v-model="newChapter.chapterLocation" type="text"></input></div>
        <textarea v-model="newChapter.chapterDescription" :placeholder="this.chapter.chapterDescription"></textarea>
        <textarea v-model="newChapter.chapterTips" :placeholder="this.chapter.chapterTip"></textarea>
        <div>
          <label for="file" class="ui icon button">
                <i class="file icon"></i>
                Open File</label>
          <input type="file" id="file" style="display:none" v-on:change="onFileChange">
        </div>
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
  props: ['chapter', 'index', 'saveNewChapter', 'storageRef'],
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
      this.$emit('saveNewChapter', this.newChapter)
      $('#addModal' + this.index).modal('hide')
    },
    onFileChange: function (ev) {
      let files = ev.target.files || ev.dataTransfer.files
      console.log(files)
      let file = files[0]
      let reader = new FileReader()
      reader.onload = (e) => {
        // console.log(e.target.result)
        // this.newChapter.chapterPhotoList.push(e.target.result)
      }
      reader.readAsDataURL(file)
      let uploadTask = this.storageRef.child('images/'+file.name).put(file)
      uploadTask.on('state_changed', function (snapshot) {
        console.log(snapshot)
      }, function (error) {
        console.log(error)
      }, function () {
        console.log(uploadTask.snapshot.downloadURL)
        this.newChapter.chapterPhotoList.push(uploadTask.snapshot.downloadURL)
      }.bind(this))
    }
  },
  /* eslint-disable */
  mounted: function () {

  }
}
</script>

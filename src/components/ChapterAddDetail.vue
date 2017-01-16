<template>
  <div class="ui modal" :id="'addModald' + date + 'i' + index">
    <div class="header">
      Details
    </div>
    <div class="ui hidden message" :id="'addModalMessaged' + date + 'i' + index">
      <p>Upload Done!</p>
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
          <label :for="'filed'+date+'i'+index" class="ui icon button">
                <i class="file icon"></i>Open File</label>
          <input type="file" :id="'filed'+date+'i'+index" style="display:none" v-on:change="onFileChange">
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
  props: ['chapter', 'index', 'date', 'saveNewChapter', 'storageRef'],
  data: function () {
    return {
      newChapter: {
        chapterLocation: this.chapter.chapterLocation,
        chapterDescription: '',
        chapterTip: '',
        chapterPhotoList: [],
        chapterKey: this.chapter.chapterKey
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
      console.log(this)
      console.log('ChapterAddDetail: my date is '+this.date + ' my index is ' + this.index)
      this.$emit('saveNewChapter', this.newChapter)
      $('#addModald' + this.date + 'i' + this.index).modal('hide')
    },
    onFileChange: function (ev) {
      let files = ev.target.files || ev.dataTransfer.files
      console.log(files)
      let file = files[0]
      console.log(this)
      let reader = new FileReader()
      reader.onload = function () {
        console.log('reader successful')
        let uploadTask = this.storageRef.child('images/'+file.name).put(file)
        uploadTask.on('state_changed', null, null, () => {
          console.log(this)
          console.log(uploadTask.snapshot.downloadURL)
          console.log('upload: i' + this.index + ' d' + this.date + 'current photos ' + this.newChapter.chapterPhotoList)
          this.newChapter.chapterPhotoList.push(uploadTask.snapshot.downloadURL)
          $('#addModalMessaged' + this.date + 'i' + this.index).show(500)
        })
      }.bind(this)
      console.log('upload: i' + this.index + ' d' + this.date)
      reader.readAsDataURL(file)
      
    }
  },
  /* eslint-disable */
  mounted: function () {

  }
}
</script>

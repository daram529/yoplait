<template>
  <div class="ui modal" :id="'addModald' + date + 'i' + index">
    <div class="header">
      Details
    </div>
    <div class="ui hidden message" :id="'addModalMessaged' + date + 'i' + index">
      <p>Upload Done!</p>
    </div>
    <div class="image content" id="image_content">
      <div class="ui medium images">
        <Button id="button" class="ui left floated icon huge button" v-if="newChapter.chapterPhotoList && newChapter.chapterPhotoList.length >2" @click="onLeftClick"><i class="angle left icon"/></Button>
        <img v-for="(imgSrc, idx) in newChapter.chapterPhotoList" v-show="(idx == curImageIdx) || (idx == nextImageIdx)" class="ui image" :src="imgSrc">
        <!--<img v-if="newChapter.chapterPhotoList" class="ui image" :src="newChapter.chapterPhotoList[curImageIdx]">
        <img v-if="newChapter.chapterPhotoList && newChapter.chapterPhotoList.length >= 2" class="ui image" :src="newChapter.chapterPhotoList[nextImageIdx]">-->
        <Button id="button" class="ui right floated icon huge button" v-if="newChapter.chapterPhotoList && newChapter.chapterPhotoList.length >2" @click="onRightClick"><i class="angle right icon"/></Button>
      </div>
    </div>
    <div class="content">
      <div class="ui form">
        <div class="field"><label>어디를 다녀오셨나요?</label><input v-model="newChapter.chapterLocation" type="text"></input></div>

        <div class="field">
          <label>그 곳은 어떠셨나요?</label>
          <textarea class="fluid" rows="3" v-model="newChapter.chapterDescription" :placeholder="this.chapter.chapterDescription"></textarea>
        </div>
        <div class="field">
          <label>이 장소를 방문하는 다른 분을 위한 팁이 있다면 적어주세요.</label>
          <textarea class="fluid" rows="2" v-model="newChapter.chapterTip" :placeholder="this.chapter.chapterTip"></textarea>
        </div>
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
      },
      imageIndex: 0
    }
  },
  computed: {
    curImageIdx: function () {
      return this.imageIndex
    },
    nextImageIdx: function () {
      return this.imageIndex + 1
    }
  },
  methods: {
    onLeftClick: function () {
      console.log(this)
      if (this.imageIndex > 1) {
        this.imageIndex -= 1
      }
    },
    onRightClick: function () {
      if (this.imageIndex < this.newChapter.chapterPhotoList - 2) {
        this.imageIndex += 1
      }
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
        let randomName = Array(11).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, 10)
        let uploadTask = this.storageRef.child('images/'+randomName).put(file)
        uploadTask.on('state_changed', null, null, () => {
          console.log(this)
          console.log(uploadTask.snapshot.downloadURL)
          console.log('upload: i' + this.index + ' d' + this.date + 'current photos ' + this.newChapter.chapterPhotoList)
          this.newChapter.chapterPhotoList.push(uploadTask.snapshot.downloadURL)
          $('#addModalMessaged' + this.date + 'i' + this.index).show()
          window.setTimeout( () => {
            $('#addModalMessaged' + this.date + 'i' + this.index).hide()
          }, 5000)
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

<style>
#button {
  margin-top:80px;
}

#image_content {
  width:90%;
  margin:auto;
}
</style>

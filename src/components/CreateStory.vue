<template>
  <div class="ui container" id = "chapters">
    <div class="ui relaxed padded full grid">
      <div class="row" id="storyInfo">
        <div class="info_left" id="storyTitle">
          <div class="ui medium input" style="padding-bottom:10px;"> <input type="text" v-model="newStory.storyName" id="storyName" placeholder="여행기 제목"></div>
          <div class="ui medium input" style="padding-bottom:10px;"> <input type="text" v-model="newStory.storyCountry" id="storyCountry" placeholder="나라(영어로)"></div>
          <div class="storyDate" style="font-size:12px;">
            <div class="ui small input" style="padding-bottom:10px;"> <input id="storyDate" v-model="newStory.storyDate" placeholder="여행 날짜(ex:2016/08/15)"></div>
            <div class="ui action icon input">
              <input v-model="newStory.storyPeriod" id="storyPeriod" v-on:keyup.enter="$emit('changeDays', newStory.storyPeriod)" placeholder="총 여행 일(ex:3)"></input>
              <button class="ui mini icon button" @click="$emit('changeDays', newStory.storyPeriod)"><i class="pointing up icon"/></Button>
            </div>
          </div>
        </div>
        <div class="info_mid_left" id="storyPeople" style="padding-right:50px;">
          <div class="ui mini input" style="padding-bottom:10px;"><input id="storyPeople" v-model="newStory.storyPeople" placeholder="총 인원수(ex:5명)"></input></div>
          <div id="upload">
            <label for="file" class="ui icon button">
              <i class="file icon"></i>Select StoryPhoto</label>
            <input type="file" id="file" style="display:none" v-on:change="onFileChange">
            <div class="ui pointing label" v-if="newStory.storyPhoto">{{image}}</div>
          </div>
        </div>
        <div class="info_mid_right" id="storyExpense">
          <div class="ui mini input" style="width:180px;"><input id="storyTotalExpense" v-model="newStory.storyTotalExpense" placeholder="1인 총 여행경비(ex: 150만원)"></input></div>
          <div class="ui list" v-for="(input, index) in this.newStory.storyExpenseList">
            <div class="ui mini input" v-on:keyup.enter="newInput($event.target.value, index)" v-on:keyup.delete="deleteInput($event.target.value, index)"><input v-model="newStory.storyExpenseList[index]" :id="'storyExpense'+index" placeholder="경비(ex: 항공권:50만원)"></input></div>
          </div>
        </div>
        <div class="ui grid" id="storyTag">
          <div class="eight wide column">
            <div class="ui list" v-for="(input, index) in this.newStory.storyTagList" v-if="index<4">
              <div class="ui mini input" v-on:keyup.enter="newTag($event.target.value, index)" v-on:keyup.delete="deleteTag($event.target.value, index)"><input v-model="newStory.storyTagList[index]" :id="'storyTag'+index" placeholder="(ex: #가족끼리)"></input></div>
            </div>
          </div>
          <div class="eight wide column">
            <div class="ui list" v-for="(input, index) in this.newStory.storyTagList" v-if="index>=4 && index<9">
              <div class="ui mini input" v-on:keyup.enter="newTag($event.target.value, index)" v-on:keyup.delete="deleteTag($event.target.value, index)"><input v-model="newStory.storyTagList[index]" :id="'storyTag'+index" placeholder="(ex: #가족끼리)"></input></div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
      <div class="five column row" id="chapterBoard">
        <div class="column" v-for="(cList, date) in chapterList" :key="date">
          <h3 class="ui header" style="padding-left:10px; margin-bottom:5px;">
            <i class="calendar outline icon"></i>
            <div class="content">
              {{date+1}}일차
            </div>
          </h3>
          <div class="ui horizontal divider" v-on:dragover.prevent v-on:drop="$emit('createStoryDrop', date, 0)"><i class="ui plus icon"/></div>
          <template v-for="(chapter, index) in cList">
            <ChapterAddCard :index="index" :date="date" :chapter="chapter" :storageRef="storageRef" @modifyChapter="onModifyChapter" :key="chapter.chapterKey"></ChapterAddCard>
            <div v-if="index!=cList.length-1" @input="$emit('distanceChange', date, index, $event.target.value)" class="dottedLine" v-on:dragover.prevent v-on:drop="$emit('createStoryDrop', date, index + 1)"><input></input></div>
            <div v-else class="ui horizontal divider" v-on:dragover.prevent v-on:drop="$emit('createStoryDrop', date, index + 1)" ><i class="ui plus icon"/></div>
          </template>
        </div>
      </div>
    </div>
    <Button class="ui blue right floated labeled icon button" id="saveButton" @click="$emit('saveStory', newStory)" style="margin-top:10px;"><i class="save icon"/>Save</Button>
  </div>
</template>

<script>
/* eslint-disable */
import ChapterAddCard from './ChapterAddCard'
export default {
  name: 'createstory',
  data: function () {
    return {
      image: '',
      newStory: {
        storyName: '',
        storyPeriod: '',
        storyDate: '',
        storyPeople: '',
        storyTotalExpense: '',
        storyExpenseList:[''],
        storyTagList:[''],
        storyType: '',
        storyPhoto: '',
        storyCountry: ''
      }
    }
  },
  components: {
    ChapterAddCard
  },
  props: ['chapterList', 'storageRef'],
  methods: {
    onFileChange(ev) {
      let files = ev.target.files || ev.dataTransfer.files
      let file = files[0]
      this.image = file.name
      let reader = new FileReader()
      reader.onload = function () {
        let uploadTask = this.storageRef.child('images/'+file.name).put(file)
        uploadTask.on('state_changed', null, null, () => {
          this.newStory.storyPhoto=uploadTask.snapshot.downloadURL
        })
      }.bind(this)
      reader.readAsDataURL(file)
    },
    newInput: function(value, index) {
      if (value!="" && index == this.newStory.storyExpenseList.length-1){
        this.newStory.storyExpenseList.push('')
      }
    },
    deleteInput: function(value, index) {
      if (value=="" && this.newStory.storyExpenseList.length>1 && index == this.newStory.storyExpenseList.length-1){
        this.newStory.storyExpenseList.splice(index, 1)
      }
    },
    newTag: function(value, index) {
      if (value!="" && value.indexOf('#')!= -1 && index==this.newStory.storyTagList.length-1 && this.newStory.storyTagList.length < 8){
        this.newStory.storyTagList.push('')
      }
    },
    deleteTag: function(value, index) {
      if (value=="" && this.newStory.storyTagList.length>1 && index == this.newStory.storyTagList.length-1){
        this.newStory.storyTagList.splice(index, 1)
      }
    },
    onModifyChapter: function (chapter, index, date) {
      console.log(chapter)
      console.log('idx'+index)
      console.log('date'+date)
      this.$emit('modifyChapter', chapter, index, date)
    }
  }
}
</script>

<style>
#chapters {
 margin-top : 20px;
}

#storyInfo {
  padding-left:21px;
  padding-right:21px;
}

#storyTitle, #storyPeople, #storyExpense, #storyTag {
  width : 25%;
  text-align: left;
}

#chapterBoard{
  padding-left:10px;
  padding-right:10px;
}

#column{
  padding:0px;
  box-shadow:0;
}


#storyTag .input{
  width:100px;
}


.ui.full.grid {
  background-color: #ffffff;
  border : 1px solid rgba(34,36,38,0.15);
  border-radius: 5px;
}

.dottedLine {
  height:30px;
  border-left: 2px dotted gray;
  width:50%;
  float:right;
  font-size: 12px;
}
.dottedLine input{
  position:relative;
  top:20%;
  width:100%;
  margin-left:5px;
}

#upload {
  text-align: left;
}
#hey {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>

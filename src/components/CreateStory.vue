<template>
  <div class="ui container" id = "chapters">
    <div class="ui relaxed padded full grid">
      <div class="row" id="storyInfo">
        <div class="info_left" id="storyTitle">
          <h3 class="storyTitle">
            방콕여행기
            <!--{{story.storyTitle}}-->
          </h3>
          <div class="storyDate" style="color:gray; font-size:12px;">
            2016/08/15 (2박3일)
            <div class="ui mini action icon input">
              <input v-model="date" id="storyDate"></input>
              <button class="ui mini icon button" @click="$emit('changeDays', [date])"><i class="calendar icon"/></Button>
            </div>
          </div>
          <div class="storyOwner">
            Minkyu Yun
            <!--{{story.userName}}-->
          </div>
        </div>
        <div class="info_mid_left" id="storyPeople">
          <div class="storyPeople">
            인원: 5명
            <!--인원: {{story.storyPeople}}-->
          </div>
        </div>
        <div class="info_mid_right" id="storyExpense">
          <h5 class="storyTotalExpense">
            1인 총 여행경비: 150만원
            <!--1인 총 여행경비: {{story.storyTotalExpense}}-->
          </h5>
          <div class="ui list">
            <!--<div class="item" v-for="expense in story.storyExpenseList">
              {{expesne}}
            </div>-->
            <div class="item">항공비: 50만원</div>
            <div class="item">교통비: 20만원</div>
            <div class="item">식사: 30만원</div>
          </div>
        </div>
        <div class="ui grid" id="storyTag">
          <div class="eight wide column">
            <div class="ui list">
              <!--<div class="item" v-for="(tag,index) in story.storyTagList" v-if="index % 2 == 0">
                {{tag}}
              </div>-->
              <div class="item">#우정여행</div>
              <div class="item">#둘이서</div>
              <div class="item">#배낭여행</div>
              <div class="item">#액티비티</div>
            </div>
          </div>
          <div class="eight wide column">
            <div class="ui list">
              <!--<div class="item" v-for="(tag,index) in story.storyTagList" v-if="index % 2 == 1">
                {{tag}}
              </div>-->
              <div class="item">#역사여행</div>
              <div class="item">#말트래킹</div>
              <div class="item">#시안성벽</div>
              <div class="item">#자전거</div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
      <div class="five column row" id="chapterBoard">
        <div class="column" v-for="(cList, date) in chapterList" :key="date">
          <div class="ui horizontal divider" v-on:dragover.prevent v-on:drop="$emit('createStoryDrop', date, 0)"><i class="ui plus icon" /></div>
          <template v-for="(chapter, index) in cList">
            <ChapterAddCard :index="index" :chapter="chapter" :storageRef="storageRef" :modify-chapter="modifyChapter" :key="chapter.key"></ChapterAddCard>
            <!--<div class="ui horizontal divider" v-on:dragover.prevent v-on:drop="onCreateStoryDrop(index + 1)"><i class="ui plus icon" /></div>-->
            <div v-if="index!=cList.length-1" class="dottedLine" v-on:dragover.prevent v-on:drop="$emit('createStoryDrop', date, index + 1)"><input></input></div>
            <div v-else class="ui horizontal divider" v-on:dragover.prevent v-on:drop="$emit('createStoryDrop', date, index + 1)" ><i class="ui plus icon"/></div>
          </template>
        </div>
        <!--<div class="column">
        </div>
        <div class="column">
        </div>
        <div class="column">
        </div>
        <div class="column">
        </div>-->
      </div>
    </div>
    <Button class="ui blue right floated labeled icon button" id="saveButton" @click="$emit('saveStory')" style="margin-top:10px;"><i class="save icon"/>Save</Button>
  </div>
</template>
<script>
import ChapterAddCard from './ChapterAddCard'
export default {
  name: 'createstory',
  data: function () {
    return {
      date: 1
    }
  },
  components: {
    ChapterAddCard
  },
  props: ['chapterList', 'onCreateStoryDrop', 'modifyChapter', 'storageRef', 'value'],
  methods: {
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

</style>

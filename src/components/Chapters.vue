<template>
  <div class="ui container" id = "chapters">
    <div class="ui relaxed padded full grid">
      <div class="row" id="storyInfo">
        <div class="info_left" id="storyTitle">
          <h3 class="storyTitle">
            <i v-if="story.storyCountry" :class="[story.storyCountry.toLowerCase()]" class="flag"></i>{{story.storyName}}
          </h3>
          <div class="storyDate" style="color:gray; font-size:12px;" v-if="story.storyPeriod!=1">
            {{story.storyDate}} ({{story.storyPeriod-1}}박{{story.storyPeriod}}일)
          </div>
          <div class="storyDate" style="color:gray; font-size:12px;" v-if="story.storyPeriod==1">
            {{story.storyDate}} 당일치기
          </div>
          <div class="storyOwner" @click="$emit('otherStories', story.userID, story.userName)" id="userName">
            {{story.userName}}
          </div>
        </div>
        <div class="info_mid_left" id="storyPeople">
          <div class="storyPeople" v-if="story.storyPeople">
            인원: {{story.storyPeople}}
          </div>
        </div>
        <div class="info_mid_right" id="storyExpense">
          <h5 class="storyTotalExpense" v-if="story.storyTotalExpense">
            1인 총 여행경비: {{story.storyTotalExpense}}
          </h5>
          <div class="ui list">
            <div class="item" v-for="expense in story.storyExpenseList">
              {{expense}}
            </div>
          </div>
        </div>
        <div class="ui grid" id="storyTag" style="color:#1A237E" v-if="story.storyTagList[0]">
          <div class="eight wide column" style="padding-right:0px;">
            <div class="ui list">
              <div class="ui small grey tag label" v-for="(tag,index) in story.storyTagList" v-if="index<4" style="margin-bottom:5px; padding-right:10px; padding-left:10px;">
                {{tag}}
              </div>
            </div>
          </div>
          <div class="eight wide column" style="padding-right:0px;">
            <div class="ui list">
              <div class="ui small grey tag label" v-for="(tag,index) in story.storyTagList" v-if="index>=4" style="margin-bottom:5px; padding-right:10px; padding-left:10px;">
                {{tag}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
      <div class="five column row" id="chapterBoard">
        <div class="column" id="column" v-for="(cList,date) in story.chapterList" style="padding-bottom:50px;">
          <h3 class="ui header" style="padding-left:10px; margin-bottom:10px;">
            <i class="calendar outline icon"></i>
            <div class="content">
              {{date+1}}일차
            </div>
          </h3>
          <template v-for="(chapter, index) in cList">
          <ChapterCard :date="date" :index="index" :chapter="chapter" :key="chapter['chapterLocation']" :on-drag-start="onDragStart" :content-visible="true"></ChapterCard>
          <div class="dottedLine" v-if="index!=cList.length-1"><p>{{chapter.chapterDistance}}</p></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChapterCard from './ChapterCard'
export default {
  name: 'chapters',
  data: function () {
    return {
      // rowNumber: int (this.story.chapterList.length/5)
    }
  },
  components: {
    ChapterCard
  },
  props: ['story', 'onDragStart', 'otherStories']
  // props: ['chapterList', 'onDragStart', 'story']
}
</script>

<style scoped>
#chapters {
 margin-top : 20px;
}

#storyInfo {
  padding-left:21px;
  padding-right:21px;
}

#storyTitle, #storyPeople {
  width : 25%;
  text-align: left;
}

#storyExpense {
  width: 20%;
}

#storyTag {
  width: 30%
}

#chapterBoard{
  padding-top:0px;
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

.chaptercard {
  padding-left:5px;
  padding-right:5px;
}

.dottedLine {
  height:30px;
  border-left: 2px dotted gray;
  width:50%;
  float:right;
  font-size: 12px;
}
.dottedLine p{
  position:relative;
  top:25%;
}
#userName:hover{
  cursor: pointer;
}

</style>


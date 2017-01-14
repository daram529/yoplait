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
            <!--{{story.storyDate}} {{story.storyPeriod}}일-->
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
      <!--<div class="five column row" id="chapterBoard" v-for="n in (story.chapterList.length-1)/5+1">-->
      <div class="five column row" id="chapterBoard">
        <!--<div class="column" id="column" v-for="chapterListDate in story.chapterList">-->
        <div class="column" id="column">
          <div class="date"><p>1일차</p></div>
          <template v-for="(chapter, index) in chapterList">
          <ChapterCard :index="index" :chapter="chapter" :key="chapter['chapterLocation']" :on-drag-start="onDragStart" :content-visible="true"></ChapterCard>
          <!--<ChapterCard v-for="(chapter, index) in story.chapterList[n*5]" :index="index" :chapter="chapter" :key="chapter['chapterLocation']" :on-drag-start="onDragStart" :content-visible="true"></ChapterCard>-->
          <div class="dottedLine" v-if="index!=chapterList.length-1"><p>도보 30분</p></div>
          </template>
        </div>
        <div class="column" id="column">
          <!--<ChapterCard v-for="(chapter, index) in story.chapterList[n*5+1]" :index="index" :chapter="chapter" :key="chapter['chapterLocation']" :on-drag-start="onDragStart" :content-visible="true"></ChapterCard>-->
        </div>
        <div class="column" id="column">
          <!--<ChapterCard v-for="(chapter, index) in story.chapterList[n*5+2]" :index="index" :chapter="chapter" :key="chapter['chapterLocation']" :on-drag-start="onDragStart" :content-visible="true"></ChapterCard>-->
        </div>
        <div class="column" id="column">
          <!--<ChapterCard v-for="(chapter, index) in story.chapterList[n*5+3]" :index="index" :chapter="chapter" :key="chapter['chapterLocation']" :on-drag-start="onDragStart" :content-visible="true"></ChapterCard>-->
        </div>
        <div class="column" id="column">
          <!--<ChapterCard v-for="(chapter, index) in story.chapterList[n*5+4]" :index="index" :chapter="chapter" :key="chapter['chapterLocation']" :on-drag-start="onDragStart" :content-visible="true"></ChapterCard>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChapterCard from './ChapterCard'
export default {
  name: 'chapters',
  components: {
    ChapterCard
  },
  props: ['chapterList', 'onDragStart']
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

</style>


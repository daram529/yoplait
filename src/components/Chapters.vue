<template>
  <div class="ui container" id = "chapters">
    <div class="ui relaxed padded full grid">
      <div class="row" id="storyInfo">
        <div class="content" id="storyTitle">
          <div class="ui header">
          </div>
        </div>
        <div class="content" id="storyPeople">
        </div>
        <div class="content" id="storyExpense">
        </div>
        <div class="content" id="storyTag">
        </div>
      </div>
      <div class="ui divider"></div>
      <div class="five column row" id="chapterBoard">
        <div class="column">
        <ChapterCard v-for="(chapter, index) in chapterList" :index="index" :chapter="chapter" :key="chapter['chapterLocation']" :on-drag-start="onDragStart" :content-visible="true"></ChapterCard>
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
}
</script>

<style scoped>
#chapters {
 margin-top : 20px; 
}

#chapterBoard{
  padding-left:10px;
  padding-right:10px;
}

.column{
  padding:0px;
  box-shadow:0;
}

.ui.full.grid {
  background-color: #ffffff;
  border : 1px solid rgba(34,36,38,0.15);
  border-radius: 5px;
}


</style>


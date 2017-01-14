<template>
  <div class="ui container">
    <div class="ui header">
      Add your chapters here!
    </div>
  <div class="ui two column padded">
    <!--<div is="transition-group">-->
      <!--<div class="column">
      <ChapterCard v-for="(chapter, index) in chapterList" v-if="index % 2 == 0" :index="index" :chapter="chapter" :key="chapter['chapterLocation']" :on-drag-start="onDragStart" :content-visible="true"></ChapterCard>

      </div>-->
      <!--<div class="column">-->
        <h4 class="ui horizontal divider" v-on:dragover.prevent v-on:drop="onCreateStoryDrop(0)"><i class="ui plus icon"/></div>
        <div v-for="(chapter, index) in chapterList">
          <ChapterCard :index="index" :chapter="chapter" :key="chapter['chapterLocation']" :content-visible="true"></ChapterCard>
          <h4 class="ui horizontal divider" v-on:dragover.prevent v-on:drop="onCreateStoryDrop(index + 1)"><i class="ui plus icon"/></div>
        </div>
      <!--</div>-->
    <!--</div>-->
  </div>
  </div>
</template>
<script>
import ChapterCard from './ChapterCard'
export default {
  name: 'createstory',
  components: {
    ChapterCard
  },
  props: ['chapterList', 'onCreateStoryDrop']
}
</script>


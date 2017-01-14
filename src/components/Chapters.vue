<template>
  <div class="ui two column grid padded">
    <div class="column">
    <ChapterCard v-for="(chapter, index) in chapterList" :index="index" :chapter="chapter" :key="chapter['chapterLocation']" :on-drag-start="onDragStart" :content-visible="true"></ChapterCard>
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


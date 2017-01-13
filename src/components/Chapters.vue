<template>
    <div is="transition-group">
      <ChapterCard v-for="(chapter, index) in chapterList" :index="index" :chapter="chapter" :key="chapter['chapterLocation']" :on-drag-start="onDragStart"></ChapterCard>
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


<template>
  <div class="ui container">
    <div class="ui header">
      Add your chapters here!
    </div>
    <div class="ui two column padded">
      <div class="ui horizontal divider" v-on:dragover.prevent v-on:drop="onCreateStoryDrop(0)"><i class="ui plus icon" /></div>
      <template v-for="(chapter, index) in chapterList">
        <ChapterAddCard :index="index" :chapter="chapter" :storageRef="storageRef" :modify-chapter="modifyChapter" :key="chapter.key"></ChapterAddCard>
        <div class="ui horizontal divider" v-on:dragover.prevent v-on:drop="onCreateStoryDrop(index + 1)"><i class="ui plus icon" /></div>
      </template>
    </div>
    <Button class="ui right floated labeled icon button" @click="$emit('saveStory')"><i class="save icon"/>Save</Button>
  </div>
</template>
<script>
import ChapterAddCard from './ChapterAddCard'
export default {
  name: 'createstory',
  components: {
    ChapterAddCard
  },
  props: ['chapterList', 'onCreateStoryDrop', 'modifyChapter', 'storageRef'],
  methods: {
  }
}
</script>


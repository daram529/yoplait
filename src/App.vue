<template>
  <div id="app">
    <BarMenu></BarMenu>
<<<<<<< HEAD
    <main class="ui container" id="content">
      <Stories></Stories>
    </main>
    <StoriesTest></StoriesTest>
=======
    <div class="ui container">
      <div class="ui segment" id="main">
        <div class="ui right dividing rail">
          <div class="ui sticky segment" id="sticker" v-on:dragover.prevent v-on:drop="onDrop">
            Scrapbook should be placed here.
            <ChapterCard v-for="ch in scrapBookTest" :chapter="ch"></ChapterCard>
          </div>
        </div>
      <Chapters :chapter-list="chaptersTest" :on-drag-start="onDragStart"></Chapters>
    </div>
>>>>>>> 76ef7a54fddf7d31774b752a9cfc0deacd660836
  </div>
</template>

<script>
import $ from 'jquery'
import BarMenu from './components/BarMenu'
import Chapters from './components/Chapters'
import ChapterCard from './components/ChapterCard'
import Stories from './components/Stories'
<<<<<<< HEAD
import ScrapBook from './components/ScrapBook'
import StoriesTest from './components/StoriesTest'
=======
>>>>>>> 76ef7a54fddf7d31774b752a9cfc0deacd660836
export default {
  name: 'app',
  components: {
    BarMenu,
<<<<<<< HEAD
    Stories,
    ScrapBook,
    StoriesTest
  },
  mounted: function () {
    $('.ui.sticky')
    .sticky({
      context: '#app'
    })
=======
    Chapters,
    ChapterCard,
    Stories
  },
  data: function () {
    return {
      chaptersTest: [{
        chapterLocation: 'Busan',
        chapterDescription: 'Dynamic Busan',
        chapterPhotoList: ['./static/busan.jpg']
      },
      {
        chapterLocation: 'Busan',
        chapterDescription: 'Dynamic Busan',
        chapterPhotoList: ['./static/busan.jpg', './static/busan2.jpg']
      },
      {
        chapterLocation: 'Busan',
        chapterDescription: 'Dynamic Busan',
        chapterPhotoList: ['./static/busan.jpg', './static/busan.jpg']
      },
      {
        chapterLocation: 'Busan',
        chapterDescription: 'Dynamic Busan',
        chapterPhotoList: ['./static/busan.jpg', './static/busan.jpg']
      },
      {
        chapterLocation: 'Busan',
        chapterDescription: 'Dynamic Busan',
        chapterPhotoList: ['./static/busan.jpg', './static/busan.jpg']
      }],
      scrapBookTest: [],
      draggingChapter: {},
      active: false
    }
  },
  /* eslint-disable */
  mounted: function () {
    console.log($('ui.sticky'))
    console.log($(this.$el).find('#sticker'))
    // $(this.$el).find('#sticker')
    $('.ui.sticky').sticky({
      context: '#main'
    })
  },
  methods: {
    onDrop: function (ev) {
      ev.preventDefault();
      console.log(ev.target)
      console.log(ev.dataTransfer.getData('text/plain'))
      this.scrapBookTest.push(this.draggingChapter)
      this.active = true
    },
    onDragStart: function (chapter) {
      this.draggingChapter = chapter
    }
>>>>>>> 76ef7a54fddf7d31774b752a9cfc0deacd660836
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#content {
  padding-top:50px;
  width:80%;
}

body {
  flex: 1 0 auto;
  display: flex;
  height: 100%;
  background-color: #f2f2f2;
  flex-direction: column;
}
</style>

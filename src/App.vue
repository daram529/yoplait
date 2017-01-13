<template>
  <div id="app">
    <BarMenu></BarMenu>
    <!--<main class="ui container" id="content">
      <Stories></Stories>
    </main>
    <StoriesTest></StoriesTest>-->
    <div class="ui container" id="content">
      <div class="ui segment" id="main">
        <div class="ui right dividing rail">
          <div class="ui sticky segment" id="sticker" v-on:dragover.prevent v-on:drop="onDrop">
            <!--<div class="ui grid ">-->
            Scrapbook should be placed here.
              <ChapterCard v-for="(ch, idx) in scrapBookTest" :chapter="ch" :index="idx" :content-visible="false" :on-drag-start="onDragRemove"></ChapterCard>
            <!--</div>-->
          </div>
        </div>
      <Chapters :chapter-list="chaptersTest" :on-drag-start="onDragStart"></Chapters>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import BarMenu from './components/BarMenu'
import Chapters from './components/Chapters'
import ChapterCard from './components/ChapterCard'
import Stories from './components/Stories'
import ScrapBook from './components/ScrapBook'
export default {
  name: 'app',
  components: {
    BarMenu,
    Stories,
    ScrapBook,
    Chapters,
    ChapterCard
  },
  data: function () {
    return {
      chaptersTest: [{
        chapterLocation: 'Busan',
        chapterDescription: '모르겄다',
        chapterPhotoList: ['./static/busan.jpg']
      },
      {
        chapterLocation: 'Busan',
        chapterDescription: 'Dynamic Busan',
        chapterPhotoList: ['./static/busan.jpg', './static/busan2.jpg']
      },
      {
        chapterLocation: 'Busan',
        chapterDescription: 'Dynamic Busansdafasdfasd fasdfasdfasdfasd fsadfasdfasdfasdasdfasd fasdfsadfsadfasdfsad fasdfsadfsadfa sdfasdfasdfasdfasd',
        chapterPhotoList: ['./static/busan.jpg', './static/busan2.jpg']
      },
      {
        chapterLocation: 'Busan',
        chapterDescription: 'Dynamic Busan',
        chapterPhotoList: ['./static/busan.jpg', './static/busan2.jpg']
      },
      {
        chapterLocation: 'Busan',
        chapterDescription: 'Dynamic Busanasdfasdfasdfasdf asdfasdfasdfasdfsadfsadfs adfsadfsadfdfasd asdfasdfsadfaasdfasdfasd fasdfasdfasdfas dfsdafsadfsadfasdf sdfasdfsadfs adfsadfasdsd',
        chapterPhotoList: ['./static/busan.jpg', './static/busan2.jpg']
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
      offset: 55,
      bottomOffset: 50,
      context: '#main',
      observeChanges: true
    })
  },
  methods: {
    onDrop: function (ev) {
      ev.preventDefault();
      console.log(ev.target)
      console.log(this.draggingChapter)
      console.log(this.scrapBookTest)
      this.scrapBookTest.push(this.draggingChapter)
      // $('.ui.sticky').sticky('refresh')
      // Vue.nextTick(function () {
      //   $('.ui.sticky').sticky('refresh')
      // })
    },
    onDragStart: function (index) {
      console.log(index)
      this.draggingChapter = this.chaptersTest[index]
    },
    onDragRemove: function (index) {
      this.scrapBookTest.splice(index, 1)
    }
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
  /*width:80%;*/
}

body {
  flex: 1 0 auto;
  display: flex;
  height: 90vh;
  background-color: #f2f2f2;
  flex-direction: column;
}

/*#sticker {
  height: 70vh;
}*/
</style>

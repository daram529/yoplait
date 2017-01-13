<template>
  <div id="app">
    <BarMenu></BarMenu>
    <main class="ui container" id="content">
      <div class="ui segment" id="two">
        <Stories :story-list="storiesList"></Stories>
        <div class="ui right rail">
          <div class="ui sticky segment" id="sticker" v-on:dragover.prevent v-on:drop="onDrop">
           <h3 class="ui header"> Scrapbook</h3>
          </div>
        </div>
      </div>
    </main>

    <!--<div class="ui container">
      <div class="ui segment" id="main">
        <div class="ui right dividing rail">
          <div class="ui sticky segment" id="sticker" v-on:dragover.prevent v-on:drop="onDrop">
            Scrapbook should be placed here.
            <ChapterCard v-for="ch in scrapBookTest" :chapter="ch"></ChapterCard>
          </div>
        </div>
      <Chapters :chapter-list="chaptersTest" :on-drag-start="onDragStart"></Chapters>
    </div>-->
  </div>
</template>

<script>
import $ from 'jquery'
import BarMenu from './components/BarMenu'
import Chapters from './components/Chapters'
import ChapterCard from './components/ChapterCard'
import Stories from './components/Stories'
export default {
  name: 'app',
  components: {
    BarMenu,
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
      storiesList: [{
        storyTitle: '방콕여행기',
        storyDate: '2016/08/15 (2박3일)',
        storyPhoto: '/static/images/bangkok.jpg',
        chapterList: ['돈므앙 공항', '담넌사두억 수상시장', '짜뚜짝 시장', '카오산로드', '하이야트 호텔', '파타야', '알카자쇼', '돈므앙 공항'],
        storyName: 'Minkyu Yun'
      },
      {
        storyTitle: '방콕여행기',
        storyDate: '2016/08/15 (2박3일)',
        storyPhoto: '/static/images/bangkok.jpg',
        chapterList: ['돈므앙 공항', '담넌사두억 수상시장', '짜뚜짝 시장', '카오산로드', '하이야트 호텔', '파타야', '알카자쇼', '돈므앙 공항'],
        storyName: 'Minkyu Yun'
      },
      {
        storyTitle: '싱가폴 여행',
        storyDate: '2016/12/15 (3박4일)',
        storyPhoto: '/static/images/singapore.jpg',
        chapterList: ['파크로얄 피커링 호텔', '가든 바이 더 베이', '유니버셜 스튜디오', '싱가폴 도심', '머라이언타워', '클라키', '마리나베이샌즈 야경', '주롱새파크', '보타닉 가든', '점보시푸드 레스토랑'],
        storyName: '윤민규'
      },
      {
        storyTitle: '싱가폴 여행',
        storyDate: '2016/12/15 (3박4일)',
        storyPhoto: '/static/images/singapore.jpg',
        chapterList: ['파크로얄 피커링 호텔', '가든 바이 더 베이', '유니버셜 스튜디오', '싱가폴 도심', '머라이언타워', '클라키', '마리나베이샌즈 야경', '주롱새파크', '보타닉 가든', '점보시푸드 레스토랑'],
        storyName: '윤민규'
      },
      {
        storyTitle: '방콕여행기',
        storyDate: '2016/08/15 (2박3일)',
        storyPhoto: '/static/images/bangkok.jpg',
        chapterList: ['돈므앙 공항', '담넌사두억 수상시장', '짜뚜짝 시장', '카오산로드', '하이야트 호텔', '파타야', '알카자쇼', '돈므앙 공항'],
        storyName: 'Minkyu Yun'
      },
      {
        storyTitle: '싱가폴 여행',
        storyDate: '2016/12/15 (3박4일)',
        storyPhoto: '/static/images/singapore.jpg',
        chapterList: ['파크로얄 피커링 호텔', '가든 바이 더 베이', '유니버셜 스튜디오', '싱가폴 도심', '머라이언타워', '클라키', '마리나베이샌즈 야경', '주롱새파크', '보타닉 가든', '점보시푸드 레스토랑'],
        storyName: '윤민규'
      },
      {
        storyTitle: '방콕여행기',
        storyDate: '2016/08/15 (2박3일)',
        storyPhoto: '/static/images/bangkok.jpg',
        chapterList: ['돈므앙 공항', '담넌사두억 수상시장', '짜뚜짝 시장', '카오산로드', '하이야트 호텔', '파타야', '알카자쇼', '돈므앙 공항'],
        storyName: 'Minkyu Yun'
      },
      {
        storyTitle: '방콕여행기',
        storyDate: '2016/08/15 (2박3일)',
        storyPhoto: '/static/images/bangkok.jpg',
        chapterList: ['돈므앙 공항', '담넌사두억 수상시장', '짜뚜짝 시장', '카오산로드', '하이야트 호텔', '파타야', '알카자쇼', '돈므앙 공항'],
        storyName: 'Minkyu Yun'
      },
      {
        storyTitle: '싱가폴 여행',
        storyDate: '2016/12/15 (3박4일)',
        storyPhoto: '/static/images/singapore.jpg',
        chapterList: ['파크로얄 피커링 호텔', '가든 바이 더 베이', '유니버셜 스튜디오', '싱가폴 도심', '머라이언타워', '클라키', '마리나베이샌즈 야경', '주롱새파크', '보타닉 가든', '점보시푸드 레스토랑'],
        storyName: '윤민규'
      },
      {
        storyTitle: '싱가폴 여행',
        storyDate: '2016/12/15 (3박4일)',
        storyPhoto: '/static/images/singapore.jpg',
        chapterList: ['파크로얄 피커링 호텔', '가든 바이 더 베이', '유니버셜 스튜디오', '싱가폴 도심', '머라이언타워', '클라키', '마리나베이샌즈 야경', '주롱새파크', '보타닉 가든', '점보시푸드 레스토랑'],
        storyName: '윤민규'
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
      context: '#two',
      offset: 55,
      bottomOffset: 50
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

#sticker {
  height:90vh;
  background:#ffffff;
  top:0px;
  border : 1px solid rgba(34,36,38,0.15);
  border-radius: 5px;
  padding-top: 10px;
}

#content {
  padding-top:50px;
  width:60%;
  height:100%;
}

.ui.segment {
  height: 100%;
  background-color: #f2f2f2;
  margin:0px;
  padding:0px;
  border:0;
  box-shadow: none;
}

body {
  flex: 1 0 auto;
  display: flex;
  height: 100%;
  background-color: #f2f2f2;
  flex-direction: column;
}
</style>

<template>
  <div id="app">
    <BarMenu :filtered-stories = "filteredStories" v-model = "searchString" :current-view-change = "currentViewChange" :is-logged-in = "isLoggedIn" :on-login-click="onLoginClick" :on-sign-out="onSignOutClick" :user-name="user.displayName"></BarMenu>
    <main class="ui container" id="content">
      <div class="ui segment" id="two">
        <Stories v-if="currentView == 'Stories'" :story-list="filteredStories" :onClick="onStoryClick"></Stories>
        <Chapters v-else-if="currentView == 'Chapters'" :chapter-list="chaptersTest" :on-drag-start="onScrapDragStart"></Chapters>
        <CreateStory v-else-if="currentView == 'CreateStory'" :storageRef="storageRef" :chapter-list="createStoryChapterList" :modify-chapter="modifyCreateStoryChapter" v-on:createStoryDrop="insertCreateStoryChapterList" v-on:saveStory="onSaveClick" v-on:changeDays="onChangeDays"></CreateStory>
        <div class="ui right rail">
          <div class="ui sticky segment" id="sticker" v-on:dragover.prevent v-on:drop="onScrapBookDrop">
           <h3 class="ui header"> Scrapbook</h3>
           <div class="ui grid">
              <ChapterCard v-for="(ch, idx) in scrapBookTest" :chapter="ch" :index="idx" :content-visible="false" :on-drag-start="onCreateStoryDragStart"></ChapterCard>
          </div>
          <Button class="ui button" v-on:click="currentView == 'Chapters' ? currentView = 'CreateStory' : currentView = 'Chapters'">Toggle!!</Button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// import $ from 'jquery'
import firebase from 'firebase'
import BarMenu from './components/BarMenu'
import Chapters from './components/Chapters'
import ChapterCard from './components/ChapterCard'
import CreateStory from './components/CreateStory'
import Stories from './components/Stories'

let config = {
  apiKey: 'AIzaSyAYKd_QTwkW5hFKhAbdayjdqA2xVhwubUg',
  authDomain: 'yoplait-62059.firebaseapp.com',
  databaseURL: 'https://yoplait-62059.firebaseio.com',
  storageBucket: 'yoplait-62059.appspot.com',
  messagingSenderId: '384113384648'
}
let fb = firebase.initializeApp(config)
let db = fb.database()
const storyRef = db.ref('story')
const usersRef = db.ref('users')

let Chapter = function () {
  this.chapterLocation = ''
  this.chapterDescription = ''
  this.chapterTip = ''
  this.chapterPhotoList = []
}
let Story = function () {
  this.userID = ''
  this.userName = ''
  this.storyName = ''
  this.storyDate = ''
  this.storyDuration = 0
  this.storyTotalExpense = ''
  this.storyExpenseList = []
  this.storyTagList = []
  this.storyType = ''
  this.chapterList = []
  this.storyPhoto = ''
}
// let User = function () {
//   this.userID = ''
//   this.storyIDList = []
//   this.chapterList = []
// }
export default {
  name: 'app',
  components: {
    BarMenu,
    Chapters,
    ChapterCard,
    Stories,
    CreateStory
  },
  firebase: {
    story: storyRef,
    users: usersRef
  },
  data: function () {
    return {
      storyDate: 0,
      searchString: '',
      currentView: 'Stories',
      chapterList: [],
      userToken: '',
      user: {},
      storageRef: fb.storage().ref(),
      chaptersTest: [{
        chapterLocation: 'Busan',
        chapterDescription: '모르겄다',
        chapterPhotoList: ['./static/busan.jpg'],
        key: 0
      },
      {
        chapterLocation: 'Busan',
        chapterDescription: 'Dynamic Busan',
        chapterPhotoList: ['./static/busan.jpg', './static/busan2.jpg'],
        key: 1
      },
      {
        chapterLocation: 'Busan',
        chapterDescription: 'Dynamic Busansdafasdfasd fasdfasdfasdfasd fsadfasdfasdfasdasdfasd fasdfsadfsadfasdfsad fasdfsadfsadfa sdfasdfasdfasdfasd',
        chapterPhotoList: ['./static/busan.jpg', './static/busan2.jpg'],
        key: 2
      },
      {
        chapterLocation: 'Busan',
        chapterDescription: 'Dynamic Busan',
        chapterPhotoList: ['./static/busan.jpg', './static/busan2.jpg'],
        key: 3
      },
      {
        chapterLocation: 'Busan',
        chapterDescription: 'Dynamic Busanasdfasdfasdfasdf asdfasdfasdfasdfsadfsadfs adfsadfsadfdfasd asdfasdfsadfaasdfasdfasd fasdfasdfasdfas dfsdafsadfsadfasdf sdfasdfsadfs adfsadfasdsd',
        chapterPhotoList: ['./static/busan.jpg', './static/busan2.jpg'],
        key: 4
      }],
      storiesList: [{
        userID: 'adgaglalfjladskjfdsa',
        userName: 'Minkyu YUN',
        storyTitle: '방콕여행기',
        storyDate: '2016/08/15 (2박3일)',
        storyPeriod: '2박3일',
        storyPeople: '2명',
        storyTotalExpense: '150만원',
        storyExpenseList: ['항공비: 50만원', '교통비: 20만원', '식사: 30만원'],
        storyTagList: ['#우정여행', '#둘이서', '#배낭여행', '#액티비티', '#역사여행', '#말트래킹', '#시안성벽', '#성벽자전거'],
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
      scrapBookTest: [new Chapter()],
      draggingChapter: {},
      createStoryChapterList: [[]],
      draggingFrom: ''
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.userToken !== ''
    },
    // A computed property that holds only those articles that match the searchString.
    filteredStories: function () {
      var storiesArray = this.storiesList
      var searchString = this.searchString

      if (!searchString) {
        return storiesArray
      }

      searchString = searchString.trim().toLowerCase()
      storiesArray = storiesArray.filter(function (item) {
        if (item.storyTitle.toLowerCase().indexOf(searchString) !== -1) {
          return item
        } else {
          for (var chapter in item.chapterList) {
            if (item.chapterList[chapter].toLowerCase().indexOf(searchString) !== -1) {
              return item
            }
          }
        }
      })
      // Return an array with the filtered data.
      return storiesArray
    }
  },
  /* eslint-disable */
  mounted: function () {
    console.log($('ui.sticky'))
    console.log($(this.$el).find('#sticker'))
    $('.ui.sticky').sticky({
      observeChanges: true,
      context: '#two',
      offset: 55,
      bottomOffset: 50
    })
  },
  methods: {
    currentViewChange: function (currentView) {
      this.currentView = currentView
    },
    onScrapBookDrop: function (ev) {
      ev.preventDefault();
      console.log(ev)
      console.log(ev.dataTransfer)
      if(this.draggingFrom !== 'Scrapbook'){
        this.scrapBookTest.push(this.draggingChapter)
        this.draggingChapter = {}
      }
      this.draggingFrom = ''
    },
    onCreateStoryDrop: function (ev) {
      ev.preventDefault()
      this.createStoryChapterList.push(this.draggingChapter)
      this.draggingChapter = {}
      this.draggingFrom = ''
    },
    onScrapDragStart: function (index) {
      console.log(index)
      this.draggingChapter = this.chaptersTest[index]
      this.draggingFrom = 'Chapters'
    },
    onCreateStoryDragStart: function (index) {
      this.draggingChapter = this.scrapBookTest[index]
      this.draggingFrom = 'Scrapbook'
    },
    onStoryClick: function (story) {
      this.chapterList = story.child('chapterList')
    },
    insertCreateStoryChapterList: function (n, index) {
      this.createStoryChapterList[n].splice(index, 0, this.draggingChapter)
      this.draggingChapter = {}
    },
    onLoginClick: function () {
      let provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        this.userToken = result.credential.accessToken
        this.user = result.user
        console.log(this.user)

      }.bind(this)).catch(function (error) {
        console.log('error' + error)
      })
    },
    onSignOutClick: function () {
      firebase.auth().signOut().then(function () {
        this.user = {}
        this.userToken = ''
      })
    },
    modifyCreateStoryChapter: function (chapter, index) {
      this.createStoryChapterList.splice(index, 1, chapter)
    },
    onSaveClick: function () {
      let newStory = new Story()
      newStory.userID = this.userToken
      newStory.userName = this.user.displayName
      newStory.storyName = 'test001'
      newStory.storyDate = 'test002'
      newStory.storyDuration = 1
      newStory.storyTotalExpense = 'test003'
      newStory.storyExpenseList = ['Hello']
      newStory.storyTagList = ['Hello', 'World']
      newStory.storyType = 'plan'
      newStory.chapterList = this.createStoryChapterList
      newStory.storyPhoto = this.createStoryChapterList[0][0].chapterPhotoList[0]
      this.chaptersTest = newStory.chapterList
    },
    onChangeDays: function (n) {
      console.log('onChangeDays:' + n)
      this.createStoryChapterList.splice(0,this.createStoryChapterList.length)
      for(let i = 0; i < n; i++){
        this.createStoryChapterList.push([])
      }
      // this.createStoryChapterList = Array.apply(null, Array(n)).map(function (_) {return []})
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
  height: 90vh;
  background-color: #f2f2f2;
  flex-direction: column;
}

/*#sticker {
  height: 70vh;
}*/
</style>

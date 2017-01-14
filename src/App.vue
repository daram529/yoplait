<template>
  <div id="app">
    <BarMenu :isLoggedIn = "isLoggedIn" :on-login-click="onLoginClick" :on-sign-out="onSignOutClick" :user-name="user.displayName"></BarMenu>
    <main class="ui container" id="content">
      <div class="ui segment" id="two">
        <Stories v-if="currentView == 'Stories'" :story-list="storiesList" :onClick="onStoryClick"></Stories>
        <Chapters v-else-if="currentView == 'Chapters'" :chapter-list="chaptersTest" :on-drag-start="onScrapDragStart"></Chapters>
        <CreateStory v-else-if="currentView == 'CreateStory'" :chapter-list="createStoryChapterList" :modify-chapter="modifyCreateStoryChapter" :onAddClick="insertCreateStoryChapterList" :on-create-story-drop="insertCreateStoryChapterList" ></CreateStory>
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

// let chapter = function () {
//   this.chapterLocation = ''
//   this.chapterDescription = ''
//   this.chapterTip = ''
//   this.chapterPhotoList = []
// }
// let story = function () {
//   this.userID = ''
//   this.userName = ''
//   this.storyName = ''
//   this.storyDate = ''
//   this.storyDuration = 0
//   this.storyTotalExpense = ''
//   this.storyExpenseList = []
//   this.storyTagList = []
//   this.storyType = ''
//   this.chapterList = []
//   this.storyPhoto = ''
// }
export default {
  name: 'app',
  components: {
    BarMenu,
    Chapters,
    ChapterCard,
<<<<<<< HEAD
    Stories
=======
    Stories,
    CreateStory
  },
  firebase: {
    story: storyRef
>>>>>>> 4c8b4938f35401decdd0beb0a96d745027e89b23
  },
  data: function () {
    return {
      currentView: 'Chapters',
      chapterList: [],
      userToken: '',
      user: {},
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
      createStoryChapterList: [],
      active: false
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.userToken !== ''
    }
  },
  /* eslint-disable */
  mounted: function () {
    console.log($('ui.sticky'))
    console.log($(this.$el).find('#sticker'))
    // $(this.$el).find('#sticker')
    $('.ui.sticky').sticky({
      // offset: 55,
      // bottomOffset: 50,
      // context: '#main',
      observeChanges: true,
      context: '#two',
      offset: 55,
      bottomOffset: 50
    })
  },
  methods: {
    onScrapBookDrop: function (ev) {
      ev.preventDefault();
      console.log(ev.target)
      console.log(this.draggingChapter)
      console.log(this.scrapBookTest)
      this.scrapBookTest.push(this.draggingChapter)
      this.draggingChapter = {}
      // $('.ui.sticky').sticky('refresh')
      // Vue.nextTick(function () {
      //   $('.ui.sticky').sticky('refresh')
      // })
    },
    onCreateStoryDrop: function (ev) {
      ev.preventDefault();
      this.createStoryChapterList.push(this.draggingChapter)
      this.draggingChapter = {}
    },
    onScrapDragStart: function (index) {
      console.log(index)
      this.draggingChapter = this.chaptersTest[index]
    },
    // onDragRemove: function (index) {
    //   this.scrapBookTest.splice(index, 1)
    // },
    onCreateStoryDragStart: function (index) {
      this.draggingChapter = this.scrapBookTest[index]
    },
    onStoryClick: function (story) {
      this.chapterList = story.child('chapterList')
    },
    insertCreateStoryChapterList: function (index) {
      this.createStoryChapterList.splice(index, 0, this.draggingChapter)
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

<template>
  <div id="app">
    <BarMenu :filtered-stories = "filteredStories" v-model = "searchString" :current-view-change = "currentViewChange" :is-logged-in = "isLoggedIn" @logIn="onLoginClick" @logOut="onLogOutClick" :user-name="user.displayName" @myStories="currentView = 'myStories'"></BarMenu>
    <main class="ui container" id="content">
      <div class="ui segment">
        <div class="context" id="two">
          <Stories v-if="currentView == 'Stories'" :whose-story="whoseStory" v-on:storyView="onStoryView" :story-list="filteredStories"></Stories>
          <Chapters v-else-if="currentView == 'Chapters'" v-on:otherStories="otherStories" :story="targetStory" :on-drag-start="onScrapDragStart"></Chapters>
          <CreateStory v-else-if="currentView == 'CreateStory'" v-on:distanceChange="distanceChange" :storageRef="storageRef" :chapter-list="createStoryChapterList" @modifyChapter="modifyCreateStoryChapter" v-on:createStoryDrop="insertCreateStoryChapterList" v-on:saveStory="onSaveClick" v-on:changeDays="onChangeDays"></CreateStory>
          <Stories v-else-if="currentView == 'myStories'" :whose-story="whoseStory" v-on:storyView="onMyStoryView" :story-list="myStories"></Stories>
          <Stories v-else-if="currentView == 'otherStories'" :whose-story="whoseStory" v-on:storyView="onOtherStoryView" :story-list="otherstory"></Stories>
        </div>
        <div class="ui right rail" v-if="isLoggedIn">
          <div class="ui fixed top sticky segment" id="sticker" v-on:dragover.prevent v-on:drop="onScrapBookDrop">
            <h3 class="ui block header" style="border:3px; padding-left:10px; margin-bottom:5px; background-color:#E0E0E0">
              <i class="sticky note icon"></i>Scrapbook
            </h3>
            <div class="ui context" id="stickerContent">
              <ChapterCard id="scrapbookCard" v-for="(ch, idx) in scrapBookTest" :chapter="ch" :index="idx" :content-visible="false" :on-drag-start="onCreateStoryDragStart"></ChapterCard>
            </div>
            <div id="footer" class="ui red huge icon label" v-on:dragover.prevent v-on:drop="onScrapBookRemove"><i style="padding-left: 10px;"class="trash icon"/></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
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
  this.chapterLocation = 'New Chapter'
  this.chapterDescription = ''
  this.chapterTip = ''
  this.chapterPhotoList = []
  this.chapterKey = ''
  this.chapterDistance = ''
}
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
    stories: storyRef,
    users: usersRef
  },
  data: function () {
    return {
      whoseStory: '전체 이야기',
      otherstory: [],
      storyDate: 0,
      searchString: '',
      currentView: 'Stories',
      userToken: '',
      userRef: {},
      user: {},
      storageRef: fb.storage().ref(),
      targetStory: {},
      storiesList: [],
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
      var storiesArray = this.stories.reverse()
      var searchString = this.searchString

      if (!searchString) {
        return storiesArray
      }

      searchString = searchString.trim().toLowerCase()
      storiesArray = storiesArray.filter(function (item) {
        if (item.storyName && item.storyName.toLowerCase().indexOf(searchString) !== -1) {
          return item
        } else {
          for (var chapterDate in item.chapterList) {
            console.log(item.chapterList[chapterDate])
            for (var chapter in item.chapterList[chapterDate]) {
              console.log(item.chapterList[chapterDate][chapter])
              if (item.chapterList[chapterDate][chapter].chapterLocation && item.chapterList[chapterDate][chapter].chapterLocation.toLowerCase().indexOf(searchString) !== -1) {
                return item
              }
            }
          }
        }
      })
      // Return an array with the filtered data.
      return storiesArray
    },
    myStories: function () {
      this.whoseStory = '나의 이야기'
      return this.stories.filter(function (item) {
        return item.userID === this.userToken
      }.bind(this))
    }
  },
  /* eslint-disable */
  mounted: function () {
    console.log($('ui.sticky'))
    console.log($(this.$el).find('#sticker'))
    $('.ui.sticky').sticky({
      observeChanges: true,
      context: '#two',
      offset: 2000,
      bottomOffset: 50
    })
  },
  methods: {
    distanceChange: function (date, index, value) {
      console.log('date'+date+'index'+index+value)
      this.createStoryChapterList[date][index].chapterDistance = value
    },
    otherStories: function (otherUserID, otherUserName) {
      this.whoseStory = otherUserName + '의 이야기'
      console.log("on otherStories!")
      console.log(otherUserID)
      this.currentView='otherStories'
      this.otherstory = this.stories.filter(function (item) {
        if (item.userID === otherUserID){
          return item
        }
      })
    },
    currentViewChange: function (currentView) {
      this.whoseStory = '전체 이야기'
      this.currentView = currentView
    },
    onScrapBookDrop: function (ev) {
      ev.preventDefault();
      console.log(ev)
      console.log(ev.dataTransfer)
      if(this.draggingFrom !== 'Scrapbook' && this.draggingFrom!=''){
        this.scrapBookTest.push(this.draggingChapter)
        this.userRef.child('chapterList').set(this.scrapBookTest)
        this.draggingChapter = {}
      }
      this.draggingFrom = ''
    },
    onScrapBookRemove: function (ev) {
      ev.preventDefault();
      console.log(ev)
      console.log(ev.dataTransfer)
      if((this.draggingFrom === 'Scrapbook') && (this.draggingChapter.chapterLocation !== 'New Chapter')){
        let idx = this.scrapBookTest.indexOf(this.draggingChapter)
        console.log('idx'+idx)
        console.log('scrapbookTest'+this.scrapBookTest)
        this.scrapBookTest.splice(idx, 1)
        console.log('afterScrapbookTest'+this.scrapBookTest)
        this.userRef.child('chapterList').set(this.scrapBookTest)
        this.draggingChapter = {}
      }
      this.draggingFrom = ''
    },
    onStoryView: function (index) {
      this.targetStory = this.filteredStories[index]
      this.currentView = 'Chapters'
    },
    onMyStoryView: function (index) {
      console.log('onMyStoryView!!')
      this.targetStory = this.myStories[index]
      this.currentView = 'Chapters'
    },
    onOtherStoryView: function (index) {
      console.log('onOtherStoryView!!')
      this.targetStory = this.otherstory[index]
      this.currentView = 'Chapters'
    },
    onScrapDragStart: function (date, index) {
      console.log(index)
      this.draggingChapter = this.targetStory.chapterList[date][index]
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
      this.draggingChapter.chapterKey =  Array(11).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, 10)
      this.createStoryChapterList[n].splice(index, 0, this.draggingChapter)
      this.draggingChapter = {}
    },
    onLoginClick: function () {
      let provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // this.userToken = result.credential.accessToken
        this.user = result.user
        this.userToken = result.user.uid
        this.userRef = db.ref('users/'+this.userToken)
        // result.user.getToken().then(function (token) {
        //   this.userToken = token
          
        // })
        this.userRef.child('chapterList').on('value', (snapshot) => {
          this.scrapBookTest = snapshot.val()
          if(this.scrapBookTest == null){
            this.scrapBookTest = [new Chapter()]
            this.userRef.child('chapterList').set(this.scrapBookTest)
          }
        })
        console.log(this.user)

      }.bind(this)).catch(function (error) {
        console.log('error' + error)
      })
    },
    onLogOutClick: function () {
      firebase.auth().signOut().then(function () {
        this.user = {}
        this.userToken = ''
      }.bind(this))
    },
    modifyCreateStoryChapter: function (chapter, index, date) {
      console.log(date)
      this.createStoryChapterList[date].splice(index, 1, chapter)
    },
    onSaveClick: function (newStory) {
      // let newStory = new Story()
      newStory.userID = this.userToken
      newStory.userName = this.user.displayName
      // newStory.storyName = document.getElementById('storyName').value
      // newStory.storyDate = document.getElementById('storyDate').value
      // newStory.storyDuration = document.getElementById('storyPeriod').value
      // newStory.storyTotalExpense = document.getElementById('storyTotalExpense').value
      // newStory.storyExpenseList = []
      // var n = 0
      // while (document.getElementById('storyExpense'+n)){
      //   newStory.storyExpenseList.push(document.getElementById('storyExpense'+n).value)
      //   n++
      // }
      // newStory.storyTagList = []
      // var n = 0
      // while (document.getElementById('storyTag'+n)){
      //   newStory.storyTagList.push(document.getElementById('storyTag'+n).value)
      //   n++
      // }
      newStory.storyType = 'plan'
      newStory.chapterList = this.createStoryChapterList
      // newStory.storyPhoto = this.createStoryChapterList[0][0].chapterPhotoList[0]
      this.chaptersTest = newStory.chapterList
      let newStoryID = storyRef.push(newStory).key
      console.log(newStory)
      let currentStoryIDs = []
      this.userRef.child('storyIDList').once('value').then(function (snapshot) {
        currentStoryIDs = snapshot.val()
        if(currentStoryIDs == null){
          currentStoryIDs = [newStoryID]
        } else {
          currentStoryIDs.push(newStoryID)
        }
        this.userRef.child('storyIDList').set(currentStoryIDs)
        this.createStoryChapterList = [[]]
        this.currentView = 'myStories'
      }.bind(this))
      
    },
    onChangeDays: function (n) {
      console.log('onChangeDays:' + n)
      console.log(document.getElementById('storyPeriod').value)
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
  height: 80vh;
  background:#ffffff;
  top:72px;
  width: 250px;
  /*border : 1px solid rgba(34,36,38,0.15);*/
  border-radius: 5px;
  overflow: hidden;
  background-image:url("/static/images/bangkok.jpg");
}

.ui.rail {
  height: 100%;
  min-height: 800px;
}

/*collection of scrapbook items*/
#stickerContent {
  padding-left:40px;
  padding-right:40px;
  padding-top:10px;
}

/*scrapbook item*/
#scrapbookCard {
  margin-bottom:10px;
}

/*scrapbook title*/
#scrapbookCard h3{
  font-size: 16px;
  padding-top:5px;
}

/*sracpbook card*/
#scrapbookCard .card{
  height:30px;
  background: #ECEFF1;
}

/*scrapbook title*/
#scrapbookCard .content{
  padding:0px;
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

#footer{
  position:fixed;
  height:40px;
  bottom:0px;
  right:75px;
  margin-bottom:0px;
}

body {
  flex: 1 0 auto;
  display: flex;
  background-color: #f2f2f2;
  flex-direction: column;
}
</style>

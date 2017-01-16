<template>
  <div id="app">
    <BarMenu :filtered-stories = "filteredStories" v-model = "searchString" :current-view-change = "currentViewChange" :is-logged-in = "isLoggedIn" @logIn="onLoginClick" @logOut="onLogOutClick" :user-name="user.displayName" @myStories="currentView = 'myStories'"></BarMenu>
    <main class="ui container" id="content">
      <div class="ui segment" id="two">
        <Stories v-if="currentView == 'Stories'" v-on:storyView="onStoryView" :story-list="filteredStories"></Stories>
        <Chapters v-else-if="currentView == 'Chapters'" :story="targetStory" :on-drag-start="onScrapDragStart"></Chapters>
        <CreateStory v-else-if="currentView == 'CreateStory'" :storageRef="storageRef" :chapter-list="createStoryChapterList" @modifyChapter="modifyCreateStoryChapter" v-on:createStoryDrop="insertCreateStoryChapterList" v-on:saveStory="onSaveClick" v-on:changeDays="onChangeDays"></CreateStory>
        <Stories v-else-if="currentView == 'myStories'" v-on:storyView="onMyStoryView" :story-list="myStories"></Stories>
        <div class="ui right rail" v-if="isLoggedIn">
          <div class="ui sticky segment" id="sticker" v-on:dragover.prevent v-on:drop="onScrapBookDrop">
           <h3 class="ui block header" style="padding-left:10px; margin-bottom:5px; background-color:#E0E0E0">
             <i class="sticky note icon"></i>Scrapbook
           </h3>
           <div class="ui container" id="stickerContent">
              <ChapterCard id="scrapbookCard" v-for="(ch, idx) in scrapBookTest" :chapter="ch" :index="idx" :content-visible="false" :on-drag-start="onCreateStoryDragStart"></ChapterCard>
          </div>
          <Button class="ui button" v-on:click="currentView == 'Chapters' ? currentView = 'CreateStory' : currentView = 'Chapters'">임시버튼</Button>
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
  this.chapterLocation = 'New Chapter'
  this.chapterDescription = ''
  this.chapterTip = ''
  this.chapterPhotoList = []
  this.chapterKey = ''
}
// let Story = function () {
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
// let User = function () {
//   this.userToken = ''
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
    stories: storyRef,
    users: usersRef
  },
  data: function () {
    return {
      storyDate: 0,
      searchString: '',
      currentView: 'Stories',
      userToken: '',
      userRef: {},
      user: {},
      storageRef: fb.storage().ref(),
      targetStory: {},
      storiesList: [{
        userID: 'adgaglalfjladskjfdsa',
        userName: 'Minkyu YUN',
        storyName: '방에 콕콕콕',
        storyDate: '2016/08/15',
        storyPeriod: 3,
        storyPeople: '2명',
        storyTotalExpense: '150만원',
        storyExpenseList: ['항공비: 50만원', '교통비: 20만원', '식사: 30만원'],
        storyTagList: ['#우정여행', '#둘이서', '#배낭여행', '#액티비티', '#역사여행', '#말트래킹', '#시안성벽', '#성벽자전거'],
        storyPhoto: '/static/images/bangkok.jpg',
        chapterList: [
        [{chapterLocation: '돈므앙 공항', chapterDescription: '아이고 공항에 갔더니 밤이 다되고 사람들이 호객행위를 하고 택시를 타야되는데 어디서 타야되는지도 모르겠네~', chapterTip: '아이고 공항에 갔더니 밤이 다되고 사람들이 호객행위를 하고 택시를 타야되는데 어디서 타야되는지도 모르겠네~', chapterPhotoList: ['/static/images/bangkok/don.JPG']}, {chapterLocation: '담넌사두억 수상시장', chapterDescription: '헬렐레', chapterTip: '심카드 사야함', chapterPhotoList: ['/static/images/bangkok/dam.png']}],
        [{chapterLocation: '짜뚜짝 시장', chapterDescription: '헬렐레', chapterTip: '심카드 사야함', chapterPhotoList: ['/static/images/bangkok/jja.jpg']}, {chapterLocation: '카오산로드', chapterDescription: '헬렐레', chapterTip: '심카드 사야함', chapterPhotoList: ['/static/images/bangkok/kao.jpg']}, {chapterLocation: '하이야트', chapterDescription: '헬렐레', chapterTip: '심카드 사야함', chapterPhotoList: ['/static/images/bangkok/hyat.jpg']}],
        [{chapterLocation: '파타야', chapterDescription: '헬렐레', chapterTip: '심카드 사야함', chapterPhotoList: ['/static/images/bangkok/pattaya.jpg', '/static/images/bangkok/pattaya2.jpg']}]
        ]
      // },
      // {
      //   storyTitle: '너만 모르는 오사카',
      //   storyDate: '2016/12/15 (5박6일)',
      //   storyPhoto: '/static/images/japan.png',
      //   chapterList: ['유니버셜 스튜디오', '도톤보리', '오사카 성', '하라주쿠', '신주쿠', '기므미라지대'],
      //   storyName: '유느미느큐우'
      // },
      // {
      //   storyTitle: '폴은 가수다?',
      //   storyDate: '2016/12/15 (3박4일)',
      //   storyPhoto: '/static/images/singapore.jpg',
      //   chapterList: ['파크로얄 피커링 호텔', '가든 바이 더 베이', '유니버셜 스튜디오', '싱가폴 도심', '머라이언타워', '클라키', '마리나베이샌즈 야경', '주롱새파크', '보타닉 가든', '점보시푸드 레스토랑'],
      //   storyName: '윤민규'
      // },
      // {
      //   storyTitle: '사흘만에 대만정복',
      //   storyDate: '2016/12/15 (2박3일)',
      //   storyPhoto: '/static/images/taiwan.jpg',
      //   chapterList: ['타오위안 공항', '스린야시장', '30년 노점', '타이페이101빌딩', '딘타이펑', '융캉제', '경극 공연', '용산사', '타이베이 중앙역'],
      //   storyName: '윤민규'
      // },
      // {
      //   storyTitle: '넌 방콕 나도 방콕',
      //   storyDate: '2016/08/15 (2박3일)',
      //   storyPhoto: '/static/images/bangkok.jpg',
      //   chapterList: ['돈므앙 공항', '담넌사두억 수상시장', '짜뚜짝 시장', '카오산로드', '하이야트 호텔', '파타야', '알카자쇼', '돈므앙 공항'],
      //   storyName: 'Minkyu Yun'
      // },
      // {
      //   storyTitle: '너만 모르는 오사카',
      //   storyDate: '2016/12/15 (5박6일)',
      //   storyPhoto: '/static/images/japan.png',
      //   chapterList: ['유니버셜 스튜디오', '도톤보리', '오사카 성', '하라주쿠', '신주쿠', '기므미라지대'],
      //   storyName: '유느미느큐우'
      // },
      // {
      //   storyTitle: '방콕여행기',
      //   storyDate: '2016/08/15 (2박3일)',
      //   storyPhoto: '/static/images/bangkok.jpg',
      //   chapterList: ['돈므앙 공항', '담넌사두억 수상시장', '짜뚜짝 시장', '카오산로드', '하이야트 호텔', '파타야', '알카자쇼', '돈므앙 공항'],
      //   storyName: 'Minkyu Yun'
      // },
      // {
      //   storyTitle: '방콕말고 방콕가자',
      //   storyDate: '2016/08/15 (2박3일)',
      //   storyPhoto: '/static/images/bangkok.jpg',
      //   chapterList: ['돈므앙 공항', '담넌사두억 수상시장', '짜뚜짝 시장', '카오산로드', '하이야트 호텔', '파타야', '알카자쇼', '돈므앙 공항'],
      //   storyName: 'Minkyu Yun'
      // },
      // {
      //   storyTitle: '옷살까 오사카',
      //   storyDate: '2016/12/15 (5박6일)',
      //   storyPhoto: '/static/images/japan.png',
      //   chapterList: ['유니버셜 스튜디오', '도톤보리', '오사카 성', '하라주쿠', '신주쿠', '기므미라지대'],
      //   storyName: '유느미느큐우'
      // },
      // {
      //   storyTitle: '싱가폴서 살아남기',
      //   storyDate: '2016/12/15 (3박4일)',
      //   storyPhoto: '/static/images/singapore.jpg',
      //   chapterList: ['파크로얄 피커링 호텔', '가든 바이 더 베이', '유니버셜 스튜디오', '싱가폴 도심', '머라이언타워', '클라키', '마리나베이샌즈 야경', '주롱새파크', '보타닉 가든', '점보시푸드 레스토랑'],
      //   storyName: '윤민규'
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
      var storiesArray = this.stories
      var searchString = this.searchString

      if (!searchString) {
        return storiesArray
      }

      searchString = searchString.trim().toLowerCase()
      storiesArray = storiesArray.filter(function (item) {
        if (item.storyTitle.toLowerCase().indexOf(searchString) !== -1) {
          return item
        } else {
          for (var chapterDate in item.chapterList) {
            console.log(item.chapterList[chapterDate])
            for (var chapter in item.chapterList[chapterDate]) {
              console.log(item.chapterList[chapterDate][chapter])
              if (item.chapterList[chapterDate][chapter].chapterLocation.toLowerCase().indexOf(searchString) !== -1) {
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
  height:90vh;
  background:#ffffff;
  top:0px;
  border : 1px solid rgba(34,36,38,0.15);
  border-radius: 5px;
  background-image:url("/static/images/bangkok.jpg");
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
  position:absolute;
  top:50%;
  left:50%;
  transform: translateX(-50%) translateY(-50%);
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

body {
  flex: 1 0 auto;
  display: flex;
  height: 90vh;
  background-color: #f2f2f2;
  flex-direction: column;
}
</style>

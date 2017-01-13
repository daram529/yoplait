<template>
    <div class="storycard" v-on:mouseover="onMouseOver" v-on:mouseleave="onMouseLeave">
        <div class="ui card">
            <div class="content">
              <div>
              <h3 class = "title">
                방콕 여행기
              </h3>
              </div>
              <div>
              <h5 class = "time">
                2016/08/15 (2박3일)
              </h5>
              </div>
              
              <!--여기에 제목이랑 날짜 필요-->
            </div>
            <div class="blurring dimmable image">
              <div class="ui inverted dimmer">
                <div class="content">
                </div>
              </div>
              <img src="/static/images/singapore.jpg">
            </div>
            <div class="content">
              <ol>
                <li>돈므앙 공항</li>
                <li>담넌사두억 수상시장</li>
                <li>짜뚜짝 시장</li>
                <li>카오산로드</li>
                <li>하이야트 호텔</li>
                <li>파타야</li>
                <li>알카자쇼</li>
                <li>돈므앙 공항</li>
              </ol>
              <!--Chapter List들-->
            </div>
            <div class="extra content">
              <div class="name">
                Minkyu Yun
              </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'storycard',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: function () {
    $('.ui .image').dimmer({
      on: 'hover',
      opacity: '0.05'
    })
  },
  methods: {
    onMouseOver: function () {
      $('.ui .image').dimmer('show')
    },
    onMouseLeave: function () {
      $('.ui .image').dimmer('hide')
    }
  }
}
</script>

<style scoped>
.ui.card:hover {
  border: 1px solid #283593;
  cursor: pointer;
}

.ui .content{
  padding:10px;
  text-align: left;
}

.title{
  margin:0px;
}

.time {
  color:gray;
  margin:0px;
}

ol {
  float:left;
  text-align: left;
  margin:0px;
  padding-left: 16px;
}
</style>
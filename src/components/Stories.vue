<template>
   <div class="stories">
    <!-- Page Content -->
    <div class="ui container" id="storyCollection">
      <!--ui relaxed divided padded full center aligned grid -->
        <div class="ui relaxed divided padded full center aligned grid">
            <div class="row" id="test">
                <h2 class="ui header">
                    <div class="content">
                    전체 이야기
                    </div>
                </h2>
            </div>
            <div class="ui divider"></div>
            <div class="row" id="storyBoard">
                <StoryCard></StoryCard>
                <StoryCard></StoryCard>
                <StoryCard></StoryCard>
                <StoryCard></StoryCard>
                <StoryCard></StoryCard>
            </div>
        </div>
        <ScrapBook></ScrapBook>
    </div>

     <!--Footer 
    <footer class="footer ui vertical segment">
        <div class="ui divider"></div>
        <div class="ui container">
            <div class="ui right floated horizontal list">
            <a class="item" href="#">Features</a>
            <a class="item" href="#">Contact</a>
            </div>
            <div class="ui horizontal list">
            <div class="disabled item">Copyright &copy; 2016 JSFiddle.</div>
            </div>
        </div>
    </footer>-->
   </div>
</template>


<script>
/* eslint-disable */
// import $ from 'jQuery'
import StoryCard from './StoryCard'
import ScrapBook from './ScrapBook'
export default {
  name: 'stories',
  components: {
    StoryCard,
    ScrapBook
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: function () {
    $('.ui.sticky')
    .sticky({
      context: '#app'
    })
  }
}

</script>

<style scoped>

#storyCollection{
  margin-top: 20px;
}

#storyBoard{
  padding-left:20px;
  padding-right:20px;
}

.ui.full.grid #test {
  padding-bottom:0px;
  text-align: left;
  align-items: left;
}

.ui.header {
  text-align: left;
  float:left;
}

.container {
  padding-right:80px;
  padding-left:80px;
  margin-top: 50px;
}

/* Full Grid */
.ui.full.grid {
  background-color: #ffffff;
  border : 1px solid rgba(34,36,38,0.15);
  border-radius: 5px;
}

.storycard {
  padding-left:5px;
  padding-right:5px;
  padding-bottom:10px;
}

/*footer {
  padding-bottom: 1.5em !important;
}*/

 /*Footer  
footer.ui.segment {
  padding: 0 1em 1em;
}
footer > .ui.divider {
  margin: 0 0 1rem;
  color: rgba(34, 36, 38, 0.15);
}*/
</style>

<template>
   <div class="stories">
    <!-- Page Content -->
    <main class="content">
    <div class="ui container">
        <div class="ui relaxed divided padded full grid">
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
                <StoryCard></StoryCard>
            </div>
        </div>
    </div>
    </main>

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
import StoryCard from './StoryCard'
export default {
  name: 'stories',
  components: {
    StoryCard
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}

</script>

<style>
body {
  display: flex;
  height: 100%;
  flex-direction: column;
}

main.content {
  padding-top:10px;
  height:1000px;
  background-color: #f2f2f2;
  flex: 1 0 auto;
  width: 100%;
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

#storyBoard{
  padding-left:20px;
  padding-right:20px;
}

h2 {
    margin-left:100px;
}

#test {
    padding-left:25px;
    bottom:0;
}

.container {
  margin-top: 50px;
}

/* Full Grid */
.ui.full.grid {
  background-color: #ffffff;
  border : 1px solid rgba(34,36,38,0.15);
  /*border-top : 1px solid rgba(34,36,38,0.15);
  border-left: 1px solid rgba(34, 36, 38, 0.15);
  border-right: 1px solid rgba(34, 36, 38, 0.15);*/
}

.storycard {
  padding-left:5px;
  padding-right:5px;
  padding-bottom:10px;
}

</style>
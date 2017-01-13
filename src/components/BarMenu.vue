<template>
    <div class="barmenu">
        <!--top fixed-->
        <div class="ui grid huge inverted top fixed menu">
            <a class="one wide column item">
                Home(Logo)
            </a>
            <div class="eleven wide column item">
                <div class="ui fluid left icon input">
                <input type="text" placeholder="Search...">
                <i class="search icon"></i>
                </div>
            </div>
            <a class="two wide column item">
                여행 글 쓰러 가기
            </a>
            <div class="two wide column right item">
                <div class="ui simple dropdown">
                    Dropdown
                    <i class="dropdown icon"></i>
                    <div class="menu">
                    <div class="item">Choice 1</div>
                    <div class="item">Choice 2</div>
                    <div class="item">Choice 3</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'barmenu',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>

</style>
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
                <div v-if="isLoggedIn" class="ui simple dropdown">
                    {{this.userName}}
                    <i class="dropdown icon"></i>
                    <div class="menu">
                    <div class="item">내 여행기</div>
                    <div class="item">내 프로필</div>
                    <div class="ui divider"></div>
                    <div class="item" v-on:click="onSignOutClick">로그아웃</div>
                    </div>
                </div>
                <button v-else class="ui labeled icon inverted basic button" v-on:click="onLoginClick">
                    <i class="sign in icon"/> Log in 
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'barmenu',
  props: ['isLoggedIn', 'onLoginClick', 'onSignOutClick', 'userName'],
  data: function () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>

</style>

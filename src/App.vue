<template>
  <div id="app">
    <router-view/>
    <div class="beian">
      <bai-an-hao/>
    </div>

    <main-tab-bar></main-tab-bar>


  </div>

</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'
  import BaiAnHao from 'components/common/tabbar/BaiAnHao'
export default {
  name: 'App',
  components: {
    MainTabBar,
    BaiAnHao
  }
}
</script>

<style>
@import "assets/css/base.css";
.beian{
  text-align: center;
  margin-bottom: 50px;
}
</style>

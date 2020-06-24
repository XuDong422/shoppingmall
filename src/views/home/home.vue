<template>
  <div>
    <nav-bar class="home-navbar">
      <template #center>
        <h2>购物街</h2>
      </template>
    </nav-bar>

    <home-swiper :banners="banners"/>

    <recommend-view :recommends="recommends"/>


    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
    <h4>内容</h4>
  </div>

</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import {getHomeMultidata} from 'network/home'

  export default {
    name: "home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    },
  data(){
      return{
        // result:null
        banners:[],
        recommends:[]
      }
  },
    created(){
      getHomeMultidata().then(res => {
        // console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
.home-navbar{
  background-color: var(--color-tint);
  color: white;
}
</style>

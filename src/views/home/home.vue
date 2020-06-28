<template>
  <div id="home">
    <nav-bar class="home-navbar">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>

    <home-swiper :banners="banners"/>

    <recommend-view :recommends="recommends"/>

    <feature-view/>

    <tab-control
      :titles="['流行','新款','推荐']"
      class="tab-control"
      @tabClick="tabClick"
    />

    <goods-list :goods="goods[currentType].list"/>


  </div>

</template>

<script>
  //子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  //公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  //方法
  import {
    getHomeMultidata,
    getHomeGoods,
  } from 'network/home'

  export default {
    name: "home",
    components: {
      //子组件
      HomeSwiper,
      RecommendView,
      FeatureView,
      //公共组件
      NavBar,
      TabControl,
      GoodsList,
    },
  data(){
      return{
        // result:null
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop'
      }
  },
    created(){
      //1.请求首页的上部数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    methods:{
      //
      //事件监听相关方法
      //
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },

      //
      //网络请求相关方法
      //
      getHomeMultidata(){
        getHomeMultidata().then(res => {
        //1.请求首页的上部数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })},
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          //2.请求商品数据
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    },
  }
</script>

<style scoped>
  #home{
    padding-top: 35px;
  }
  .home-navbar{
  background-color: var(--color-tint);
  color: white;

  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}
  .tab-control{
    position: sticky;
    top: 35px;
  }
</style>

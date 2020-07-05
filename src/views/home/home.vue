<template>
  <div id="home">
    <!--首页顶部导航栏-->
    <nav-bar class="home-navbar"
              @click.native="backClick">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>


    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="LoadMore"
      >


      <template #scroll>
        <!--轮播图-->
        <home-swiper :banners="banners"/>
        <!--推荐位-->
        <recommend-view :recommends="recommends"/>
        <!--周流行-->
        <feature-view/>
        <!--点击切换产品-->
        <tab-control
          :titles="['流行','新款','推荐']"
          class="tab-control"
          @tabClick="tabClick"/>
        <!--产品瀑布-->
        <goods-list :goods="showGoods"/>
        <!--备案号-->
        <bai-an-hao/>

      </template>

    </scroll>
    <!--点击返回顶部-->
    <back-top @click.native="backClick" v-show="isShow"/>

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
  import Scroll from 'components/common/scroll/Scroll'
  import BaiAnHao from 'components/common/tabbar/BaiAnHao'
  import BackTop from 'components/content/backTop/BackTop'

  //方法
  import {
    getHomeMultidata,
    getHomeGoods,
  } from 'network/home'
  import {dedounce} from 'common/utils';

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
      Scroll,
      BaiAnHao,
      BackTop,
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
        currentType:'pop',
        isShow:false,
      }
  },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      },
    },
    created(){
      //1.请求首页的上部数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){

      const refresh = dedounce(this.$refs.scroll.refresh,500)
      //3.监听item中图片加载完成
      this.$bus.$on('imgOk', () => {
        refresh()
        // this.$refs.scroll.refresh()
        // console.log('------');
        // console.log(this.$refs.scroll.refresh());

      })
    },
    methods:{


      //事件监听相关方法
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

      //点击返回顶部方法
      backClick(){
        // console.log('回顶部');
        this.$refs.scroll.scrollTo(0,0);
      },

      //判断高度,修改isShow
      contentScroll(position){
        //这里可以打印派发事件
        // console.log(position);

        this.isShow = (-position.y) > 600
      },

      //上拉加载更多
      LoadMore(){
        console.log('加载更多');

        this.getHomeGoods(this.currentType);

        this.$refs.scroll.scroll.refresh()

      },

      //网络请求相关方法
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


          this.$refs.scroll.finishPullUp()
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
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
}
  .tab-control{
    position: sticky;
    top: 35px;
  }

  .content{
    height: calc(100vh - 87px);
    /*overflow: hidden;*/
  }
</style>

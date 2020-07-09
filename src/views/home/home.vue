<template>
  <div id="home">
    <!--首页顶部导航栏-->
    <nav-bar class="home-navbar"
              @click.native="backClick">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>

    <!--点击切换产品与下方的scroll里的是一样的-->
    <tab-control
      :titles="['流行','新款','推荐']"
      @tabClick="tabClick"
      class="tab-home-control"
      v-show="istabFixed"
      ref="tabControl1"
    />



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
        <home-swiper :banners="banners" @swiperImgLoad.once="swiperImgLoad"/>
        <!--推荐位-->
        <recommend-view :recommends="recommends" @recommendImgLoad.once="recommendImgLoad"/>

        <!--周流行-->
        <feature-view/>
        <!--点击切换产品-->
        <tab-control
          :titles="['流行','新款','推荐']"
          @tabClick="tabClick"
          ref="tabControl2"
          />
        <!--class="tab-control"-->

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
  //方法
  import {
    getHomeMultidata,
    getHomeGoods,
  } from 'network/home'
  import {dedounce} from 'common/utils';
  import {
    itemImgListenerMixin,
    backTopMixin,} from "common/mixin";

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
        tabOffsetTop:0,
        // tabOffsetTop2:0,
        istabFixed:false,
        recommendImg:false,
        saveY:0,
      }
  },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list


      },
    },
    destroyed(){
      console.log('销毁');
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,20)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      //保存离开前的位置
      this.saveY = this.$refs.scroll.scroll.y

      //取消全局事件的监听
      this.$bus.$off('imgOk',this.itemImgListener)
    },
    created(){
      //1.请求首页的上部数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mixins:[itemImgListenerMixin,backTopMixin,],
    mounted(){

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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },


      //判断高度,修改isShow,来确定返回顶部出不出现,以及判断点击切换部分是否吸顶
      contentScroll(position){
        //这里可以打印派发事件
        // console.log(position);

        this.contenttop(position);

        // 2.决定tabControl是否吸顶（position：fixed）
        this.istabFixed = (-position.y +36) > this.tabOffsetTop
      },


      // 获取tabControl的offsetTop
      recommendImgLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.tabOffsetTop);
      },
      //这个和上一段代码一样这个是监听图片完成
      // 但是会偶尔出现recommend未加载完成就收取高度出现偏离一点位置所以使用上面那个代码
      swiperImgLoad(){
        // this.tabOffsetTop2 = this.$refs.tabControl2.$el.offsetTop
      },

      //上拉加载更多
      LoadMore(){
        // console.log('加载更多');
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
  .tab-home-control{
    position:fixed;
    z-index: 1;
    width: 100%;
  }
  /*.fixed{*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 35px;*/
  /*}
  */
  /*.tab-control{*/
    /*position: sticky;*/
    /*top: 35px;*/
  /*}*/

  .content{
    height: calc(100vh - 87px);
    /*overflow: hidden;*/
  }
</style>

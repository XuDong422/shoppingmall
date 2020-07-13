<template>
    <div id="detail">
      <!--顶部导航栏-->
      <detail-nav-ber class="detail-nav-ber" @titleClick="titleClick" ref="detailnavber"/>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <template #scroll class="detail-scroll">
          <!--<ul style="width: 300px;height: 500px">-->
            <!--<li v-for="item in $store.state.cartList">{{item}}</li>-->
          <!--</ul>-->
          <!--轮播图-->
          <detail-swi-per :top-images="topImages"></detail-swi-per>
          <!--商品基本信息-->
          <detail-base-info :goods="GoodsInfo"></detail-base-info>
          <!--店铺信息-->
          <detail-shop-info :shop="Shop"></detail-shop-info>
          <!--商品详细信息-->
          <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
          <!--详细参数-->
          <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
          <!--评论信息-->
          <detail-comment-info ref="comment"  :comment-info="commentInfo"></detail-comment-info>
          <!--底部推荐位-->
          <goods-list ref="recommend" :goods="recommends"></goods-list>
        </template>
      </scroll>

      <!--点击返回顶部-->
      <back-top @click.native="backClick" v-show="isShow"/>
      <!--底部工具栏-->
      <detail-bottom-bar @addToCart="addToCart"/>

      <!--弹窗-->
      <!--<toast :mess></toast>-->
    </div>
</template>

<script>
  // 公共组件
  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import Toast from 'components/common/toast/Toast'

  //子组件
  import DetailNavBer from './childConmps/DetailNavBer'
  import DetailSwiPer from './childConmps/DetailSwiPer'
  import DetailBaseInfo from './childConmps/DetailBaseInfo'
  import DetailShopInfo from './childConmps/DetailShopInfo'
  import DetailGoodsInfo from './childConmps/DetailGoodsInfo'
  import DetailParamInfo from './childConmps/DetailParamInfo'
  import DetailCommentInfo from './childConmps/DetailCommentInfo'
  import DetailBottomBar from './childConmps/DetailBottomBar'
  //方法
  import {
    getDetail,
    GoodsInfo,
    Shop,
    GoodsParam,
    getRecommend,
  } from "network/detail";
  import {dedounce,} from "common/utils";
  import {
    itemImgListenerMixin,
    backTopMixin,} from "common/mixin";
  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBer,
      DetailSwiPer,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Toast,
    },
    data(){
      return{
        iid:null,
        topImages:[],
        GoodsInfo:{},
        Shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        // message:'',
        // show:false,
      }
    },
    created(){
      //1.保存iid
      this.iid = this.$route.params.iid;

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        // 2.1获取顶部的图片轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages

        // 2.2获取商品信息
        this.GoodsInfo = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)

        // 2.3获取店铺信息
        this.Shop = new Shop(data.shopInfo)

        // 2.4获取商品详情信息
        this.detailInfo = data.detailInfo

        // 2.5获取详情参数
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 2.6获取评论信息
        if (data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }


      })

      //3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })

      // 4.
      this.getThemeTopY = dedounce(() => {
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 36)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 36)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 36)
        this.themeTopYs.push(Number.MAX_VALUE)

        // console.log(this.themeTopYs);
      },100)
    },
    mixins:[itemImgListenerMixin,backTopMixin,],
    mounted(){

    },
    destroyed(){
      this.$bus.$off('imgOk',this.itemImgListener)
    },
    methods:{
      ...mapActions(['addCart']),
      detailImageLoad(){
        // this.$refs.scroll.refresh()
        // console.log('+++');

        // const refresh = dedounce(this.$refs.scroll.refresh,500)
        //
        // this.itemImgListener = () => {
        this.refresh()

        this.getThemeTopY()
        // }
      },

      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
        // console.log(this.themeTopYs);
      },
      // 判断高度修改导航栏颜色
      contentScroll(position){
        const positionY = -position.y

        let length = this.themeTopYs.length

        for (let i = 0; i < length-1; i++){

          if (this.currentIndex !== i  && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){

            this.currentIndex = i;
            // console.log(this.currentIndex);
            this.$refs.detailnavber.currentIndex = this.currentIndex

          }

          // if (this.currentIndex !== i && ((i < length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
          //   ||
          //   (i === length - 1 && positionY > this.themeTopYs[i]))
          // ){
          //   this.currentIndex = i;
          //   // console.log(this.currentIndex);
          //   this.$refs.detailnavber.currentIndex = this.currentIndex
          // }
        }

        // 1.判断BackTop是否显示
        this.contenttop(position);
      },

      addToCart(){
        // 1.获取购物车需要展示的信息
        const product = {}

        product.iid = this.iid;
        product.image = this.topImages[0];
        product.title = this.GoodsInfo.title;
        product.desc = this.GoodsInfo.desc;
        product.price = this.GoodsInfo.nowPrice;

        // console.log(product);

        //将数据传进vuex的addCart
        // this.$store.commit('addCart',product)
        this.addCart(product).then(res => {
          // this.show = true;
          // this.message = res;
          //
          // setTimeout(() => {
          //   this.show = false
          // },2000)
          // console.log(res);
          console.log(this.$toast.show);
          this.$toast.show(res,2000);

        })
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })

        // console.log(this.$store.cartList);
      },

    },

  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    background-color: white;
  }
  .detail-nav-ber{
    position: relative;
    z-index: 9;
    background-color: white;
  }
  .content{
    height: calc(100vh - 85px);
    z-index: 1;
    overflow: hidden;
  }
  .detail-scroll{
    background-color: white;
  }
</style>

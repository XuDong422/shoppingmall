<template>
  <div class="cart">
    <!--导航栏-->
    <nav-bar class="nav-bar">
      <template #center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>
    <!--购物列表-->
    <div>
    <scroll
      class="content"
      ref="scroll">

      <template #scroll>

        <cart-list></cart-list>

      </template>
    </scroll>
    </div>
    <!--底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  //公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  //子组件
  import CartList from './childConmps/CartList'
  import CartBottomBar from './childConmps/CartBottomBar'

  //方法
  import {mapGetters} from 'vuex'

  export default {
    name: "cart",
    components: {
      //公共组件
      NavBar,
      Scroll,
      //子组件
      CartList,
      CartBottomBar,
    },
    computed:{
      ...mapGetters(['cartLength'])
    },
    activated(){
      this.$refs.scroll.refresh();
      // console.log('---');
    },
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: white;
    /*font-weight: 700;*/
  }
  .content{
    height:calc(100vh - 126px);
    overflow: hidden;
  }
</style>

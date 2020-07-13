<template>
    <div class="cart-list">
      <!--<ul class="cartul">-->
        <!--<li v-for="item in cartList">{{item}}</li>-->
      <!--</ul>-->

      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>

    </div>
</template>

<script>
  // 子组件
  import CartListItem from './CartListItem'
  //方法
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components: {
      //公共组件
      //子组件
      CartListItem,
    },
    computed:{
      ...mapGetters(['cartList'])
    },
  }
</script>

<style scoped>
  .cart-list{
    height:100%;
    overflow: hidden;
  }
</style>

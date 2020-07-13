<template>
    <div class="cart-bottom-bar">
      <div class="check-content">
        <check-button @checkBtnClick="checkBtnClick" v-model="isSelectAll" class="check-button"></check-button>
        <span>全选</span>
      </div>

      <p class="price">合计:{{totalPrice}}</p>

      <div class="calculate" @click="calcClick">清空购物车({{checKedLength}})</div>
    </div>
</template>

<script>
  import CheckButton from './CheckButton'

  import { mapGetters } from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton,
    },
    computed:{
      ...mapGetters(['cartLength']),
      totalPrice(){
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checKedLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      // isSelectAll(){
      //   return !(this.$store.state.cartList.filter(item => item.checked).length)
      //   console.log('--');
      // }

    isSelectAll: function () {
        if (this.$store.getters.cartList.length === 0)return false;
      return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
    }
    },
    methods: {
      checkBtnClick: function () {
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);

        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          });
        } else {
          this.$store.state.cartList.forEach(item => {
            item.checked = false;
          });
        }
      },
      calcClick(){
        if (!this.isSelectAll) {
          this.$toast.show('请选择购买的商品',2000)
        }
      },
    }
  }
</script>

<style scoped>
  .cart-bottom-bar{
    background-color:#a3a3a5;
    position: relative;
    height: 40px;
    display: flex;
    /*width: 100%;*/
    font-size: 15px;
  }
  .check-content{
    display: flex;
    /*justify-content: center;*/
    /*align-items: center;*/
    width: 55px;
    line-height: 40px;
    margin-left: 7px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    padding-top: 10px;
  }
  .price{
    margin-left: 20px;
    line-height: 40px;
    flex: 1;
  }
  .calculate{
    width: 110px;
    padding-right: 0px;
    line-height: 40px;

    background-color:#ffe817;
    text-align: center;
  }
</style>

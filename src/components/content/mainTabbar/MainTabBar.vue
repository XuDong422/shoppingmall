<template>
  <tab-bar>
    <tar-bar-item path="/home" activeColor="deeppink">
      <template #item-itco><img src="~assets/img/tabbar/home.svg" alt=""></template>
      <template #item-itco-active><img src="~assets/img/tabbar/home_active.svg" alt=""></template>
      <template #item-text><div>首页</div></template>
    </tar-bar-item>

    <tar-bar-item path="/category" activeColor="deeppink">
      <template #item-itco><img src="~assets/img/tabbar/category.svg" alt=""></template>
      <template #item-itco-active><img src="~assets/img/tabbar/category_active.svg" alt=""></template>
      <template #item-text><div>分类</div></template>
    </tar-bar-item>

    <tar-bar-item path="/cart" activeColor="deeppink">
      <template #item-itco><img src="~assets/img/tabbar/cart.svg" alt=""></template>
      <template #item-itco-active><img src="~assets/img/tabbar/cart_active.svg" alt=""></template>
      <template #item-text><div>购物车</div></template>
    </tar-bar-item>

    <tar-bar-item path="/profile" activeColor="deeppink">
      <template #item-itco><img src="~assets/img/tabbar/profile.svg" alt=""></template>
      <template #item-itco-active><img src="~assets/img/tabbar/profile_active.svg" alt=""></template>
      <template #item-text><div>我的</div></template>
    </tar-bar-item>

  </tab-bar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TarBarItem from "components/common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {TabBar,TarBarItem},
  }
</script>

<style scoped>

</style>

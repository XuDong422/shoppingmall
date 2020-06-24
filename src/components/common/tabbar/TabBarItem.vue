<template #navigation>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-itco"></slot></div>
    <div v-else><slot name="item-itco-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      //这里是默认activeColor的颜色，如果再App的tar-bar-item有设置activeColor就接受那里的颜色，没有就是默认（default）红色了
      activeColor:{
        type:String,
        default:'red'
      }
    },
    data(){
      return {
        // isActive: true,
      }
    },
    computed:{
      isActive(){
        //$route是当前活跃的路由 path是路径=/home
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor}:{}
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path).catch(err=>{})
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
  /*.ative{*/
    /*color: dodgerblue;*/
  /*}*/
</style>

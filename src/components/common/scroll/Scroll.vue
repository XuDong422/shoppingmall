<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot name="scroll"></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0,
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      },
    },
    data(){
      return{
        scroll:null
      }
    },
    mounted(){
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        click:true,
        pullUpLoad:this.pullUpLoad,
      })
        //2.监听滚动的位置
      if (this.probeType ==2 || this.probeType ==3){
        this.scroll.on('scroll',(position) => {
          //这个是直接打印
          // console.log(position);
          this.$emit('scroll',position)
        })
      }

        //3.监听上拉事件
      if (this.pullUpLoad){
        this.scroll.on('pullingUp',() => {
          // console.log('上拉加载更多');
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      scrollTo(x,y,time=500){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
    },
  }
</script>

<style scoped>

</style>

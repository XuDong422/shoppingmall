<template>
    <div>
      <swiper class="detail-swiper">
        <template #swiper>
          <swiper-item class="swiper-item" v-for="(item,index) in topImages" :key="index">
            <img :src="item" alt="">
          </swiper-item>
        </template>
      </swiper>
    </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiPer",
    props:{
      topImages:{
        type:Array,
        default(){
          return[]
        }
      }
    },
    components:{
      Swiper,
      SwiperItem,
    },
  }
</script>

<style scoped>
  .swiper-item{
    height: 300px;
    overflow: hidden;
  }
</style>

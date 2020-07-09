<template>
  <swiper>
    <template #swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad1">
        </a>
      </swiper-item>
    </template>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props:{
      banners:{
        type:Array,
        default(){
          return[];
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      imgLoad1(){
        this.$emit('swiperImgLoad')
      },
    },
  }
</script>

<style scoped>

</style>

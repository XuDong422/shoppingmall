<template>
    <div class="recommend">
      <div v-for="item in recommends" class="recommend-item">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad2">
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default(){
          return[]
        }
      }
    },
    methods:{
      imgLoad2(){
        this.$emit('recommendImgLoad')
        // console.log('---');
      },
    },
  }
</script>

<style scoped>
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;

  padding: 10px 0 15px 0;
  border-bottom: 10px solid #e9e9e9;
}
.recommend-item{
  flex: 1;
}
.recommend-item img{
  width: 90%;
  margin-bottom: 10px;
}
</style>

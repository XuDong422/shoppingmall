import {dedounce} from "common/utils";
import BackTop from 'components/content/backTop/BackTop'

export const itemImgListenerMixin = {
  data(){
    return {
      itemImgListener:null,
      refresh:null,
      isShow:false,

    }
  },
  mounted(){
    this.refresh = dedounce(this.$refs.scroll.refresh,500)

    this.itemImgListener = () => {
      this.refresh()
    }

    this.$bus.$on('imgOk',this.itemImgListener)


  },

}

export const backTopMixin = {
  data(){
    return {
      isShow:false,
    }
  },
  components:{
    BackTop,
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contenttop(position){
      // 1.判断BackTop是否显示
      this.isShow = (-position.y) > 600
    },
  }
}

<template>
  <div class="home">
    <swiper :options="swiperOption" ref="mySwiper" style="height:150px">
      <swiper-slide v-for="slide in carouselList" :key="slide.id">
          
        <img :src="slide.picUrl" class="img-responsive"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="list" ref="list">
      <ul class="pt15 pb15">
      <li v-for="list in rankList" :key="list.id">
        <dl class="clearfix mb15">
          <dt class="col-xs-4 text-center">
            <img
              :src="`http://y.gtimg.cn/music/photo_new/T002R90x90M000${list.album.mid}.jpg?max_age=2592000`"
            />
          </dt>
          <dd class="col-xs-8">
            <h4 class="pt15" v-text="list.name"></h4>
            <p class="mt15">
              <span class="pl3 pr3" v-for="singer in list.singer" :key="singer.id">{{singer.name}}</span>
            </p>
          </dd>
        </dl>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll"
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getCarouselList ,getRankList} from "@/api/index";
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      carouselList: [],
      rankList:[]
    };
  },
  async created() {
    let data = await getCarouselList();
    //console.log(data,"凄凄切切群群群群群群群群群群")
    this.carouselList = data.data.data;

    let rankList=await getRankList()
    
    this.rankList=rankList.data.data;
    //console.log(this.rankList);
  },
   components: {
    swiper,
    swiperSlide
  },
  mounted () {
    this.initScroller()
  },
  methods: {
    initScroller(){
      const wrapper=this.$refs.list;
      new Bscroll(wrapper,{
        scrollbar:{
          fade:true,
          interactive:false
        }
      })
    }
  },
};
</script>
<style>

@import url('swiper/dist/css/swiper.css');
.home{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.swiper-container,.swiper-slide{
  width: 100%;
}
.img-responsive{
 width: 100%;
  height: 100%;
}
.list{
  flex:1;
  overflow: hidden;
}

</style>
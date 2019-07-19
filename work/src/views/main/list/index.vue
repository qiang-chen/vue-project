<template>
  <div class="movie">
    <div>
    <div>
      <ul v-if="movieList.length">
        <li v-for="list in movieList" :key="list.id">
          <dl class="clearfix mb15">
            <dt class="col-xs-4 text-center">
              <img
                class="img-responsive"
                style="display:inline-block"
                :src="`http://localhost:3000${list.imgUrl}`"
                width="75"
                height="100"
                :alt="list.name"
              />
            </dt>
            <dd class="col-xs-8">
              <h3 class="text-nobr">
                {{list.name}}
                <small class="text-orange mlr3" v-text="list.score"></small>
              </h3>
              <p class="mt15" v-text="list.actor"></p>
              <p class="text-nobr mt10" v-text="list.describe"></p>
            </dd>
          </dl>
        </li>
      </ul>
    
    </div>
    
  </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total"
        :current-page="currentPage"
        :page-sizes="limitArr"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getMovieList, getMovieLength } from "@/api/index";

export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      limitArr: [10, 20, 30, 40],
      limit: 10,
      movieList:[]
    };
  },
  async created() {
    let data = await getMovieList({
      page: this.currentPage,
      limit: this.limit
    });
    let len = await getMovieLength();
    let { total } = len.data;
    this.total = total;
    this.movieList=data.data.resault;
    console.log(this.movieList, "----");
  },
  methods: {
    async handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      console.log(this.currentPage);
      this.limit = val;
      let data = await getMovieList({
      page: this.currentPage,
      limit: this.limit
    });
    this.movieList=data.data.resault;
    },
    async handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      let page = this.currentPage;
      let limit = this.limit;
      console.log({ page, limit });
      let data = await getMovieList({
      page: this.currentPage,
      limit: this.limit
    });
    this.movieList=data.data.resault;
    }
  }
};
</script>

<style lang="scss" scoped>
.movie{
  width: 100%;
  height: 100%;
  overflow: auto;
}
.page {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 1rem;
}
.el-pager {
  display: block !important;
}
</style>
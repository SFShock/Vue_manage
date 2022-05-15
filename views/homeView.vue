<template>
    <el-container style="height:100%">
  <el-aside width="auto">
    <common-aside></common-aside>
  </el-aside>
  <el-container>
    <el-header>
      <common-header></common-header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import commonAside from '../src/components/commonAside.vue'
import commonHeader from '../src/components/commonHeader.vue'
export default{
    name:'homeView',
    data(){
        return{}
    },
    components:{
      commonAside,
      commonHeader
    }
}
</script>
<style lang="less" scoped>
.el-header{
  background-color: rgb(65, 60, 60);
  
}
.el-main{
  padding-top:0;
}
</style>

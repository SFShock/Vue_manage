<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:20px">
            <el-card shadow="always">
                <div slot="header" class="user">
                    <el-avatar :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <div class="userInfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2021-7-19</span></p>
                    <p>上次登录地点：<span>重庆</span></p>
                </div>
            </el-card>
            <div style="margin-top:20px;height:460px;">
                <el-card shadow="always">
                <el-table :data="tableData" style="width: 100%" size="medium">
                    <el-table-column prop="name" label="品牌">
                    </el-table-column>
                    <el-table-column prop="totalBuy" label="总购买" >
                    </el-table-column>
                    <el-table-column prop="monthBuy" label="本月购买">
                    </el-table-column>
                    <el-table-column prop="todayBuy" label="今日购买">
                    </el-table-column>
                </el-table>
                </el-card>
            </div>
        </el-col>
        <el-col :span="16" style="margin-top:20px;padding:0">
            <div class="num">
                <el-card shadow="always" v-for="item in countData" :key="item.name" :body-style="style1">
                    <i :class="'el-icon-'+item.icon" :style="{background:item.color,margin:'0'}"></i>
                    <div class="detail">
                        <p class="val">{{item.value}}</p>
                        <p class="name">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <div class="graph1">
                <el-card shadow="always" class="card1">
                    
                        <ee-chart :chartData="echartData.order" style="height:220px;width:auto"></ee-chart>
                   
                </el-card>
                <el-card shadow="always" class="card2">
                    
                    <ee-chart :chartData="echartData.video" style="height:180px;width:auto" :isAxischart="false"></ee-chart>
                   
                </el-card>
                <el-card shadow="always" class="card3">
                    
                        <ee-chart :chartData="echartData.user" style="height:180px;width:auto;"></ee-chart>
                    
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
    
    import {getData} from '../../api/data'
    import EeChart from '../../src/components/ECharts'
    export default{
        name:'homeView1',
        components:{
            EeChart
        },
        data(){
            return{
                userImg:require('../../src/assets/user1.png'),
                tableData:[],
                countData:[
                    {
                        name:'今日支付订单',
                        value:1111,
                        icon:'success',
                        color:'#2ec7c9'
                    },
                    {
                        name:'今日收藏订单',
                        value:210,
                        icon:'star-on',
                        color:'yellowgreen'
                    },
                    {
                        name:'今日未支付订单',
                        value:11,
                        icon:'star-off',
                        color:'mistyrose'
                    },
                    {
                        name:'本月支付订单',
                        value:2111,
                        icon:'success',
                        color:'#2ec7c9'
                    },
                    {
                        name:'本月收藏订单',
                        value:1000,
                        icon:'star-on',
                        color:'yellowgreen'
                    },
                    {
                        name:'本月未支付订单',
                        value:111,
                        icon:'star-off',
                        color:'mistyrose'
                    }
                ],
                echartData:{
                    order:{//折线图的数据
                        xData:[],
                        series:[]
                    },
                    user:{//柱状图的数据
                        xData:[],
                        series:[]
                    },
                    video:{//饼状图的数据
                        series:[]
                    }
                },
                style1:{
                    
                    display:'grid',
                    margin:'0',
                    padding:'0',
                    gridTemplateRows:'2fr 1fr',
                    gridTemplateColumns:'1fr 2fr',
                    gridTemplateAreas:'"picture words1" "picture words2"',
                    fontSize:'10vh',
                    gridColumnGap:'10px'
                }
            }
        },
        mounted(){
           
           getData().then(res=>{
               const {code,data}=res.data;
               if(code==20000){
                   this.tableData=data.tableData;
                   //折线图
                   const order=data.orderData;
                   const xData=order.date;
                   const keyArray=Object.keys(order.data[0]);//object.keys方法：把order.data数组的第一个数组里的属性键名传入keyarray
                   const series=[];
                   keyArray.forEach(key => {
                       series.push({
                           name:key,
                           data:order.data.map(item=>item[key]),
                           type:'line'
                       })
                   });
                   console.log(series);
                   /*const option={
                       xAxis:{
                           data:xData
                       },
                       yAxis:{},
                       tooltip:{},
                       legend:{
                           data:keyArray
                       },
                       series:series
                   }*/
                   
                   this.echartData.order.xData=xData;
                   this.echartData.order.series=series;
                  /*const E = echarts.init(this.$refs.echarts);
                  E.setOption(option);*/

                  //饼图
                  const video=data.videoData;
                 /* const option2={
                      series:[
                      {
                          type:'pie',
                          data:video,
                      }
                      ],
                      radius:'50%'
                  }*/
                  this.echartData.video.series=[{type:'pie',data:video}];
                 /*const V=echarts.init(this.$refs.videoEcharts);
                  
                  V.setOption(option2);
                  console.log(V.setOption(option2));*/
                  // 柱状图
                  const user=data.userData;
                  let userDate=[];
                  let userVal=[];
                  let newVal=[];
                  for(let i=0;i<7;i++){
                      userDate.push(user[i].data);
                      userVal.push(user[i].active);
                      newVal.push(user[i].new);
                  }
                  /*const option3 = {
                        xAxis: {
                            data: userDate
                        },
                        yAxis: {},
                        tooltip:{},
                        
                        series: [
                        {
                            type: 'bar',
                            data: userVal,
                            barWidth:'20%',
                            
                        },{
                            type: 'bar',
                            data: newVal,
                            barWidth:'20%',
                        }
                        ],
                        grid:{
                            height:100
                        }
                     };
                const U=echarts.init(this.$refs.userEcharts);
                console.log(U);
                U.setOption(option3);*/
                this.echartData.user.xData=userDate;
                this.echartData.user.series=[{
                            name:'活跃用户',
                            type: 'bar',
                            data: userVal,
                            barWidth:'20%',
                            
                        },{
                            name:'新增用户',
                            type: 'bar',
                            data: newVal,
                            barWidth:'20%',
                        }]
               
               }
               console.log(res);
           })
        }
    }
</script>
<style lang="less" scoped>
    .graph1{
        margin-top:20px;
        display:grid;
        height:60vh;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
        row-gap:20px;
        column-gap: 10px;
        .card1{
            grid-row:1 / 1;
            grid-column: 1 / 3;
        }
        .card2{
            grid-row:2 / 3;
            grid-column:1 / 2;
            
        }
        .card3{
            grid-row:2 / 3;
            grid-column: 2 / 3;
            
        }
    }
    .num{
        height:30vh;
        display:grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        row-gap:10px;
        column-gap: 10px;
    }
    i{
        
        grid-column:1 / 2 ;
        grid-row:1 / 3;
        color:white;
        justify-self: center;
        text-align: center;
       
    }
    .detail{
        .val{
            font-size:1.5vh;
            font-weight: bolder;
            grid-area:words1;
            align-self: center;
        }
        .name{
            font-size:1vw;
            color:rgb(173, 172, 172);
            grid-area:words2;
            align-self: end;
        }
    }
    .el-table{
        font-size:1vh;
    }
    .user{
        font-size:15px;
        display:flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-evenly;
       
    }
    .login-info{
        font-size:10px;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
</style>
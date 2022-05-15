<template>
    <header>
        <div class="l-content">
            <el-button v-on:click.native="handleMenu()" plain icon="el-icon-menu" size="mini" ></el-button>
            <h3 style="color:white">首页</h3>
        </div>
        <div class="r-content">
            <el-dropdown class="el-dropdown-link" trigger="click" size="small">
                <span><img class="user" :src="userImg" ></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-plus">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>
<script>
    export default{
        name:"commonHeader",
        data(){
            return{
                userImg:require('../assets/logo.png')
            }
        },
        methods:{
            handleMenu:function(){
                
                this.$store.commit('collapseMenu')
            }
        }
    }
</script>

<style lang="less" scoped>
    header{
        display:flex;
        height:100%;
        justify-content: space-between;
        align-items: center;
    }
    .el-dropdown-link{
        cursor: pointer;
        color: #409EFF;
    }

    .l-content{
        display:flex;
        flex-direction:row;
        
        align-items:center;
        .el-button{
            margin-right:20px;
        }
        
        h3{
                font-size:20px;
                margin-left:10px;
            }
    
    }
    .r-content{
        .user{
            width:40px;
            height:40px;
            border-radius: 50%;
        }
    }
    
</style>


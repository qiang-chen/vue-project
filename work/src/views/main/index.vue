<template>
    <div class="container">
        <header>
            头部
        </header>
        <main>
            <router-view></router-view>
        </main>
        <footer>
            <router-link to="/main/home">
            首页
            </router-link>
            <router-link to="/main/list">
                列表
            </router-link>
        </footer>
    </div>
</template>

<script>


export default {
    
}
</script>

<style lang="scss" scoped>
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        font-size: .36rem;
        padding: 0;
        margin: 0;
        header{
            width: 100%;
            height: 1rem;
            background-color: red;
            color: #fff;
            text-align: center;
            line-height: 1rem;
        }
        main{
            flex: 1;
            overflow: hidden;
        }
        footer{
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-top: 1px solid #eee;
            a{
                color: #000;
                text-decoration: none;
            }
        }
    }
</style>

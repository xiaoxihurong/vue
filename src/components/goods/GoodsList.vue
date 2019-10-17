<template>
    <div class="goods-list">
        <div class="goods-item" v-for='item in goodslist' :key='item.id' @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                pageindex:1,
                goodslist:[]}
        },
        created(){
            this.getgoodslist()
        },
        methods:{
            getgoodslist(){
                this.$http.get('api/getgoods?pageindex='+this.pageindex)
                    .then(result=>{
                        if(result.body.status===0){
                            this.goodslist=this.goodslist.concat(result.body.message)
                        }
                    })
            },
            getMore(){
                this.pageindex++;
                this.getgoodslist()
            },
            goDetail(id){

                this.$router.push({name:'GoodsInfo',params:{id}})
            }
        }
    }
</script>

<style scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
}

.goods-list .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
}

.goods-list .goods-item img {
    width: 100%;
}

.goods-list .goods-item .title {
    font-size: 14px;
}

.goods-list .goods-item .info {
    background-color: #eee;
}

.goods-item .info p {
    margin: 0;
    padding: 5px;
}

.goods-item .info .price .now {
    color: red;
    font-weight: bold;
    font-size: 16px;
}

.goods-item .info .price .old {
    text-decoration: line-through;
    font-size: 12px;
    margin-left: 10px;
}

.goods-item .info .sell {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}
</style>
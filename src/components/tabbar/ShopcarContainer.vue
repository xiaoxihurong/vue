<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!-- 商品列表项区域 -->
            <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件， 总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
        <p>{{ $store.getters.getGoodsSelected }}</p>
    </div>
</template>
<script>
import numbox from "../subcomponents/shopcar_numbox.vue";

export default {
    data() {
        return {
            goodslist: [] // 购物车中所有商品的数据
        };
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {
            // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
            var idArr = [];
            this.$store.state.car.forEach(item => idArr.push(item.id));
            // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
            if (idArr.length <= 0) {
                return;
            }
            // 获取购物车商品列表
            this.$http
                .get("api/goods/getshopcarlist/" + idArr.join(","))
                .then(result => {
                    if (result.body.status === 0) {
                        this.goodslist = result.body.message;
                    }
                });
        },
        remove(id, index) {
            this.goodslist.splice(index, 1);
            this.$store.commit("removeFormCar", id);
        },
        selectedChanged(id, val) {
            this.$store.commit("updateGoodsSelected", { id, selected: val });
        }
    },
    components: {
        numbox
    }
};
</script>
<style scoped>
.shopcar-container {
    background-color: #eee;
    overflow: hidden;
}

.goods-list .mui-card-content-inner {
    display: flex;
    align-items: center;
}

.goods-list img {
    width: 60px;
}

.goods-list h1 {
    font-size: 13px;
}

.goods-list .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.goods-list .info .price {
    color: red;
    font-weight: bold;
}

.jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.jiesuan .red {
    color: red;
    font-weight: bold;
    font-size: 16px;
}
</style>
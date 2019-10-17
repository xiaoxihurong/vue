<template>
    <div class="good-info">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!-- 轮播图区 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.src">
                <img :src="item.src" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <!-- 购买区-->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!-- 参数区-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" @click="goIntro(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import goods_info_numbox from '../subcomponents/goods_info_numbox.vue'
export default {
    data() {
        return {
            id: this.$route.params.id,
            lunbotuList: [],
            goodsinfo: '',
            ballFlag: false,
            selectedCount: 1
        }
    },
    created() {
        this.getGoodsLunbo()
        this.getGoodsInfo()
    },
    methods: {
        getGoodsLunbo() {
            this.$http.get("api/getthumimages/" + this.id)
                .then(result => {
                    if (result.body.status === 0) {
                        this.lunbotuList = result.body.message
                    }
                })
        },
        getGoodsInfo() {
            this.$http.get("api/goods/getinfo/" + this.id)
                .then(result => {
                    if (result.body.status === 0) {
                        this.goodsinfo = result.body.message[0]
                    }
                })
        },
        goIntro(id) {
            this.$router.push({ name: 'goodsIntroduct', params: { id } });
        },
        goComment(id) {
            this.$router.push({ name: 'goodsComment', params: { id } });
        },
        addToShopCar() {
            this.ballFlag = !this.ballFlag;
            var goodsinfo = {
                id: this.id,
                count: this.selectedCount,
                price: this.goodsinfo.sell_price,
                selected: true
            };
            this.$store.commit("addToCar", goodsinfo)
        },
        beforeEnter(el) {
            el.style.transform = "translate(0, 0)";
        },
        enter(el, done) {
            el.offsetWidth;
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            const badgePosition = document
                .getElementById("badge")
                .getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done();
        },
        afterEnter(el) {
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count) {
            this.selectedCount = count
        }
    },
    components: {
        numbox: goods_info_numbox
    }
}
</script>
<style type="text/css">
.good-info .mint-swipe {
    height: 200px;
}

.good-info .mint-swipe img {
    height: 100%;
}

.good-info .mint-swipe-item {
    text-align: center;
}

.good-info .mint-button {
    margin-top: 5px
}

.good-info {
    background-color: #eee;
    overflow: hidden;
}

.good-info .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
}

.good-info .mui-card-footer {
    display: block;
}

.good-info .mui-card-footer button {
    margin: 15px 0;
}


.ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 350px;
    left: 145px;
}
</style>
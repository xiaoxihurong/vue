<template>
    <div class='home_container'>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item>
                <img src="https://img.zcool.cn/community/01ac855a4b5445a801206ed3eef8ea.jpg@2o.jpg">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="https://img.zcool.cn/community/017f675a4b5445a801206ed3eab420.jpg@1280w_1l_2o_100sh.jpg">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="https://img.zcool.cn/community/0197935a4b5443a801206ed3be47e3.jpg@1280w_1l_2o_100sh.jpg">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="https://img.zcool.cn/community/01ea8b5a4b53dfa80121974131ce05.jpg@1280w_1l_2o_100sh.jpg">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="https://img.zcool.cn/community/01c9155a4b53dfa801206ed3aebbd7.jpg@1280w_1l_2o_100sh.jpg">
            </mt-swipe-item>
        </mt-swipe>
        <!-- 九宫格 到 6宫格 的改造工程 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script type="text/javascript">
</script>
<style type="text/css">
.home_container .mint-swipe {
    height: 200px;
}

.home_container .mint-swipe img {
    width: 100%;
    height: 100%;
}

.home_container .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
}

.home_container .mui-grid-view.mui-grid-9 img {
    width: 60px;
    height: 60px;
}

.home_container .mui-grid-view.mui-grid-9 .mui-media-body {
    font-size: 13px;
}

.home_container .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
}
</style>


<template>
	<div class="newsinfo-container">
		<h1 class="title">{{content.title}}</h1>
		<p class="subtitle">
              <span>发表时间：{{ content.add_time | dateFormat }}</span>
              <span>点击：{{content.click}}次</span>
        </p>
		<hr>
		<div class="content" v-html='content.content'></div>
		<div>
			<comment-box :id='this.id'></comment-box>
		</div>
	</div>

</template>

<script type="text/javascript">
import comment from '../subcomponents/comment.vue'

import { Toast } from "mint-ui";

export default {
  data() {
    return {
      id:this.$route.params.id,
      content:{}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      // 获取新闻列表
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.content = result.body.message[0];
        } else {
          Toast("获取新闻列表失败！");
        }
      });
    }
  },
  components:{
  	'comment-box':comment
  }
};
</script>

<style type="text/css">
	.newsinfo-container {
  		padding: 0 4px;
  	}
  .newsinfo-container .title {
    	font-size: 16px;
    	text-align: center;
    	margin: 15px 0;
    	color: red;
   }
  .newsinfo-container .subtitle {
    	font-size: 13px;
    	color: #226aff;
    	display: flex;
    	justify-content: space-between;
  	}

    .newsinfo-container .content img {
      width: 100%;
    }

</style>
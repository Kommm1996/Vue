<template>
	<div>
		<div class="section">
			<div class="location">
				<span>当前位置：</span>
				<a href="/index.html">首页</a> &gt;
				<a href="/goods.html">购物商城</a>
				<a href="/goods/42/1.html">商品详情</a>
			</div>
		</div>
		<div class="section">
			<div class="wrapper clearfix">
				<div class="wrap-box">
					<div v-if="goodsData.goodsinfo" class="left-925">
						<div class="goods-box clearfix">
							<div class="pic-box">
								<div class="magnifier" id="magnifier1">
									<div class="magnifier-container">
										<div class="images-cover"></div>
										<!--当前图片显示容器-->
										<div class="move-view"></div>
										<!--跟随鼠标移动的盒子-->
									</div>
									<div class="magnifier-assembly">
										<div class="magnifier-btn">
											<span class="magnifier-btn-left">&lt;</span>
											<span class="magnifier-btn-right">&gt;</span>
										</div>
										<!--按钮组-->
										<div class="magnifier-line">
											<ul class="clearfix animation03">
												<li v-for="item in goodsData.imglist" :key="item.id">
													<div class="small-img">
														<img :src="item.original_path" />
													</div>
												</li>
											</ul>
										</div>
										<!--缩略图-->
									</div>
									<div class="magnifier-view"></div>
									<!--经过放大的图片显示容器-->
								</div>
							</div>
							<div class="goods-spec">
								<h1>{{goodsData.goodsinfo.title}}</h1>
								<p class="subtitle">{{goodsData.goodsinfo.sub_title}}</p>
								<div class="spec-box">
									<dl>
										<dt>货号</dt>
										<dd id="commodityGoodsNo">{{goodsData.goodsinfo.goods_no}}</dd>
									</dl>
									<dl>
										<dt>市场价</dt>
										<dd>
											<s id="commodityMarketPrice">{{goodsData.goodsinfo.market_price}}</s>
										</dd>
									</dl>
									<dl>
										<dt>销售价</dt>
										<dd>
											<em id="commoditySellPrice" class="price">{{goodsData.goodsinfo.sell_price}}</em>
										</dd>
									</dl>
								</div>
								<div class="spec-box">
									<dl>
										<dt>购买数量</dt>
										<dd>
											<div class="stock-box">
												<el-input-number :min="1" :max="goodsData.goodsinfo.stock_quantity" size="small" v-model="count"></el-input-number>
											</div>
											<span class="stock-txt">
												库存
												<em id="commodityStockNum">{{goodsData.goodsinfo.stock_quantity}}</em>件
											</span>
										</dd>
									</dl>
									<dl>
										<dd>
											<div id="buyButton" class="btn-buy">
												<button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
												<button @click="addShoppingCart" ref="addShoppingCart" class="add">加入购物车</button>
											</div>
										</dd>
									</dl>
								</div>
							</div>
						</div>
						<div id="goodsTabs" class="goods-tab bg-wrap">
							<Affix>
								<div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
									<ul>
										<li>
											<a @click="isShowSwitch(true)" href="javascript:;" :class="isShowIntroduce ? 'selected' : ''">商品介绍</a>
										</li>
										<li>
											<a @click="isShowSwitch(false)" href="javascript:;" :class="!isShowIntroduce ? 'selected' : ''">商品评论</a>
										</li>
									</ul>
								</div>
							</Affix>
							<div v-show="isShowIntroduce " class="tab-content entry" style="display: block;">
								<span v-html="goodsData.goodsinfo.content"></span>
							</div>
							<div v-show="!isShowIntroduce " class="tab-content" style="display: block;">
								<div class="comment-box">
									<div id="commentForm" name="commentForm" class="form-box">
										<div class="avatar-box">
											<i class="iconfont icon-user-full"></i>
										</div>
										<div class="conn-box">
											<div class="editor">
												<textarea ref="commenttxtRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" placeholder="请填写评论内容！"></textarea>
												<span class="Validform_checktip"></span>
											</div>
											<div class="subcon">
												<input @click="postCommenttxt" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
												<span class="Validform_checktip"></span>
											</div>
										</div>
									</div>
									<ul id="commentList" class="list-box">
										<p v-if="goodsComment.totalcount<=0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
										<li v-for="(item,index) in goodsComment.message" :key="index">
											<div class="avatar-box">
												<i class="iconfont icon-user-full"></i>
											</div>
											<div class="inner-box">
												<div class="info">
													<span>{{item.user_name}}</span>
													<span>{{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
												</div>
												<p>{{item.content}}</p>
											</div>
										</li>
									</ul>
									<div v-if="goodsComment.totalcount>0" class="page-box" style="margin: 5px 0px 0px 62px;">
										<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[5, 10, 20, 30]"
										    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="goodsComment.totalcount">
										</el-pagination>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="left-220">
						<div class="bg-wrap nobg">
							<div class="sidebar-box">
								<h4>推荐商品</h4>
								<ul class="side-img-list">
									<li v-for="item in goodsData.hotgoodslist" :key="item.id">
										<div class="img-box">
											<router-link :to="'/site/goodsinfo/'+item.id" class="">
												<img :src="item.img_url">
											</router-link>
										</div>
										<div class="txt-box">
											<router-link :to="'/site/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
											<span>{{item.add_time | dateFmt}}</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
			<div v-show="isShowImgAnimation" id="animationImgId" v-if="goodsData.imglist">
				<img width="100%" height="100%" :src="goodsData.imglist[0].thumb_path" alt="">
			</div>
		</transition>
	</div>
</template>

<style scoped>
	@import "../../statics/site/js/jqueryplugins/jqimgzoom/css/magnifier.css";

	#animationImgId {
		width: 30px;
		height: 30px;
		position: absolute;
		transition: all 0.5s;
	}
</style>


<script>
	import "../../statics/site/js/jqueryplugins/jqimgzoom/js/magnifier.js";

	import {
		Affix
	} from "iview";

	export default {
		data() {
			return {
				goodsData: {},
				isShowIntroduce: true,
				pageIndex: 1,
				pageSize: 5,
				goodsComment: {},
				addShoppingCartOffset: null, //加入购物车按钮位置
				shoppingCartOffset: null, //右上角购物车位置
				isShowImgAnimation: false,
				count: 1
			};
		},

		created() {
			// 获取商品数据
			this.getGoodsData();
			
		},

		mounted() {
			setTimeout(() => {
				//获取加入购物车按钮位置， 动画起始位置
				this.addShoppingCartOffset = $(this.$refs.addShoppingCart).offset();
				// 赋值给图片
				$("#animationImgId").css({
					left: this.addShoppingCartOffset.left + "px",
					top: this.addShoppingCartOffset.top + "px"
				});
				// 获取右上角购物车的位置
				this.shoppingCartOffset = $("#shoppingCart").offset();
			}, 500);
		},

		watch: {
			// 监听路由变化
			$route: function (newValue, oldValue) {
				// 重新渲染
				this.getGoodsData();
				this.getComment();
			}
		},

		methods: {
			getGoodsData() {
				const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`;

				this.$axios.get(url).then(response => {
					this.goodsData = response.data.message;

					setTimeout(() => {
						$(function () {
							$("#magnifier1").imgzoon({
								magnifier: "#magnifier1"
							});
						});
					});
				}, 300);
			},

			isShowSwitch(isShow) {
				this.isShowIntroduce = isShow;
			},
			// elementUI插件一页显示条数
			handleSizeChange(val) {
				this.pageSize = val;

				// 每次更改页容量都跳转到第一页
				this.pageIndex = 1;

				this.getComment();
			},

			// elementUI插件选择第几页
			handleCurrentChange(val) {
				this.pageIndex = val;

				this.getComment();
			},

			// 提交评论
			postCommenttxt() {
				// 获取Dom元素的内容
				const commenttxt = this.$refs.commenttxtRef.value;

				if (commenttxt.trim().length <= 0) {
					this.$message.error("输入内容不能为空！");
					return;
				}

				const url = `site/validate/comment/post/goods/${
        this.$route.params.goodsId
      }`;

				this.$axios
					.post(url, {
						commenttxt
					})
					.then(response => {
						if (response.data.status == 1) {
							this.$message.error(response.data.message);
							return;
						} else {
							// 清空输入框
							this.$refs.commenttxtRef.value = "";
							// 重新加载第一页
							this.pageIndex = 1;
							this.getComment();
						}
					});
			},

			//加入购物车的点击事件
			addShoppingCart() {
				//开始动画
				this.isShowImgAnimation = true;
			},
			// 加入购物车动画
			beforeEnter: function (el) {
				// 动画起始位置
				el.style.left = this.addShoppingCartOffset.left + "px";
				el.style.top = this.addShoppingCartOffset.top + "px";
				el.style.height = 30 + "px";
				el.style.width = 30 + "px";
			},
			// 此回调函数是可选项的设置
			// 与 CSS 结合时使用
			enter: function (el, done) {
				// 设置帧
				el.offsetWidth;
				//设置结束位置
				el.style.left = this.shoppingCartOffset.left + "px";
				el.style.top = this.shoppingCartOffset.top + "px";
				el.style.height = 5 + "px";
				el.style.width = 5 + "px";
				done();
			},
			afterEnter: function (el) {
				// 动画结束隐藏
				this.isShowImgAnimation = false;
			}
		},

		components: {
			Affix: Affix
		}
	};
</script>
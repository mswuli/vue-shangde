<template> 
	<div>
		<div  class="page-photos">  
			<mt-loadmore bottomDropText = "加载更多中" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" > 
				<div  class="mba-waterfall" >
					<div class="mba-waterfall-left">
						<div class="box" v-for="(item,index) in itemsLeft" :key="index">
							<div class="video-box" v-if="item.type === '2'" @click="play(item.url)"> 
								<img v-lazy="item.thumb" alt="" preview="0" />
								<img class="absolute-center play-icon" src="../../../static/image/play.png" alt="" />
							</div>
							<img v-else v-lazy="item.url" alt="" preview="0" >
						</div>
					</div>
					<div class="mba-waterfall-right">
						<div class="box" v-for="(item,index) in itemsRight" :key="index">
							<div class="video-box" v-if="item.type === '2'" @click="play(item.url)"> 
								<img v-lazy="item.thumb" alt="" preview="0" />
								<img class="absolute-center play-icon" src="../../../static/image/play.png" alt="" />
							</div>
							<img v-else :src="item.url" alt=""   preview="0" />
						</div>
					</div>
				</div>  
			</mt-loadmore> 
			<m-login></m-login> 
		</div>  
		<m-new-footerbar></m-new-footerbar>  
	</div>
</template> 
<script>    
  import MNewFooterbar from '@/components/common/new-footer'
	import MLogin from '@/components/common/login' 
  import evenBus from '../../assets/js/even-bus'
	export default {
		name: 'waterfalls',
		data() {
			return {
				photoList: [],
				pageInfo: {
					name: "waterfalls",
					title: "院校景图"
				},
				itemsLeft: [],
				itemsRight: [],
				photoNum: 0,
				allLoaded: false, 
			}
		},
		components: { 
			MNewFooterbar,
			MLogin,
		},
		created: function () {
			//this.util.wxChatShare(this);
			this.chollegeId = this.$route.query.id;
		},
		mounted: function () {
			this.getPhotoList();
		},
		methods: {
			// 方法
			async getPhotoList() {
      	this.Loading.open('加载中...');
				let that = this;
				const params = {
					start: that.photoNum,
					count: 10,
					aid: that.chollegeId,
					type:0,
					cid:0
				}
				const res = await that.$ajax.get('index.php?r=university-photo/list', params);
				let resData = res.data;
				if (resData.code === 0) {
					that.photoList.push(...resData.photoList);
					if (that.photoList.length >= resData.totalNum) {
						that.allLoaded = true;
					}
					that.getData(resData.photoList);  
				}
			},
			getImg(url,index,callback) {
				return new Promise((resove,reject)=>{ 
				let img = new Image();
				img.src = url;
				//如果图片被缓存，则直接返回缓存数据   
				if (img.compltet) {
					resove([img.width, img.height, Number(img.height) / Number(img.width)]);
				} else {
					//完全加载完毕的事件
					img.onload = function () {
						resove([img.width, img.height, Number(img.height) / Number(img.width)]);
					};
					img.onerror = function(){ 
						resove({code:0,index:index});
					}
				}
			})
			},
			getData(items) {
      	this.Loading.open('加载中...');
				let that = this;
				let count = 0;
				let errorIndex = [];
				let length = items.length;
				for (let index = 0; index < items.length; index++) {
				 // 视频不展示
				 let imgUrl = ''
					if(items[index].type === '2') {
						imgUrl = items[index].thumb
					}else{
						imgUrl = items[index].url
					};
					that.getImg(imgUrl).then((res)=>{ 
						// 失败图片
						if(res.code === 0 ){   
							length--;
							errorIndex.push(index)
						}else{
							count++; 
						}
						items[index].height = 200/res[0]*res[1] ; 
						if(count>=length){  
								let boxLeft = document.querySelector('.mba-waterfall-left').clientHeight;
								let boxRight = document.querySelector('.mba-waterfall-right').clientHeight;
								console.log(errorIndex)
								for (let index = 0; index < items.length; index++) {
									 let err = errorIndex.indexOf(index); 
									 if(err<0){
										 let val = items[index];
										// if(val.type === '2') return false   
											if (boxLeft > boxRight) {
												that.itemsRight.push(val); 
												boxRight+=Number(val.height) || 0;
											} else {
												that.itemsLeft.push(val);
												boxLeft+=Number(val.height) || 0;
											}
									 }
									
								} 
								// 图片预览
								that.$previewRefresh(); 
								that.$refs.loadmore.onBottomLoaded();
          			setTimeout(() => that.Loading.close(), 0)
						}
						
					})
				} 
			},
			loadBottom() {
				const that = this;
				that.photoNum+=10;
				this.getPhotoList()
			},
			play(url){
				 evenBus.$emit('sendUrl', url)
			} 
		},
		computed: {

		},
	} 
</script>
 
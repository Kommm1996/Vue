// 导入vue
import Vue from 'vue' ;
// 导入router
import VueRouter from 'vue-router';
// 导入axios
import axios from 'axios';
// 导入moment
import moment from 'moment';
// 导入element
import elementUi from 'element-ui';

//基于Vue的插件
Vue.use(VueRouter);
Vue.use(elementUi);

// 不是Vue的插件绑定到vue上面
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://39.108.135.214:8899/";

// 全局过滤器
Vue.filter('dateFmt',(input, formatString='YYYY-MM-DD')=>{
	return moment(input).format(formatString);
})

// 导入全局使用的css
import './statics/site/css/style.css';
// elementUi.css
import 'element-ui/lib/theme-chalk/index.css'

// 导入根组件
import App from './App.vue';

// 导入组件
import layout from './components/layout.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';

const router = new VueRouter({
	routes:[
		{path:'/', redirect:'/site/goodslist'},
		{path:'/site', component:layout, children:[
			{path:'goodslist', component:goodslist},
			{path:'goodsinfo/:goodsId', component:goodsinfo}
		]}
	]
})

new Vue({	
	el:'#app',
	router,
	render:function(createElement) {
		return createElement(App);
	}
})
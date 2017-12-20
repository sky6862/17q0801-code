/*export default {
	install:function(Vue,option){
		//添加一个实例方法，doubleNumber，实现数字翻2倍
		Vue.prototype.doubleNumber = function(val){
			//检查传递过来的数据的类型
			if(typeof val ==='number'){
				return val*2;
			}else if(!isNaN(Number(val))){
				return Number(val)
			}else{
				return null;
			}
		}
	}
}*/

var obj_1 = {
	install:function(Vue,option){
		//添加一个实例方法，doubleNumber，实现数字翻2倍
		Vue.prototype.doubleNumber = function(val){
			//检查传递过来的数据的类型
			if(typeof val ==='number'){
				return val*2;
			}else if(!isNaN(Number(val))){
				return Number(val)
			}else{
				return null;
			}
		}
		//添加一个实例属性
		Vue.prototype.name="jack";
	}
}
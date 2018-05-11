<template>
  <span class='timeEnd'><b>{{hour}}</b> : <b>{{mint}}</b> : <b>{{secon}}</b></span>
</template>
<script>
	var timer;
  export default{
  	props:['Time'],
	data : function() {
		return {
			time:this.Time,
			day:'',
			hour:'',
			mint:'',
			secon:'',
			EndTime:0,
			shuaxin:0,
			
		};
	},
	components: {
//    Scroll,
    },
	created: function() {
		this.moveTime();
		//console.log(new Date().getTime())
		
	},
	methods:{
		getRtime(){
				//console.log(1)
			   
			    //console.log(EndTime)
			    var TimeEnd=this.EndTime
			    
			    var NowTime = new Date();
			    
			    //console.log(EndTime)
			    var t =TimeEnd - NowTime.getTime();
//			    console.log(1)
//			    console.log(t)
			    var d=0;
			    var h=0;
			    var m=0;
			    var s=0;
			    if(t>=0){
			      d=check(Math.floor(t/1000/60/60/24));
			      h=check(Math.floor(t/1000/60/60%24));
			      m=check(Math.floor(t/1000/60%60));
			      s=check(Math.floor(t/1000%60));
			    }else{//当时间耗尽，刷新页面
//			    		clearInterval(timer);
	            //window.location.href=location.href;
	        } 
			    function check(i){
		 			if(i<10){
		 				i = "0" + i; 
		 			}
		 			return i; 
		 		}
//			    console.log(h)
			    this.day=d;
			    this.hour=h;
			    this.mint=m;
			    this.secon=s;
			    
			   
			    
			},
			moveTime(){
				let _this=this
				_this.EndTime= _this.time + new Date().getTime();
				console.log(_this.time);
				console.log(new Date().getTime())
				console.log(_this.EndTime)
				  timer = setInterval(_this.getRtime,0)
				
				
			},
	},
	
}
</script> 

<style lang="scss" scoped>
	.timeEnd{
			font-size: .24rem;
			display: inline-block;
			width: 1.70rem;
			line-height: .36rem;
			b{
				padding: 0 .05rem;
				background: #000;
				display: inline-block;
				width: .30rem;
				color: #fff;
				font-weight: normal;
			}
	}
</style>
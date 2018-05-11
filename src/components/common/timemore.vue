<template>
  <span class='timeEnd'><b>{{hour}}</b>:<b>{{mint}}</b>:<b>{{secon}}</b></span>
</template>
<script>
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
//				console.log(_this.time);
//				console.log(new Date().getTime())
//				console.log(_this.EndTime)
				setInterval(_this.getRtime,0)
				
			},
	},
	
}
</script> 

<style lang="scss" scoped>
	.timeEnd{
			font-size: .20rem;
			display: inline-block;
			width: 1.30rem;
			line-height: .36rem;
			b{
				padding: 0 .05rem;
				display: inline-block;
				width: .27rem;
				font-weight: normal;
			}
	}
</style>
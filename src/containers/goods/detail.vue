<template>
	<div>
		 <ul>
	        <li v-for="(item, index) of items" v-bind:class="{'active': index == actvieIndex}">{{ item.name }}</li>
	    </ul>
	    <div class="bot" @click="geMove">点击抽奖</div>
	</div>
 
</template>



<script>

import Swiper from 'swiper';
var time
export default {
	data () {
	    return {
	      	actvieIndex: 0,
            i: 0,
            count: 0,
            items: [
                {name: '1'},
                {name: '2'},
                {name: '3'},
                {name: '4'},
                {name: '5'},  // 这些都假设是一些用户名字
                {name: '6'},
                {name: '7'},
                {name: '8'},
                {name: '9'},
                {name: '10'},
                {name: '11'},
                {name: '12'},
                {name: '13'},
                {name: '14'},
                {name: '15'},
                {name: '16'},
                {name: '17'},
                {name: '18'},
            ],
	      
	    }
	 },
  mounted () {
    
  },
  components: {
	 Swiper,
	
	},
   created: function() {
			
		},
  methods: {
    go(seconds) {
    	clearInterval(time)
    	
        const SECONDS = seconds * 1000;
        const HALF_SECONDS = SECONDS / 2;
        const FREQUENCY = 50;
        
        time=setTimeout(() => {
            console.log(this.count)
			
            this.actvieIndex++;
            if(this.actvieIndex >= this.items.length ) this.actvieIndex = 0;
             
            if (this.count >= HALF_SECONDS) {
               this.i+= 10;
               this.count += 50 + this.i;
            } else {
              this.count += 50;
            }
          
            if (this.count <= SECONDS) {
               this.go(seconds)
            }
            //if(this.count>=SECONDS)
        }, FREQUENCY + this.i);
      },
      geMove(){
      	if(this.count>6000){
      		this.count=0;
      	}
      	this.go(6)
      }
    
  },
  mounted () {
      //this.go(5)
    }
  
}
</script>

<style lang="scss" scoped>
	
		ul{
			.active {
	            border: 3px solid red;
	        }
			li{
				width: 1.2rem;
	            height: 1.2rem;
	            box-sizing: border-box;
	            text-align: center;
	            background: #ccc;
	            float: left;
			}
		}
    

</style>
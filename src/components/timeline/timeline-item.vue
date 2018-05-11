<template>
  <li class="vux-timeline-item">
    <div :class="['vux-timeline-item-color', {'vux-timeline-item-head': !isLast,'vux-timeline-item-head-first': isLast }]" :style="headStyle">
      <div v-show="isLast && $parent.isShowIcon" type="circle" class="vux-timeline-item-checked"></div>
    </div>
    <div class="vux-timeline-item-tail" :style="tailStyle"></div>
    <div class="vux-timeline-item-content clearfix">
      <slot></slot>
    </div>
  </li>
</template>

<script>
import Icon from '../icon'

export default {
  data () {
    return {
      isLast: true,
      isFirst: true,
      headStyle: { backgroundColor: this.$parent.color }
    }
  },
  mounted () {
    this.$parent.setChildProps()
  },
  beforeDestroy () {
    // this will be null   
    const $parent = this.$parent
    this.$nextTick(() => {
      $parent.setChildProps()
    })
  },
  components: {
    Icon
  },
  methods :{  
      show (index) {
          console.log('index')
        }
    },
  computed: {
    tailStyle () {
      return this.isLast ? { display: 'block' ,background: "url('/static/line.png')" } : { display: 'block', backgroundColor: this.$parent.color }
    }
  }
}
</script>


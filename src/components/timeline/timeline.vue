<template>
	<div class="vux-timeline">
		<ul>
			<slot></slot>
		</ul>
	</div>
</template>

<script>
export default {
  props: {
    color: String,   
    isShowIcon: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    setChildProps () {
      if (!this.$children) return
      const len = this.$children.length
      this.$children.forEach((child, index) => {
        child.isLast = index === len - 1
        child.isFirst = index === 0
      })
    }
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';

.vux-timeline {
  padding: 0.24rem;
}

.vux-timeline > ul > li {
  list-style: none;
}

@vux-timeline: ~"vux-timeline";

.@{vux-timeline} {
  &-item {
    position:relative;
  }

  &-item-content {
    padding:0 0 .7rem .7rem;
  }

  &-item-head, &-item-head-first {
    position:absolute;
    content:'';
    z-index:99;

    border-radius:99px;
  }

  &-item-head {
    width:10px;
    height:10px;
    left:1px;top:4px;
  }

  &-item-head-first {
    width:20px;
    height:20px;
     background-color: #f00 !important;
    left:-4px;top:5px;
  }

  &-item-tail {
    position:absolute;
    content:'';
    height:100%;
    width:1px;
    left:5px;
    top:5px;
    background-color: @timeline-item-bg-color;
  }

  &-item-checked {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 10px;border-radius: 50%;margin-left: -5px;
    height: 10px;background-color: #fff;margin-top: -5px;

    &.weui-icon-success-no-circle::before {
      font-size: 14px;
      position: absolute;
      left: 3px;
      top: 3px;
      margin: 0!important;
      color: #FFF;
    }
  }
}

.vux-timeline-item-color {
	background-color: @timeline-item-bg-color;
}
</style>

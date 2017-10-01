<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item" v-for="item in goods" track-by="$index">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script>
let ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: []
    };
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('./api/goods').then((response) => {
      response = response.body;
      if(response.errno === ERR_OK) {
        this.goods = response.data;
        console.log(this.goods);
      }
    });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px //不写width 在Android上会有问题
      background #f3f5f7
      overflow-y auto
      .menu-item
        display table
        height 54px
        width 56px
        margin 0 auto
        line-height 14px
        .icon 
          display inline-block
          width 16px
          height 16px
          vertical-align top
          margin-right 2px
          background-size 16px 16px
          background-repeat no-repeat
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('decrease_3')
          &.guarantee
            bg-img('guarantee_3')
          &.invoice
            bg-img('invoice_3')
          &.special
            bg-img('special_3')
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size 12px
          

    .foods-wrapper
      flex 1  
</style>



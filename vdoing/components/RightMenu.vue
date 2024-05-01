<template>
  <div class="right-menu-wrapper">
    <div
      title="切换视图"
      class="views-switch button blur theme-mode-but iconfont icon-yuedu"
      @mouseenter="showModeBox = true"
      @mouseleave="showModeBox = false"
      @click="showModeBox = true"
    >
      <transition name="mode">
        <ul
          class="select-box"
          ref="modeBox"
          v-show="showModeBox"
          @click.stop
          @touchstart.stop
        >
          <li
            v-for="item in modeList"
            :key="item.KEY"
            class="iconfont"
            :class="[item.icon, { active: item.KEY === modeView }]"
            @click="toggleMode(item.KEY)"
          >
            {{ item.name }}
          </li>
        </ul>
      </transition>
    </div>

    <div class="docs-box" v-show="modeView === 'h5' " >
        <iframe :src="iframeUrl" frameborder="0" scrolling="auto" ref="iframeId"></iframe>
    </div>
    <div class="right-menu-margin" v-show="modeView === 'mu' ">
      <div class="right-menu-title">目录</div>
      <div class="right-menu-content">
        <div
          :class="[
            'right-menu-item',
            'level' + item.level,
            { active: item.slug === hashText }
          ]"
          v-for="(item, i) in headers"
          :key="i"
        >
          <a :href="'#' + item.slug">{{ item.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [],
      hashText: '',
      iframeUrl: 'https://miren.lovemi.ren/colorui-h5/h5/#/',
      modeView: 'h5',
      showModeBox: false,
      modeList: [
        {
          name: '视图模式',
          icon: 'icon-rijianmoshi',
          KEY: 'h5'
        },
        {
          name: '目录模式',
          icon: 'icon-yejianmoshi',
          KEY: 'mu'
        }
      ],
    }
  },
  mounted() {
    this.getHeadersData()
    this.getHashText()
    this.getIframeUrl()
  },
  watch: {
    $route() {
      this.headers = this.$page.headers
      this.getHashText()
      this.getIframeUrl()
    },
  },
  methods: {
    toggleMode (key) {
      this.modeView = key
    },
    getIframeUrl() {
        let path = this.$page.path.indexOf('base') > -1 ? '/' : this.$page.path

        if (path.indexOf('/component/bar') > -1) {
            path = '/pages/component/bar'
        }

        this.iframeUrl = 'https://miren.lovemi.ren/colorui-h5/h5/#' + path || ''
    },
    getHeadersData() {
      this.headers = this.$page.headers
    },
    getHashText() {
      this.hashText = decodeURIComponent(window.location.hash.slice(1))
    }
  }
}
</script>

<style lang='stylus'>
.views-switch
  position fixed
  top calc(var(--navbar-height) + 50px)
  right 31px
  width 2.2rem
  height 2.2rem
  line-height 2.2rem
  border-radius 50%
  box-shadow 0 2px 6px rgba(0, 0, 0, 0.15)
  margin-top 0.9rem
  text-align center
  cursor pointer
  transition all 0.5s
  background var(--blurBg)
  z-index 9
  &:hover
    background $accentColor
    box-shadow 0 0 15px $accentColor
    &:before
      color #fff
  .select-box
    margin 0
    padding 0.8rem 0
    position absolute
    bottom -2rem
    right 2rem
    background var(--mainBg)
    border 1px solid var(--borderColor)
    width 120px
    border-radius 6px
    box-shadow 0 0 15px rgba(255, 255, 255, 0.2)
    li
      list-style none
      line-height 2rem
      font-size 0.95rem
      &:hover
        color $accentColor
      &.active
        background-color rgba(150, 150, 150, 0.2)
        color $accentColor
    
.docs-box
    position fixed
    top calc(var(--navbar-height) + 50px)
    right 6.8vw
    width 17.5vw
    height 34.4vw
    z-index -1
    background-image: url(https://miren123.gitee.io/colorui-document/img/iPhone13.png);
    background-repeat: no-repeat;
    background-size: 100%;
    padding: 48px 13px 25px;
    iframe 
        display block
        width 100%
        height 33.9vw
        border-radius: 10px 10px 20px 20px
        
.theme-style-line
  .right-menu-wrapper
    .right-menu-margin
      border-left 1px solid var(--borderColor)
.right-menu-wrapper
  width $rightMenuWidth
  float right
  margin-right -($rightMenuWidth + 55px)
  // margin-top -($navbarHeight *2 + 1.5rem)
  position sticky
  top 0
  font-size 0.8rem
  .right-menu-margin
    margin-top: ($navbarHeight + 1rem)
    border-radius 3px
    overflow hidden
  .right-menu-title
    padding 10px 15px 0 15px
    background var(--mainBg)
    font-size 1rem
    &:after
      content ''
      display block
      width 100%
      height 1px
      background var(--borderColor)
      margin-top 10px
  .right-menu-content
    max-height 80vh
    position relative
    overflow hidden
    background var(--mainBg)
    padding 4px 3px 4px 0
    &::-webkit-scrollbar
      width 3px
      height 3px
    &::-webkit-scrollbar-track-piece
      background none
    &::-webkit-scrollbar-thumb:vertical
      background-color hsla(0, 0%, 49%, 0.3)
    &:hover
      overflow-y auto
      padding-right 0
    .right-menu-item
      padding 4px 15px
      // border-left 1px solid var(--borderColor)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      position relative
      &.level2
        font-size 0.8rem
      &.level3
        padding-left 27px
      &.level4
        padding-left 37px
      &.level5
        padding-left 47px
      &.level6
        padding-left 57px
      &.active
        &:before
          content ''
          position absolute
          top 5px
          left 0
          width 3px
          height 14px
          background $accentColor
          border-radius 0 4px 4px 0
        a
          color $accentColor
          opacity 1
      a
        color var(--textColor)
        opacity 0.75
        display inline-block
        width 100%
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        &:hover
          opacity 1
    &:hover
      color $accentColor
.have-body-img
  .right-menu-wrapper
    .right-menu-margin
      // padding 0.3rem 0
      // background var(--sidebarBg)
      // border-radius 5px
      .right-menu-item
        // border-color transparent
        // &.active
        // border-left 0.2rem solid $accentColor
        // &:hover
        // border-left 0.2rem solid $accentColor
</style>

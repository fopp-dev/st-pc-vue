<template>
  <div id="app">
    <router-view/>
    <login></login>
  </div>
</template>

<script>
  // import Login from './components/Login'
  import Login from './components/LoginEmail'

  export default {
    name: 'App',
    data () {
      return {
        myTitle: '标题',
        keyWords: 'keyWords',
        description: 'description'
      }
    },
    components: {
      Login,
    },

    // metaInfo () {
    //   return {
    //     title: this.myTitle,
    //     meta: [
    //       { vmid: 'keywords', name: 'keywords', content: this.keyWords },
    //       { vmid: 'description', name: 'description', content: this.description }
    //     ]
    //   }
    // },
    created () {
      // var that = this
      // 获取seo内容
      // this.$http.get('http://www.slhtc.com/seo/getSeo.action').then(res => {
      //   console.log(res)
      //   // 清楚选中数据
      //   that.myTitle = res.data.data[0].title
      //   that.keyWords = res.data.data[0].keyword
      //   that.description = res.data.data[0].keyword
      // }).catch(error => {
      //     console.log(error)
      // })
    }
  }
</script>

<style>
  #app {
    font-family: "Microsoft Yahei", 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
  }

</style>

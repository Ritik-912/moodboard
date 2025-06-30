<template>
  <div id="app">
     <h1>MoodBoard</h1> <br>
    <PostForm @new-post="refreshFeed" /> <br>
    <Feed ref="feed" />
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue'
import Feed from './components/Feed.vue'

export default {
  name: 'App',
  components: { PostForm, Feed },
  methods: {
    refreshFeed() {
      this.$refs.feed.fetch();
    }
  }
}
</script>

<style scoped>

h1 {
  margin-top: 17px;
  text-align: center;
  margin-bottom: 20px;
  display: block;
  text-decoration: double;
  font-weight: bold;
}
</style>
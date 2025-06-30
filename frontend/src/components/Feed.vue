<template>
  <div v-if="posts.length>0" class="feed">
    <div v-for="(post, i) in posts" :key="i" class="post">
      <p>{{ post.mood }}</p>
      <img v-if="post.imageUrl" :src="post.imageUrl" alt="Mood image" />
      <small v-if="post.timestamp">{{ formatDate(post.timestamp) }}</small>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return { posts: [] }
  },
  methods: {
    async fetch() {
      const { data } = await axios.get('/feed')
      this.posts = data
    },
    formatDate(timestamp) {
      const date = new Date(timestamp)
      return isNaN(date) ? '' : date.toLocaleString()
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>

<style scoped>
.feed {
  margin-top: 20px;
}

.post {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.post img {
  display: block;
  max-width: 100%;
  height: auto;
  max-height: 300px;
  border-radius: 6px;
  margin-top: 10px;
}

.post small {
  display: block;
  margin-top: 10px;
  color: #555;
  font-size: 0.8rem;
}
</style>
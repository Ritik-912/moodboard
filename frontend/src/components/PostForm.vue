<template>
  <form @submit.prevent="submit">
    <input v-model="mood" type="text" placeholder="How are you feeling?" required />
    <p>
      <span style="margin: 1px;">Add Image</span>
      <input type="file" ref="fileInput" @change="onFile" />
    </p>
    <button type="submit">Post</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      mood: '',
      file: null
    }
  },
  methods: {
    onFile(e) {
      this.file = e.target.files[0]
    },
    async submit() {
      const form = new FormData()
      form.append('mood', this.mood)
      if (this.file) {
        form.append('image', this.file)
      }
      await axios.post('/post', form)
      this.mood = ''
      this.file = null
      this.$refs.fileInput.value = '' // ← this clears the actual input!
      this.$emit('new-post')
    }
  }
}
</script>

<style scoped>
form {
  margin-top: 13px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
}

input[type='text'],
input[type='file'] {
  padding: 10px;
  font-size: 1rem;
}

button {
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
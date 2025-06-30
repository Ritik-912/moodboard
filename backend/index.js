const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

const DATA_FILE = path.join(__dirname, 'data.json')
const UPLOADS_DIR = path.join(__dirname, 'uploads')

console.log('UPLOADS_DIR:', UPLOADS_DIR);
console.log('DIST DIR:', path.join(__dirname, 'dist'));
console.log('DATA FILE:', DATA_FILE);

// Middleware
app.use(express.json())
app.use(fileUpload())

console.log('Mounting /uploads:', UPLOADS_DIR);
app.use('/uploads', express.static(UPLOADS_DIR))

console.log('Mounting static dist:', path.join(__dirname, 'dist'));
// Serve static frontend build
app.use(express.static(path.join(__dirname, 'dist')))

// Ensure uploads folder exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

// Helpers
function loadPosts() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8')
      return JSON.parse(raw) || []
    }
  } catch (err) {
    console.error('Error reading posts:', err)
  }
  return []
}

// GET /feed
app.get('/feed', (req, res) => {
  try {
    const posts = loadPosts()
    res.json(posts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not fetch feed' })
  }
})

function savePosts(posts) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2))
  } catch (err) {
    console.error('Error saving posts:', err)
  }
}

function deleteImageIfExists(imageUrl) {
  if (!imageUrl) return
  const filePath = path.join(__dirname, imageUrl)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

//  POST /post
app.post('/post', async (req, res) => {
  try {
    let posts = loadPosts()

    // Enforce max 20 posts
    while (posts.length >= 20) {
      const removed = posts.shift()
      deleteImageIfExists(removed.imageUrl)
    }

    const { mood } = req.body
    let imageUrl = null

    if (req.files && req.files.image) {
      const image = req.files.image
      const filename = `${Date.now()}_${image.name}`
      const uploadPath = path.join(UPLOADS_DIR, filename)
      await image.mv(uploadPath)
      imageUrl = `/uploads/${filename}`
    }

    const newPost = {
      mood,
      imageUrl,
      timestamp: new Date().toISOString()
    }

    posts.unshift(newPost)
    savePosts(posts)

    res.json({ status: 'success', post: newPost })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

console.log('Catch-all fallback route: *');
// Serve index.html for any unknown route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Start server
app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`)
})

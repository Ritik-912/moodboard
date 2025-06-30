
# 🎨 MoodBoard — A Simple Mood Sharing Platform

MoodBoard is a minimal fullstack web app that lets users share short mood posts with optional images, and view them in a shared feed.

---

## 📁 Project Structure

```

moodboard/
├── frontend/   # Vue.js 3 (Vite)
└── backend/    # Node.js + Express

```

---

## 🚀 Features

- 📄 Submit a text mood post
- 🖼️ Optionally upload an image
- 📰 View all submitted moods in a scrollable feed
- 🗑️ Auto-manages posts to keep only the 20 newest (older ones are deleted)
- ✅ Works locally or can be deployed (Replit, Render, etc.)

---

## ⚙️ Tech Stack

- **Frontend:** Vue.js 3 + Vite
- **Backend:** Node.js, Express, express-fileupload
- **Deployment:** Works on Render, Replit, Railway or local server
- **Storage:** Local JSON file + uploads folder (for simplicity)

---

## ✅ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Ritik-912/moodboard
cd moodboard
````

---

### 2️⃣ Install dependencies

**Frontend:**

```bash
cd frontend
npm install
```

**Backend:**

```bash
cd ../backend
npm install
```

---

### 3️⃣ Run locally (Dev)

Run backend (in one terminal):

```bash
cd backend
npm run dev
```

Run frontend (in another terminal):

```bash
cd frontend
npm run dev
```

* Frontend runs on: [http://localhost:5173](http://localhost:5173)
* Backend runs on: [http://localhost:3000](http://localhost:3000)

---

### 4️⃣ Build & Deploy (Production)

When deploying (e.g. Render):

1. **Build frontend:**

   ```bash
   cd frontend
   npm run build
   ```

2. **Copy dist to backend:**

   ```bash
   mv dist ../backend/
   ```

3. **Create uploads folder (if not exists):**

   ```bash
   mkdir -p backend/uploads
   ```

4. **Deploy backend folder only** as your root working directory.

   * **Build command:** `npm install && npm run build && mv ../frontend/dist ./`
   * **Start command:** `npm start`

---

## ⚙️ Environment Notes

* Make sure your backend port uses:

  ```bash
  PORT=3000
  ```

  or Render’s `$PORT` automatically.

* Vite proxy is set up for local dev. In production, all requests hit the same server.

---

## 🌐 Demo

**👉 [Live Demo Link](https://moodboard-ml5t.onrender.com/)**

---

## 📝 Improvements & Limitations

✅ Works end-to-end with local JSON + uploads
✅ Simple to deploy anywhere

⚠️ Not production-grade:

* No authentication
* Images are stored locally — should use cloud storage for scale
* No database — uses JSON file, not ideal for concurrent writes

💡 Possible next steps:

* Add user accounts / login
* Migrate to a real DB (PostgreSQL, MongoDB, etc.)
* Use cloud storage (S3, Cloudinary) for images
* Add likes/comments to posts

---

## 📧 Contact

Made for **Concept Cube**
Email: [hello@conceptcube.in](mailto:hello@conceptcube.in)
Website: [www.conceptcube.in](https://www.conceptcube.in)

---

✨ **Happy Mood Sharing!**

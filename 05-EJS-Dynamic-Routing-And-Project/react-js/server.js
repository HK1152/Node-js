import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

// ES modules ke liye __dirname fix
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// EJS setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' })
})

// Server start
const PORT = 5174
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`)
})

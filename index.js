const express = require('express')
const notion = require('./services/notion')
const path = require('path')
const PORT = process.env.PORT || 8000

const app = express()
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
})

app.get('/api/daily-sports', async (req, res) => {
  const sports = await notion.getSports()
  res.json(sports)
})

app.get('/api/title', async (req, res) => {
  const title = await notion.getTitle()
  res.json(title)
})
app.listen(PORT, console.log(`Server started on port ${PORT}`))

module.exports = app

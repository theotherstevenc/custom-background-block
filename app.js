import 'dotenv/config'
import express from 'express'

const PORT = process.env.PORT || 8080
const app = express()
app.use(express.static('dist'))

const validateLimit = (limit) => {
  const num = parseInt(limit, 10)
  return isNaN(num) || num < 1 || num > 100 ? 5 : num
}

const validateSort = (sort) => {
  const validSorts = ['popularity', 'alpha', 'date', 'trending']
  return validSorts.includes(sort) ? sort : 'popularity'
}

const fetchGoogleFonts = async (sortBy) => {
  const { API_BASE_URL, API_KEY } = process.env

  if (!API_BASE_URL || !API_KEY) {
    throw new Error('Missing required environment variables: API_BASE_URL or API_KEY')
  }

  const response = await fetch(`${API_BASE_URL}?key=${API_KEY}&sort=${sortBy}`)

  if (!response.ok) {
    throw new Error(`Google Fonts API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

app.get('/api/fonts', async (req, res) => {
  try {
    const limit = validateLimit(req.query.limit)
    const sortBy = validateSort(req.query.sort)

    const data = await fetchGoogleFonts(sortBy)

    if (!data.items || !Array.isArray(data.items)) {
      return res.status(500).json({ error: 'Invalid response from Google Fonts API' })
    }

    const fontFamilies = data.items.map((item) => item.family).slice(0, limit)

    res.json({
      fonts: fontFamilies,
      count: fontFamilies.length,
      limit,
      sortBy,
    })
  } catch (error) {
    console.error('Error fetching fonts:', error.message)
    res.status(500).json({
      error: 'Failed to fetch fonts',
      message: error.message,
    })
  }
})

app.get('/api/version', (req, res) => {
  res.json({ version: process.env.npm_package_version })
})

app.listen(PORT, () =>
  console.log(`
  _____ _____ _____ _____ ____
  | __  |   __| __  |   __|  |
  |    -|   __| __ -|   __|  |__
  |__|__|_____|_____|_____|_____|
  made with ❤ by a 𝗥𝗘𝗕𝗘𝗟
  Server started...
  http://localhost:${PORT}
`)
)

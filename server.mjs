import express from 'express'
import { prerex } from '@prerex/express'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3000
const DIST = resolve(__dirname, 'dist')

const app = express()

// Prerender opzionale: richiede una chiave configurata dal gestore.
if (process.env.PREREX_API_KEY) {
  app.use(prerex())
}

// Serve static files with cache headers
app.use(express.static(DIST, {
  maxAge: '1y',
  setHeaders(res, path) {
    // No cache for HTML, service worker, manifest
    if (path.endsWith('.html') || path.endsWith('sw.js') || path.endsWith('manifest.json')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    }
  }
}))

// SPA fallback — all routes serve index.html
app.get('/{*splat}', (req, res) => {
  res.sendFile(resolve(DIST, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Amabeef server running on port ${PORT}`)
})

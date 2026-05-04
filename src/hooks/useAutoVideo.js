import { useState, useEffect, useCallback, useRef } from 'react'
import { getVideoData } from '../data/videos'

const CACHE_PREFIX = 'fithome_vid_'
const CHECKED_PREFIX = 'fithome_vid_checked_'
const CHECK_INTERVAL_MS = 1000 * 60 * 60 * 24 // re-validate once per day

function cacheKey(name) {
  return CACHE_PREFIX + name.toLowerCase().replace(/\s+/g, '_')
}
function checkedKey(name) {
  return CHECKED_PREFIX + name.toLowerCase().replace(/\s+/g, '_')
}

// Check if a video is publicly available using YouTube's oEmbed API (no key needed)
async function checkAvailable(videoId) {
  try {
    const url = `https://www.youtube.com/oembed?url=https%3A//www.youtube.com/watch%3Fv%3D${videoId}&format=json`
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) })
    return res.ok
  } catch {
    return false
  }
}

// Search YouTube for videos matching a query (requires Google API key)
async function searchYouTube(query, googleKey, maxResults = 6) {
  const q = encodeURIComponent(query)
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&maxResults=${maxResults}&videoEmbeddable=true&relevanceLanguage=es&key=${googleKey}`
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) })
    if (!res.ok) return []
    const data = await res.json()
    return (data.items ?? []).map(i => i.id.videoId).filter(Boolean)
  } catch {
    return []
  }
}

// Find first available video from a list of candidates
async function findFirst(ids) {
  for (const id of ids) {
    if (id && await checkAvailable(id)) return id
  }
  return null
}

export function useAutoVideo(exerciseName) {
  const [videoId, setVideoId] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'searching' | 'none'
  const searching = useRef(false)

  const find = useCallback(async (forceRecheck = false) => {
    if (!exerciseName || searching.current) return
    searching.current = true

    const ck = cacheKey(exerciseName)
    const chk = checkedKey(exerciseName)
    const cached = localStorage.getItem(ck)
    const lastChecked = parseInt(localStorage.getItem(chk) ?? '0', 10)
    const needsRecheck = forceRecheck || (Date.now() - lastChecked > CHECK_INTERVAL_MS)

    // Use cached value if it doesn't need re-validation yet
    if (cached && !needsRecheck) {
      setVideoId(cached)
      setStatus('ready')
      searching.current = false
      return
    }

    setStatus(cached ? 'loading' : 'searching')

    // Validate cached value
    if (cached) {
      const ok = await checkAvailable(cached)
      if (ok) {
        localStorage.setItem(chk, String(Date.now()))
        setVideoId(cached)
        setStatus('ready')
        searching.current = false
        return
      }
      // Cached video is gone — clear it
      localStorage.removeItem(ck)
      localStorage.removeItem(chk)
      setStatus('searching')
    }

    const { candidates, query } = getVideoData(exerciseName)

    // Try pre-curated candidates
    const fromCandidates = await findFirst(candidates)
    if (fromCandidates) {
      localStorage.setItem(ck, fromCandidates)
      localStorage.setItem(chk, String(Date.now()))
      setVideoId(fromCandidates)
      setStatus('ready')
      searching.current = false
      return
    }

    // Try YouTube API search (if Google key is configured)
    const googleKey = localStorage.getItem('fithome_google_key') ?? ''
    if (googleKey) {
      const ids = await searchYouTube(query, googleKey)
      const fromSearch = await findFirst(ids)
      if (fromSearch) {
        localStorage.setItem(ck, fromSearch)
        localStorage.setItem(chk, String(Date.now()))
        setVideoId(fromSearch)
        setStatus('ready')
        searching.current = false
        return
      }
    }

    // Nothing found — illustrations will be shown instead
    setVideoId(null)
    setStatus('none')
    searching.current = false
  }, [exerciseName])

  // Run on mount
  useEffect(() => {
    if (exerciseName) find()
  }, [find])

  // Re-validate when app returns to foreground
  useEffect(() => {
    function onVisible() {
      if (document.visibilityState === 'visible') find()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [find])

  function retry() { find(true) }

  return { videoId, status, retry }
}

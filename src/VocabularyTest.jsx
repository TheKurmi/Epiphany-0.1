import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function VocabularyTest() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase.from('vocabulary').select('*')

      if (cancelled) return

      if (fetchError) {
        setError(fetchError.message)
        setRows([])
      } else {
        setRows(data ?? [])
      }
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <p>Loading vocabulary…</p>
  if (error) return <p style={{ color: 'crimson' }}>Error: {error}</p>

  if (loading) return <p>Loading vocabulary...</p>

if (error) {
  return (
    <div style={{ background: 'red', color: 'white', padding: '20px' }}>
      ERROR: {error}
    </div>
  )
}

return (
  <div style={{ background: 'green', color: 'white', padding: '20px' }}>
    Loaded {rows.length} rows
  </div>
)
}
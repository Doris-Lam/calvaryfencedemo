"use client"

import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'

interface BlockedSlot {
  id: string
  start: string // ISO
  end: string   // ISO
}

export default function AdminBlockedSlots() {
  const [slots, setSlots] = useState<BlockedSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function fetchSlots() {
    setLoading(true)
    const res = await fetch('/api/blocked-slots')
    const data = await res.json()
    setSlots(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchSlots()
  }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    if (!start || !end) {
      setError('Start and end required')
      setSubmitting(false)
      return
    }
    const res = await fetch('/api/blocked-slots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start, end }),
    })
    if (!res.ok) {
      setError('Failed to add slot')
    } else {
      setStart('')
      setEnd('')
      fetchSlots()
    }
    setSubmitting(false)
  }

  async function handleDelete(id: string) {
    await fetch('/api/blocked-slots', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchSlots()
  }

  return (
    <main>
      <Navigation />
      <section className="mx-auto max-w-2xl px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin: Blocked Slots</h2>
        <form onSubmit={handleAdd} className="mb-8 bg-white rounded-lg shadow p-4 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start</label>
            <input
              type="datetime-local"
              value={start}
              onChange={e => setStart(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End</label>
            <input
              type="datetime-local"
              value={end}
              onChange={e => setEnd(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? 'Adding...' : 'Add Blocked Slot'}
          </button>
        </form>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-bold mb-4">Current Blocked Slots</h3>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : slots.length === 0 ? (
            <p className="text-gray-500">No blocked slots.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {slots.map(slot => (
                <li key={slot.id} className="py-2 flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    {new Date(slot.start).toLocaleString()} &rarr; {new Date(slot.end).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleDelete(slot.id)}
                    className="ml-4 px-3 py-1 bg-blue-600 text-black rounded hover:bg-blue-700 text-xs"
                  >
                    Cancel
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
} 
"use client"

import Navigation from '@/components/Navigation'
import { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer, Event as RBCEvent, SlotInfo } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enCA from 'date-fns/locale/en-CA'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-CA': enCA,
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

interface AppointmentEvent extends RBCEvent {
  title: string
  start: Date
  end: Date
}

interface BlockedSlot {
  id: string
  start: string // ISO
  end: string   // ISO
}

export default function QuoteBooking() {
  const [events, setEvents] = useState<AppointmentEvent[]>([])
  const [selectedSlot, setSelectedSlot] = useState<any>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingName, setBookingName] = useState('')
  const [bookingEmail, setBookingEmail] = useState('')
  const [bookingPhone, setBookingPhone] = useState('')
  const [bookingCity, setBookingCity] = useState('')
  const [bookingAddress, setBookingAddress] = useState('')
  const [bookingNote, setBookingNote] = useState('')
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      .rbc-time-content, .rbc-timeslot-group, .rbc-time-header, .rbc-label, .rbc-header, .rbc-time-gutter, .rbc-timeslot-group .rbc-label {
        color: #111 !important;
      }
      .rbc-toolbar-label {
        color: #111 !important;
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  useEffect(() => {
    async function fetchBlocked() {
      setLoading(true)
      const res = await fetch('/api/blocked-slots')
      const data = await res.json()
      setBlockedSlots(data)
      setLoading(false)
    }
    fetchBlocked()
  }, [])

  // Helper: check if a slot is blocked
  function isSlotBlocked(slot: SlotInfo) {
    return blockedSlots.some(bs => {
      const slotStart = new Date(slot.start).getTime()
      const slotEnd = new Date(slot.end).getTime()
      const bsStart = new Date(bs.start).getTime()
      const bsEnd = new Date(bs.end).getTime()
      // Overlap
      return slotStart < bsEnd && slotEnd > bsStart
    })
  }

  // Custom slot style: blocked slots are black
  function slotPropGetter(date: Date) {
    const isBlocked = blockedSlots.some(bs => {
      const d = date.getTime()
      const bsStart = new Date(bs.start).getTime()
      const bsEnd = new Date(bs.end).getTime()
      return d >= bsStart && d < bsEnd
    })
    if (isBlocked) {
      return {
        style: {
          backgroundColor: '#111',
          color: '#fff',
          position: 'relative',
        },
        className: 'blocked-slot',
      }
    }
    return {}
  }

  // Prevent selecting blocked slots
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    if (isSlotBlocked(slotInfo)) {
      return // ignore
    }
    setSelectedSlot(slotInfo)
    setShowBooking(true)
  }

  const handleBook = () => {
    if (!bookingName || !bookingEmail || !bookingPhone || !bookingCity || !bookingAddress) return
    setEvents([
      ...events,
      {
        title: bookingName,
        start: selectedSlot.start,
        end: selectedSlot.end,
        allDay: false,
      },
    ])
    setShowBooking(false)
    setBookingName('')
    setBookingEmail('')
    setBookingPhone('')
    setBookingCity('')
    setBookingAddress('')
    setBookingNote('')
    setSelectedSlot(null)
  }

  return (
    <main>
      <Navigation />
      <section className="mx-auto max-w-4xl px-6 py-16 mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Book an Appointment</h2>
        <div className="bg-white rounded-lg shadow p-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              selectable
              onSelectSlot={handleSelectSlot}
              views={['week', 'day']}
              defaultView="week"
              min={new Date(new Date().setHours(8,0,0,0))}
              max={new Date(new Date().setHours(20,0,0,0))}
              popup
              slotPropGetter={slotPropGetter}
              messages={{
                week: 'Week',
                day: 'Day',
              }}
            />
          )}
          {showBooking && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                <h3 className="text-lg font-bold mb-4 text-black">Book Appointment</h3>
                <p className="mb-2 text-black">
                  {format(selectedSlot.start, 'PPpp')} - {format(selectedSlot.end, 'PPpp')}
                </p>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4 text-black"
                  value={bookingName}
                  onChange={e => setBookingName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4 text-black"
                  value={bookingEmail}
                  onChange={e => setBookingEmail(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4 text-black"
                  value={bookingPhone}
                  onChange={e => setBookingPhone(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4 text-black"
                  value={bookingCity}
                  onChange={e => setBookingCity(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4 text-black"
                  value={bookingAddress}
                  onChange={e => setBookingAddress(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Optional Note"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4 text-black"
                  value={bookingNote}
                  onChange={e => setBookingNote(e.target.value)}
                  rows={2}
                />
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={handleBook}
                    disabled={!bookingName || !bookingEmail || !bookingPhone || !bookingCity || !bookingAddress}
                  >
                    Confirm
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                    onClick={() => setShowBooking(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
} 
import { NextRequest, NextResponse } from 'next/server'

// In-memory store for blocked slots (replace with DB later)
let blockedSlots: { id: string; start: string; end: string }[] = []

export async function GET() {
  return NextResponse.json(blockedSlots)
}

export async function POST(req: NextRequest) {
  const { start, end } = await req.json()
  if (!start || !end) {
    return NextResponse.json({ error: 'Missing start or end' }, { status: 400 })
  }
  const id = Math.random().toString(36).substr(2, 9)
  const slot = { id, start, end }
  blockedSlots.push(slot)
  return NextResponse.json(slot)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }
  blockedSlots = blockedSlots.filter(slot => slot.id !== id)
  return NextResponse.json({ success: true })
} 
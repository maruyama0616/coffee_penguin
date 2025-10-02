import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'Manual sync is not supported in this environment.' },
    { status: 501 },
  )
}
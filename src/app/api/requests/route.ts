import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Request as DbRequest } from '@/types'

export async function GET() {
  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name, item_1, item_2, item_3 } = body

  if (!name || !item_1) {
    return NextResponse.json(
      { error: 'Name and Item 1 are required' },
      { status: 400 }
    )
  }

  const newRequest: Partial<DbRequest> = {
    name,
    item_1,
    item_2,
    item_3,
  }

  const { data, error } = await supabase
    .from('requests')
    .insert(newRequest)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

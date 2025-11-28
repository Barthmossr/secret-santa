import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Request as DbRequest } from '@/types'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const { name, item_1, item_2, item_3 } = body

  const updates: Partial<DbRequest> = {
    name,
    item_1,
    item_2,
    item_3,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('requests')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

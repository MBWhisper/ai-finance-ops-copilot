import { createClient } from '@supabase/supabase-js'

export interface UserRecord {
  id: string
  email: string
  name: string | null
  plan: string
  trial_ends_at: string | null
  created_at: string
}

export async function ensureUserRecord(
  userId: string,
  email: string,
  name?: string
): Promise<UserRecord> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    throw new Error('Server configuration missing')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    throw new Error('Server configuration missing')
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const { data: existing, error: selectError } = await admin
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (selectError && selectError.code !== 'PGRST116') {
    throw new Error(`Failed to check user: ${selectError.message}`)
  }

  if (existing) {
    return existing as UserRecord
  }

  const trialEndDate = new Date()
  trialEndDate.setDate(trialEndDate.getDate() + 14)

  const { data: created, error: insertError } = await admin
    .from('users')
    .insert({
      id: userId,
      email,
      name: name || '',
      plan: 'starter',
      trial_ends_at: trialEndDate.toISOString().split('T')[0],
    })
    .select()
    .single()

  if (insertError) {
    if (insertError.code === '23505') {
      const { data: retryData } = await admin
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (retryData) {
        return retryData as UserRecord
      }
    }
    
    throw new Error(`Failed to create user: ${insertError.message}`)
  }

  return created as UserRecord
}
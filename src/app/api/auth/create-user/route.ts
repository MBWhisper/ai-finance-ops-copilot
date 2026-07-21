import { NextResponse } from 'next/server'
import { ensureUserRecord } from '@/lib/auth/ensure-user'
import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logger'

export async function GET(request: Request) {
  logger.info('[CREATE-USER-API] GET called')
  
  const supabase = await createClient()
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    logger.error({ error: sessionError.message }, '[CREATE-USER-API] Session error')
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }

  if (!session) {
    logger.info('[CREATE-USER-API] No session')
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
  }

  const user = session.user
  logger.info({ userId: user.id }, '[CREATE-USER-API] Creating/ensuring user record')

  try {
    const userRecord = await ensureUserRecord(
      user.id,
      user.email ?? '',
      user.user_metadata?.name as string | undefined
    )
    
    logger.info({ userId: userRecord.id }, '[CREATE-USER-API] User record ready')
    return NextResponse.json({ 
      success: true, 
      created: false,
      userId: userRecord.id 
    })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    logger.error({ error: errorMessage }, '[CREATE-USER-API] Error')
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function POST(request: Request) {
  logger.info('[CREATE-USER-API] POST called')
  
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    logger.error('[CREATE-USER-API] Service role key not configured')
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  const { userId, email, name } = await request.json()
  
  if (!userId || !email) {
    logger.error('[CREATE-USER-API] Missing userId or email')
    return NextResponse.json({ error: 'userId and email required' }, { status: 400 })
  }

  logger.info({ userId, email }, '[CREATE-USER-API] Creating user record')

  try {
    const userRecord = await ensureUserRecord(userId, email, name)
    
    logger.info({ userId: userRecord.id }, '[CREATE-USER-API] User record created/exists')
    return NextResponse.json({ 
      success: true, 
      created: true,
      userId: userRecord.id 
    })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    logger.error({ error: errorMessage }, '[CREATE-USER-API] Error')
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
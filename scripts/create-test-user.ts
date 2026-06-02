import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function main() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'example@gmail.com',
    password: 'password123',
    email_confirm: true,
    user_metadata: { name: 'Test User' },
  })

  if (error) {
    if (error.message.includes('already exists') || error.message.includes('already registered')) {
      console.log('ℹ️ Test user already exists: example@gmail.com / password123')
      return
    }
    throw error
  }

  console.log('✅ Test user created: example@gmail.com / password123')
}

main()
  .catch(console.error)
  .finally(() => process.exit(0))

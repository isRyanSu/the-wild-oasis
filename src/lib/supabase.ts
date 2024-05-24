import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tbehcegzdshaxizzcdrt.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiZWhjZWd6ZHNoYXhpenpjZHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NDU4OTYsImV4cCI6MjAzMjAyMTg5Nn0.aCC3pJj1nskaxjFBQFHeus6goJABZogC1qYCnBm__Rk'
const supabase = createClient(supabaseUrl, supabaseKey)

export const supabaseCabinImagesUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images`

export default supabase

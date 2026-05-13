import {createClient} from "@supabase/supabase-js"

const supabaseurl=process.env.NEXT_PUBLIC_SUPERBASE_URL||""
const supabaseanonkey=process.env.NEXT_PUBLIC_SUPERBASE_ANON_KEY||""

export const supabase=createClient(supabaseurl,supabaseanonkey)
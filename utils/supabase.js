import { createClient } from "@supabase/supabase-js";

const options = {};
const supabase = createClient(
  "https://lexjixkwizrsmiovmndd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjMzNjEzNSwiZXhwIjoxOTM3OTEyMTM1fQ.o-XaXkj-6HLlzBKfCllTgOTqhpDkSxLwf-hdOwkn20s",
  options
);

export default supabase;

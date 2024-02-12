// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

console.log("Hello from Functions!");

const supabase = createClient(
  Deno.env.get("https://moodzcmszmbatuipfuwj.supabase.co"),
  Deno.env.get(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb2R6Y21zem1iYXR1aXBmdXdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjYzNDg5NiwiZXhwIjoyMDIyMjEwODk2fQ.8LHj7z54-HKfn2aXBMVAYy5SFqPsYn2zFmAQ2cFGB4w"
  )
);

Deno.serve(async (req) => {
  const payload = await req.json();
  console.log(payload);
  const { data } = await supabase
    .from("Razredi")
    .select("token")
    .eq("razred", payload.record.user_id)
    .single();

  const res = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("EXPO_ACCESS_TOKEN")}`,
    },
    body: JSON.stringify({
      to: data?.token,
      sound: "default",
      body: payload.record.body,
    }),
  }).then((res) => res.json());

  return new Response(JSON.stringify(res), {
    headers: { "Content-Type": "application/json" },
  });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'

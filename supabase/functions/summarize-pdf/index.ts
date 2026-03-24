import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Teks PDF tidak boleh kosong" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Truncate very long texts to avoid token limits
    const maxChars = 30000;
    const truncatedText = text.length > maxChars ? text.slice(0, maxChars) + "\n\n[...teks dipotong karena terlalu panjang]" : text;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Kamu adalah asisten pendidikan yang ahli dalam merangkum materi pembelajaran.

Tugasmu:
1. Baca dan pahami materi yang diberikan
2. Buat ringkasan yang jelas dan mudah dipahami
3. Gunakan bahasa Indonesia yang sederhana
4. Strukturkan output dalam format markdown yang rapi

Format output:
## 📋 Ringkasan Materi
(Ringkasan singkat 2-3 paragraf tentang inti materi)

## 🔑 Poin-Poin Penting
(Bullet points dari konsep-konsep utama)

## 💡 Penjelasan Mudah
(Penjelasan ulang menggunakan analogi sederhana dan bahasa sehari-hari agar lebih mudah dipahami)

## 📝 Tips Belajar
(2-3 tips untuk memahami materi ini lebih baik)

Pastikan penjelasanmu cocok untuk pelajar SMP/SMA.`,
          },
          {
            role: "user",
            content: `Tolong rangkum dan jelaskan materi berikut dengan cara yang mudah dipahami:\n\n${truncatedText}`,
          },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Terlalu banyak permintaan, coba lagi nanti." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Kredit AI habis, silakan tambah kredit." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Gagal memproses dengan AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("summarize-pdf error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

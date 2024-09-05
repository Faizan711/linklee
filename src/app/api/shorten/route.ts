import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  const { originalUrl } = await req.json();
  const shortId = nanoid(7);

  const { data, error } = await supabase
    .from("urls")
    .insert([{ original_url: originalUrl, short_id: shortId }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const shortUrl = `${req.nextUrl.origin}/${shortId}`;
  return NextResponse.json({ shortUrl });
}

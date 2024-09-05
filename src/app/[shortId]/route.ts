import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const shortId = req.nextUrl.pathname.split("/").pop();

  const { data, error } = await supabase
    .from("urls")
    .select("original_url")
    .eq("short_id", shortId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  }

  return NextResponse.redirect(data.original_url, 301);
}

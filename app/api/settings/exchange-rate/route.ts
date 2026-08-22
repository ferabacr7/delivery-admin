import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

async function verifyAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("EXCHANGE RATE PROFILE LOOKUP ERROR:", profileError);

    return {
      error: NextResponse.json(
        { error: "Unable to verify administrator permissions" },
        { status: 500 },
      ),
    };
  }

  if (!profile || profile.role !== "admin") {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return {
    user,
  };
}

export async function GET() {
  try {
    const auth = await verifyAdmin();

    if ("error" in auth) {
      return auth.error;
    }

    const { data, error } = await supabaseAdmin
      .from("exchange_rates")
      .select(
        `
        id,
        currency_from,
        currency_to,
        crc_per_usd,
        effective_date,
        source,
        created_at,
        updated_at
      `,
      )
      .eq("currency_from", "USD")
      .eq("currency_to", "CRC")
      .order("effective_date", {
        ascending: false,
      })
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("EXCHANGE RATE LOOKUP ERROR:", error);

      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      exchangeRate: data ?? null,
    });
  } catch (error) {
    console.error("EXCHANGE RATE GET ERROR:", error);

    return NextResponse.json(
      { error: "Unexpected exchange rate error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const auth = await verifyAdmin();

    if ("error" in auth) {
      return auth.error;
    }

    const body = await request.json();

    const crcPerUsd = Number(body.crcPerUsd);

    const costaRicaToday = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Costa_Rica",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    const effectiveDate =
      typeof body.effectiveDate === "string"
        ? body.effectiveDate
        : costaRicaToday;

    if (!Number.isFinite(crcPerUsd) || crcPerUsd <= 0) {
      return NextResponse.json(
        { error: "Invalid exchange rate" },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("exchange_rates")
      .upsert(
        {
          currency_from: "USD",
          currency_to: "CRC",
          crc_per_usd: crcPerUsd,
          effective_date: effectiveDate,
          source: "ADMIN",
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "currency_from,currency_to,effective_date",
        },
      )
      .select(
        `
    id,
    currency_from,
    currency_to,
    crc_per_usd,
    effective_date,
    source,
    created_at,
    updated_at
  `,
      )
      .single();

    if (error) {
      console.error("EXCHANGE RATE INSERT ERROR:", error);

      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      exchangeRate: data,
    });
  } catch (error) {
    console.error("EXCHANGE RATE POST ERROR:", error);

    return NextResponse.json(
      { error: "Unexpected exchange rate error" },
      { status: 500 },
    );
  }
}

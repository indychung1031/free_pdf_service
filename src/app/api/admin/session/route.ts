import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createAdminToken,
  getAdminPassphrase,
  isValidAdminToken,
  verifyAdminPassphrase,
} from "@/lib/admin-auth";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function adminConfigured(): boolean {
  return Boolean(getAdminPassphrase());
}

export async function GET() {
  if (!adminConfigured()) {
    return NextResponse.json({ admin: false, configured: false });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return NextResponse.json({
    admin: isValidAdminToken(token),
    configured: true,
  });
}

export async function POST(request: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "Admin 인증이 설정되지 않았습니다. ADMIN_PASSPHRASE 환경 변수를 추가하세요." },
      { status: 503 },
    );
  }

  let passphrase = "";
  try {
    const body = (await request.json()) as { passphrase?: string };
    passphrase = body.passphrase?.trim() ?? "";
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (!verifyAdminPassphrase(passphrase)) {
    return NextResponse.json({ error: "인증에 실패했습니다." }, { status: 401 });
  }

  const token = createAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Admin 토큰을 생성할 수 없습니다." }, { status: 503 });
  }

  const response = NextResponse.json({ admin: true });
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ admin: false });
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}

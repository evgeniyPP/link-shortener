import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, _event: NextFetchEvent) {
  const slug = req.nextUrl.pathname.split('/').pop();

  if (!slug) {
    return;
  }

  const data = await fetch(`${req.nextUrl.origin}/api/url/${slug}`).then(r => r.json());

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}

export const config = {
  matcher: ['/l/:slug*']
};

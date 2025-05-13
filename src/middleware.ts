import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  const url = req.nextUrl.clone();
  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
};

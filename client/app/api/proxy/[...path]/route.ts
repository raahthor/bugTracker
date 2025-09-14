import { env } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

interface ProxyParams {
  params: Promise<{
    path: string[];
  }>;
}

export async function GET(req: NextRequest, { params }: ProxyParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function POST(req: NextRequest, { params }: ProxyParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function PUT(req: NextRequest, { params }: ProxyParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function PATCH(req: NextRequest, { params }: ProxyParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function DELETE(req: NextRequest, { params }: ProxyParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

async function handleProxy(req: NextRequest, pathSegments: string[]) {
  const targetUrl = `${env.API_URL}/${pathSegments.join("/")}${
    req.nextUrl.search
  }`;

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "host") headers.set(key, value);
  });

  const body =
    req.method !== "GET" && req.method !== "DELETE"
      ? await req.text()
      : undefined;

  try {
    // forward request to backend
    const res = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      redirect: "manual",
      credentials: "include",
    });

    // copy response body as raw stream
    const responseBody = res.body;

    // create a new NextResponse streaming directly from backend
    const response = new NextResponse(responseBody, {
      status: res.status,
      statusText: res.statusText,
    });

    // copy headers exactly
    res.headers.forEach((value, key) => {
      response.headers.set(key, value);
    });

    return response;
  } catch {
    // if backend unreachable, just return a 502 with no JSON
    return new NextResponse(null, { status: 502, statusText: "Bad Gateway" });
  }
}

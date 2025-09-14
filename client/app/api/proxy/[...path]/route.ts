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

export async function OPTIONS(req: NextRequest, { params }: ProxyParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function HEAD(req: NextRequest, { params }: ProxyParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

async function handleProxy(req: NextRequest, pathSegments: string[]) {
  try {
    const targetUrl = `${env.API_URL}/${pathSegments.join("/")}${
      req.nextUrl.search
    }`;

    // prepare headers
    const headers = new Headers();
    req.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "host") headers.set(key, value);
    });

    headers.delete("accept-encoding");

    let body: string | undefined;
    if (
      req.method !== "GET" &&
      req.method !== "HEAD" &&
      req.method !== "DELETE"
    ) {
      body = await req.text();
    }

    // forward request to backend
    const res = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      credentials: "include",
      redirect: "manual",
    });

    const responseHeaders = new Headers(res.headers);

    // remove content-encoding and content-length headers to prevent issues
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");
    responseHeaders.delete("Content-Encoding");
    responseHeaders.delete("Content-Length");

    const responseBody = await res.text();

    const response = new NextResponse(responseBody, {
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new NextResponse("Backend connection failed", { status: 502 });
  }
}

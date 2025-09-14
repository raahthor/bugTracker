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
  try {
    // Build the full backend URL including query params
    const targetUrl = `${env.API_URL}/${pathSegments.join("/")}${
      req.nextUrl.search
    }`;

    // Clone headers, skip host and connection-related headers
    const headers = new Headers();
    const headersToSkip = new Set([
      "host",
      "connection",
      "keep-alive",
      "upgrade",
    ]);

    req.headers.forEach((value, key) => {
      if (!headersToSkip.has(key.toLowerCase())) {
        headers.set(key, value);
      }
    });

    // Explicitly disable compression to avoid mismatches
    headers.delete("accept-encoding");

    // Get body if needed
    let body: string | undefined;
    if (
      req.method !== "GET" &&
      req.method !== "HEAD" &&
      req.method !== "DELETE"
    ) {
      body = await req.text();
    }

    // Forward request to backend
    const res = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      credentials: "include",
      redirect: "manual",
    });

    // Handle response
    const responseHeaders = new Headers(res.headers);

    // Remove content-encoding and content-length headers to prevent issues
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");
    responseHeaders.delete("Content-Encoding");
    responseHeaders.delete("Content-Length");

    // Handle redirects
    if (
      res.status >= 300 &&
      res.status < 400 &&
      responseHeaders.has("location")
    ) {
      const location = responseHeaders.get("location")!;
      if (location.startsWith(env.API_URL!)) {
        const proxyLocation = location.replace(
          env.API_URL!,
          `${req.nextUrl.origin}/api/proxy`
        );
        responseHeaders.set("location", proxyLocation);
      }
    }

    // Get the response body as text
    const responseText = await res.text();

    // Create response
    const response = new NextResponse(responseText, {
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
    });
    // Debug: Check if content-length matches actual body length
    const actualLength = new TextEncoder().encode(responseText).length;
    const declaredLength = parseInt(
      responseHeaders.get("content-length") || "0"
    );

    if (actualLength !== declaredLength && declaredLength > 0) {
      console.warn(
        `Content-Length mismatch: declared ${declaredLength}, actual ${actualLength}`
      );
      responseHeaders.delete("content-length");
    }
    return response;
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse(null, {
      status: 502,
      statusText: "Bad Gateway",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}

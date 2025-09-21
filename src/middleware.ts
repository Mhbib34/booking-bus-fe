import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type Decode = {
  role: string;
  exp: number; // Tambahkan field exp untuk expiry time
};

function isTokenExpired(token: string): boolean {
  try {
    const decoded: Decode = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime;
  } catch (error) {
    console.log("❌ Error decoding token for expiry check:", error);
    return true; // Anggap expired jika tidak bisa decode
  }
}

export async function middleware(request: NextRequest) {
  console.log("🔥 Middleware running for:", request.nextUrl.pathname);

  const token = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  console.log("🍪 Access token found:", !!token);
  console.log("🍪 Refresh token found:", !!refreshToken);

  // Jika tidak ada access token tapi ada refresh token, coba refresh
  if (!token && refreshToken) {
    console.log(
      "🔄 No access token but refresh token exists, attempting refresh..."
    );

    try {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Cookie: request.headers.get("cookie") || "",
          },
        }
      );

      if (refreshResponse.ok) {
        console.log("✅ Token refreshed successfully");
        // Ambil token baru dari response cookies
        const setCookieHeaders = refreshResponse.headers.get("set-cookie");

        if (setCookieHeaders) {
          // Parse new access token dari set-cookie header
          const newAccessToken =
            parseAccessTokenFromSetCookie(setCookieHeaders);

          if (newAccessToken) {
            console.log("🔑 New access token obtained");

            try {
              const decoded: Decode = jwtDecode(newAccessToken);
              console.log("✅ Decoded new token role:", decoded.role);

              // Buat response dengan cookie baru
              const response = createRedirectResponse(decoded.role, request);

              // Set cookie baru ke response
              if (setCookieHeaders) {
                response.headers.set("set-cookie", setCookieHeaders);
              }

              return response;
            } catch (decodeError) {
              console.log("❌ Failed to decode new token:", decodeError);
            }
          }
        }
      } else {
        console.log("❌ Refresh failed, redirecting to login");
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      console.log("❌ Error during token refresh:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Jika ada access token, cek apakah expired
  if (token) {
    if (isTokenExpired(token)) {
      console.log("⏰ Access token is expired");

      if (refreshToken) {
        console.log("🔄 Attempting to refresh expired token...");

        try {
          const refreshResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/refresh`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                Cookie: request.headers.get("cookie") || "",
              },
            }
          );

          if (refreshResponse.ok) {
            console.log("✅ Expired token refreshed successfully");
            const setCookieHeaders = refreshResponse.headers.get("set-cookie");

            if (setCookieHeaders) {
              const newAccessToken =
                parseAccessTokenFromSetCookie(setCookieHeaders);

              if (newAccessToken) {
                try {
                  const decoded: Decode = jwtDecode(newAccessToken);
                  const response = createRedirectResponse(
                    decoded.role,
                    request
                  );
                  response.headers.set("set-cookie", setCookieHeaders);
                  return response;
                } catch (decodeError) {
                  console.log(
                    "❌ Failed to decode refreshed token:",
                    decodeError
                  );
                }
              }
            }
          } else {
            console.log("❌ Failed to refresh expired token");
            return NextResponse.redirect(new URL("/login", request.url));
          }
        } catch (error) {
          console.log("❌ Error refreshing expired token:", error);
          return NextResponse.redirect(new URL("/login", request.url));
        }
      } else {
        console.log("❌ No refresh token available for expired access token");
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } else {
      // Token masih valid, lakukan redirect normal
      console.log("✅ Access token is still valid");

      try {
        const decoded: Decode = jwtDecode(token);
        console.log("🔑 Decoded token role:", decoded.role);
        console.log("📍 Current path:", request.nextUrl.pathname);

        return createRedirectResponse(decoded.role, request);
      } catch (err) {
        console.log("❌ JWT decode error:", err);
        return NextResponse.next();
      }
    }
  }

  // Jika tidak ada token sama sekali
  console.log("❌ No tokens available, continuing to page...");
  return NextResponse.next();
}

function parseAccessTokenFromSetCookie(setCookieHeader: string): string | null {
  // Parse access token dari set-cookie header
  const cookies = setCookieHeader.split(",");

  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith("accessToken=")) {
      const tokenValue = trimmedCookie.split(";")[0].split("=")[1];
      return tokenValue;
    }
  }

  return null;
}

function createRedirectResponse(
  role: string,
  request: NextRequest
): NextResponse {
  if (role === "admin" && request.nextUrl.pathname === "/") {
    console.log("🔄 REDIRECTING ADMIN TO DASHBOARD");
    return NextResponse.redirect(new URL("/admin", request.url));
  } else {
    console.log("➡️ No redirect needed");
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/"],
};

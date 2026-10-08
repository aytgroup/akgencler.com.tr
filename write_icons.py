icon_content = """import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#0D1B5E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          padding: "0 3px",
        }}
      >
        <div
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "#E30A17",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "white",
              left: 1,
              top: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#E30A17",
              left: 3,
              top: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 1,
              color: "white",
              fontSize: 5,
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            &#9733;
          </div>
        </div>
        <div
          style={{
            color: "white",
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: -0.5,
            lineHeight: 1,
            fontFamily: "sans-serif",
          }}
        >
          AK
        </div>
      </div>
    ),
    { ...size }
  );
}
"""

apple_content = """import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "#0D1B5E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: "0 16px",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#E30A17",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "white",
              left: 8,
              top: 11,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#E30A17",
              left: 16,
              top: 11,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 4,
              top: 8,
              color: "white",
              fontSize: 28,
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            &#9733;
          </div>
        </div>
        <div
          style={{
            color: "white",
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: -3,
            lineHeight: 1,
            fontFamily: "sans-serif",
          }}
        >
          AK
        </div>
      </div>
    ),
    { ...size }
  );
}
"""

favicon_svg = """<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="8" fill="#0D1B5E"/>
  <!-- Hilal+Yildiz sol -->
  <circle cx="10" cy="16" r="6" fill="#E30A17"/>
  <circle cx="8.5" cy="16" r="4" fill="white"/>
  <circle cx="10" cy="16" r="3.2" fill="#E30A17"/>
  <polygon fill="white" transform="translate(14,16) rotate(-20)" points="0,-2.5 0.6,-0.8 2.2,-0.8 0.9,0.3 1.4,2 0,1 -1.4,2 -0.9,0.3 -2.2,-0.8 -0.6,-0.8"/>
  <!-- AK yazi -->
  <text x="17" y="21" font-family="Arial Black, sans-serif" font-size="13" font-weight="900" fill="white" letter-spacing="-0.5">AK</text>
</svg>"""

with open(r'c:\Users\agity\Desktop\akgencler.com.tr\src\app\icon.tsx', 'w', encoding='utf-8') as f:
    f.write(icon_content)
print('icon.tsx OK')

with open(r'c:\Users\agity\Desktop\akgencler.com.tr\src\app\apple-icon.tsx', 'w', encoding='utf-8') as f:
    f.write(apple_content)
print('apple-icon.tsx OK')

with open(r'c:\Users\agity\Desktop\akgencler.com.tr\public\favicon.svg', 'w', encoding='utf-8') as f:
    f.write(favicon_svg)
print('favicon.svg OK')

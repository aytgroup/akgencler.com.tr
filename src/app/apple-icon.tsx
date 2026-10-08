import { ImageResponse } from "next/og";

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

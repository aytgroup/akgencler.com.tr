import { ImageResponse } from "next/og";

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
            ★
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

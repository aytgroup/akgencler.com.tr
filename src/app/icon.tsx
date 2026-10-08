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
          borderRadius: 7,
          background: "#C8102E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: 14,
          color: "white",
          letterSpacing: "-0.5px",
          fontFamily: "sans-serif",
        }}
      >
        AK
      </div>
    ),
    { ...size }
  );
}

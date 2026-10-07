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
          background: "linear-gradient(145deg, #1a237e, #1565c0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Kırmızı daire */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "#E30A17",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Hilal büyük beyaz */}
          <div
            style={{
              position: "absolute",
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "white",
              left: 22,
              top: 34,
            }}
          />
          {/* Hilal üzeri kırmızı */}
          <div
            style={{
              position: "absolute",
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: "#E30A17",
              left: 30,
              top: 34,
            }}
          />
          {/* Yıldız */}
          <div
            style={{
              position: "absolute",
              right: 18,
              top: 38,
              color: "white",
              fontSize: 44,
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            ★
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
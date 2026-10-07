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
          background: "#1a237e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Kırmızı daire */}
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "#E30A17",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Hilal - büyük beyaz daire */}
          <div
            style={{
              position: "absolute",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "white",
              left: 4,
              top: 6,
            }}
          />
          {/* Hilal - üst kırmızı daire */}
          <div
            style={{
              position: "absolute",
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#E30A17",
              left: 6,
              top: 6,
            }}
          />
          {/* Yıldız */}
          <div
            style={{
              position: "absolute",
              right: 3,
              top: 7,
              color: "white",
              fontSize: 9,
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
